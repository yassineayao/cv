import { ingestDocument } from '../lib/rag/ingest';
import { retrieveContext } from '../lib/rag/retrieve';

async function main() {
    console.log("--- Starting RAG Verification ---");

    const queries = [
        "Where is Yassine Ayaou located?",
        "What is his professional experience?",
        "What are his core competencies in backend development?"
    ];

    for (const query of queries) {
        console.log(`\nTesting Retrieval (Query: '${query}')...`);
        const context = await retrieveContext(query);

        console.log("--- Retrieved Context (Top Snippet) ---");
        console.log(context.split('\n\n')[0] + "...");

        if (context.length > 0) {
            console.log("✅ SUCCESS: Retrieved context.");
        } else {
            console.error("❌ FAILURE: Did not retrieve context.");
        }
    }
}

main().catch(console.error);
