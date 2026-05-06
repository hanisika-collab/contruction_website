import React, { useState, useEffect } from 'react';

// Hardcoded reference data to use as a fallback if the database field is empty
const FALLBACK_PACKAGES = [
  {
    id: 1,
    name: 'Classic',
    tagline: 'Quality craftsmanship, enduring value',
    price: '1,800',
    badge: '',
    featured: false,
    features: ['Standard CP fittings', 'Modular electrical layout', 'Weather shield paint'],
    specs: {
      Cement: 'Chettinad',
      Steel: 'JR',
      Bricks: 'Wire-cut Bricks',
      Door: 'Vengai',
      Windows: 'UPVC',
      Tiles: '40 to 45 (Rate)',
      Electrical: 'Hifi or GM',
      Paint: 'JSW'
    }
  },
  {
    id: 2,
    name: 'Royale',
    tagline: 'Where taste meets performance',
    price: '2,000',
    badge: 'Most Popular',
    featured: true,
    features: ['Jaquar CP fittings', 'False ceiling with LED', 'Modular kitchen shell'],
    specs: {
      Cement: 'Bharathi',
      Steel: 'Agni or TATA',
      Bricks: 'AAC Blocks',
      Door: 'Steel or Vengai',
      Windows: 'Wood',
      Tiles: '45 to 50 (Rate)',
      Electrical: 'Finolex',
      Paint: 'Asian'
    }
  },
  {
    id: 3,
    name: 'Elite',
    tagline: 'The pinnacle of residential luxury',
    price: '2,200',
    badge: 'Premium',
    featured: false,
    features: ['Kohler luxury fittings', 'Full smart home automation', 'Italian marble options'],
    specs: {
      Cement: 'Ultratech',
      Steel: 'TATA',
      Bricks: 'Premium AAC Blocks',
      Door: 'Steel Classic',
      Windows: 'UPVC Color',
      Tiles: '50 to 70 (Rate)',
      Electrical: 'Finolex',
      Paint: 'Asian Classic'
    }
  },
];

