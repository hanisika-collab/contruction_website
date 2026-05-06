import React, { useState, useRef, useEffect } from 'react';

const INITIAL_SUGGESTIONS = [
  'Tell me about your works',
  'What are your pricing packages?',
  'Which cities do you serve?',
  'How long does construction take?',
];

const Chatbot = () => {
  const [open,        setOpen]        = useState(false);
  const [step,        setStep]        = useState('name');
  const [lead,        setLead]        = useState({ name: '', phone: '' });
  const [input,       setInput]       = useState('');
  const [loading,     setLoading]     = useState(false);
  const [suggestions, setSuggestions] = useState(INITIAL_SUGGESTIONS);
  const [messages,    setMessages]    = useState([
    { from: 'bot', text: 'Hi! 👋 Welcome to MakeBuilders! May I know your name?' },
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

  const send = async (text) => {
    if (!text.trim() || loading) return;
    setInput('');
    setSuggestions([]);
    setMessages(p => [...p, { from: 'user', text }]);

    if (step === 'name') {
      setLead(p => ({ ...p, name: text }));
      addBotMsg(`Nice to meet you, ${text}! 😊 Could you share your phone number so we can follow up?`);
      setStep('phone');
      return;
    }

    if (step === 'phone') {
      setLead(prev => { saveLead(prev.name, text); return { ...prev, phone: text }; });
      addBotMsg('Thanks! 🙏 What would you like to know about MakeBuilders?');
      setStep('chat');
      setTimeout(() => setSuggestions(INITIAL_SUGGESTIONS), 400);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, name: lead.name, phone: lead.phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'HTTP ' + res.status);
      const reply = data.reply || data.message || '';
      if (!reply) throw new Error('Empty reply from backend');
      setMessages(p => [...p, { from: 'bot', text: reply }]);
      setSuggestions(Array.isArray(data.suggestions) ? data.suggestions : []);
    } catch {
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
      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed',
          bottom: 28, right: 28,
          zIndex: 50,
          width: 56, height: 56,
          background: '#00adee',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0,173,238,0.35)',
          transition: 'transform 0.2s, background 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#0090c8'}
        onMouseLeave={e => e.currentTarget.style.background = '#00adee'}
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
            <span style={{ position: 'absolute', top: 4, right: 4, width: 12, height: 12, background: '#4ade80', borderRadius: '50%', border: '2px solid #fff' }} />
          </>
        )}
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: 100, right: 28,
          zIndex: 50,
          width: 340,
          maxHeight: 520,
          display: 'flex',
          flexDirection: 'column',
          background: '#fff',
          border: '1px solid #e5e7eb',
          boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
        }}>
          {/* HEADER */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: '#00adee', flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img src="/logo.png" alt="MB" style={{ width: 32, height: 32, objectFit: 'contain' }} onError={e => { e.target.style.display = 'none'; e.target.parentNode.textContent = '🏗️'; }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Poppins'", fontWeight: 600, fontSize: 13, color: '#fff' }}>AI Assistant</div>
              <div style={{ fontFamily: "'Poppins'", fontWeight: 300, fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>MakeBuilders</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, background: '#4ade80', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
              <span style={{ fontFamily: "'Poppins'", fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>Online</span>
            </div>
          </div>

          {/* MESSAGES */}
          <div style={{ flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                {m.from === 'bot' && (
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(0,173,238,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, marginRight: 8, flexShrink: 0, marginTop: 4 }}>
                    🏗️
                  </div>
                )}
                <div style={{
                  padding: '10px 13px',
                  fontSize: 13,
                  fontFamily: "'Poppins'",
                  fontWeight: 300,
                  maxWidth: '78%',
                  lineHeight: 1.6,
                  borderRadius: m.from === 'bot' ? '0 12px 12px 12px' : '12px 0 12px 12px',
                  background: m.from === 'bot' ? '#f9fafb' : '#00adee',
                  color: m.from === 'bot' ? '#374151' : '#fff',
                  border: m.from === 'bot' ? '1px solid #f3f4f6' : 'none',
                }}>
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(0,173,238,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>🏗️</div>
                <div style={{ background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '0 12px 12px 12px', padding: '12px 16px', display: 'flex', gap: 5 }}>
                  {[0,1,2].map(i => (
                    <span key={i} style={{ width: 6, height: 6, background: '#00adee', borderRadius: '50%', animation: `bounce 1.2s ${i*0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}

            {!loading && suggestions.length > 0 && step === 'chat' && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 4 }}>
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => send(s)}
                    style={{
                      fontFamily: "'Poppins'", fontSize: 11, fontWeight: 400,
                      padding: '6px 12px',
                      border: '1px solid #00adee',
                      color: '#00adee',
                      background: 'transparent',
                      borderRadius: 20,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#00adee'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#00adee'; }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <div style={{ display: 'flex', borderTop: '1px solid #f3f4f6', flexShrink: 0 }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={loading ? 'Thinking…' : 'Type a message…'}
              disabled={loading}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: "'Poppins'",
                fontWeight: 300,
                fontSize: 13,
                color: '#374151',
                padding: '13px 16px',
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              style={{
                background: '#00adee',
                border: 'none',
                padding: '0 16px',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: loading || !input.trim() ? 0.4 : 1,
                transition: 'opacity 0.2s',
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce { 0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)} }
        @keyframes pulse  { 0%,100%{opacity:1}50%{opacity:0.5} }
      `}</style>
    </>
  );
};

export default Chatbot;