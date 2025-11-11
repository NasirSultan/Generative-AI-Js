import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction:
    "You are a friendly and clear assistant. Explain things simply. give long answer."
});

const prompt = "Explain what machine learning is in one short paragraph.";

async function run() {
  // Streaming version
  const stream = await model.generateContentStream(prompt);

  process.stdout.write("Gemini streaming output:\n\n");

  // Collect and print chunks as they arrive
  for await (const chunk of stream.stream) {
    const text = chunk.text();
    if (text) process.stdout.write(text);
  }

  console.log("\n\nDone!");
}

run();
