import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

dotenv.config();

async function main() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "image-1.0-generate-001"
  });

  const prompt = "A cute cartoon cat sitting on a sunny windowsill, pastel colors";

  const response = await model.generateimage({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      responseModalities: ["image"]
    }
  });

  const imagePart = response.candidates[0].content.parts[0].inlineData;
  const buffer = Buffer.from(imagePart.data, "base64");

  fs.writeFileSync("output.png", buffer);

  console.log("Image saved as output.png");
}

main();
