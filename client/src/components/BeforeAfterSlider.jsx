import React, { useState, useRef, useCallback } from 'react';

const BeforeAfterSlider = ({ beforeImg, afterImg, title, category, year }) => {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef(null);

  const calcPos = useCallback((clientX) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, pct)));
  }, []);

  return (
    <div className="mb-20">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-text text-xs uppercase tracking-widest font-ui font-700">
          {title}
        </h3>
        <span className="text-muted text-xs uppercase tracking-widest font-ui">
          {category}{year && ` · ${year}`}
        </span>
      </div>

      {/* SLIDER CONTAINER */}
      <div
        ref={wrapRef}
        className="relative w-full overflow-hidden border border-border cursor-ew-resize select-none"
        style={{ aspectRatio: '16 / 10' }}
        onMouseMove={(e) => calcPos(e.clientX)}
        onTouchMove={(e) => calcPos(e.touches[0].clientX)}
      >
        {/* AFTER IMAGE (full width base) */}
        <img
          src={afterImg}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* BEFORE IMAGE (clipped left) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <img
            src={beforeImg}
            alt="Before"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: `${(100 / pos) * 100}%`, maxWidth: 'none' }}
            draggable={false}
          />
        </div>

        {/* DIVIDER LINE */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-accent z-10"
          style={{ left: `${pos}%` }}
        />

        {/* HANDLE PILL */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex items-center justify-center bg-accent text-white rounded-full shadow-lg"
          style={{ left: `${pos}%`, width: 36, height: 36 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 8H1M11 8h4M5 5l-3 3 3 3M11 5l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* LABELS */}
        <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur text-text text-[10px] font-ui font-700 uppercase tracking-wider px-2 py-1">
          Before
        </div>
        <div className="absolute top-3 right-3 z-10 bg-accent text-white text-[10px] font-ui font-700 uppercase tracking-wider px-2 py-1">
          After
        </div>

      </div>

      {/* CAPTION LINE */}
      <div className="mt-3 flex items-center gap-2">
        <span className="w-4 h-px bg-accent" />
        <span className="text-muted text-xs font-ui">Drag to compare</span>
      </div>

    </div>
  );
};

export default BeforeAfterSlider;