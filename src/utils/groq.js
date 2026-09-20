const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";

const PROMPTS = {
  easy: {
    system:
      "You generate typing-practice sentences. Always output valid JSON only.",
    user: 'Generate exactly 10 sentences for beginner typists. Rules:\n- All lowercase letters only\n- No punctuation of any kind\n- No uppercase letters\n- Only common, everyday English words\n- Maximum 8 words per sentence\nOutput format: {"sentences": ["sentence 1", "sentence 2", ..., "sentence 10"]}',
  },
  medium: {
    system:
      "You generate typing-practice sentences for intermediate typists. Output only valid JSON with a 'sentences' key containing an array of strings.",
    user: 'Generate exactly 10 natural English sentences for typing practice. Each sentence must: start with a capital letter, end with a period, contain only letters, spaces, commas, and apostrophes, be 1–15 words long, and sound natural. Return a JSON object: { "sentences": [ "...", ... ] }.',
  },
  hard: {
    system:
      "You generate typing-practice sentences. Output ONLY valid JSON with no extra text.",
    user: 'Generate exactly 10 complex English sentences for advanced typists. Requirements:\n- Each sentence: 10–30 words, natural reading flow.\n- Use rich punctuation in every sentence (quotes, dashes, semicolons, exclamation marks, or question marks).\n- Vary sentence structures and punctuation types across the set.\nReturn a JSON object with one key: "sentences", containing an array of exactly 10 strings.',
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

export async function generateContent(difficulty, signal) {
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
    signal,
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
