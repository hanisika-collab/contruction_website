import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';

const CardSkeleton = () => (
  <div className="animate-pulse bg-surface border border-border">
    <div className="bg-border" style={{ aspectRatio: '4/3' }} />
    <div className="p-5 space-y-3">
      <div className="h-3 w-2/3 bg-border rounded" />
      <div className="h-2 w-full bg-border rounded" />
      <div className="h-2 w-4/5 bg-border rounded" />
    </div>
  </div>
);

const CITY_TAGLINES = {
  Bangalore:  'Silicon Valley of India, built with precision.',
  Chennai:    'Heritage meets modernity.',
  Hyderabad:  'The city of pearls deserves exceptional homes.',
  Coimbatore: 'Industrial spirit, luxury finish.',
};

const CityDetails = () => {
  const { cityName } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cityName) return;
    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:5000/api/projects/city/${cityName}`)
      .then(res => { setProjects(res.data.data || []); setLoading(false); })
      .catch(() => { setError('Failed to load projects.'); setLoading(false); });
  }, [cityName]);

  const tagline = CITY_TAGLINES[cityName] || 'Luxury builds crafted to last.';
  const count = String(projects.length).padStart(2, '0');

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <div className="relative px-6 md:px-12 pt-32 pb-20 bg-surface border-b border-border overflow-hidden">

        {/* ACCENT GLOW */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-20%', right: '-5%',
            width: '50vw', height: '50vw',
            background: 'radial-gradient(circle, rgba(0,173,238,0.07) 0%, transparent 65%)',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* BREADCRUMB */}
          <nav className="flex items-center gap-2 mb-10 text-xs uppercase tracking-widest font-ui">
            <Link to="/" className="text-muted hover:text-accent transition-colors">Home</Link>
            <span className="text-border">›</span>
            <span className="text-accent font-700">{cityName}</span>
          </nav>

          <div className="flex flex-wrap justify-between items-end gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-accent mb-4 flex items-center gap-3 font-ui">
                <span className="w-8 h-px bg-accent" />
                City Portfolio
              </p>
              <h1 className="text-text font-display" style={{ fontSize: 'clamp(48px, 7vw, 100px)' }}>
                {cityName}
              </h1>
              <p className="text-muted text-sm mt-4 max-w-sm leading-relaxed">
                {tagline}
              </p>
            </div>

            {!loading && (
              <span
                className="hidden md:block font-display font-700 leading-none select-none"
                style={{ fontSize: 'clamp(80px, 12vw, 160px)', color: 'rgba(0,173,238,0.1)' }}
              >
                {count}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">

        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1,2,3].map(i => <CardSkeleton key={i} />)}
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-24">
            <p className="text-red-500">{error}</p>
            <Link to="/" className="mt-6 inline-block border border-accent text-accent px-5 py-2 hover:bg-accent/5 transition-colors">
              ← Back to Home
            </Link>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-24 space-y-4">
            <div className="w-16 h-16 border border-border flex items-center justify-center mx-auto text-2xl">
              🏠
            </div>
            <p className="text-muted uppercase tracking-widest text-sm font-ui">
              No Projects in {cityName} yet
            </p>
            <Link to="/" className="inline-block text-accent border border-accent px-5 py-2 hover:bg-accent/5 transition-colors text-sm font-ui">
              View All Projects
            </Link>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map(p => (
              <ProjectCard key={p._id} {...p} />
            ))}
          </div>
        )}

      </section>
    </div>
  );
};

export default CityDetails;