const PricingCard = ({ pkg }) => {
  const [hov, setHov] = useState(false);

  // DEFENSIVE LOGIC: 
  // If the fetched package (pkg) has no specs, find the matching fallback package by name 
  // to ensure the material brands are displayed.
  const displaySpecs = pkg.specs && Object.keys(pkg.specs).length > 0 
    ? pkg.specs 
    : FALLBACK_PACKAGES.find(f => f.name === pkg.name)?.specs || {};

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        background: pkg.featured ? '#00adee' : '#fff',
        border: `1px solid ${pkg.featured ? '#00adee' : hov ? '#00adee' : '#e5e7eb'}`,
        padding: '40px 28px',
        display: 'flex',
        flexDirection: 'column',
        transform: pkg.featured ? 'scale(1.03)' : hov ? 'translateY(-4px)' : 'none',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        boxShadow: pkg.featured ? '0 24px 60px rgba(0,173,238,0.25)' : hov ? '0 12px 40px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      {/* POPULAR TAG / BADGE */}
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
          padding: '6px 20px',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 10
        }}>
          {pkg.badge}
        </div>
      )}
      {/* HEADER SECTION (Name & Price) */}
      <h3 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: 22, color: pkg.featured ? '#fff' : '#111827', margin: '0 0 4px' }}>{pkg.name}</h3>
      <p style={{ fontFamily: "'Poppins'", fontWeight: 300, fontSize: 11, color: pkg.featured ? 'rgba(255,255,255,0.7)' : '#9ca3af', margin: '0 0 20px' }}>{pkg.tagline}</p>
      
      <div style={{ paddingBottom: 20, marginBottom: 20, borderBottom: `1px solid ${pkg.featured ? 'rgba(255,255,255,0.2)' : '#e5e7eb'}`, display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: 42, color: pkg.featured ? '#fff' : '#00adee' }}>₹{pkg.price}</span>
        <span style={{ fontFamily: "'Poppins'", fontSize: 11, color: pkg.featured ? 'rgba(255,255,255,0.5)' : '#9ca3af' }}>/ sq.ft</span>
      </div>

      {/* SPECIFICATIONS SECTION (Brand Showcase) */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontFamily: "'Poppins'", fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: pkg.featured ? '#fff' : '#00adee', marginBottom: 12 }}>Material Brands</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px' }}>
          {/* Use displaySpecs (which prioritizes database data, then fallbacks) */}
          {Object.entries(displaySpecs).map(([key, value]) => (
            <div key={key}>
              <div style={{ fontSize: 9, fontWeight: 600, color: pkg.featured ? 'rgba(255,255,255,0.6)' : '#9ca3af', textTransform: 'uppercase' }}>{key}</div>
              <div style={{ fontSize: 11, fontWeight: 400, color: pkg.featured ? '#fff' : '#374151' }}>{value || '—'}</div>
            </div>
          ))}
        </div>
      </div>

      {/* INCLUSIONS LIST */}
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ fontFamily: "'Poppins'", fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: pkg.featured ? '#fff' : '#00adee', marginBottom: 4 }}>Key Features</p>
        {(pkg.features || []).map((f, i) => (
          <li key={i} style={{ display: 'flex', gap: 8, fontFamily: "'Poppins'", fontSize: 11, color: pkg.featured ? 'rgba(255,255,255,0.85)' : '#374151' }}>
            <span style={{ color: pkg.featured ? '#fff' : '#00adee' }}>✓</span> {f}
          </li>
        ))}
      </ul>

      <a href="#contact" style={{ display: 'block', textAlign: 'center', padding: '12px', fontFamily: "'Poppins'", fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', background: pkg.featured ? '#fff' : '#00adee', color: pkg.featured ? '#00adee' : '#fff', transition: '0.2s' }}>
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
      .then(d => {
        // If API data exists, use it; otherwise, use fallbacks[cite: 1]
        setPackages(d.data?.length ? d.data : FALLBACK_PACKAGES);
        setLoading(false);
      })
      .catch(() => {
        setPackages(FALLBACK_PACKAGES);
        setLoading(false);
      });
  }, []);

  return (
    <section id="pricing" style={{ position: 'relative', padding: '112px 48px', background: '#f8f9fa' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: '#e5e7eb' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center', marginBottom: 64 }}>
        <p style={{ fontFamily: "'Poppins'", fontSize: 10, fontWeight: 500, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#00adee', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ width: 32, height: 1, background: '#00adee', display: 'inline-block' }} />
          Investment
          <span style={{ width: 32, height: 1, background: '#00adee', display: 'inline-block' }} />
        </p>

        <h2 style={{ fontFamily: "'Poppins'", fontWeight: 300, fontSize: 'clamp(36px, 5vw, 64px)', color: '#111827', margin: '0 0 16px' }}>
          Transparent <span style={{ color: '#00adee', fontWeight: 700 }}>Packages</span>
        </h2>

        <p style={{ fontFamily: "'Poppins'", fontWeight: 300, fontSize: 13, color: '#9ca3af', maxWidth: 360, margin: '0 auto', lineHeight: 1.8 }}>
          Three curated tiers delivering uncompromising quality at every price point.
        </p>
      </div>

      {!loading && (
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'start' }} className="pricing-grid">
          {packages.map(pkg => <PricingCard key={pkg.id || pkg._id} pkg={pkg} />)}
        </div>
      )}

      <p style={{ textAlign: 'center', fontFamily: "'Poppins'", fontSize: 11, fontWeight: 300, color: '#9ca3af', marginTop: 40 }}>
        Prices are indicative. Final cost depends on site conditions and specifications.
      </p>

      <style>{`
        @media (max-width: 1024px) {
          .pricing-grid { grid-template-columns: 1fr !important; max-width: 480px !important; margin: 0 auto; }
        }
        @media (max-width: 768px) {
          section { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  );
};

export default Pricing;