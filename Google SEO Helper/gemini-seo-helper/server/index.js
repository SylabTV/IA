import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/analyze", async (req, res) => {
  const { content, search } = req.body;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-mini:generateMessage?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            author: "user",
            content: {
              text: `Analyse SEO : ${search}\n\n${content}`
            }
          }
        ]
      })
    }
  );

  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
