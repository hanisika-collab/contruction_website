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

  return (
    <div className="min-h-screen bg-primary">

      {/* HERO */}
      <div className="relative px-6 md:px-12 pt-32 pb-20 bg-surface border-b border-white/10">

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_65%_50%,rgba(197,160,89,0.08)_0%,transparent_70%)]" />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Breadcrumb */}
          <nav className="flex gap-3 text-xs uppercase tracking-widest mb-10">
            <Link to="/" className="text-white/40 hover:text-accent">Home</Link>
            <span className="text-white/20">›</span>
            <span className="text-accent">Contact</span>
          </nav>

          <p className="text-xs uppercase tracking-[0.4em] text-accent mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-accent" />
            Get in Touch
          </p>

          <h1 className="text-white font-display text-[clamp(52px,8vw,110px)]">
            Let’s <span className="text-accent">Build</span> Together
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 grid md:grid-cols-5 gap-16">

        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-10 text-white/50 text-sm">

          <div>
            <p className="uppercase text-xs tracking-widest text-white/30 mb-2">Visit</p>
            <p>No.14, Indiranagar, Bengaluru</p>
          </div>

          <div>
            <p className="uppercase text-xs tracking-widest text-white/30 mb-2">Call</p>
            <p>+91 88000 00000</p>
          </div>

          <div>
            <p className="uppercase text-xs tracking-widest text-white/30 mb-2">Email</p>
            <p>hello@aceconstruct.in</p>
          </div>

        </div>

        {/* FORM */}
        <div className="md:col-span-3">

          {status === 'success' ? (
            <div className="border border-accent/30 bg-accent/5 p-10 text-center">
              <h3 className="text-white text-2xl mb-3">Enquiry Received</h3>
              <p className="text-white/40 text-sm">We’ll contact you soon.</p>
              <button onClick={() => setStatus('idle')} className="mt-6 border border-white/10 px-6 py-2 text-white/50 hover:text-accent">
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* NAME */}
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full border-b border-white/10 bg-transparent py-3 text-white placeholder-white/30 focus:border-accent outline-none"
              />

              {/* EMAIL + PHONE */}
              <div className="grid sm:grid-cols-2 gap-6">
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="border-b border-white/10 bg-transparent py-3 text-white placeholder-white/30 focus:border-accent outline-none"
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  required
                  className="border-b border-white/10 bg-transparent py-3 text-white placeholder-white/30 focus:border-accent outline-none"
                />
              </div>

              {/* CITY */}
              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full border-b border-white/10 bg-transparent py-3 text-white focus:border-accent outline-none"
              >
                <option value="">Select City</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              {/* PACKAGE */}
              <div className="flex flex-wrap gap-2">
                {PACKAGES.map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPkg(p)}
                    className={`px-4 py-2 text-xs uppercase tracking-widest border transition ${
                      pkg === p
                        ? 'bg-accent text-black border-accent'
                        : 'border-white/10 text-white/40'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* MESSAGE */}
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Project details..."
                className="w-full border-b border-white/10 bg-transparent py-3 text-white placeholder-white/30 focus:border-accent outline-none"
              />

              {/* ERROR */}
              {status === 'error' && (
                <p className="text-red-400 text-sm">Something went wrong.</p>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-accent text-black px-10 py-3 uppercase text-sm tracking-widest hover:opacity-90"
              >
                {status === 'loading' ? 'Sending...' : 'Submit →'}
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};

export default Contact;