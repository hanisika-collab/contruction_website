import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import Pricing from '../components/Pricing';

const CITIES = ['All', 'Bangalore', 'Chennai', 'Hyderabad', 'Coimbatore'];

const Home = () => {
  const [city,     setCity]     = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('http://localhost:5000/api/projects')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => { setProjects(data.data || []); setLoading(false); })
      .catch(() => { setError('Failed to load projects.'); setLoading(false); });
  }, []);

  const filteredProjects =
    city === 'All' ? projects : projects.filter(p => p.city === city);

  return (
    <>
      <Hero />

      {/* ── OUR WORKS SECTION ─────────────────────────── */}
      <section id="projects" className="bg-white px-6 md:px-12 py-28 relative overflow-hidden">

        {/* Subtle accent gradient top-right */}
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: '35vw', height: '35vw',
            background: 'radial-gradient(circle, rgba(0,173,238,0.04) 0%, transparent 65%)',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* HEADER */}
          <div className="mb-14">
            <p className="text-xs uppercase text-accent mb-3 flex items-center gap-3 font-ui font-600" style={{ letterSpacing: '0.35em' }}>
              <span className="w-8 h-px bg-accent" />
              Transformations
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="font-display text-text font-700" style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}>
                Our <span className="text-accent italic">Work</span>
              </h2>
              <p className="text-muted text-sm max-w-xs leading-relaxed font-body">
                Drag the slider to witness the transformation — before meets after.
              </p>
            </div>

            {/* ACCENT RULE */}
            <div className="mt-6 flex items-center gap-4">
              <div className="section-line" />
              <div className="h-px flex-1 bg-border" />
            </div>
          </div>

          {/* CITY FILTER */}
          <div className="flex flex-wrap gap-2 mb-16">
            {CITIES.map(c => (
              <button
                key={c}
                onClick={() => setCity(c)}
                className={`
                  px-5 py-2.5 text-[10px] uppercase tracking-widest border transition-all duration-250 font-ui font-700
                  ${city === c
                    ? 'bg-accent text-white border-accent shadow-accent'
                    : 'border-border text-muted hover:text-accent hover:border-accent bg-white'}
                `}
                style={{ letterSpacing: '0.2em' }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* LOADING */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-border border-t-accent rounded-full animate-spin" />
                <span className="text-muted text-xs tracking-widest font-ui uppercase">Loading projects...</span>
              </div>
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="text-center py-20 text-red-500 text-sm font-body">{error}</div>
          )}

          {/* EMPTY */}
          {!loading && !error && filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 border border-border flex items-center justify-center mx-auto text-2xl mb-4">🏠</div>
              <p className="text-muted uppercase tracking-widest text-xs font-ui">
                No projects found for this city.
              </p>
            </div>
          )}

          {/* PROJECTS */}
          {!loading && !error && filteredProjects.length > 0 &&
            filteredProjects.map(p => (
              <BeforeAfterSlider
                key={p._id}
                title={p.title}
                beforeImg={p.images?.before}
                afterImg={p.images?.after}
                category={p.city}
                year={p.year}
              />
            ))
          }

        </div>
      </section>

      <Pricing />
    </>
  );
};

export default Home;