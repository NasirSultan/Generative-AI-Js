import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

async function main() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-image",
    systemInstruction: "You are an assistant that generates an image from a text prompt."
  });

  const prompt = "A cute cartoon cat sitting on a sunny windowsill, pastel colors";

  const response = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: prompt
          }
        ]
      }
    ],
    // specify response modalities if required by the SDK (check docs)
  });

  // response.candidates[0].content.parts will contain image data in inlineData or similar field
  console.log(response);
}

main();
