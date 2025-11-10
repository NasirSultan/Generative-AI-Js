// import "dotenv/config";
// import fs from "fs";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // set your API key in environment
// });

// async function transcribeAudio() {
//   try {
//     const response = await openai.audio.transcriptions.create({
//       file: fs.createReadStream("ssstik.io_1762802419377.mp3"), // your audio file
//       model: "gpt-4o-mini-transcribe", // or "whisper-1"
//     });

//     console.log("Transcribed text:", response.text);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// transcribeAudio();


import "dotenv/config";
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function transcribeAudio() {
  try {
    const response = await openai.audio.transcriptions.create({
      file: fs.createReadStream("ssstik.io_1762802514932.mp3"),
      model: "gpt-4o-mini-transcribe", // or "whisper-1"
      language: "ur", // set Urdu language
    });

    console.log("Transcribed text:", response.text);
  } catch (error) {
    console.error("Error:", error);
  }
}

transcribeAudio();
