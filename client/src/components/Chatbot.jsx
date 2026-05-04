import React, { useState } from 'react';

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi 👋 Welcome to ACE Construct! Can I know your name?' }
  ]);

  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  // Lead capture state
  const [step, setStep] = useState('name');
  const [lead, setLead] = useState({
    name: '',
    phone: '',
  });

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;

    const userMsg = { from: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    let botReply = '';

    // 🔥 STEP FLOW (LEAD CAPTURE)
    if (step === 'name') {
      setLead(prev => ({ ...prev, name: userText }));
      botReply = 'Nice to meet you 😊 Please enter your phone number:';
      setStep('phone');

      setMessages(prev => [...prev, { from: 'bot', text: botReply }]);
      return;
    }

    if (step === 'phone') {
      setLead(prev => ({ ...prev, phone: userText }));
      botReply = 'Thanks 👍 Now ask me anything about construction.';
      setStep('chat');

      setMessages(prev => [...prev, { from: 'bot', text: botReply }]);
      return;
    }

    // 🔥 GPT MODE
    setTyping(true);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          name: lead.name,
          phone: lead.phone,
        }),
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        { from: 'bot', text: data.reply }
      ]);

    } catch (err) {
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: "Server error. Please try again." }
      ]);
    }

    setTyping(false);
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-[#D6A84F] text-black px-4 py-3 rounded-full shadow-lg z-50"
      >
        💬
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-[#111820] border border-white/10 shadow-xl z-50 flex flex-col">

          {/* HEADER */}
          <div className="bg-[#D6A84F] text-black px-4 py-3 font-bold">
            AI Assistant
          </div>

          {/* MESSAGES */}
          <div className="flex-1 p-3 overflow-y-auto max-h-80 text-sm space-y-2">

            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded max-w-[80%] ${
                  m.from === 'bot'
                    ? 'bg-white/10 text-white'
                    : 'bg-[#D6A84F] text-black ml-auto'
                }`}
              >
                {m.text}
              </div>
            ))}

            {/* 🔥 TYPING INDICATOR */}
            {typing && (
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <span>Assistant is typing</span>

                <div className="flex gap-1">
                  <span className="w-1 h-1 bg-white rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-white rounded-full animate-bounce delay-150"></span>
                  <span className="w-1 h-1 bg-white rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            )}

          </div>

          {/* INPUT */}
          <div className="flex border-t border-white/10">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-white p-2 outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={typing}
              className="bg-[#D6A84F] px-4 text-black disabled:opacity-50"
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