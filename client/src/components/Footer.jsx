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
    w-full bg-transparent border-b border-border focus:border-accent outline-none
    font-body text-sm text-text placeholder-muted py-3 transition-colors duration-200
  `;

  const labelClass = `block font-ui text-[10px] tracking-[0.3em] uppercase text-muted mb-1`;

  return (
    <footer id="contact" className="bg-white border-t border-border">

      {/* CONTACT SECTION */}
      <div className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">

          {/* LEFT */}
          <div>
            <p className="font-ui text-xs tracking-[0.4em] uppercase text-accent mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-accent" />
              Start Your Project
            </p>

            <h2 className="font-display text-text mb-6 leading-tight" style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}>
              Ready to <br />
              <span className="text-accent italic">Build?</span>
            </h2>

            <p className="font-body text-muted text-sm leading-relaxed max-w-xs mb-10">
              Every great space begins with a conversation. Share your vision — we'll build it.
            </p>

            {/* CONTACT INFO */}
            <div className="space-y-6">
              <div>
                <span className={labelClass}>Address</span>
                <p className="text-text text-sm leading-relaxed">
                  No. 14, 3rd Cross, Indiranagar<br />
                  Bengaluru — 560038
                </p>
              </div>
              <div>
                <span className={labelClass}>Phone</span>
                <a href="tel:+918800000000" className="text-text text-sm hover:text-accent transition-colors">
                  +91 88000 00000
                </a>
              </div>
              <div>
                <span className={labelClass}>Email</span>
                <a href="mailto:hello@aceconstruct.in" className="text-text text-sm hover:text-accent transition-colors">
                  hello@aceconstruct.in
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — FORM */}
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center border border-border bg-surface p-12 text-center gap-4">
              <div className="w-14 h-14 bg-accent/10 flex items-center justify-center rounded-full">
                <span className="text-accent text-2xl">✓</span>
              </div>
              <h3 className="font-display text-text text-2xl">Enquiry Received</h3>
              <p className="text-muted text-sm">We'll be in touch with you shortly.</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-2 border border-border px-6 py-2 text-xs uppercase tracking-widest font-ui text-muted hover:border-accent hover:text-accent transition-colors"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              <div>
                <label className={labelClass}>Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className={inputClass} />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Phone *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>City</label>
                <select name="city" value={form.city} onChange={handleChange} className={inputClass + ' cursor-pointer'}>
                  <option value="">Select your city</option>
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className={labelClass}>Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={3} className={inputClass + ' resize-none'} />
              </div>

              <button
                type="submit"
                disabled={status !== 'idle'}
                className={`
                  font-ui text-xs tracking-widest uppercase py-4 transition-all duration-200
                  ${status === 'success'
                    ? 'bg-transparent border border-accent text-accent'
                    : 'bg-accent text-white hover:bg-accentDark'}
                  ${status === 'loading' ? 'opacity-60 cursor-not-allowed' : ''}
                `}
              >
                {status === 'loading' ? 'Sending...'
                  : status === 'success' ? '✓ Enquiry Received'
                  : 'Submit Enquiry →'}
              </button>

              {status === 'error' && (
                <p className="text-red-500 text-sm text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-surface border-t border-border px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <h3 className="font-ui text-base font-800 text-text tracking-wide">
          ACE<span className="text-accent">CONSTRUCT</span>
        </h3>
        <p className="text-muted text-xs">
          © {new Date().getFullYear()} AceConstruct. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-muted font-ui">
          <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-accent transition-colors">Terms</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;