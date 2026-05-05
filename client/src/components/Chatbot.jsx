import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi 👋 Welcome to ACE Construct! May I know your name?' }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState('name');
  const [lead, setLead] = useState({ name: '', phone: '' });
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages(prev => [...prev, { from: 'user', text: userText }]);
    setInput('');

    if (step === 'name') {
      setLead(prev => ({ ...prev, name: userText }));
      setTimeout(() => setMessages(prev => [...prev, { from: 'bot', text: `Nice to meet you, ${userText}! 😊 Could you share your phone number?` }]), 400);
      setStep('phone');
      return;
    }

    if (step === 'phone') {
      setLead(prev => ({ ...prev, phone: userText }));
      setTimeout(() => setMessages(prev => [...prev, { from: 'bot', text: 'Thanks! 👍 Ask me anything about construction, materials, timelines, or our packages.' }]), 400);
      setStep('chat');
      return;
    }

    setTyping(true);
    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, name: lead.name, phone: lead.phone }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { from: 'bot', text: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { from: 'bot', text: 'Server error. Please try again.' }]);
    }
    setTyping(false);
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent text-white rounded-full shadow-lg shadow-accent/30 flex items-center justify-center hover:bg-accentDark transition-colors duration-200"
        aria-label="Chat with us"
      >
        {open ? (
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 flex flex-col bg-white border border-border shadow-xl"
          style={{ width: 340, maxHeight: 500, borderRadius: 0 }}
        >
          {/* HEADER */}
          <div className="flex items-center gap-3 px-4 py-3 bg-accent">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm">🏗️</div>
            <div>
              <div className="text-white text-sm font-ui font-700">AI Assistant</div>
              <div className="text-white/70 text-xs">ACE Construct</div>
            </div>
            <div className="ml-auto w-2 h-2 bg-green-300 rounded-full" />
          </div>

          {/* MESSAGES */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3" style={{ maxHeight: 320 }}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-3 py-2 text-sm max-w-[80%] leading-relaxed ${
                    m.from === 'bot'
                      ? 'bg-surface text-text border border-border'
                      : 'bg-accent text-white'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-surface border border-border px-3 py-2 flex items-center gap-1.5">
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <div className="flex border-t border-border">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-text text-sm px-3 py-3 outline-none placeholder-muted"
            />
            <button
              onClick={sendMessage}
              disabled={typing}
              className="bg-accent text-white px-4 text-xs font-ui font-700 uppercase tracking-wider disabled:opacity-50 hover:bg-accentDark transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;