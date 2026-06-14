// Generate a sequence of exactly `count` words by concatenating random quotes
export function generateWordSequence(quotesPool, count, lastQuote = "") {
  const sentences = [];
  let totalWords = 0;

  while (totalWords < count) {
    const remaining = count - totalWords;
    const candidates = quotesPool.filter((q) => q !== lastQuote);
    const quote = candidates[Math.floor(Math.random() * candidates.length)];
    lastQuote = quote;
    const words = quote.split(" ");
    const truncated = words.slice(0, remaining);
    sentences.push(truncated.join(" "));
    totalWords += truncated.length;
  }

  return sentences.join(" ");
}