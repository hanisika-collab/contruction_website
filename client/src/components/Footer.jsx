import React, { useState } from 'react';
import axios from 'axios';

const CITIES = ['Bangalore', 'Chennai', 'Hyderabad', 'Coimbatore'];

/* ── SVG ICONS ─────────────────────────────────────────────── */
const Instagram = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const Youtube = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
  </svg>
);

const Mail = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const Phone = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.4 11.5 19.79 19.79 0 01.36 2.87 2 2 0 012.34.87h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.5A16 16 0 0015.5 17.09l.72-.72a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

const MapPin = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const SocialBtn = ({ href, icon: Icon, label }) => {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 44, height: 44,
        border: `1px solid ${hov ? '#00adee' : 'rgba(255,255,255,0.12)'}`,
        color: hov ? '#00adee' : 'rgba(255,255,255,0.5)',
        background: hov ? 'rgba(0,173,238,0.08)' : 'transparent',
        transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
        textDecoration: 'none',
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      <Icon />
    </a>
  );
};

const InfoRow = ({ icon: Icon, children }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
    <span style={{ color: '#00adee', flexShrink: 0, marginTop: 2 }}><Icon /></span>
    <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
      {children}
    </div>
  </div>
);

const Footer = () => {
  const [form, setForm]     = useState({ name: '', email: '', phone: '', city: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange  = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

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

  const inp = (extra = {}) => ({
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.12)',
    outline: 'none',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 300,
    fontSize: 13,
    color: '#fff',
    padding: '12px 0',
    transition: 'border-color 0.25s',
    ...extra,
  });

  const lbl = {
    display: 'block',
    fontFamily: "'Poppins', sans-serif",
    fontSize: 9,
    fontWeight: 600,
    letterSpacing: '0.4em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.28)',
    marginBottom: 3,
  };

  const focusInp = e => e.target.style.borderBottomColor = '#00adee';
  const blurInp  = e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.12)';

  return (
    <footer id="contact" style={{ background: '#080c10', color: '#fff', position: 'relative' }}>

      {/* TOP ACCENT LINE */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #00adee, transparent)' }} />

      {/* MAIN SECTION */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '100px 64px 80px' }}>
        <div className="footer-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80 }}>

          {/* LEFT */}
          <div>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden', background: '#00adee', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src="/logo.png" alt="MakeBuilders" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span style="color:#fff;font-weight:800;font-size:18px;font-family:Poppins,sans-serif">MB</span>'; }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: '0.02em', lineHeight: 1 }}>
                  Make<span style={{ color: '#00adee' }}>Builders</span>
                </div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
                  Premium Construction
                </div>
              </div>
            </div>

            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: 13, lineHeight: 1.85, color: 'rgba(255,255,255,0.4)', maxWidth: 320, marginBottom: 48 }}>
              Crafting luxury residences and commercial spaces across South India with precision, passion, and an uncompromising eye for detail.
            </p>

            {/* CTA LABEL */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <span style={{ width: 28, height: 1, background: '#00adee', display: 'inline-block' }} />
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#00adee' }}>
                Start Your Project
              </span>
            </div>

            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: 'clamp(34px, 4vw, 52px)', lineHeight: 1.1, margin: '0 0 48px', color: '#fff' }}>
              Ready to <span style={{ color: '#00adee', fontWeight: 700 }}>Build?</span>
            </h2>

            {/* CONTACT INFO */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 44 }}>
              <InfoRow icon={Phone}>
                <a href="tel:+91956679350" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>+91 95667 9350</a>
              </InfoRow>
              <InfoRow icon={Mail}>
                <a href="mailto:makelabsmail@gmail.com" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>makelabsmail@gmail.com</a>
              </InfoRow>
              <InfoRow icon={MapPin}>
                No. 14, 3rd Cross, Indiranagar<br />Bengaluru — 560 038
              </InfoRow>
            </div>

            {/* SOCIALS */}
            <div style={{ display: 'flex', gap: 10 }}>
              <SocialBtn href="https://www.instagram.com/make_builders?igsh=MTFwcGg1YjMzdjFqdw==" icon={Instagram} label="Instagram" />
              <SocialBtn href="https://www.youtube.com/@Makebuilders" icon={Youtube} label="YouTube" />
              <SocialBtn href="mailto:makelabsmail@gmail.com" icon={Mail} label="Email" />
              <SocialBtn href="tel:+91956679350" icon={Phone} label="Phone" />
            </div>
          </div>

          {/* RIGHT — FORM */}
          {status === 'success' ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.02)',
              padding: 64, textAlign: 'center', gap: 18,
            }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(0,173,238,0.12)', border: '1px solid rgba(0,173,238,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, color: '#00adee' }}>✓</div>
              <h3 style={{ fontFamily: "'Poppins'", fontWeight: 600, fontSize: 22, color: '#fff', margin: 0 }}>Enquiry Received</h3>
              <p style={{ fontFamily: "'Poppins'", fontWeight: 300, fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>We'll be in touch with you shortly.</p>
              <button onClick={() => setStatus('idle')}
                style={{ marginTop: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'none', color: 'rgba(255,255,255,0.4)', fontFamily: "'Poppins'", fontSize: 10, fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', padding: '10px 24px', cursor: 'pointer' }}>
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

              <div>
                <label style={lbl}>Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name"
                  style={inp()} onFocus={focusInp} onBlur={blurInp} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
                <div>
                  <label style={lbl}>Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required
                    style={inp()} onFocus={focusInp} onBlur={blurInp} />
                </div>
                <div>
                  <label style={lbl}>Phone *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required
                    style={inp()} onFocus={focusInp} onBlur={blurInp} />
                </div>
              </div>

              <div>
                <label style={lbl}>City</label>
                <select name="city" value={form.city} onChange={handleChange}
                  style={inp({ cursor: 'pointer', appearance: 'none' })}
                  onFocus={focusInp} onBlur={blurInp}>
                  <option value="" style={{ background: '#080c10' }}>Select city</option>
                  {CITIES.map(c => <option key={c} value={c} style={{ background: '#080c10' }}>{c}</option>)}
                </select>
              </div>

              <div>
                <label style={lbl}>Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                  style={inp({ resize: 'none' })} onFocus={focusInp} onBlur={blurInp} />
              </div>

              {status === 'error' && (
                <p style={{ fontFamily: "'Poppins'", fontSize: 12, color: '#f87171', margin: 0 }}>
                  Something went wrong. Please try again.
                </p>
              )}

              <button type="submit" disabled={status === 'loading'}
                style={{
                  background: '#00adee',
                  color: '#fff',
                  border: 'none',
                  padding: '17px',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' ? 0.6 : 1,
                  transition: 'all 0.25s',
                  marginTop: 4,
                }}
                onMouseEnter={e => { if (status !== 'loading') { e.currentTarget.style.background = '#0090c8'; } }}
                onMouseLeave={e => { e.currentTarget.style.background = '#00adee'; }}>
                {status === 'loading' ? 'Sending…' : 'Submit Enquiry →'}
              </button>

            </form>
          )}
        </div>
      </div>

      {/* DIVIDER */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', maxWidth: 1400, margin: '0 auto', padding: '0 64px' }} />

      {/* BOTTOM BAR */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '26px 64px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: '0.04em' }}>
          Make<span style={{ color: '#00adee' }}>Builders</span>
        </span>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: 11, color: 'rgba(255,255,255,0.25)', margin: 0 }}>
          © {new Date().getFullYear()} MakeBuilders. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: 28 }}>
          {['Privacy Policy', 'Terms'].map(t => (
            <button key={t}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Poppins'", fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.25)', padding: 0, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#00adee'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.25)'}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .footer-main-grid { grid-template-columns: 1fr 1.2fr; }
        @media (max-width: 900px) {
          .footer-main-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          footer > div { padding: 72px 24px 60px !important; }
          footer > div:last-child { padding: 20px 24px !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;