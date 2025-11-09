import "dotenv/config";
import OpenAI from "openai";

const llm = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Array to store conversation history
const conversationHistory = [
  { role: "system", content: "You are a helpful assistant. Remember the conversation context." }
];

async function aiAnswer(question) {
  try {
    // Add user message to history
    conversationHistory.push({ role: "user", content: question });

    const response = await llm.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.7,
      max_tokens: 250,
      messages: conversationHistory,
    });

    const answer = response.choices[0].message.content;

    // Add AI response to history
    conversationHistory.push({ role: "assistant", content: answer });

    console.log("\nAI:", answer, "\n");
    process.stdout.write("Ask your question: ");
  } catch (err) {
    console.error("Error:", err.message);
    process.stdout.write("Ask your question: ");
  }
}

// Initial prompt
process.stdout.write("Ask your question: ");

// Listen for terminal input
process.stdin.on("data", (data) => {
  const question = data.toString().trim();
  if (question.toLowerCase() === "exit") {
    console.log("Goodbye!");
    process.exit();
  } else if (question) {
    aiAnswer(question);
  }
});
