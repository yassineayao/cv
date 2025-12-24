import { google } from '@ai-sdk/google';
import { embed } from 'ai';
import { RAG_CONFIG } from './config';
import { searchHybrid } from './vector-store';
import { generateSparseVector } from './sparse';

// Lazy load transformers to avoid startup overhead
let rerankerPipeline: any = null;

async function getReranker() {
    if (!rerankerPipeline) {
        const { pipeline } = await import('@xenova/transformers');
        // Using a lightweight cross-encoder modeled for MS-MARCO
        // This returns a score indicating how relevant the document is to the query
        rerankerPipeline = await pipeline('text-classification', 'Xenova/ms-marco-TinyBERT-L-2-v2');
    }
    return rerankerPipeline;
}

export async function retrieveContext(query: string) {
    // 1. Generate Query Embeddings (Dense + Sparse)
    const [{ embedding: denseEmbedding }, sparseVector] = await Promise.all([
        embed({
            model: google.textEmbeddingModel(RAG_CONFIG.model.embedding),
            value: query,
        }),
        Promise.resolve(generateSparseVector(query))
    ]);

    // 2. Hybrid Search (Dense + Sparse)
    // Retrieve more candidates than needed (e.g., 20) to allow reranker to filter
    const searchResults = await searchHybrid(denseEmbedding, sparseVector, 20);

    const documents = (searchResults.points as any[]).map(match => ({
        content: (match.payload as any)?.content as string,
        score: match.score,
        metadata: match.payload,
    })).filter(doc => doc.content);

    if (documents.length === 0) return "";

    // 3. Reranking using local Cross-Encoder
    try {
        const classifier = await getReranker();

        // Prepare pairs for reranking
        // Note: Cross-encoders are expensive, so we only rerank the candidates
        const rerankedDocs = await Promise.all(
            documents.map(async (doc: any) => {
                // The model expects a pair [query, document]
                const result = await classifier(query, { text_pair: doc.content });
                // result is usually [{label: 'LABEL_0', score: 0.99}, ...]
                // For this specific model, it usually has a single output dimension or 'positive' label
                return {
                    ...doc,
                    rerankScore: result[0].score
                };
            })
        );

        // Sort by rerank score
        rerankedDocs.sort((a: any, b: any) => b.rerankScore - a.rerankScore);

        // Return top 5
        const topDocs = rerankedDocs.slice(0, 5);
        return topDocs.map((doc: any) => doc.content).join("\n\n");

    } catch (err) {
        console.error("Reranking failed, falling back to usage of top hybrid results", err);
        return documents.slice(0, 5).map((doc: any) => doc.content).join("\n\n");
    }
}
