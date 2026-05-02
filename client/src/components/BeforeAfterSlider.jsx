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
    <div className="mb-24">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-white text-xs uppercase tracking-widest">
          {title}
        </h3>

        <span className="text-white/40 text-xs uppercase tracking-widest">
          {category} {year && `· ${year}`}
        </span>
      </div>

      {/* SLIDER */}
      <div
        ref={wrapRef}
        className="relative w-full aspect-[16/10] overflow-hidden border border-white/10 cursor-ew-resize"

        onMouseMove={(e) => calcPos(e.clientX)}
        onTouchMove={(e) => calcPos(e.touches[0].clientX)}
      >

        {/* AFTER IMAGE */}
        <img
          src={afterImg}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* BEFORE IMAGE */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <img
            src={beforeImg}
            alt="Before"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* DIVIDER */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-[#D6A84F]"
          style={{ left: `${pos}%` }}
        />

      </div>
    </div>
  );
};

export default BeforeAfterSlider;