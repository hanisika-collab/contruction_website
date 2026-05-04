const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/chat', async (req, res) => {
  try {
    const { message, name, phone } = req.body;

    // 🔥 GPT RESPONSE
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a professional construction assistant for ACE Construct.

You help customers with:
- construction cost
- house building
- materials
- timeline
- design ideas
- company services

Be friendly, short, and helpful.
Encourage user to contact company.
          `
        },
        {
          role: "user",
          content: message
        }
      ],
    });

    const reply = completion.choices[0].message.content;

    // 🔥 SAVE LEAD
    if (name && phone) {
      await new ChatMessage({ name, phone, message }).save();
    }

    res.json({ reply });

  } catch (err) {
    res.status(500).json({ error: "AI failed" });
  }
});

module.exports = router;