import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import Pricing from '../components/Pricing';
import Reviews from '../components/Review';
const CITIES = ['All', 'Bangalore', 'Krishnagiri'];

const Home = () => {
  const [city, setCity] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('http://localhost:5000/api/projects')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => { 
        setProjects(data.data || []); 
        setLoading(false); 
      })
      .catch(() => { 
        setError('Failed to load projects.'); 
        setLoading(false); 
      });
  }, []);

  const filteredProjects =
    city === 'All' ? projects : projects.filter(p => p.city === city);

  return (
    <div className="bg-white">
      <Hero />

      {/* ── OUR WORKS SECTION ─────────────────────────── */}
      {/* py-44 increases whitespace for a premium "gallery" feel */}
      <section id="projects" className="bg-white px-8 md:px-20 py-44 relative overflow-hidden">
        
        {/* Softer Radial Gradient Overlay */}
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: '45vw', height: '45vw',
            background: 'radial-gradient(circle, rgba(0,173,238,0.02) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-screen-2xl mx-auto relative z-10">

          {/* CENTERED HEADER - More high-end architectural studio feel */}
          <div className="mb-32 text-center">
            <div className="inline-flex flex-col items-center">
              <p className="text-[10px] uppercase text-accent/60 mb-6 flex items-center gap-4 font-ui font-400" style={{ letterSpacing: '0.5em' }}>
                <span className="w-6 h-px bg-accent/40" />
                Transformations
                <span className="w-6 h-px bg-accent/40" />
              </p>
              <h2 className="font-display text-text font-200 tracking-tight leading-none" style={{ fontSize: 'clamp(48px, 6vw, 92px)' }}>
                Our <span className="italic font-serif font-light">Portfolio</span>
              </h2>
              <div className="w-12 h-px bg-accent/20 mt-12 mb-8" />
              <p className="text-muted/60 text-xs max-w-sm leading-relaxed font-body tracking-wider uppercase">
                Interactive before and after project showcases.
              </p>
            </div>
          </div>

          {/* CITY FILTER - Minimalist link style instead of heavy buttons */}
          <div className="flex justify-center flex-wrap gap-10 mb-24 border-b border-gray-50 pb-10">
            {CITIES.map(c => (
              <button
                key={c}
                onClick={() => setCity(c)}
                className={`
                  relative text-[10px] uppercase tracking-[0.3em] transition-all duration-500 font-ui
                  ${city === c ? 'text-accent' : 'text-muted/50 hover:text-text'}
                `}
              >
                {c}
                {city === c && (
                  <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
                )}
              </button>
            ))}
          </div>

          {loading && (
            <div className="text-center py-32">
              <div className="inline-flex flex-col items-center gap-6">
                <div className="w-8 h-8 border-t-2 border-accent/30 rounded-full animate-spin" />
                <span className="text-muted/40 text-[9px] tracking-[0.4em] font-ui uppercase">Fetching Archive</span>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-20 text-red-400 text-xs font-ui tracking-widest uppercase">{error}</div>
          )}

          {!loading && !error && filteredProjects.length === 0 && (
            <div className="text-center py-32 border border-gray-50">
              <p className="text-muted/40 uppercase tracking-[0.3em] text-[10px] font-ui">
                No archived projects in {city}
              </p>
            </div>
          )}

          {!loading && !error && filteredProjects.length > 0 && (
            <div style={{ maxWidth: 1000, margin: '0 auto' }} className="grid gap-40">
              {filteredProjects.slice(0, 4).map(p => (
                <div key={p._id} className="premium-card transition-all duration-1000">
                  <BeforeAfterSlider
                    title={p.title}
                    beforeImg={p.images?.before}
                    afterImg={p.images?.after}
                    category={p.city}
                    year={p.year}
                  />
                </div>
              ))}

              {filteredProjects.length > 4 && (
                <div className="text-center pt-10">
                  <Link to="/portfolio"
                    className="inline-block border border-accent/20 text-accent px-12 py-5 text-[10px] uppercase tracking-[0.3em] font-ui font-500 hover:bg-accent hover:text-white transition-all duration-500"
                    style={{ textDecoration: 'none' }}>
                    View Full Archive ({filteredProjects.length})
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Spacing adjustment for the Pricing section transition */}
      <div className="py-20 bg-gray-50/30" />
      <Pricing />

      <Reviews/>
    </div>
  );
};

export default Home;