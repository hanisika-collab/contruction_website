// routes/chat.js
// Groq is FREE — get your key at https://console.groq.com (no credit card needed)
const express     = require('express');
const router      = require('express').Router();
const OpenAI      = require('openai');
const ChatMessage = require('../models/ChatMessage');

const openai = new OpenAI({
  apiKey:  process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

const SYSTEM_PROMPT = `
You are a friendly AI assistant for ACE Construct, a premium construction and interior design company.
Be concise, warm, and helpful. Only answer questions about ACE Construct, construction, interiors,
pricing, timelines, and related topics. For unrelated topics, politely redirect.

COMPANY INFO:
- Name: ACE Construct
- Services: Residential construction, Commercial construction, Interior design and renovation
- Cities: Bangalore, Chennai, Hyderabad, Coimbatore
- Specialty: Before & after transformations, premium finishes, on-time delivery

PRICING PACKAGES (per sq.ft):
1. Classic - Rs.1,950/sq.ft
   Standard wire-cut bricks, vitrified tile flooring, putty & primer finish,
   standard CP fittings, basic electrical layout, weather shield exterior paint.
   Includes 1-year structural warranty.

2. Royale - Rs.2,250/sq.ft (Most Popular)
   Premium facing bricks, full granite flooring, Jaquar CP fittings,
   concealed modular wiring, false ceiling with LED accents, modular kitchen shell.
   Includes 1-year structural warranty.

3. Elite - Rs.2,800/sq.ft
   Imported Italian marble floors, full smart home automation, solar water heating,
   Kohler/TOTO luxury fittings, full modular kitchen & wardrobes,
   dedicated project manager, 2-year post-handover warranty.

OUR WORKS:
- Completed residential villas, apartments, commercial offices, and interior renovations.
- Projects across Bangalore, Chennai, Hyderabad, Coimbatore.
- Turnkey delivery from foundation to finishing.
- Showcase of before & after transformations on our website.
- Categories: Residential, Commercial, Interior.

FAQs:
- Timeline: 8–14 months for standard residential builds.
- Permits: We handle BBMP/CMDA/GHMC approvals and all statutory clearances.
- Minimum size: 600 sq.ft upwards to large commercial complexes.
- Customization: All packages are fully customizable.
- Getting started: Fill our contact form; consultant responds within 24 hours.
- Interior-only: Yes, full turnkey interior design without structural work.

IMPORTANT FORMATTING RULES:
- Keep every reply under 80 words.
- At the end of EVERY reply, output a special JSON block on its own line in this exact format:
  SUGGESTIONS:["suggestion 1","suggestion 2","suggestion 3"]
- The suggestions must be SHORT (under 6 words each), relevant follow-up questions the user might want to ask next.
- Always include exactly 3 suggestions.
- Example: SUGGESTIONS:["What's included in Elite?","How long does it take?","Which cities do you serve?"]
`;

// Simple in-memory session store (keyed by phone or name)
const sessions = new Map();

router.post('/chat', async (req, res) => {
  try {
    const { message, name, phone } = req.body;
    if (!message?.trim()) return res.status(400).json({ error: 'message is required' });

    const sessionKey = phone || name || 'guest';
    if (!sessions.has(sessionKey)) sessions.set(sessionKey, []);
    const history = sessions.get(sessionKey);

    history.push({ role: 'user', content: message.trim() });

    // Save user message to DB
    await ChatMessage.create({
      session_key: sessionKey,
      name:        name  || null,
      phone:       phone || null,
      sender:      'user',
      message:     message.trim(),
    });

    const completion = await openai.chat.completions.create({
      model:      'llama-3.3-70b-versatile',  // FREE via Groq — current recommended model
      max_tokens: 300,
      messages:   [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
    });

    const raw = completion.choices[0]?.message?.content?.trim() || '';

    // Parse out the SUGGESTIONS block from the reply
    const suggMatch = raw.match(/SUGGESTIONS:(\[.*?\])/);
    let suggestions = [];
    let reply = raw;

    if (suggMatch) {
      try {
        suggestions = JSON.parse(suggMatch[1]);
      } catch { suggestions = []; }
      reply = raw.replace(/SUGGESTIONS:\[.*?\]/, '').trim();
    }

    history.push({ role: 'assistant', content: raw });

    // Save bot reply to DB
    await ChatMessage.create({
      session_key: sessionKey,
      name:        name  || null,
      phone:       phone || null,
      sender:      'bot',
      message:     reply,
    });

    // Keep history trimmed to last 20 messages
    if (history.length > 20) sessions.set(sessionKey, history.slice(-20));

    res.json({ reply, suggestions });
  } catch (err) {
    console.error('[/api/chat] error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;