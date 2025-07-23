import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { AssemblyAI } from "assemblyai";
import fetch from "node-fetch"; // Make sure this is installed
import { url } from "inspector";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assemblyAI = new AssemblyAI({
  apiKey: "5cee3108c90741669eb10be0f8ba343b",
});

// Language name to code mapper
const languageCodeMap = {
  English: "en",
  Bangla: "bn",
  Spanish: "es",
  French: "fr",
  German: "de",
  Italian: "it",
  Portuguese: "pt",
  Chinese: "zh",
  Japanese: "ja",
  Korean: "ko",
  Arabic: "ar",
  Russian: "ru",
  Hindi: "hi",
  Dutch: "nl",
  Swedish: "sv",
  Norwegian: "no",
  Danish: "da",
  Finnish: "fi",
  Polish: "pl",
};

const translateAudio = async (req, res) => {
  console.log("Translating audio file...");

  try {
    const file = req.file;
    let { sourceLan, destinationLan } = req.body;

    // Convert language names to codes if needed
    sourceLan = languageCodeMap[sourceLan] || sourceLan;
    destinationLan = languageCodeMap[destinationLan] || destinationLan;

    if (!file) {
      return res.status(400).json({ message: "No audio file provided" });
    }

    // Save the file temporarily
    const tempDir = path.join(__dirname, "..", "temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    const tempPath = path.join(tempDir, `${Date.now()}-${file.originalname}`);
    fs.writeFileSync(tempPath, file.buffer);

    // Transcribe using AssemblyAI
    const transcript = await assemblyAI.transcripts.transcribe({
      language_code: sourceLan,
      audio: tempPath,
      speech_model: "universal",
    });

    if (transcript.status === "error") {
      fs.unlinkSync(tempPath);
      return res
        .status(500)
        .json({ message: "Transcription failed", details: transcript.error });
    }

    console.log(transcript.text)

    // Cleanup temp file
    fs.unlinkSync(tempPath);

    // Translate using external free API
    const URL = `https://ftapi.pythonanywhere.com/translate?sl=${sourceLan}&dl=${destinationLan}&text=${transcript.text}`;

    const translatedRes = await fetch(URL);
    const translatedText = await translatedRes.json();

    console.log(translatedText["destination-text"])

    res.json({
      original: transcript.text,
      translated: translatedText["destination-text"],
    });


  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const translateController = {
  translateAudio,
};
