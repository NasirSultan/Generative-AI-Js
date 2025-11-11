import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// System instruction defines the assistant's behavior
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction:
    "You are a helpful, clear-thinking AI assistant. Always reason step by step internally but only output final concise answers. Do not reveal your private reasoning."
});

// Simulated thinking configuration
const thinkConfig = {
  maxThoughtTimeMs: 800, // how long the model is allowed to 'think'
  maxReasonTokens: 256,  // conceptual internal reasoning limit
};

// Function to mimic thought + reasoning
async function runExample() {
  const prompt =
    "Explain why the sky looks blue, in a short and clear way.";

  console.log("Thinking...");

  // Simulate an internal 'thinking delay' (conceptual)
  await new Promise((res) => setTimeout(res, Math.min(thinkConfig.maxThoughtTimeMs, 1000)));

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      maxOutputTokens: 200,
      temperature: 0.7,
      topP: 0.8,
    },
  });

  console.log("\nFinal Answer:");
  console.log(result.response.text());

  console.log("\nThinking Summary (simulated):");
  console.log(
    `Used up to ${thinkConfig.maxReasonTokens} reasoning tokens within ${thinkConfig.maxThoughtTimeMs}ms budget.`
  );
}

runExample();
