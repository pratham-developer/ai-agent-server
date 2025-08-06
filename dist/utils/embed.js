export async function embedText(text) {
    // Clean and tokenize the text
    const clean = text.toLowerCase()
        .replace(/[^\w\s]/g, ' ') // Replace punctuation with spaces
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
    const words = clean.split(' ').filter(word => word.length > 0);
    // Create a simple word frequency-based embedding
    const vec = new Array(100).fill(0);
    // Use word hashing to create a more diverse embedding
    words.forEach((word, index) => {
        if (index < 50) { // Use first 50 words
            let hash = 0;
            for (let i = 0; i < word.length; i++) {
                hash = ((hash << 5) - hash + word.charCodeAt(i)) & 0xffffffff;
            }
            vec[index] = (hash % 1000) / 1000; // Normalize to 0-1
        }
    });
    // Add some semantic features based on content
    const hasMarkdown = text.includes('#') || text.includes('*') || text.includes('[') ? 0.8 : 0.2;
    const hasCode = text.includes('```') || text.includes('`') ? 0.9 : 0.1;
    const hasLinks = text.includes('http') || text.includes('www') ? 0.7 : 0.3;
    const hasNumbers = /\d/.test(text) ? 0.6 : 0.4;
    vec[95] = hasMarkdown;
    vec[96] = hasCode;
    vec[97] = hasLinks;
    vec[98] = hasNumbers;
    vec[99] = Math.min(words.length / 100, 1); // Normalized word count
    return vec;
}
