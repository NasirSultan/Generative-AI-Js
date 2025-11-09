import "dotenv/config";
import OpenAI from "openai";

const llm = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function aiAnswer(question) {
  try {
    const response = await llm.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.7,
      max_tokens: 200,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: question },
      ],
    });

    console.log("\nAI:", response.choices[0].message.content, "\n");
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
