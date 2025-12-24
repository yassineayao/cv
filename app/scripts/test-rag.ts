import { ingestDocument } from '../lib/rag/ingest';
import { retrieveContext } from '../lib/rag/retrieve';

async function main() {
    console.log("--- Starting RAG Verification ---");

    const dummyContent = `
    Project: Antigravity RAG System
    Date: 2025-12-24
    Description: This is a test document to verify the RAG system.
    Features:
    - Vector Search using Qdrant.
    - Embeddings using Google Gemini text-embedding-004.
    - Hybrid Search and Reranking.
    Secret Codeword: "BANANA_BREAD"
  `;

    console.log("1. Ingesting Document...");
    await ingestDocument(dummyContent, {
        filename: 'test-doc.md',
        sourceType: 'text'
    });

    console.log("\n2. Waiting for indexing (2s)...");
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("\n3. Testing Retrieval (Query: 'What is the secret codeword?')...");
    const context = await retrieveContext("What is the secret codeword?");

    console.log("\n--- Retrieved Context ---");
    console.log(context);

    if (context.includes("BANANA_BREAD")) {
        console.log("\n✅ SUCCESS: Retrieved the secret codeword.");
    } else {
        console.error("\n❌ FAILURE: Did not retrieve the secret codeword.");
    }
}

main().catch(console.error);
