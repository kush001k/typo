const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";

const PROMPTS = {
  easy: {
    system:
      "You are a typing-practice content generator. Generate simple, lowercase-only English sentences for beginner typists. Output strictly as JSON.",
    user:
      "Generate 10 simple typing-practice sentences. Each sentence must: be all lowercase, contain NO punctuation, contain NO uppercase letters, use only common everyday vocabulary, and be at most 8 words long. Return a JSON object with a single key 'sentences' containing an array of exactly 10 strings.",
  },
  medium: {
    system:
      "You are a typing-practice content generator. Generate natural English sentences with proper capitalization and simple punctuation for intermediate typists. Output strictly as JSON.",
    user:
      "Generate 10 natural English typing-practice sentences. Each sentence must: start with a capital letter, end with a period, allow commas and apostrophes, be at most 15 words long, and read naturally. Return a JSON object with a single key 'sentences' containing an array of exactly 10 strings.",
  },
  hard: {
    system:
      "You are a typing-practice content generator. Generate complex English sentences with rich punctuation for advanced typists. Output strictly as JSON.",
    user:
      "Generate 10 complex English typing-practice sentences. Each sentence must: include rich punctuation such as quotes, dashes, semicolons, exclamation marks, or question marks; vary in length up to 30 words; and read naturally. Return a JSON object with a single key 'sentences' containing an array of exactly 10 strings.",
  },
};

const JSON_SCHEMA = {
  type: "json_schema",
  json_schema: {
    name: "typing_sentences",
    strict: true,
    schema: {
      type: "object",
      properties: {
        sentences: {
          type: "array",
          items: { type: "string" },
        },
      },
      required: ["sentences"],
      additionalProperties: false,
    },
  },
};

export async function generateContent(difficulty) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("VITE_GROQ_API_KEY is not set");
  }

  const prompt = PROMPTS[difficulty];
  if (!prompt) {
    throw new Error(`Unknown difficulty: ${difficulty}`);
  }

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: prompt.system },
        { role: "user", content: prompt.user },
      ],
      temperature: 0.8,
      max_completion_tokens: 2048,
      response_format: JSON_SCHEMA,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Groq API error ${response.status}: ${text}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Groq API returned empty content");
  }

  const parsed = JSON.parse(content);
  if (!Array.isArray(parsed.sentences)) {
    throw new TypeError("Groq API returned unexpected shape");
  }

  return parsed.sentences;
}