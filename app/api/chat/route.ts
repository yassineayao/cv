import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { retrieveContext } from '../../lib/rag/retrieve';
import { RAG_CONFIG } from '../../lib/rag/config';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1];

    // 1. Retrieve Context
    console.log(`Retrieving context for: "${lastMessage.content}"`);
    const context = await retrieveContext(lastMessage.content);

    // 2. Construct System Prompt
    const systemPrompt = `
    You are a helpful assistant for the CV/Portfolio project.
    Use the following pieces of context to answer the user's question.
    If you don't know the answer, just say that you don't know, don't try to make up an answer.
    
    Context:
    ${context}
  `;

    // 3. Generate Response
    const result = streamText({
        model: google(RAG_CONFIG.model.name),
        system: systemPrompt,
        messages,
    });

    return result.toTextStreamResponse();
}
