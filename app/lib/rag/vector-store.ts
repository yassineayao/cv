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
    content: string
) => {
    const client = getQdrantClient();
    await client.upsert(RAG_CONFIG.qdrant.collectionName, {
        points: [
            {
                id,
                vector,
                payload: {
                    ...payload,
                    content, // Storing content in payload for easy retrieval
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
