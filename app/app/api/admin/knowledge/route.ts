import { NextResponse } from 'next/server';
import { listUniqueSources, deleteByFilename, getCollectionStats } from '@/lib/rag/vector-store';
import { ingestDocument } from '@/lib/rag/ingest';
import { RAG_CONFIG } from '@/lib/rag/config';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const action = searchParams.get('action');
        const filename = searchParams.get('filename');

        if (action === 'get-content' && filename) {
            const knowledgeDir = path.join(process.cwd(), RAG_CONFIG.paths.knowledgeDir);
            const filePath = path.join(knowledgeDir, filename);
            const content = await fs.readFile(filePath, 'utf-8');
            return NextResponse.json({ content });
        }

        const sources = await listUniqueSources();
        const stats = await getCollectionStats();
        return NextResponse.json({ sources, stats });
    } catch (error) {
        console.error("Admin API Error:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const contentType = req.headers.get('content-type') || '';

        // Handle File Upload
        if (contentType.includes('multipart/form-data')) {
            const formData = await req.formData();
            const file = formData.get('file') as File;

            if (!file) {
                return NextResponse.json({ error: "No file provided" }, { status: 400 });
            }

            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = file.name;
            const knowledgeDir = path.join(process.cwd(), RAG_CONFIG.paths.knowledgeDir);
            const filePath = path.join(knowledgeDir, filename);

            // Ensure directory exists
            await fs.mkdir(knowledgeDir, { recursive: true });

            // Save file to disk
            await fs.writeFile(filePath, buffer);

            // Ingest file
            await ingestDocument(buffer.toString('utf-8'), {
                filename,
                sourceType: filename.endsWith('.pdf') ? 'pdf' : 'markdown'
            });

            return NextResponse.json({ message: `Successfully uploaded and ingested ${filename}` });
        }

        // Handle Actions (JSON)
        const { action, filename } = await req.json();

        if (action === 'ingest-all') {
            const knowledgeDir = path.join(process.cwd(), RAG_CONFIG.paths.knowledgeDir);
            const files = await fs.readdir(knowledgeDir);
            const mdFiles = files.filter(f => f.endsWith('.md'));

            for (const file of mdFiles) {
                const filePath = path.join(knowledgeDir, file);
                const content = await fs.readFile(filePath, 'utf-8');
                await ingestDocument(content, {
                    filename: file,
                    sourceType: 'markdown'
                });
            }
            return NextResponse.json({ message: `Ingested ${mdFiles.length} files` });
        }

        if (action === 'ingest-file' && filename) {
            const knowledgeDir = path.join(process.cwd(), RAG_CONFIG.paths.knowledgeDir);
            const filePath = path.join(knowledgeDir, filename);
            const content = await fs.readFile(filePath, 'utf-8');
            await ingestDocument(content, {
                filename,
                sourceType: 'markdown'
            });
            return NextResponse.json({ message: `Ingested ${filename}` });
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    } catch (error) {
        console.error("Admin POST Error:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { filename } = await req.json();
        if (!filename) {
            return NextResponse.json({ error: "Filename is required" }, { status: 400 });
        }

        await deleteByFilename(filename);
        return NextResponse.json({ message: `Deleted ${filename} from database` });
    } catch (error) {
        console.error("Admin Delete Error:", error);
        return NextResponse.json({ error: "Failed to delete from knowledge base" }, { status: 500 });
    }
}
