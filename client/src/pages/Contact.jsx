import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CITIES = ['Bangalore', 'Chennai', 'Hyderabad', 'Coimbatore'];
const PACKAGES = ['Classic', 'Royale', 'Elite', 'Not sure yet'];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', message: '' });
  const [pkg, setPkg] = useState('');
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post('http://localhost:5000/api/inquiry', {
        ...form,
        message: pkg ? `[Package: ${pkg}] ${form.message}` : form.message,
      });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', city: '', message: '' });
      setPkg('');
    } catch {
      setStatus('error');
    }
  };

  const inputBase = `
    w-full border-b border-border bg-transparent py-3 text-text placeholder-muted
    focus:border-accent outline-none text-sm transition-colors duration-200
  `;

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <div className="relative px-6 md:px-12 pt-32 pb-20 bg-surface border-b border-border overflow-hidden">

        <div
          className="absolute pointer-events-none"
          style={{
            top: '-20%', right: '-5%',
            width: '50vw', height: '50vw',
            background: 'radial-gradient(circle, rgba(0,173,238,0.07) 0%, transparent 65%)',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* BREADCRUMB */}
          <nav className="flex gap-2 text-xs uppercase tracking-widest mb-10 font-ui">
            <Link to="/" className="text-muted hover:text-accent transition-colors">Home</Link>
            <span className="text-border">›</span>
            <span className="text-accent font-700">Contact</span>
          </nav>

          <p className="text-xs uppercase tracking-[0.4em] text-accent mb-4 flex items-center gap-3 font-ui">
            <span className="w-8 h-px bg-accent" />
            Get in Touch
          </p>

          <h1 className="text-text font-display" style={{ fontSize: 'clamp(52px, 8vw, 110px)' }}>
            Let's <span className="text-accent italic">Build</span> Together
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 grid md:grid-cols-5 gap-16">

        {/* LEFT INFO */}
        <div className="md:col-span-2 space-y-10">

          {[
            { label: 'Visit', value: 'No.14, 3rd Cross\nIndiranagar, Bengaluru' },
            { label: 'Call',  value: '+91 88000 00000', href: 'tel:+918800000000' },
            { label: 'Email', value: 'hello@aceconstruct.in', href: 'mailto:hello@aceconstruct.in' },
          ].map(item => (
            <div key={item.label}>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted font-ui mb-2">{item.label}</p>
              {item.href ? (
                <a href={item.href} className="text-text text-sm hover:text-accent transition-colors leading-relaxed whitespace-pre-line">
                  {item.value}
                </a>
              ) : (
                <p className="text-text text-sm leading-relaxed whitespace-pre-line">{item.value}</p>
              )}
            </div>
          ))}

          {/* DECORATIVE */}
          <div className="pt-4">
            <div className="w-12 h-1 bg-accent mb-4" />
            <p className="text-muted text-xs leading-relaxed max-w-[220px]">
              We typically respond within 24 hours on business days.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="md:col-span-3">

          {status === 'success' ? (
            <div className="border border-border bg-surface p-12 text-center flex flex-col items-center gap-5">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="text-accent text-2xl">✓</span>
              </div>
              <h3 className="font-display text-text text-2xl">Enquiry Received</h3>
              <p className="text-muted text-sm">We'll contact you soon.</p>
              <button
                onClick={() => setStatus('idle')}
                className="border border-border px-6 py-2 text-muted text-xs uppercase tracking-widest font-ui hover:border-accent hover:text-accent transition-colors"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">

              <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name *" required className={inputBase} />

              <div className="grid sm:grid-cols-2 gap-6">
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email *" required className={inputBase} />
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone *" required className={inputBase} />
              </div>

              <select name="city" value={form.city} onChange={handleChange} className={inputBase + ' cursor-pointer'}>
                <option value="">Select City</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              {/* PACKAGE SELECTOR */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted font-ui mb-3">
                  Interested Package
                </p>
                <div className="flex flex-wrap gap-2">
                  {PACKAGES.map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPkg(p === pkg ? '' : p)}
                      className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all duration-200 font-ui font-600 ${
                        pkg === p
                          ? 'bg-accent text-white border-accent'
                          : 'border-border text-muted hover:border-accent hover:text-accent'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Project details..."
                className={inputBase + ' resize-none'}
              />

              {status === 'error' && (
                <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-accent text-white px-10 py-4 uppercase text-xs tracking-widest font-ui font-700 hover:bg-accentDark transition-colors disabled:opacity-60"
              >
                {status === 'loading' ? 'Sending...' : 'Submit Enquiry →'}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;