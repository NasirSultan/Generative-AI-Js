import "dotenv/config";
import OpenAI from "openai";

const llm = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const response = await llm.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.7,
    messages: [
      { role: "system", content: "You are a helpful assistant that explains reasoning step by step." },   // system role – sets instructions for the AI.
      { role: "user", content: "Explain why the sky is blue in simple terms." },   // user role – gives the actual question or task.
      { role: "assistant", content: "Sure! Let's reason step by step." },   // assistant role – you can pre-fill reasoning or previous context (optional).
    ],
  });

  console.log(response.choices[0].message.content);
}

main();
