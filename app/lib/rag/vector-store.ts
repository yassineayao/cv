import { QdrantClient } from '@qdrant/js-client-rest';
import { RAG_CONFIG } from './config';

let client: QdrantClient | null = null;

export const getQdrantClient = () => {
    if (!client) {
        client = new QdrantClient({
            url: RAG_CONFIG.qdrant.url,
        });
    }
    return client;
};

export const ensureCollection = async () => {
    const client = getQdrantClient();
    const collectionName = RAG_CONFIG.qdrant.collectionName;

    try {
        const collections = await client.getCollections();
        const exists = collections.collections.some((c) => c.name === collectionName);

        if (!exists) {
            console.log(`Creating collection: ${collectionName}`);
            await client.createCollection(collectionName, {
                vectors: {
                    size: RAG_CONFIG.qdrant.vectorSize,
                    distance: "Cosine",
                },
                sparse_vectors: {
                    "sparse-text": {
                        index: {
                            on_disk: true,
                        },
                    },
                },
            });
        }
    } catch (error) {
        console.error("Error creating collection:", error);
        throw error;
    }
};

export interface ChunkMetadata {
    filename: string;
    sourceType: "markdown" | "pdf" | "text";
    [key: string]: any;
}

export const upsertChunk = async (
    id: string,
    vector: number[],
    payload: ChunkMetadata,
    content: string,
    sparseVector?: { indices: number[], values: number[] }
) => {
    const client = getQdrantClient();
    await client.upsert(RAG_CONFIG.qdrant.collectionName, {
        points: [
            {
                id,
                vector: sparseVector ? {
                    "": vector, // default vector
                    "sparse-text": sparseVector
                } : vector,
                payload: {
                    ...payload,
                    content,
                },
            },
        ],
    });
};

export const searchVectorParams = async (vector: number[], limit: number = 20) => {
    const client = getQdrantClient();
    return await client.search(RAG_CONFIG.qdrant.collectionName, {
        vector,
        limit,
        with_payload: true,
    });
};

export const searchHybrid = async (
    denseVector: number[],
    sparseVector: { indices: number[], values: number[] },
    limit: number = 20
) => {
    const client = getQdrantClient();

    // Using Recommend/Search API with Fusion
    // Note: Qdrant 1.10+ supports Reciprocal Rank Fusion (RRF)
    // For simplicity, we can use the 'prefetch' and 'query' API if available in this client version
    // Or just do a search with multiple prefetch steps.

    return await client.query(RAG_CONFIG.qdrant.collectionName, {
        prefetch: [
            {
                query: denseVector,
                limit,
            },
            {
                query: sparseVector,
                using: "sparse-text",
                limit,
            }
        ],
        query: {
            fusion: "rrf"
        },
        limit,
        with_payload: true,
    });
};

export const getCollectionStats = async () => {
    const client = getQdrantClient();
    const collectionName = RAG_CONFIG.qdrant.collectionName;
    try {
        const info = await client.getCollection(collectionName);
        return {
            pointsCount: info.points_count,
            status: info.status,
        };
    } catch (error) {
        console.error("Error getting stats:", error);
        return { pointsCount: 0, status: "error" };
    }
};

export const listUniqueSources = async () => {
    const client = getQdrantClient();
    const collectionName = RAG_CONFIG.qdrant.collectionName;

    try {
        // We use scroll to get points and then extract unique filenames
        // Note: For large collections, grouping or a separate index would be better
        const result = await client.scroll(collectionName, {
            with_payload: true,
            limit: 1000, // Reasonable limit for portfolio
        });

        const sources = new Map<string, { filename: string; count: number; sourceType: string }>();

        result.points.forEach((point) => {
            const payload = point.payload as any;
            if (payload && payload.filename) {
                const existing = sources.get(payload.filename);
                if (existing) {
                    existing.count++;
                } else {
                    sources.set(payload.filename, {
                        filename: payload.filename,
                        count: 1,
                        sourceType: payload.sourceType || "unknown",
                    });
                }
            }
        });

        return Array.from(sources.values());
    } catch (error) {
        console.error("Error listing sources:", error);
        return [];
    }
};

export const deleteByFilename = async (filename: string) => {
    const client = getQdrantClient();
    const collectionName = RAG_CONFIG.qdrant.collectionName;

    await client.delete(collectionName, {
        filter: {
            must: [
                {
                    key: "filename",
                    match: {
                        value: filename,
                    },
                },
            ],
        },
    });
};
