import React, { useState } from 'react';
import axios from 'axios';

const CITIES = ['Bangalore', 'Chennai', 'Hyderabad', 'Coimbatore'];

const Footer = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post('http://localhost:5000/api/inquiry', form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', city: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputClass = `
    w-full bg-transparent border-b border-white/10 focus:border-accent outline-none
    font-body text-sm text-white placeholder-white/30 py-3 transition-colors
  `;

  const labelClass = `font-ui text-[10px] tracking-[0.3em] uppercase text-white/30 mb-1`;

  return (
    <footer id="contact" className="bg-[#111] border-t border-white/10">

      {/* CONTACT SECTION */}
      <div className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">

          {/* LEFT */}
          <div>
            <p className="font-ui text-xs tracking-[0.4em] uppercase text-accent mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-accent" />
              Start Your Project
            </p>

            <h2 className="font-display text-5xl md:text-6xl text-white mb-6 leading-none">
              Ready to <br />
              <span className="text-accent font-semibold">Build?</span>
            </h2>

            <p className="font-body text-white/40 text-sm leading-relaxed max-w-xs mb-10">
              Every great space begins with a conversation. Share your vision — we’ll build it.
            </p>

            {/* CONTACT INFO */}
            <div className="space-y-5">
              <div>
                <span className={labelClass}>Address</span>
                <p className="text-white/60 text-sm whitespace-pre-line">
                  No. 14, 3rd Cross, Indiranagar{"\n"}
                  Bengaluru — 560038
                </p>
              </div>

              <div>
                <span className={labelClass}>Phone</span>
                <a href="tel:+918800000000" className="text-white/60 text-sm hover:text-accent">
                  +91 88000 00000
                </a>
              </div>

              <div>
                <span className={labelClass}>Email</span>
                <a href="mailto:hello@aceconstruct.in" className="text-white/60 text-sm hover:text-accent">
                  hello@aceconstruct.in
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            <div>
              <label className={labelClass}>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className={inputClass}/>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Email *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required className={inputClass}/>
              </div>
              <div>
                <label className={labelClass}>Phone *</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className={inputClass}/>
              </div>
            </div>

            <div>
              <label className={labelClass}>City</label>
              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                className={inputClass + " cursor-pointer"}
              >
                <option value="" className="bg-[#141414]">Select your city</option>
                {CITIES.map(c => (
                  <option key={c} value={c} className="bg-[#141414]">{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={3}
                className={inputClass + " resize-none"}
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={status !== 'idle'}
              className={`
                font-ui text-xs tracking-widest uppercase py-4 transition-all
                ${status === 'success'
                  ? 'bg-transparent border border-accent text-accent'
                  : 'bg-accent text-black hover:opacity-90'}
                ${status === 'loading' ? 'opacity-60 cursor-not-allowed' : ''}
              `}
            >
              {status === 'loading' ? 'Sending...'
                : status === 'success' ? '✓ Enquiry Received'
                : 'Submit Enquiry'}
            </button>

            {status === 'error' && (
              <p className="text-red-400 text-sm text-center">
                Something went wrong. Try again.
              </p>
            )}
          </form>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10">
        <h3 className="font-ui text-lg font-bold text-white tracking-wide">
          ACE<span className="text-accent">CONSTRUCT</span>
        </h3>

        <p className="text-white/30 text-xs">
          © {new Date().getFullYear()} AceConstruct
        </p>

        <div className="flex gap-6 text-xs text-white/30">
          <a href="#" className="hover:text-accent">Privacy Policy</a>
          <a href="#" className="hover:text-accent">Terms</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;