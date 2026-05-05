import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import Pricing from '../components/Pricing';

const CITIES = ['All', 'Bangalore', 'Chennai', 'Hyderabad', 'Coimbatore'];

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
    city === 'All'
      ? projects
      : projects.filter(p => p.city === city);

  return (
    <>
      <Hero />

      {/* OUR WORKS SECTION */}
      <section id="projects" className="bg-white px-6 md:px-12 py-28">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-14">
            <p className="text-xs uppercase tracking-[0.4em] text-accent mb-4 flex items-center gap-3 font-ui">
              <span className="w-8 h-px bg-accent" />
              Transformations
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="font-display text-text" style={{ fontSize: 'clamp(38px, 5vw, 70px)' }}>
                Our <span className="text-accent italic">Work</span>
              </h2>
              <p className="text-muted text-sm max-w-xs leading-relaxed">
                Drag the slider to see the before & after of each transformation.
              </p>
            </div>
          </div>

          {/* CITY FILTER */}
          <div className="flex flex-wrap gap-2 mb-16">
            {CITIES.map(c => (
              <button
                key={c}
                onClick={() => setCity(c)}
                className={`
                  px-5 py-2 text-xs uppercase tracking-widest border transition-all duration-200 font-ui font-600
                  ${city === c
                    ? 'bg-accent text-white border-accent'
                    : 'border-border text-muted hover:text-accent hover:border-accent bg-white'}
                `}
              >
                {c}
              </button>
            ))}
          </div>

          {/* LOADING */}
          {loading && (
            <div className="text-center py-20 text-muted text-sm tracking-widest font-ui uppercase">
              Loading projects...
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="text-center py-20 text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* EMPTY */}
          {!loading && !error && filteredProjects.length === 0 && (
            <div className="text-center py-20 text-muted text-sm font-ui uppercase tracking-widest">
              No projects found for this city.
            </div>
          )}

          {/* PROJECTS LIST */}
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

      {/* DIVIDER */}
      <div className="h-px bg-border mx-12" />

      <Pricing />
    </>
  );
};

export default Home;