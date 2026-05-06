import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=85&auto=format&fit=crop',
    eyebrow: 'Premium Construction',
    heading: 'Where Vision\nBecomes Structure',
    sub: 'Crafting luxury residences and commercial spaces with precision and passion.',
    cta:    { label: 'Explore Our Work', to: '/portfolio' },
    ctaAlt: { label: 'Get a Quote',      to: '/contact'   },
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1920&q=85&auto=format&fit=crop',
    eyebrow: 'Interior Excellence',
    heading: 'Spaces That\nInspire Living',
    sub: 'From concept to completion — interiors crafted for how you live.',
    cta:    { label: 'View Interiors', to: '/interiors' },
    ctaAlt: { label: 'Our Packages',   to: '/packages'  },
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=85&auto=format&fit=crop',
    eyebrow: 'Luxury Architecture',
    heading: 'Built to Last,\nDesigned to Impress',
    sub: 'Award-worthy builds across Bangalore, Chennai, Hyderabad & Coimbatore.',
    cta:    { label: 'Our Projects', to: '/portfolio' },
    ctaAlt: { label: 'Contact Us',   to: '/contact'   },
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1920&q=85&auto=format&fit=crop',
    eyebrow: 'Commercial Spaces',
    heading: 'Offices That\nElevate Your Brand',
    sub: "Commercial construction that reflects your company's vision and values.",
    cta:    { label: 'Commercial Work', to: '/commercial' },
    ctaAlt: { label: 'Start a Project', to: '/contact'    },
  },
];

const STATS = [
  { num: '240+', label: 'Projects Delivered' },
  { num: '34',   label: 'Years of Craft'     },
  { num: '98%',  label: 'Client Satisfaction'},
];

