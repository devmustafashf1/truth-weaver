import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors("*"));
app.use(express.json());

// Initialize Deepseek via OpenAI SDK
const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

// Route to verify news
app.post("/api/verify-news", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    // Ask Deepseek for structured JSON output
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: `
You are a fact-checking assistant. 
Analyze the user's news/article and provide the response in JSON format exactly as below:

{
  "verdict": "likely_real" | "likely_fake" | "uncertain",
  "confidence": number (0-100),
  "summary": string,
  "claims": [
    { "text": string, "status": "verified" | "false" | "unverified", "source": string (optional) }
  ],
  "sources": [string]
}

Do not include any extra text, only return valid JSON.
          `,
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    const responseText = completion.choices[0].message.content;

    // Parse JSON safely
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (err) {
      console.error("Failed to parse Deepseek JSON:", err);
      // Fallback response
      result = {
        verdict: "uncertain",
        confidence: 50,
        summary: responseText,
        claims: [],
        sources: [],
      };
    }

    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to verify news" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
