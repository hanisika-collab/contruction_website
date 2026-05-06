import React, { useState, useRef, useCallback } from 'react';

const BeforeAfterSlider = ({ beforeImg, afterImg, title, category, year }) => {
  const [pos, setPos]       = useState(50);
  const [hov, setHov]       = useState(false);
  const [drag, setDrag]     = useState(false);
  const wrapRef             = useRef(null);

  const calcPos = useCallback((clientX) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, pct)));
  }, []);

  return (
    <article style={{ marginBottom: 72 }}>

      {/* HEADER ROW */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 20, height: 1.5, background: '#00adee', display: 'inline-block' }} />
          <h3 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#111827',
            margin: 0,
          }}>
            {title}
          </h3>
        </div>
        <span style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 400,
          fontSize: 10,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#9ca3af',
        }}>
          {category}{year && ` · ${year}`}
        </span>
      </div>

      {/* SLIDER CONTAINER */}
      <div
        ref={wrapRef}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setHov(false); setDrag(false); }}
        onMouseDown={() => setDrag(true)}
        onMouseUp={() => setDrag(false)}
        onMouseMove={e => { if (drag || true) calcPos(e.clientX); }}
        onTouchMove={e => calcPos(e.touches[0].clientX)}
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          aspectRatio: '16 / 9',
          cursor: 'ew-resize',
          userSelect: 'none',
          outline: 'none',
          border: `1px solid ${hov ? '#00adee' : '#e5e7eb'}`,
          transition: 'border-color 0.3s',
        }}
      >
        {/* AFTER (right side) */}
        <img
          src={afterImg}
          alt="After"
          draggable={false}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            transition: 'transform 8s ease',
            transform: hov ? 'scale(1.02)' : 'scale(1)',
          }}
        />

        {/* BEFORE (clipped) */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', width: `${pos}%` }}>
          <img
            src={beforeImg}
            alt="Before"
            draggable={false}
            style={{
              position: 'absolute', inset: 0,
              width: `${(100 / pos) * 100}%`,
              maxWidth: 'none',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* DIVIDER LINE */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          left: `${pos}%`,
          width: 2,
          background: '#00adee',
          zIndex: 10,
          boxShadow: '0 0 16px rgba(0,173,238,0.5)',
          transition: 'box-shadow 0.3s',
        }} />

        {/* HANDLE */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: `${pos}%`,
          transform: `translate(-50%, -50%) scale(${hov ? 1.1 : 1})`,
          zIndex: 20,
          width: 46, height: 46,
          background: '#00adee',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: hov ? '0 4px 24px rgba(0,173,238,0.5)' : '0 2px 12px rgba(0,173,238,0.3)',
          transition: 'transform 0.25s, box-shadow 0.25s',
        }}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M5 8H1M11 8h4M5 5l-3 3 3 3M11 5l3 3-3 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* LABELS */}
        <div style={{
          position: 'absolute', top: 14, left: 14, zIndex: 10,
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          fontFamily: "'Poppins', sans-serif",
          fontSize: 9, fontWeight: 700,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#111827',
          padding: '5px 11px',
        }}>
          Before
        </div>
        <div style={{
          position: 'absolute', top: 14, right: 14, zIndex: 10,
          background: '#00adee',
          fontFamily: "'Poppins', sans-serif",
          fontSize: 9, fontWeight: 700,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#fff',
          padding: '5px 11px',
        }}>
          After
        </div>
      </div>

      {/* CAPTION */}
      <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 14, height: 1, background: '#00adee', display: 'inline-block' }} />
        <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: 11, color: '#9ca3af', letterSpacing: '0.08em' }}>
          Drag to compare
        </span>
      </div>
    </article>
  );
};

export default BeforeAfterSlider;