const AUTO_INTERVAL = 6000;

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [prev,    setPrev]    = useState(null);
  const [animDir, setAnimDir] = useState('next');
  const [sliding, setSliding] = useState(false);
  const [textIn,  setTextIn]  = useState(true);
  const [navIn,   setNavIn]   = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    SLIDES.forEach(s => { const img = new Image(); img.src = s.image; });
    setTimeout(() => setNavIn(true), 400);
  }, []);

  const goTo = useCallback((idx, dir = 'next') => {
    if (sliding) return;
    setAnimDir(dir);
    setTextIn(false);
    setTimeout(() => { setSliding(true); setPrev(current); setCurrent(idx); }, 220);
    setTimeout(() => { setSliding(false); setPrev(null); setTextIn(true); }, 950);
  }, [sliding, current]);

  const next  = useCallback(() => goTo((current + 1) % SLIDES.length, 'next'), [goTo, current]);
  const prev_ = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length, 'prev'), [goTo, current]);

  useEffect(() => {
    timerRef.current = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, AUTO_INTERVAL);
  };

  const slide = SLIDES[current];

  return (
    <section style={{
      position: 'relative',
      height: '100vh',
      minHeight: 640,
      overflow: 'hidden',
      background: '#080a0d', // Deep ink black instead of tech blue-black
    }}>

      {/* ── SLIDE IMAGES ── */}
      {SLIDES.map((s, i) => {
        const isCurrent = i === current;
        const isPrev    = i === prev;
        if (!isCurrent && !isPrev) return null;
        return (
          <div key={s.id} style={{
            position: 'absolute', inset: 0,
            zIndex: isCurrent ? 2 : 1,
            transform: sliding
              ? isCurrent ? 'translateX(0%)' : `translateX(${animDir === 'next' ? '-2%' : '2%'})`
              : 'translateX(0%)',
            transition: sliding ? 'transform 1.2s cubic-bezier(0.2, 0, 0.2, 1)' : 'none',
          }}>
            <img src={s.image} alt={s.heading} style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              transform: isCurrent && !sliding ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 10s linear',
              display: 'block',
              /* Desaturated and slightly lowered brightness for premium architectural look */
              filter: 'saturate(0.7) brightness(0.85)',
            }} />
          </div>
        );
      })}

      {/* ── OVERLAYS — Deep cinematic layering ── */}
      {/* Bottom gradient - Deep ink to transparent */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        background: 'linear-gradient(to top, rgba(8,10,13,0.85) 0%, rgba(8,10,13,0.3) 50%, transparent 100%)',
      }} />
      {/* Soft left vignette - Improves legibility without harsh edges */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        background: 'linear-gradient(90deg, rgba(8,10,13,0.4) 0%, transparent 60%)',
      }} />

      {/* ── CONTENT ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', // Centered vertically feels more "studio"
        padding: '0 8%',
        maxWidth: 1600, margin: '0 auto', left: 0, right: 0,
      }}>

        {/* EYEBROW */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32,
          opacity: textIn ? 1 : 0,
          transform: textIn ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.05s',
        }}>
          <span style={{ width: 32, height: 1, background: 'rgba(0,173,238,0.5)', display: 'inline-block' }} />
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 10, fontWeight: 300,
            letterSpacing: '0.6em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)',
          }}>
            {slide.eyebrow}
          </span>
        </div>

        {/* HEADING — Ultralight weight for sophistication */}
        <h1 style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 100, // Thinner for architectural look
          fontSize: 'clamp(48px, 7vw, 110px)',
          lineHeight: 1.05,
          color: '#ffffff',
          margin: '0 0 32px',
          whiteSpace: 'pre-line',
          opacity: textIn ? 1 : 0,
          transform: textIn ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.1s',
          letterSpacing: '-0.02em',
          maxWidth: 900,
        }}>
          {slide.heading.split('\n')[0]}<br />
          <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.95)' }}>
            {slide.heading.split('\n')[1]}
          </span>
        </h1>

        {/* SUBTITLE */}
        <p style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 300, fontSize: 15, lineHeight: 1.8,
          color: 'rgba(255,255,255,0.5)', // Lower contrast for elegance
          maxWidth: 440, margin: '0 0 52px',
          opacity: textIn ? 1 : 0,
          transform: textIn ? 'translateY(0)' : 'translateY(15px)',
          transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.2s',
        }}>
          {slide.sub}
        </p>

        {/* CTA BUTTONS */}
        <div style={{
          display: 'flex', gap: 20, flexWrap: 'wrap',
          opacity: textIn ? 1 : 0,
          transform: textIn ? 'translateY(0)' : 'translateY(15px)',
          transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.3s',
        }}>
          <CTABtn to={slide.cta.to} primary>{slide.cta.label}</CTABtn>
          <CTABtn to={slide.ctaAlt.to} primary={false}>{slide.ctaAlt.label}</CTABtn>
        </div>

        {/* STATS */}
        <div style={{
          display: 'flex', gap: 64, marginTop: 72, paddingTop: 40,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          opacity: textIn ? 0.8 : 0,
          transition: 'opacity 1.2s ease 0.4s',
        }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 200,
                fontSize: 'clamp(24px, 2.5vw, 36px)',
                color: 'rgba(0,173,238,0.9)',
                lineHeight: 1,
              }}>
                {s.num}
              </div>
              <div style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300, fontSize: 9,
                letterSpacing: '0.4em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
                marginTop: 10,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ARROWS - Reduced size and opacity for minimalism */}
      <ArrowBtn dir="left"  onClick={() => { prev_(); resetTimer(); }} />
      <ArrowBtn dir="right" onClick={() => { next(); resetTimer(); }} />

      {/* COUNTER */}
      <div style={{
        position: 'absolute', top: 60, right: '8%', zIndex: 20,
        opacity: navIn ? 0.6 : 0, transition: 'opacity 1s ease 0.5s',
      }}>
        <span style={{ fontFamily: "'Poppins'", fontWeight: 200, fontSize: 32, color: '#fff', lineHeight: 1 }}>
          {String(current + 1).padStart(2, '0')}
        </span>
        <span style={{ fontFamily: "'Poppins'", fontWeight: 200, fontSize: 14, color: 'rgba(255,255,255,0.2)', marginLeft: 8 }}>
          / {String(SLIDES.length).padStart(2, '0')}
        </span>
      </div>

      {/* DOTS */}
      <div style={{
        position: 'absolute', bottom: 60, right: '8%', zIndex: 20,
        display: 'flex', gap: 12, alignItems: 'center',
      }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => { if (i !== current) { goTo(i, i > current ? 'next' : 'prev'); resetTimer(); } }}
            style={{
              width: i === current ? 40 : 6,
              height: 2,
              background: i === current ? '#00adee' : 'rgba(255,255,255,0.2)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)', outline: 'none',
            }}
          />
        ))}
      </div>

      {/* PROGRESS LINE */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
        zIndex: 20, background: 'rgba(255,255,255,0.03)',
      }}>
        <div key={current} style={{
          height: '100%',
          background: 'rgba(0,173,238,0.3)',
          animation: `heroProgress ${AUTO_INTERVAL}ms linear`,
        }} />
      </div>

      <style>{`
        @keyframes heroProgress { from { width: 0% } to { width: 100% } }
      `}</style>
    </section>
  );
};

/* ── CTA BUTTON — Minimalist and Premium ── */
const CTABtn = ({ to, children, primary }) => {
  const [hov, setHov] = useState(false);
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        cursor: 'pointer',
        fontFamily: "'Poppins', sans-serif",
        fontSize: 10, fontWeight: 500,
        letterSpacing: '0.3em', textTransform: 'uppercase',
        padding: '16px 40px',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        ...(primary ? {
          background: hov ? '#0090c8' : '#00adee',
          color: '#fff', border: 'none',
          boxShadow: hov ? '0 10px 30px rgba(0,173,238,0.15)' : 'none',
        } : {
          background: hov ? 'rgba(255,255,255,0.05)' : 'transparent',
          color: hov ? '#fff' : 'rgba(255,255,255,0.7)',
          border: `1px solid ${hov ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)'}`,
        }),
        transform: hov ? 'translateY(-2px)' : 'none',
      }}
    >
      {children}
    </button>
  );
};

/* ── ARROW BUTTON ── */
const ArrowBtn = ({ dir, onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'absolute', top: '50%',
        [dir === 'left' ? 'left' : 'right']: 40,
        transform: 'translateY(-50%)',
        zIndex: 20, width: 50, height: 50,
        border: 'none',
        background: hov ? 'rgba(255,255,255,0.05)' : 'transparent',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.3s ease',
        outline: 'none',
      }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke={hov ? '#00adee' : 'rgba(255,255,255,0.3)'}
        strokeWidth="1" strokeLinecap="square">
        {dir === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
};

export default Hero;