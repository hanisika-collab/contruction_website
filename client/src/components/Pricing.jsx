import React, { useState } from 'react';

const PACKAGES = [
  {
    name: 'Classic',
    tagline: 'Quality craftsmanship, enduring value',
    price: '1,950',
    features: [
      'Standard wire-cut bricks',
      'Premium vitrified tile flooring',
      'Internal putty & primer finish',
      'Standard CP sanitary fittings',
      'Basic modular electrical layout',
      'Weather shield exterior paint',
    ],
  },
  {
    name: 'Royale',
    tagline: 'Where taste meets performance',
    price: '2,250',
    badge: 'Most Popular',
    featured: true,
    features: [
      'Premium wire-cut facing bricks',
      'Full granite floor throughout',
      'Royale & Emulsion premium paints',
      'Jaquar CP series fittings',
      'Concealed modular wiring',
      'False ceiling with LED accents',
      'Modular kitchen shell',
    ],
  },
  {
    name: 'Elite',
    tagline: 'The pinnacle of residential luxury',
    price: '2,800',
    features: [
      'Imported Italian marble floors',
      'Full smart home automation',
      'Solar water heating system',
      'Kohler / TOTO luxury fittings',
      'Full modular kitchen & wardrobes',
      'Dedicated project manager',
      'Post-handover 2-year warranty',
    ],
  },
];

const Pricing = () => {
  const [active, setActive] = useState(null);

  return (
    <section id="pricing" className="relative py-28 px-6 md:px-12 bg-[#0B0F14">

      {/* Gradient line */}
      <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      {/* HEADER */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4">
          Investment
        </p>

        <h2 className="text-white font-display text-[clamp(40px,5vw,70px)]">
          Transparent <span className="text-accent font-semibold">Packages</span>
        </h2>

        <p className="text-white/40 text-sm mt-5 max-w-md mx-auto">
          Three curated tiers delivering uncompromising quality.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 border border-white/10 divide-x divide-white/10">

        {PACKAGES.map((pkg) => (
          <div
            key={pkg.name}
            className={`relative flex flex-col px-10 py-12 transition ${
              pkg.featured ? 'bg-surface2 border border-accent z-10' : 'bg-surface'
            }`}
          >

            {/* BADGE */}
            {pkg.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black text-xs px-4 py-1 uppercase tracking-widest">
                {pkg.badge}
              </div>
            )}

            {/* NAME */}
            <h3 className="text-2xl font-display text-white mb-1">{pkg.name}</h3>
            <p className="text-white/40 text-sm mb-8">{pkg.tagline}</p>

            {/* PRICE */}
            <div className="border-b border-white/10 pb-8 mb-8 flex items-end gap-2">
              <span className="text-accent text-lg">₹</span>
              <span className="text-accent text-5xl font-display">{pkg.price}</span>
              <span className="text-white/30 text-xs mb-1">/ sq.ft</span>
            </div>

            {/* FEATURES */}
            <ul className="flex flex-col gap-3 mb-10 flex-1">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-white/50 text-sm">
                  <span className="text-accent">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            {/* BUTTON */}
            <button
              onMouseEnter={() => setActive(pkg.name)}
              onMouseLeave={() => setActive(null)}
              className={`
                w-full py-3 text-xs uppercase tracking-widest transition
                ${
                  pkg.featured
                    ? 'bg-accent text-black'
                    : active === pkg.name
                      ? 'border border-accent text-accent'
                      : 'border border-white/10 text-white/40'
                }
              `}
            >
              Request Estimate
            </button>

          </div>
        ))}
      </div>

      {/* FOOTNOTE */}
      <p className="text-center text-white/30 text-xs mt-8 max-w-xl mx-auto">
        Prices are indicative. Final cost depends on specifications.
      </p>
    </section>
  );
};

export default Pricing;