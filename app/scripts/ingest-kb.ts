import { promises as fs } from 'fs';
import path from 'path';
import { ingestDocument } from '../lib/rag/ingest';

async function main() {
    console.log("--- Starting Knowledge Base Ingestion ---");

    const publicDir = path.join(process.cwd(), 'public');
    const files = await fs.readdir(publicDir);

    const mdFiles = files.filter(f => f.endsWith('.md'));

    console.log(`Found ${mdFiles.length} Markdown files to ingest.`);

    for (const file of mdFiles) {
        const filePath = path.join(publicDir, file);
        console.log(`Ingesting ${file}...`);

        const content = await fs.readFile(filePath, 'utf-8');
        await ingestDocument(content, {
            filename: file,
            sourceType: 'markdown'
        });
    }

    console.log("--- Ingestion Complete ---");
}

main().catch(err => {
    console.error("Ingestion failed:", err);
    process.exit(1);
});
