import { google } from '@ai-sdk/google';
import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { retrieveContext } from '@/lib/rag/retrieve';
import { RAG_CONFIG } from '@/lib/rag/config';
import { config } from '@/lib/config';
import { prisma } from '@/lib/prisma';
import { getVisitMetadata } from '@/lib/analytics';
import { headers } from 'next/headers';

export const maxDuration = 30;

export async function POST(req: Request) {
  const body = await req.json();
  console.log('📨 Received chat request body:', JSON.stringify(body, null, 2));

  let { messages, sessionId }: { messages: UIMessage[], sessionId?: string } = body;

  // Fallback: check headers if sessionId not in body
  if (!sessionId) {
    sessionId = req.headers.get('X-Session-ID') || undefined;
    console.log('🔍 SessionId from header:', sessionId);
  }

  console.log('🔑 Session ID:', sessionId);
  console.log('💬 Messages count:', messages?.length);

  const lastMessage = messages[messages.length - 1];

  // Extract text from the last message
  const textPart = lastMessage.parts?.find((part: any) => part.type === 'text') as any;
  const lastMessageText = textPart?.text || '';
  console.log('📝 Last message text:', lastMessageText);

  // 0. Log Session and User Message
  if (sessionId) {
    console.log('✅ SessionId exists, attempting to log to database...');
    try {
      // Get visitor metadata (IP, location, etc)
      const metadata = await getVisitMetadata('/api/chat');

      // Upsert session to ensure we capture latest metadata
      await prisma.chatSession.upsert({
        where: { id: sessionId },
        create: {
          id: sessionId,
          ip: metadata.ip,
          country: metadata.country,
          city: metadata.city,
          region: metadata.region,
          device: metadata.device,
          browser: metadata.browser,
          os: metadata.os,
        },
        update: {
          updatedAt: new Date(),
        }
      });
      console.log('✅ Chat session upserted successfully');

      // Log User Message
      await prisma.chatMessage.create({
        data: {
          sessionId,
          role: 'user',
          content: lastMessageText,
        },
      });
      console.log('✅ User message logged successfully');
    } catch (error) {
      console.error("❌ Failed to log chat interaction:", error);
    }
  } else {
    console.log('⚠️ No sessionId provided, skipping database logging');
  }

  // 1. Retrieve Context
  console.log(`Retrieving context for: "${lastMessageText}"`);
  const context = await retrieveContext(lastMessageText);

  // 2. Construct System Prompt - Yassine Clone
  const systemPrompt = `You are Yassine Ayaou, a Full-Stack Developer from Morocco. You are speaking directly to visitors on your portfolio website.

## Your Identity
- Name: ${config.personal.fullName}
- Location: ${config.personal.location}
- Role: ${config.personal.title}
- Education: ${config.education.degree} from ${config.education.university} (${config.education.year})
- Languages: ${config.languages.map(l => `${l.name} (${l.level})`).join(', ')}

## Contact Information
- Email: ${config.contact.email}
- Upwork: ${config.contact.upwork}
- GitHub: ${config.contact.github}

## Your Personality
- Speak in FIRST PERSON - you ARE Yassine, not an assistant talking about him
- Be friendly, professional, and approachable
- Show passion for clean code and solving complex problems
- Be humble but confident about your expertise
- Keep answers concise but informative
- Use casual yet professional tone

## Your Background & Expertise
Use this context from your resume and knowledge base to answer questions:

${context}

## Response Guidelines
1. Always speak as "I" - for example: "I specialize in..." not "Yassine specializes in..."
2. If asked about skills, mention specific technologies you've used (Node.js, Next.js, PostgreSQL, Docker, etc.)
3. If asked about projects, share your experience working on them
4. If asked about availability, be clear that you are open to freelance opportunities.
5. **CRITICAL: When providing contact links, use these EXACT URLs:**
   - Upwork: [Hire me on Upwork](${config.contact.upwork})
   - Email: [${config.contact.email}](mailto:${config.contact.email})
   - GitHub: [View my GitHub](${config.contact.github})
6. If you don't know something specific, say "I haven't shared that publicly yet" rather than "I don't know"
7. Be enthusiastic when discussing your tech stack.

Remember: You ARE Yassine. Respond naturally as if having a conversation with a potential client or collaborator.`;

  // 3. Generate Response
  const result = streamText({
    model: google(RAG_CONFIG.model.name),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    onFinish: async (event) => {
      if (sessionId && event.text) {
        try {
          await prisma.chatMessage.create({
            data: {
              sessionId,
              role: 'assistant',
              content: event.text,
            },
          });
          console.log('✅ Assistant message logged successfully');
        } catch (e) {
          console.error("❌ Failed to log assistant response:", e);
        }
      }
    }
  });

  return result.toUIMessageStreamResponse();
}
