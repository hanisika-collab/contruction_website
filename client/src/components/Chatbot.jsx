import React, { useState, useRef, useEffect } from 'react';

/* ─── INITIAL QUICK SUGGESTIONS shown before user types anything ─────────── */
const INITIAL_SUGGESTIONS = [
  'Tell me about your works',
  'What are your pricing packages?',
  'Which cities do you serve?',
  'How long does construction take?',
];

/* ─── CHATBOT ────────────────────────────────────────────────────────────── */
const Chatbot = () => {
  const [open,        setOpen]        = useState(false);
  const [step,        setStep]        = useState('name'); // 'name' | 'phone' | 'chat'
  const [lead,        setLead]        = useState({ name: '', phone: '' });
  const [input,       setInput]       = useState('');
  const [loading,     setLoading]     = useState(false);
  const [suggestions, setSuggestions] = useState(INITIAL_SUGGESTIONS);
  const [messages,    setMessages]    = useState([
    { from: 'bot', text: 'Hi! 👋 Welcome to ACE Construct! May I know your name?' },
  ]);

  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, suggestions]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const addBotMsg = (text, delay = 350) =>
    setTimeout(() => setMessages(p => [...p, { from: 'bot', text }]), delay);

  const saveLead = (name, phone) =>
    fetch('http://localhost:5000/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, source: 'chatbot' }),
    }).catch(() => {});

  /* ── core send logic ── */
  const send = async (text) => {
    if (!text.trim() || loading) return;
    setInput('');
    setSuggestions([]); // clear suggestions while waiting
    setMessages(p => [...p, { from: 'user', text }]);

    /* Lead capture */
    if (step === 'name') {
      setLead(p => ({ ...p, name: text }));
      addBotMsg(`Nice to meet you, ${text}! 😊 Could you share your phone number so we can follow up?`);
      setStep('phone');
      setSuggestions([]); // no suggestions during lead capture
      return;
    }

    if (step === 'phone') {
      setLead(prev => { saveLead(prev.name, text); return { ...prev, phone: text }; });
      addBotMsg('Thanks! 🙏 What would you like to know about ACE Construct?');
      setStep('chat');
      setTimeout(() => setSuggestions(INITIAL_SUGGESTIONS), 400);
      return;
    }

    /* AI reply */
    setLoading(true);
    try {
      console.log('[ACE Chatbot] 1. Sending to backend:', { message: text, name: lead.name, phone: lead.phone });

      const res = await fetch('http://localhost:5000/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ message: text, name: lead.name, phone: lead.phone }),
      });

      console.log('[ACE Chatbot] 2. HTTP status:', res.status, '| ok:', res.ok);

      const data = await res.json();
      console.log('[ACE Chatbot] 3. Response body:', data);

      if (!res.ok) {
        console.error('[ACE Chatbot] 4a. Backend error:', res.status, data);
        throw new Error(data?.error || 'HTTP ' + res.status);
      }

      const reply = data.reply || data.message || '';
      console.log('[ACE Chatbot] 4b. reply:', reply);
      console.log('[ACE Chatbot] 4c. suggestions:', data.suggestions);

      if (!reply) {
        console.error('[ACE Chatbot] 5. Empty reply — full response:', data);
        throw new Error('Empty reply from backend');
      }

      setMessages(p => [...p, { from: 'bot', text: reply }]);
      setSuggestions(Array.isArray(data.suggestions) ? data.suggestions : []);
    } catch (err) {
      console.error('[ACE Chatbot] CAUGHT ERROR:', err.name, '|', err.message, err);
      setMessages(p => [...p, { from: 'bot', text: 'Sorry, something went wrong. Please try again.' }]);
      setSuggestions(INITIAL_SUGGESTIONS);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => send(input.trim());
  const handleKey  = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } };

  return (
    <>
      {/* ── FLOAT BUTTON ── */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent text-white rounded-full shadow-lg shadow-accent/30 flex items-center justify-center hover:bg-accentDark transition-colors duration-200"
        aria-label="Chat with us"
      >
        {open ? (
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <>
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {/* unread dot */}
            <span className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
          </>
        )}
      </button>

      {/* ── CHAT WINDOW ── */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 flex flex-col bg-white border border-border shadow-xl"
          style={{ width: 340, maxHeight: 520, borderRadius: 0 }}
        >
          {/* HEADER */}
          <div className="flex items-center gap-3 px-4 py-3 bg-accent flex-shrink-0">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm">🏗️</div>
            <div>
              <div className="text-white text-sm font-bold">AI Assistant</div>
              <div className="text-white/70 text-xs">ACE Construct</div>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              <span className="text-white/70 text-xs">Online</span>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3" style={{ minHeight: 0 }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.from === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-1">
                    🏗️
                  </div>
                )}
                <div className={`px-3 py-2 text-sm max-w-[78%] leading-relaxed ${
                  m.from === 'bot'
                    ? 'bg-gray-50 text-gray-800 border border-gray-100 rounded-lg rounded-tl-none'
                    : 'bg-accent text-white rounded-lg rounded-tr-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}

            {/* TYPING DOTS */}
            {loading && (
              <div className="flex justify-start items-end gap-2">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-xs flex-shrink-0">
                  🏗️
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg rounded-tl-none px-4 py-3 flex items-center gap-1.5">
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.18}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* QUICK REPLY SUGGESTIONS */}
            {!loading && suggestions.length > 0 && step === 'chat' && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => send(s)}
                    className="text-xs px-3 py-1.5 border border-accent text-accent hover:bg-accent hover:text-white transition-colors duration-150 rounded-full"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <div className="flex border-t border-gray-100 flex-shrink-0">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={loading ? 'Thinking…' : 'Type a message…'}
              disabled={loading}
              className="flex-1 bg-transparent text-gray-800 text-sm px-4 py-3 outline-none placeholder-gray-400 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-accent text-white px-4 text-xs font-bold uppercase tracking-wider disabled:opacity-40 hover:bg-accentDark transition-colors flex-shrink-0"
            >
              {loading ? (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="30 70"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;