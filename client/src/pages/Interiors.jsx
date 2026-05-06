import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

const CITIES = ['All', 'Bangalore', 'Krishnagiri'];

const Interiors = () => {
  const [city,     setCity]     = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/projects')
      .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
      .then(data => {
        const interiors = (data.data || []).filter(p => p.category === 'Interior');
        setProjects(interiors);
        setLoading(false);
      })
      .catch(() => { setError('Failed to load projects.'); setLoading(false); });
  }, []);

  const filtered = city === 'All' ? projects : projects.filter(p => p.city === city);

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <div className="relative px-6 md:px-12 pt-32 pb-24 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0a0e17 0%, #0d1f35 100%)' }}>
        <div className="absolute pointer-events-none"
          style={{ top: '-20%', right: '-5%', width: '50vw', height: '50vw',
            background: 'radial-gradient(circle, rgba(0,173,238,0.1) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-25"
          style={{ backgroundImage: 'linear-gradient(rgba(0,173,238,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,173,238,0.06) 1px, transparent 1px)',
            backgroundSize: '64px 64px' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 mb-10 text-xs uppercase tracking-widest font-ui">
            <Link to="/" className="text-white/40 hover:text-accent transition-colors">Home</Link>
            <span className="text-white/20">›</span>
            <Link to="/portfolio" className="text-white/40 hover:text-accent transition-colors">Portfolio</Link>
            <span className="text-white/20">›</span>
            <span className="text-accent font-700">Interiors</span>
          </nav>

          <p className="text-xs uppercase text-accent mb-4 flex items-center gap-3 font-ui font-600"
            style={{ letterSpacing: '0.35em' }}>
            <span className="w-8 h-px bg-accent/70" />
            Interior Excellence
          </p>
          <h1 className="text-white font-display font-700" style={{ fontSize: 'clamp(48px, 7vw, 100px)' }}>
            Spaces That <span className="text-accent italic">Inspire</span>
          </h1>
          <p className="text-white/45 text-sm mt-4 max-w-md leading-relaxed font-body">
            From concept to completion — our interior transformations are crafted around how you live, work, and feel.
          </p>

          {/* STATS */}
          <div className="flex gap-12 mt-12 pt-10 border-t border-white/10">
            {[['60+', 'Interior Projects'], ['100%', 'Turnkey Delivery'], ['2yr', 'Post-Handover Support']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: 'clamp(22px, 2.5vw, 36px)', color: '#00adee', lineHeight: 1 }}>{num}</div>
                <div style={{ fontFamily: "'Poppins'", fontWeight: 400, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginTop: 5 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(0deg, #fff 0%, transparent 100%)' }} />
      </div>

      {/* WHAT WE OFFER */}
      <div style={{ background: '#f8f9fa', padding: '64px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {[
            { icon: '🛋️', title: 'Living Spaces', desc: 'Open-plan living rooms designed for comfort and elegance.' },
            { icon: '🍳', title: 'Modular Kitchens', desc: 'Full modular setups from shell to smart storage solutions.' },
            { icon: '🛏️', title: 'Bedrooms', desc: 'Wardrobe systems, headboards, and ambient lighting tailored to you.' },
            { icon: '🚿', title: 'Bathrooms', desc: 'Luxury fittings, tile work, and bespoke vanity units.' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '32px 24px', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#00adee'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{item.icon}</div>
              <h3 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: 13, color: '#111827', margin: '0 0 8px' }}>{item.title}</h3>
              <p style={{ fontFamily: "'Poppins'", fontWeight: 300, fontSize: 12, color: '#6b7280', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PROJECTS */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-accent" />
            <span className="text-muted text-xs uppercase tracking-widest font-ui">Filter by City</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {CITIES.map(c => (
              <button key={c} onClick={() => setCity(c)}
                className={`px-4 py-2 text-[10px] uppercase tracking-widest border transition-all duration-250 font-ui font-700
                  ${city === c ? 'bg-accent text-white border-accent' : 'border-border text-muted hover:text-accent hover:border-accent bg-white'}`}
                style={{ letterSpacing: '0.2em' }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-2 border-border border-t-accent rounded-full animate-spin mx-auto mb-4" />
            <span className="text-muted text-xs tracking-widest font-ui uppercase">Loading...</span>
          </div>
        )}

        {!loading && error && <div className="text-center py-20 text-red-500 text-sm">{error}</div>}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 border border-border flex items-center justify-center mx-auto text-2xl mb-4">🛋️</div>
            <p className="text-muted uppercase tracking-widest text-xs font-ui mb-4">No interior projects found.</p>
            <Link to="/portfolio" className="text-accent border border-accent px-5 py-2 text-xs font-ui hover:bg-accent/5 transition-colors">
              View All Projects
            </Link>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            {filtered.map(p => (
              <BeforeAfterSlider
                key={p._id}
                title={p.title}
                beforeImg={p.images?.before}
                afterImg={p.images?.after}
                category={p.city}
                year={p.year}
              />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg, #0a0e17 0%, #0d1f35 100%)', padding: '80px 48px', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Poppins'", fontSize: 10, fontWeight: 500, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#00adee', marginBottom: 16 }}>Transform Your Space</p>
        <h2 style={{ fontFamily: "'Poppins'", fontWeight: 300, fontSize: 'clamp(28px, 4vw, 52px)', color: '#fff', margin: '0 0 32px' }}>
          Ready to redesign your <span style={{ color: '#00adee', fontWeight: 700 }}>interior?</span>
        </h2>
        <Link to="/contact"
          style={{
            display: 'inline-block', textDecoration: 'none',
            fontFamily: "'Poppins'", fontSize: 11, fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            background: '#00adee', color: '#fff', padding: '16px 48px',
            boxShadow: '0 8px 32px rgba(0,173,238,0.35)', transition: 'all 0.25s',
          }}>
          Get a Free Consultation →
        </Link>
      </div>
    </div>
  );
};

export default Interiors;