import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FALLBACK_PACKAGES = [
  {
    id: 1, name: 'Classic', tagline: 'Quality craftsmanship, enduring value',
    price: '1,800', badge: '', featured: false,
    features: ['Standard CP sanitary fittings', 'Basic modular electrical layout', 'Weather shield exterior paint'],
    specs: { Cement: 'Chettinad', Steel: 'JR', Bricks: 'Wire-cut Bricks', Door: 'Vengai', Windows: 'UPVC', Tiles: '40 to 45 (Rate)', Electrical: 'Hifi or GM', Paint: 'JSW' }
  },
  {
    id: 2, name: 'Royale', tagline: 'Where taste meets performance',
    price: '2,000', badge: 'Most Popular', featured: true,
    features: ['Jaquar CP series fittings', 'False ceiling with LED accents', 'Modular kitchen shell'],
    specs: { Cement: 'Bharathi', Steel: 'Agni or TATA', Bricks: 'AAC Blocks', Door: 'Steel or Vengai', Windows: 'Wood', Tiles: '45 to 50 (Rate)', Electrical: 'Finolex', Paint: 'Asian' }
  },
  {
    id: 3, name: 'Elite', tagline: 'The pinnacle of residential luxury',
    price: '2,200', badge: 'Premium', featured: false,
    features: ['Kohler / TOTO luxury fittings', 'Full smart home automation', 'Dedicated project manager'],
    specs: { Cement: 'Ultratech', Steel: 'TATA', Bricks: 'Premium AAC Blocks', Door: 'Steel Classic', Windows: 'UPVC Color', Tiles: '50 to 70 (Rate)', Electrical: 'Finolex', Paint: 'Asian Classic' }
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
        display: 'flex', flexDirection: 'column',
        transform: pkg.featured ? 'scale(1.03)' : hov ? 'translateY(-4px)' : 'none',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        boxShadow: pkg.featured ? '0 24px 60px rgba(0,173,238,0.25)' : hov ? '0 12px 40px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      {pkg.badge && (
        <div style={{
          position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
          background: pkg.featured ? '#0090c8' : '#00adee', color: '#fff',
          fontFamily: "'Poppins'", fontSize: 9, fontWeight: 700, letterSpacing: '0.2em',
          textTransform: 'uppercase', padding: '5px 16px', whiteSpace: 'nowrap',
        }}>{pkg.badge}</div>
      )}

      <h3 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: 22, color: pkg.featured ? '#fff' : '#111827', margin: '0 0 6px' }}>{pkg.name}</h3>
      <p style={{ fontFamily: "'Poppins'", fontWeight: 300, fontSize: 12, color: pkg.featured ? 'rgba(255,255,255,0.7)' : '#9ca3af', margin: '0 0 28px' }}>{pkg.tagline}</p>

      <div style={{ paddingBottom: 28, marginBottom: 28, borderBottom: `1px solid ${pkg.featured ? 'rgba(255,255,255,0.2)' : '#e5e7eb'}`, display: 'flex', alignItems: 'flex-end', gap: 4 }}>
        <span style={{ fontFamily: "'Poppins'", fontSize: 16, fontWeight: 300, color: pkg.featured ? 'rgba(255,255,255,0.7)' : '#00adee', lineHeight: 1.8 }}>₹</span>
        <span style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: 52, lineHeight: 1, color: pkg.featured ? '#fff' : '#00adee' }}>{pkg.price}</span>
        <span style={{ fontFamily: "'Poppins'", fontSize: 11, fontWeight: 400, color: pkg.featured ? 'rgba(255,255,255,0.5)' : '#9ca3af', marginBottom: 6 }}> / sq.ft</span>
      </div>

      {/* MATERIAL SPECIFICATIONS GRID (Updated from Reference Image) */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ 
          fontFamily: "'Poppins'", fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', 
          textTransform: 'uppercase', color: pkg.featured ? '#fff' : '#00adee', marginBottom: 16 
        }}>Material Brands</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 16px' }}>
          {Object.entries(pkg.specs || {}).map(([key, value]) => (
            <div key={key}>
              <div style={{ fontSize: 9, fontWeight: 600, color: pkg.featured ? 'rgba(255,255,255,0.6)' : '#9ca3af', textTransform: 'uppercase' }}>{key}</div>
              <div style={{ fontSize: 11, fontWeight: 400, color: pkg.featured ? '#fff' : '#374151', lineHeight: 1.3 }}>{value || 'Standard'}</div>
            </div>
          ))}
        </div>
      </div>

      {/* KEY FEATURES */}
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ 
          fontFamily: "'Poppins'", fontSize: 10, fontWeight: 700, textTransform: 'uppercase', 
          color: pkg.featured ? '#fff' : '#00adee', marginBottom: 8 
        }}>Inclusions</p>
        {(pkg.features || []).map((f, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontFamily: "'Poppins'", fontSize: 11, fontWeight: 300, color: pkg.featured ? 'rgba(255,255,255,0.85)' : '#374151', lineHeight: 1.4 }}>
            <span style={{ color: pkg.featured ? 'rgba(255,255,255,0.6)' : '#00adee', fontWeight: 600, flexShrink: 0 }}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      <Link to="/contact"
        style={{
          display: 'block', textAlign: 'center', padding: '14px',
          fontFamily: "'Poppins'", fontSize: 10, fontWeight: 600,
          letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none',
          background: pkg.featured ? '#fff' : '#00adee',
          color: pkg.featured ? '#00adee' : '#fff',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = pkg.featured ? '#f0f9ff' : '#0090c8'; }}
        onMouseLeave={e => { e.currentTarget.style.background = pkg.featured ? '#fff' : '#00adee'; }}
      >
        Request Estimate
      </Link>
    </div>
  );
};

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/packages')
      .then(r => r.json())
      .then(d => setPackages(d.data?.length ? d.data : FALLBACK_PACKAGES))
      .catch(() => setPackages(FALLBACK_PACKAGES))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#f8f9fa' }}>
      {/* HERO SECTION - Preserved from your source */}
      <div className="relative px-6 md:px-12 pt-32 pb-24 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0a0e17 0%, #0d1f35 100%)' }}>
        <div className="absolute pointer-events-none"
          style={{ top: '-20%', right: '-5%', width: '50vw', height: '50vw',
            background: 'radial-gradient(circle, rgba(0,173,238,0.1) 0%, transparent 65%)' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 mb-10 text-xs uppercase tracking-widest font-ui">
            <Link to="/" className="text-white/40 hover:text-accent transition-colors">Home</Link>
            <span className="text-white/20">›</span>
            <span className="text-accent font-700">Packages</span>
          </nav>
          <p className="text-xs uppercase text-accent mb-4 flex items-center gap-3 font-ui font-600"
            style={{ letterSpacing: '0.35em' }}>
            <span className="w-8 h-px bg-accent/70" />
            Transparent Pricing
          </p>
          <h1 className="text-white font-display font-700" style={{ fontSize: 'clamp(48px, 7vw, 100px)' }}>
            Our <span className="text-accent italic">Packages</span>
          </h1>
          <p className="text-white/45 text-sm mt-4 max-w-sm leading-relaxed font-body">
            Three curated tiers delivering uncompromising quality at every price point.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(0deg, #f8f9fa 0%, transparent 100%)' }} />
      </div>

      {/* PACKAGES GRID */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 48px' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ height: 600, background: '#e5e7eb', animation: 'pulse 1.5s ease infinite' }} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'start' }} className="pricing-grid">
            {packages.map(pkg => <PricingCard key={pkg.id} pkg={pkg} />)}
          </div>
        )}

        <p style={{ textAlign: 'center', fontFamily: "'Poppins'", fontSize: 11, fontWeight: 300, color: '#9ca3af', marginTop: 40 }}>
          Prices are indicative. Final cost depends on site conditions and specifications.
        </p>

        {/* INCLUDES SECTION (Preserved from original) */}
        <div style={{ marginTop: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ width: 32, height: 1, background: '#00adee', display: 'inline-block' }} />
              <span style={{ fontFamily: "'Poppins'", fontSize: 10, fontWeight: 500, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#00adee' }}>Standard Inclusions</span>
              <span style={{ width: 32, height: 1, background: '#00adee', display: 'inline-block' }} />
            </div>
            <h2 style={{ fontFamily: "'Poppins'", fontWeight: 300, fontSize: 'clamp(28px, 4vw, 48px)', color: '#111827', margin: 0 }}>
              Every package <span style={{ color: '#00adee', fontWeight: 700 }}>includes</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }} className="includes-grid">
            {[
              { icon: '🏗️', title: 'Turnkey Delivery', desc: 'From foundation to finishing — we handle everything end-to-end.' },
              { icon: '📋', title: 'Permit Handling', desc: 'BBMP/CMDA/GHMC approvals and all statutory clearances.' },
              { icon: '⏱️', title: 'On-Time Delivery', desc: 'Strict timelines with milestone-based progress tracking.' },
              { icon: '🔧', title: 'Post-Handover Support', desc: 'Dedicated support team after project completion.' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '32px 28px', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#00adee'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: 14, color: '#111827', margin: '0 0 10px' }}>{item.title}</h3>
                <p style={{ fontFamily: "'Poppins'", fontWeight: 300, fontSize: 12, color: '#6b7280', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) { .pricing-grid { grid-template-columns: 1fr !important; max-width: 480px !important; margin: 0 auto; } }
        @media (max-width: 768px) { section { padding: 60px 24px !important; } }
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.5 } }
      `}</style>
    </div>
  );
};

export default Packages;