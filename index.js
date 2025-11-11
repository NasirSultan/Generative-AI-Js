import dotenv from "dotenv";
import { readFileSync } from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

async function main() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction:
      "You are a smart AI assistant. Look at the image and give a clear, short description."
  });

  const base64Img = readFileSync("img.png", { encoding: "base64" });

  const response = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType: "image/png",
              data: base64Img
            }
          },
          {
            text: "Please describe this image."
          }
        ]
      }
    ]
  });

  console.log(response.response.text());
}

main();
