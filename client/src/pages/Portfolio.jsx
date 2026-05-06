import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

const CITIES = ['All', 'Bangalore', 'Krishnagiri'];
const CATEGORIES = ['All', 'Residential', 'Commercial', 'Interior'];

const Portfolio = () => {
  const [city,     setCity]     = useState('All');
  const [category, setCategory] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('http://localhost:5000/api/projects')
      .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
      .then(data => { setProjects(data.data || []); setLoading(false); })
      .catch(() => { setError('Failed to load projects.'); setLoading(false); });
  }, []);

  const filtered = projects.filter(p => {
    const cityMatch     = city === 'All'     || p.city     === city;
    const categoryMatch = category === 'All' || p.category === category;
    return cityMatch && categoryMatch;
  });

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
            <span className="text-accent font-700">Portfolio</span>
          </nav>

          <p className="text-xs uppercase text-accent mb-4 flex items-center gap-3 font-ui font-600"
            style={{ letterSpacing: '0.35em' }}>
            <span className="w-8 h-px bg-accent/70" />
            Before & After Transformations
          </p>
          <h1 className="text-white font-display font-700" style={{ fontSize: 'clamp(48px, 7vw, 100px)' }}>
            Our <span className="text-accent italic">Portfolio</span>
          </h1>
          <p className="text-white/45 text-sm mt-4 max-w-sm leading-relaxed font-body">
            Drag the slider on each project to witness the full transformation.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(0deg, #fff 0%, transparent 100%)' }} />
      </div>

      {/* CONTENT */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">

        {/* FILTERS */}
        <div className="mb-10 flex flex-wrap gap-6 items-start">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted font-ui mb-3">City</p>
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
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted font-ui mb-3">Category</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`px-4 py-2 text-[10px] uppercase tracking-widest border transition-all duration-250 font-ui font-700
                    ${category === cat ? 'bg-accent text-white border-accent' : 'border-border text-muted hover:text-accent hover:border-accent bg-white'}`}
                  style={{ letterSpacing: '0.2em' }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* COUNT */}
        {!loading && !error && (
          <div className="mb-10 flex items-center gap-4">
            <div className="w-8 h-px bg-accent" />
            <span className="text-muted text-xs uppercase tracking-widest font-ui">
              {filtered.length} project{filtered.length !== 1 ? 's' : ''} found
            </span>
          </div>
        )}

        {loading && (
          <div className="text-center py-20">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-border border-t-accent rounded-full animate-spin" />
              <span className="text-muted text-xs tracking-widest font-ui uppercase">Loading projects...</span>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-20 text-red-500 text-sm font-body">{error}</div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 border border-border flex items-center justify-center mx-auto text-2xl mb-4">🏠</div>
            <p className="text-muted uppercase tracking-widest text-xs font-ui">No projects found for this filter.</p>
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
                category={`${p.city}${p.category ? ' · ' + p.category : ''}`}
                year={p.year}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Portfolio;