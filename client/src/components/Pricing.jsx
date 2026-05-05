import React, { useState, useEffect } from 'react';

const FALLBACK_PACKAGES = [
  {
    id: 1,
    name: 'Classic',
    tagline: 'Quality craftsmanship, enduring value',
    price: '1,950',
    badge: '',
    featured: false,
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
    id: 2,
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
    id: 3,
    name: 'Elite',
    tagline: 'The pinnacle of residential luxury',
    price: '2,800',
    badge: '',
    featured: false,
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
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/packages')
      .then(r => r.json())
      .then(d => setPackages(d.data?.length ? d.data : FALLBACK_PACKAGES))
      .catch(() => setPackages(FALLBACK_PACKAGES))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="pricing" className="relative py-28 px-6 md:px-12 bg-surface">

      {/* TOP ACCENT LINE */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      {/* HEADER */}
      <div className="max-w-7xl mx-auto text-center mb-16">

        <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-ui flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-accent" />
          Investment
          <span className="w-8 h-px bg-accent" />
        </p>

        <h2 className="text-text font-display font-600" style={{ fontSize: 'clamp(40px, 5vw, 70px)' }}>
          Transparent{' '}
          <span className="text-accent italic">Packages</span>
        </h2>

        <p className="text-muted text-sm mt-5 max-w-md mx-auto leading-relaxed">
          Three curated tiers delivering uncompromising quality at every price point.
        </p>
      </div>

      {/* SKELETON */}
      {loading && (
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="animate-pulse bg-white border border-border h-[500px]" />
          ))}
        </div>
      )}

      {/* PACKAGES GRID */}
      {!loading && (
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col transition-all duration-300 group ${
                pkg.featured
                  ? 'bg-accent text-white shadow-xl shadow-accent/20 scale-[1.02]'
                  : 'bg-white border border-border hover:border-accent hover:shadow-md'
              }`}
            >
              {/* BADGE */}
              {pkg.badge && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs px-5 py-1 uppercase tracking-widest font-ui font-700"
                  style={{
                    background: pkg.featured ? '#0090c8' : '#00adee',
                    color: '#fff',
                  }}
                >
                  {pkg.badge}
                </div>
              )}

              <div className="p-10 flex flex-col flex-1">

                {/* NAME */}
                <h3
                  className="font-display font-600 mb-1"
                  style={{ fontSize: 28, color: pkg.featured ? '#fff' : '#111827' }}
                >
                  {pkg.name}
                </h3>
                <p
                  className="text-sm mb-8"
                  style={{ color: pkg.featured ? 'rgba(255,255,255,0.75)' : '#6b7280' }}
                >
                  {pkg.tagline}
                </p>

                {/* PRICE */}
                <div
                  className="pb-8 mb-8 flex items-end gap-1"
                  style={{ borderBottom: `1px solid ${pkg.featured ? 'rgba(255,255,255,0.2)' : '#e5e7eb'}` }}
                >
                  <span
                    className="text-lg font-display"
                    style={{ color: pkg.featured ? 'rgba(255,255,255,0.8)' : '#00adee' }}
                  >
                    ₹
                  </span>
                  <span
                    className="font-display font-600 leading-none"
                    style={{
                      fontSize: 52,
                      color: pkg.featured ? '#fff' : '#00adee',
                    }}
                  >
                    {pkg.price}
                  </span>
                  <span
                    className="text-xs mb-2"
                    style={{ color: pkg.featured ? 'rgba(255,255,255,0.5)' : '#9ca3af' }}
                  >
                    / sq.ft
                  </span>
                </div>

                {/* FEATURES */}
                <ul className="flex flex-col gap-3 mb-10 flex-1">
                  {(pkg.features || []).map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm"
                      style={{ color: pkg.featured ? 'rgba(255,255,255,0.85)' : '#374151' }}
                    >
                      <span
                        className="mt-0.5 flex-shrink-0 font-700"
                        style={{ color: pkg.featured ? 'rgba(255,255,255,0.7)' : '#00adee' }}
                      >
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA BUTTON */}
                <a
                  href="#contact"
                  className={`block text-center py-3.5 text-xs uppercase tracking-widest font-ui font-700 transition-all duration-200 ${
                    pkg.featured
                      ? 'bg-white text-accent hover:bg-surface'
                      : 'bg-accent text-white hover:bg-accentDark'
                  }`}
                >
                  Request Estimate
                </a>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* FOOTNOTE */}
      <p className="text-center text-muted text-xs mt-10 max-w-xl mx-auto">
        Prices are indicative. Final cost depends on site conditions and specifications.
      </p>

    </section>
  );
};

export default Pricing;