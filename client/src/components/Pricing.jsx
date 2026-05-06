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

const PricingCard = ({ pkg }) => {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        background: pkg.featured ? '#00adee' : '#fff',
        border: `1px solid ${pkg.featured ? '#00adee' : hov ? '#00adee' : '#e5e7eb'}`,
        padding: '48px 36px',
        display: 'flex',
        flexDirection: 'column',
        transform: pkg.featured ? 'scale(1.03)' : hov ? 'translateY(-4px)' : 'none',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        boxShadow: pkg.featured
          ? '0 24px 60px rgba(0,173,238,0.25)'
          : hov ? '0 12px 40px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      {/* BADGE */}
      {pkg.badge && (
        <div style={{
          position: 'absolute',
          top: -14,
          left: '50%',
          transform: 'translateX(-50%)',
          background: pkg.featured ? '#0090c8' : '#00adee',
          color: '#fff',
          fontFamily: "'Poppins'",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          padding: '5px 16px',
          whiteSpace: 'nowrap',
        }}>
          {pkg.badge}
        </div>
      )}

      {/* NAME */}
      <h3 style={{
        fontFamily: "'Poppins'",
        fontWeight: 700,
        fontSize: 22,
        color: pkg.featured ? '#fff' : '#111827',
        margin: '0 0 6px',
      }}>
        {pkg.name}
      </h3>

      <p style={{
        fontFamily: "'Poppins'",
        fontWeight: 300,
        fontSize: 12,
        color: pkg.featured ? 'rgba(255,255,255,0.7)' : '#9ca3af',
        margin: '0 0 28px',
      }}>
        {pkg.tagline}
      </p>

      {/* PRICE */}
      <div style={{
        paddingBottom: 28,
        marginBottom: 28,
        borderBottom: `1px solid ${pkg.featured ? 'rgba(255,255,255,0.2)' : '#e5e7eb'}`,
        display: 'flex',
        alignItems: 'flex-end',
        gap: 4,
      }}>
        <span style={{ fontFamily: "'Poppins'", fontSize: 16, fontWeight: 300, color: pkg.featured ? 'rgba(255,255,255,0.7)' : '#00adee', lineHeight: 1.8 }}>₹</span>
        <span style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: 52, lineHeight: 1, color: pkg.featured ? '#fff' : '#00adee' }}>
          {pkg.price}
        </span>
        <span style={{ fontFamily: "'Poppins'", fontSize: 11, fontWeight: 400, color: pkg.featured ? 'rgba(255,255,255,0.5)' : '#9ca3af', marginBottom: 6 }}>
          / sq.ft
        </span>
      </div>

      {/* FEATURES */}
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {(pkg.features || []).map((f, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontFamily: "'Poppins'", fontSize: 12, fontWeight: 300, color: pkg.featured ? 'rgba(255,255,255,0.85)' : '#374151', lineHeight: 1.5 }}>
            <span style={{ color: pkg.featured ? 'rgba(255,255,255,0.6)' : '#00adee', fontWeight: 600, marginTop: 1, flexShrink: 0 }}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#contact"
        style={{
          display: 'block',
          textAlign: 'center',
          padding: '14px',
          fontFamily: "'Poppins'",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          background: pkg.featured ? '#fff' : '#00adee',
          color: pkg.featured ? '#00adee' : '#fff',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = pkg.featured ? '#f0f9ff' : '#0090c8';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = pkg.featured ? '#fff' : '#00adee';
        }}
      >
        Request Estimate
      </a>
    </div>
  );
};

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
    <section id="pricing" style={{ position: 'relative', padding: '112px 48px', background: '#f8f9fa' }}>

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: '#e5e7eb' }} />

      {/* HEADER */}
      <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center', marginBottom: 64 }}>
        <p style={{ fontFamily: "'Poppins'", fontSize: 10, fontWeight: 500, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#00adee', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ width: 32, height: 1, background: '#00adee', display: 'inline-block' }} />
          Investment
          <span style={{ width: 32, height: 1, background: '#00adee', display: 'inline-block' }} />
        </p>

        <h2 style={{ fontFamily: "'Poppins'", fontWeight: 300, fontSize: 'clamp(36px, 5vw, 64px)', color: '#111827', margin: '0 0 16px' }}>
          Transparent{' '}
          <span style={{ color: '#00adee', fontWeight: 700 }}>Packages</span>
        </h2>

        <p style={{ fontFamily: "'Poppins'", fontWeight: 300, fontSize: 13, color: '#9ca3af', maxWidth: 360, margin: '0 auto', lineHeight: 1.8 }}>
          Three curated tiers delivering uncompromising quality at every price point.
        </p>
      </div>

      {/* SKELETON */}
      {loading && (
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ height: 500, background: '#e5e7eb', animation: 'pulse 1.5s ease infinite' }} />
          ))}
        </div>
      )}

      {/* PACKAGES */}
      {!loading && (
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'start' }} className="pricing-grid">
          {packages.map(pkg => <PricingCard key={pkg.id} pkg={pkg} />)}
        </div>
      )}

      <p style={{ textAlign: 'center', fontFamily: "'Poppins'", fontSize: 11, fontWeight: 300, color: '#9ca3af', marginTop: 40 }}>
        Prices are indicative. Final cost depends on site conditions and specifications.
      </p>

      <style>{`
        @media (max-width: 1024px) {
          .pricing-grid { grid-template-columns: 1fr !important; max-width: 480px !important; }
        }
        @media (max-width: 768px) {
          section { padding: 80px 24px !important; }
        }
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.5 } }
      `}</style>
    </section>
  );
};

export default Pricing;