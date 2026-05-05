import React, { useEffect, useState } from 'react';

const STATS = [
  { num: '240+', label: 'Projects Delivered' },
  { num: '12',   label: 'Years of Craft' },
  { num: '98%',  label: 'Client Satisfaction' },
];

const Hero = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 150);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 pb-20 overflow-hidden bg-white">

      {/* SUBTLE GRID PATTERN */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,173,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,173,238,0.04) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* ACCENT GLOW — top right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%', right: '-5%',
          width: '60vw', height: '60vw',
          background: 'radial-gradient(circle, rgba(0,173,238,0.08) 0%, transparent 65%)',
        }}
      />

      {/* LARGE BG LETTER */}
      <span
        className="absolute select-none pointer-events-none font-display font-700 leading-none"
        style={{
          top: '8%', left: '-2%',
          fontSize: 'clamp(160px, 22vw, 340px)',
          color: 'rgba(0,173,238,0.04)',
          letterSpacing: '-0.04em',
        }}
      >
        ACE
      </span>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">

        {/* TOP TAG */}
        <p
          className={`text-xs uppercase tracking-[0.4em] text-accent mb-6 flex items-center gap-3 font-ui transition-all duration-700 ${
            show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="w-10 h-px bg-accent" />
          Premium Construction & Interiors
        </p>

        {/* MAIN TITLE */}
        <h1
          className={`text-text font-display leading-[0.9] transition-all duration-700 delay-200 ${
            show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ fontSize: 'clamp(64px, 9vw, 140px)' }}
        >
          Where <br />
          <span className="text-accent">Vision</span> <br />
          Becomes <br />
          <span style={{ color: '#111827' }}>Structure</span>
        </h1>

        {/* BOTTOM ROW */}
        <div
          className={`mt-12 flex flex-col md:flex-row justify-between gap-10 transition-all duration-700 delay-500 ${
            show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex flex-col gap-5">
            <p className="text-muted text-sm max-w-xs leading-relaxed">
              We craft luxury residences and commercial spaces with precision, passion, and an eye for detail.
            </p>
            <div className="flex gap-4">
              <a
                href="#projects"
                className="bg-accent text-white px-7 py-3 text-xs uppercase tracking-widest font-ui font-700 hover:bg-accentDark transition-colors"
              >
                View Our Work
              </a>
              <a
                href="#contact"
                className="border border-border text-muted px-7 py-3 text-xs uppercase tracking-widest font-ui hover:border-accent hover:text-accent transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* STATS */}
          <div className="flex gap-10 items-end">
            {STATS.map((s) => (
              <div key={s.label} className="text-right">
                <div className="text-accent font-display font-600 leading-none" style={{ fontSize: 'clamp(28px,3.5vw,48px)' }}>
                  {s.num}
                </div>
                <div className="text-muted text-xs uppercase tracking-widest mt-1 font-ui">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM BORDER LINE */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
    </section>
  );
};

export default Hero;