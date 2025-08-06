import { cosineSimilarity } from '../utils/cosine.js';
import { embedText } from '../utils/embed.js';
import documents from '../data/documents.json' with { type: "json" };
export async function getRelevantChunks(query) {
    try {
        if (!documents || !Array.isArray(documents)) {
            console.error('Documents not found or invalid format');
            return [];
        }
        const queryVec = await embedText(query);
        const scoredDocs = documents
            .map((doc) => ({
            ...doc,
            score: cosineSimilarity(queryVec, doc.embedding),
        }))
            .filter(doc => doc.score > 0.1) // Filter out very low similarity scores
            .sort((a, b) => b.score - a.score);
        // Add some diversity by not always returning the top 3
        const topResults = scoredDocs.slice(0, 5);
        const selectedResults = [];
        // Always include the top result
        if (topResults.length > 0) {
            selectedResults.push(topResults[0]);
        }
        // Randomly select 2 more from the top 5 to add diversity
        const remaining = topResults.slice(1);
        if (remaining.length > 0) {
            const shuffled = remaining.sort(() => Math.random() - 0.5);
            selectedResults.push(...shuffled.slice(0, 2));
        }
        return selectedResults.slice(0, 3);
    }
    catch (error) {
        console.error('Error in getRelevantChunks:', error);
        return [];
    }
}
