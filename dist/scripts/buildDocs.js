import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { embedText } from '../utils/embed.js'; // This is your mock embed function
const SOURCE_DIR = path.resolve('src/data/source_docs');
const OUTPUT_FILE = path.resolve('src/data/documents.json');
function chunkText(text, chunkSize = 500) {
    const paragraphs = text.split(/\n\s*\n/);
    const chunks = [];
    let current = '';
    for (const para of paragraphs) {
        if ((current + para).length > chunkSize) {
            chunks.push(current.trim());
            current = para;
        }
        else {
            current += '\n' + para;
        }
    }
    if (current.trim())
        chunks.push(current.trim());
    return chunks;
}
async function buildDocuments() {
    const files = fs.readdirSync(SOURCE_DIR);
    const allChunks = [];
    for (const file of files) {
        const filePath = path.join(SOURCE_DIR, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const chunks = chunkText(content);
        for (const chunk of chunks) {
            try {
                const embedding = await embedText(chunk);
                allChunks.push({
                    id: uuidv4(),
                    content: chunk,
                    embedding
                });
                // Progress logging every 10 chunks
                if (allChunks.length % 10 === 0) {
                    console.log(`Embedded ${allChunks.length} chunks so far...`);
                }
            }
            catch (err) {
                console.error('Embedding failed for chunk:', chunk.slice(0, 30), err);
            }
        }
    }
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allChunks, null, 2));
    console.log(`✅ ${allChunks.length} chunks written to ${OUTPUT_FILE}`);
}
buildDocuments().catch(console.error);
