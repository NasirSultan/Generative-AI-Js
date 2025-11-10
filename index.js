// import "dotenv/config";
// import OpenAI from "openai";
// import fs from "fs";

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// async function generateDogImage() {
//   try {
//     const response = await client.images.generate({
//       model: "gpt-image-1",
//       prompt: "A cute dog playing in the park, realistic style",
//       size: "1024x1024",  // fixed size
//     });

//     const imageBase64 = response.data[0].b64_json;
//     const imageBuffer = Buffer.from(imageBase64, "base64");

//     fs.writeFileSync("dog.png", imageBuffer);
//     console.log("Dog image saved as dog.png");
//   } catch (err) {
//     console.error("Error:", err.message);
//   }
// }

// generateDogImage();


// 
import "dotenv/config";
import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateImage() {
  const prompt = "A futuristic city skyline at sunset";

  const result = await openai.images.generate({
    model: "dall-e-2",
    prompt: prompt,
    size: "1024x1024",
  });

  const imageUrl = result.data[0].url;
  console.log("Image URL:", imageUrl);
  const imageResponse = await fetch(imageUrl);
  const arrayBuffer = await imageResponse.arrayBuffer();
  fs.writeFileSync("image.png", Buffer.from(arrayBuffer));
  console.log("Image saved as image.png");
}

generateImage();
