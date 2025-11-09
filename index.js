import "dotenv/config";
import OpenAI from "openai";

const llm = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const response = await llm.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.7,
    max_tokens: 200,
    messages: [
      { role: "system", content: "You are a helpful assistant that explains things clearly." },
      { role: "user", content: "Explain why the ocean is salty in simple words, step by step." }
    ]
  });

  console.log(response.choices[0].message.content);
}

main();
