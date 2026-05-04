import React, { useEffect, useState } from 'react';

const STATS = [
  { num: '240+', label: 'Projects Delivered' },
  { num: '12', label: 'Years of Craft' },
  { num: '98%', label: 'Client Satisfaction' },
];

const Hero = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 200);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 pb-20 overflow-hidden">

      {/* 🔥 DARK BACKGROUND */}
   <div className="absolute inset-0 bg-[#0B0F14]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(214,168,79,0.15),transparent_60%)]" />

      {/* 🔥 SUBTLE GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(214,168,79,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(214,168,79,0.03)_1px,transparent_1px)] bg-[length:80px_80px]" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">

        {/* TOP TAG */}
        <p className={`text-xs uppercase tracking-[0.4em] text-accent mb-6 flex items-center gap-3 transition-all duration-700 ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <span className="w-10 h-px bg-accent" />
          Premium Construction & Interiors
        </p>

        {/* MAIN TITLE */}
        <h1 className={`text-white font-display leading-[0.9] transition-all duration-700 delay-200 ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        } text-[clamp(64px,9vw,140px)]`}>

          Where <br />
          <span className="text-accent">Vision</span> <br />
          Becomes <br />
          Structure
        </h1>

        {/* BOTTOM SECTION */}
        <div className={`mt-10 flex flex-col md:flex-row justify-between gap-10 transition-all duration-700 delay-500 ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>

          <p className="text-white/40 text-sm max-w-sm leading-relaxed">
            We craft luxury residences and commercial spaces with precision and detail.
          </p>

          <div className="flex gap-10">
            {STATS.map((s) => (
              <div key={s.label} className="text-right">
                <div className="text-accent font-display text-3xl md:text-4xl">
                  {s.num}
                </div>
                <div className="text-white/40 text-xs uppercase tracking-widest">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;