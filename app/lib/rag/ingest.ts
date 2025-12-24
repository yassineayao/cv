import { google } from '@ai-sdk/google';
import { embed, embedMany } from 'ai';
import { v4 as uuidv4 } from 'uuid';
import { RAG_CONFIG } from './config';
import { ensureCollection, upsertChunk, deleteByFilename } from './vector-store';

import { generateSparseVector } from './sparse';

const MAX_CHUNK_SIZE = 500; // Characters roughly
const CHUNK_OVERLAP = 50;

function splitText(text: string): string[] {
    const chunks: string[] = [];
    let start = 0;
    while (start < text.length) {
        const end = Math.min(start + MAX_CHUNK_SIZE, text.length);
        chunks.push(text.slice(start, end));
        start += MAX_CHUNK_SIZE - CHUNK_OVERLAP;
    }
    return chunks;
}

export async function ingestDocument(content: string, metadata: { filename: string; sourceType: 'markdown' | 'pdf' | 'text' }) {
    // 1. Ensure collection exists
    await ensureCollection();

    // 2. Clear existing chunks for this file to prevent duplicates
    console.log(`Clearing existing chunks for ${metadata.filename}...`);
    await deleteByFilename(metadata.filename);

    // 3. Split text
    const chunks = splitText(content);
    console.log(`Splitting document into ${chunks.length} chunks...`);

    // 3. Generate embeddings
    const { embeddings } = await embedMany({
        model: google.textEmbeddingModel(RAG_CONFIG.model.embedding),
        values: chunks,
    });

    // 4. Upsert to Qdrant
    console.log(`Upserting ${chunks.length} chunks to Qdrant...`);
    const upsertPromises = chunks.map((chunk, index) => {
        const vector = embeddings[index];
        const sparseVector = generateSparseVector(chunk);
        const id = uuidv4();
        return upsertChunk(id, vector, { ...metadata, chunkIndex: index }, chunk, sparseVector);
    });

    await Promise.all(upsertPromises);
    console.log("Ingestion complete.");
}
