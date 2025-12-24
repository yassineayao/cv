import { z } from 'zod';

const envSchema = z.object({
    GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1, "Google API Key is missing"),
    QDRANT_URL: z.string().url().default("http://localhost:6333"),
});

const env = envSchema.parse(process.env);

export const RAG_CONFIG = {
    qdrant: {
        url: env.QDRANT_URL,
        collectionName: "knowledge-base",
        vectorSize: 768, // Dimensions for text-embedding-3-small or Gemini equivalent
    },
    model: {
        name: "gemini-3-flash-preview",
        embedding: "text-embedding-004",
    }
};
