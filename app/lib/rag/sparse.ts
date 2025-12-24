export function generateSparseVector(text: string): { indices: number[], values: number[] } {
    const words = text.toLowerCase().match(/\w+/g) || [];
    const counts: Record<number, number> = {};

    for (const word of words) {
        // Simple hash function for index
        let hash = 0;
        for (let i = 0; i < word.length; i++) {
            hash = (hash << 5) - hash + word.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        const index = Math.abs(hash) % 10000; // Limit to 10k dimensions
        counts[index] = (counts[index] || 0) + 1;
    }

    const indices = Object.keys(counts).map(Number).sort((a, b) => a - b);
    const values = indices.map(idx => counts[idx]);

    return { indices, values };
}
