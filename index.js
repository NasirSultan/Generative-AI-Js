import "dotenv/config";
import OpenAI from "openai";

export const llm = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const response = await llm.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.7,
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Write a short welcome message for a new user." },
    ],
  });

  console.log(response.choices[0].message.content);
}

main();
