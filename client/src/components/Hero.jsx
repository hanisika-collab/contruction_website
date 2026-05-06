import React, { useState, useEffect, useCallback, useRef } from 'react';

/* ─── SLIDE DATA ─────────────────────────────────────────────────────────
   Using high-quality Unsplash architecture/construction images.
   Replace these with your own project images as needed.
──────────────────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=85&auto=format&fit=crop',
    eyebrow: 'Premium Construction',
    heading: 'Where Vision\nBecomes Structure',
    sub: 'Crafting luxury residences and commercial spaces with precision and passion.',
    cta: { label: 'Explore Our Work', href: '#projects' },
    ctaAlt: { label: 'Get a Quote', href: '#contact' },
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1920&q=85&auto=format&fit=crop',
    eyebrow: 'Interior Excellence',
    heading: 'Spaces That\nInspire Living',
    sub: 'From concept to completion — interiors crafted for how you live.',
    cta: { label: 'View Interiors', href: '#projects' },
    ctaAlt: { label: 'Our Packages', href: '#pricing' },
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=85&auto=format&fit=crop',
    eyebrow: 'Luxury Architecture',
    heading: 'Built to Last,\nDesigned to Impress',
    sub: 'Award-worthy builds across Bangalore, Chennai, Hyderabad & Coimbatore.',
    cta: { label: 'Our Projects', href: '#projects' },
    ctaAlt: { label: 'Contact Us', href: '#contact' },
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1920&q=85&auto=format&fit=crop',
    eyebrow: 'Commercial Spaces',
    heading: 'Offices That\nElevate Your Brand',
    sub: 'Commercial construction that reflects your company\'s vision and values.',
    cta: { label: 'Commercial Work', href: '#projects' },
    ctaAlt: { label: 'Start a Project', href: '#contact' },
  },
];

const STATS = [
  { num: '240+', label: 'Projects Delivered' },
  { num: '12',   label: 'Years of Craft'     },
  { num: '98%',  label: 'Client Satisfaction'},
];

const AUTO_INTERVAL = 5500;

const Hero = () => {
  const [current, setCurrent]       = useState(0);
  const [prev,    setPrev]          = useState(null);
  const [animDir, setAnimDir]       = useState('next'); // 'next' | 'prev'
  const [sliding, setSliding]       = useState(false);
  const [loaded,  setLoaded]        = useState({});
  const [textIn,  setTextIn]        = useState(true);
  const [navIn,   setNavIn]         = useState(false);
  const timerRef = useRef(null);

  /* ── preload images ── */
  useEffect(() => {
    SLIDES.forEach((s, i) => {
      const img = new Image();
      img.src = s.image;
      img.onload = () => setLoaded(p => ({ ...p, [i]: true }));
    });
    setTimeout(() => setNavIn(true), 300);
  }, []);

  const goTo = useCallback((idx, dir = 'next') => {
    if (sliding) return;
    setAnimDir(dir);
    setTextIn(false);

    setTimeout(() => {
      setSliding(true);
      setPrev(current);
      setCurrent(idx);
    }, 200);

    setTimeout(() => {
      setSliding(false);
      setPrev(null);
      setTextIn(true);
    }, 900);
  }, [sliding, current]);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length, 'next'), [goTo, current]);
  const prev_ = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length, 'prev'), [goTo, current]);

  /* ── autoplay ── */
  useEffect(() => {
    timerRef.current = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const resetTimer = () => { clearInterval(timerRef.current); timerRef.current = setInterval(next, AUTO_INTERVAL); };

  const handleNext = () => { next(); resetTimer(); };
  const handlePrev = () => { prev_(); resetTimer(); };
  const handleDot  = (i) => { if (i !== current) { goTo(i, i > current ? 'next' : 'prev'); resetTimer(); } };

  const slide = SLIDES[current];

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden', background: '#0a0a0a' }}>

      {/* ── SLIDE IMAGES ─────────────────────────────────────── */}
      {SLIDES.map((s, i) => {
        const isCurrent = i === current;
        const isPrev    = i === prev;
        if (!isCurrent && !isPrev) return null;

        let translateX = '0%';
        if (isCurrent && sliding) {
          translateX = animDir === 'next' ? '0%' : '0%';
        }
        if (isPrev && sliding) {
          translateX = animDir === 'next' ? '-100%' : '100%';
        }
        if (isCurrent && !sliding && i === current) {
          translateX = '0%';
        }

        return (
          <div
            key={s.id}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: isCurrent ? 2 : 1,
              transform: sliding
                ? (isCurrent
                    ? `translateX(${animDir === 'next' ? '0%' : '0%'})`
                    : `translateX(${animDir === 'next' ? '-6%' : '6%'})`)
                : 'translateX(0%)',
              transition: sliding ? 'transform 0.85s cubic-bezier(0.77,0,0.175,1)' : 'none',
            }}
          >
            <img
              src={s.image}
              alt={s.heading}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                transform: isCurrent && !sliding ? 'scale(1.03)' : 'scale(1)',
                transition: 'transform 8s ease',
                display: 'block',
              }}
            />
          </div>
        );
      })}

      {/* ── LAYERED OVERLAYS ─────────────────────────────────── */}
      {/* Dark gradient from bottom */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)',
      }} />
      {/* Left gradient for text readability */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 60%)',
      }} />
      {/* Subtle vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)',
      }} />

      {/* ── CONTENT ──────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '0 64px 80px',
        maxWidth: 1400, margin: '0 auto', left: 0, right: 0,
      }}>

        {/* EYEBROW */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          marginBottom: 20,
          opacity: textIn ? 1 : 0,
          transform: textIn ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s',
        }}>
          <span style={{ width: 36, height: 1.5, background: '#00adee', display: 'inline-block' }} />
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: '#00adee',
          }}>
            {slide.eyebrow}
          </span>
        </div>

        {/* MAIN HEADING */}
        <h1 style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 300,
          fontSize: 'clamp(48px, 7vw, 96px)',
          lineHeight: 1.05,
          color: '#fff',
          margin: '0 0 24px',
          whiteSpace: 'pre-line',
          opacity: textIn ? 1 : 0,
          transform: textIn ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.12s',
          textShadow: '0 2px 40px rgba(0,0,0,0.3)',
          maxWidth: 780,
        }}>
          {slide.heading.split('\n').map((line, i) => (
            <span key={i}>
              {i === 0 ? line : <><br /><strong style={{ fontWeight: 700, color: '#fff' }}>{line}</strong></>}
            </span>
          ))}
        </h1>

        {/* SUBTITLE */}
        <p style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 300,
          fontSize: 15,
          lineHeight: 1.7,
          color: 'rgba(255,255,255,0.7)',
          maxWidth: 440,
          margin: '0 0 36px',
          opacity: textIn ? 1 : 0,
          transform: textIn ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s',
        }}>
          {slide.sub}
        </p>

        {/* CTA BUTTONS */}
        <div style={{
          display: 'flex', gap: 14, flexWrap: 'wrap',
          opacity: textIn ? 1 : 0,
          transform: textIn ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.28s',
        }}>
          <CTABtn href={slide.cta.href} primary>{slide.cta.label}</CTABtn>
          <CTABtn href={slide.ctaAlt.href} primary={false}>{slide.ctaAlt.label}</CTABtn>
        </div>

        {/* STATS ROW */}
        <div style={{
          display: 'flex', gap: 48, marginTop: 52, paddingTop: 40,
          borderTop: '1px solid rgba(255,255,255,0.12)',
          opacity: textIn ? 1 : 0,
          transition: 'opacity 0.8s 0.35s',
        }}>
          {STATS.map((s, i) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(22px, 2.5vw, 36px)', color: '#00adee', lineHeight: 1 }}>
                {s.num}
              </div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginTop: 5 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── LEFT / RIGHT ARROWS ──────────────────────────────── */}
      <ArrowBtn dir="left"  onClick={handlePrev} />
      <ArrowBtn dir="right" onClick={handleNext} />

      {/* ── SLIDE COUNTER (top-right) ─────────────────────────── */}
      <div style={{
        position: 'absolute', top: 120, right: 64, zIndex: 20,
        opacity: navIn ? 1 : 0,
        transition: 'opacity 0.8s 0.5s',
        textAlign: 'right',
      }}>
        <span style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: 32, color: '#fff', lineHeight: 1 }}>
          {String(current + 1).padStart(2, '0')}
        </span>
        <span style={{ fontFamily: "'Poppins'", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.35)', marginLeft: 4 }}>
          / {String(SLIDES.length).padStart(2, '0')}
        </span>
      </div>

      {/* ── DOT INDICATORS ───────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        right: 64,
        zIndex: 20,
        display: 'flex',
        gap: 10,
        alignItems: 'center',
      }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDot(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === current ? 32 : 8,
              height: 2,
              background: i === current ? '#00adee' : 'rgba(255,255,255,0.35)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              borderRadius: 1,
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              outline: 'none',
            }}
          />
        ))}
      </div>

      {/* ── PROGRESS BAR ─────────────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, zIndex: 20,
        background: 'rgba(255,255,255,0.1)',
      }}>
        <div
          key={current}
          style={{
            height: '100%',
            background: '#00adee',
            animation: `progress ${AUTO_INTERVAL}ms linear`,
          }}
        />
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0% }
          to   { width: 100% }
        }
        @media (max-width: 768px) {
          section > div { padding: 0 24px 60px !important; }
          .hero-arrow-right { right: 16px !important; }
          .hero-arrow-left  { left: 16px !important; }
        }
      `}</style>
    </section>
  );
};

/* ── CTA BUTTON ─────────────────────────────────────────────── */
const CTABtn = ({ href, children, primary }) => {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-block',
        textDecoration: 'none',
        fontFamily: "'Poppins', sans-serif",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        padding: '14px 36px',
        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
        ...(primary ? {
          background: hov ? '#0090c8' : '#00adee',
          color: '#fff',
          transform: hov ? 'translateY(-2px)' : 'translateY(0)',
          boxShadow: hov ? '0 8px 32px rgba(0,173,238,0.4)' : '0 0 0 rgba(0,173,238,0)',
        } : {
          background: 'transparent',
          color: hov ? '#00adee' : 'rgba(255,255,255,0.85)',
          border: `1px solid ${hov ? '#00adee' : 'rgba(255,255,255,0.4)'}`,
          transform: hov ? 'translateY(-2px)' : 'translateY(0)',
        }),
      }}
    >
      {children}
    </a>
  );
};

/* ── ARROW BUTTON ───────────────────────────────────────────── */
const ArrowBtn = ({ dir, onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={dir === 'left' ? 'hero-arrow-left' : 'hero-arrow-right'}
      aria-label={dir === 'left' ? 'Previous slide' : 'Next slide'}
      style={{
        position: 'absolute',
        top: '50%',
        [dir === 'left' ? 'left' : 'right']: 36,
        transform: `translateY(-50%) ${hov ? (dir === 'left' ? 'translateX(-3px)' : 'translateX(3px)') : 'translateX(0)'}`,
        zIndex: 20,
        width: 52,
        height: 52,
        border: `1px solid ${hov ? '#00adee' : 'rgba(255,255,255,0.3)'}`,
        background: hov ? 'rgba(0,173,238,0.15)' : 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(8px)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
        outline: 'none',
        borderRadius: 0,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={hov ? '#00adee' : 'white'} strokeWidth="1.5" strokeLinecap="round">
        {dir === 'left'
          ? <><polyline points="15 18 9 12 15 6" /></>
          : <><polyline points="9 18 15 12 9 6" /></>
        }
      </svg>
    </button>
  );
};

export default Hero;