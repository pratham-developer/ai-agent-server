import axios from 'axios';
import { getMemory, saveMessage } from '../utils/memory.js';
import { getRelevantChunks } from '../utils/rag.js';
import { runPlugins } from '../plugins/main.js';
import dotenv from "dotenv";
dotenv.config();
const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
    throw new Error('Missing GROQ_API_KEY in environment variables.');
}
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama3-70b-8192';
export async function handleAgentMessage(sessionId, userMessage) {
    try {
        if (!GROQ_API_KEY) {
            throw new Error('GROQ_API_KEY environment variable is not set. Please add it to your .env file.');
        }
        const memory = getMemory(sessionId);
        const contextChunks = await getRelevantChunks(userMessage);
        const pluginOutput = await runPlugins(userMessage);
        const systemPrompt = `You are a helpful AI agent.
Use memory, context, and plugins if needed.

Memory:
${memory.map(m => `User: ${m.user}\nAI: ${m.ai}`).join('\n')}

Context:
${contextChunks.map(c => c.content).join('\n\n')} 

Plugin Output:
${pluginOutput || "None"}

INSTRUCTIONS:
- Use the conversation memory to maintain context across turns
- Reference the provided context when relevant to answer questions
- If tools were used, incorporate their output naturally into your response
- Be helpful, accurate, and conversational`;
        const response = await axios.post(GROQ_API_URL, {
            model: GROQ_MODEL,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessage }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(systemPrompt);
        const reply = response.data.choices[0].message.content;
        console.log(reply);
        saveMessage(sessionId, userMessage, reply);
        return reply;
    }
    catch (error) {
        console.error('Error in handleAgentMessage:', error);
        return 'Sorry, I encountered an error processing your message. Please try again.';
    }
}
