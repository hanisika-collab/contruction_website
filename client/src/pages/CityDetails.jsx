import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';

const CardSkeleton = () => (
  <div className="animate-pulse bg-surface border border-white/10">
    <div className="aspect-[4/3] bg-white/10" />
    <div className="p-6 space-y-3">
      <div className="h-3 w-2/3 bg-white/20 rounded" />
      <div className="h-2 w-full bg-white/10 rounded" />
      <div className="h-2 w-4/5 bg-white/10 rounded" />
    </div>
  </div>
);

const CITY_TAGLINES = {
  Bangalore: 'Silicon Valley of India, built with precision.',
  Chennai: 'Heritage meets modernity.',
  Hyderabad: 'The city of pearls deserves homes.',
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
      .then(res => {
        setProjects(res.data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load projects.');
        setLoading(false);
      });
  }, [cityName]);

  const tagline = CITY_TAGLINES[cityName] || 'Luxury builds crafted to last.';
  const count = String(projects.length).padStart(2, '0');

  return (
    <div className="min-h-screen bg-primary">

      {/* HERO */}
      <div className="relative px-6 md:px-12 pt-32 pb-20 bg-surface border-b border-white/10 overflow-hidden">

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_60%_50%,rgba(197,160,89,0.08)_0%,transparent_70%)]" />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-3 mb-10 text-xs uppercase tracking-widest">
            <Link to="/" className="text-white/40 hover:text-accent">Home</Link>
            <span className="text-white/20">›</span>
            <span className="text-accent">{cityName}</span>
          </nav>

          <div className="flex flex-wrap justify-between items-end gap-6">

            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-accent mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-accent" />
                City Portfolio
              </p>

              <h1 className="text-white font-display text-[clamp(48px,7vw,100px)]">
                {cityName}
              </h1>

              <p className="text-white/40 text-sm mt-4 max-w-sm">
                {tagline}
              </p>
            </div>

            {!loading && (
              <span className="hidden md:block text-accent/20 font-display text-[clamp(80px,12vw,160px)]">
                {count}
              </span>
            )}

          </div>
        </div>
      </div>

      {/* CONTENT */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">

        {/* LOADING */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map(i => <CardSkeleton key={i} />)}
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="text-center py-24">
            <p className="text-red-400">{error}</p>
            <Link to="/" className="mt-6 inline-block border border-accent px-5 py-2 text-accent hover:bg-accent/10">
              ← Back
            </Link>
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-24 space-y-4">

            <div className="w-16 h-16 border border-white/10 flex items-center justify-center mx-auto">
              🏠
            </div>

            <p className="text-white/30 uppercase tracking-widest text-sm">
              No Projects in {cityName}
            </p>

            <Link to="/" className="text-accent border border-accent px-5 py-2 hover:bg-accent/10">
              View All
            </Link>

          </div>
        )}

        {/* GRID */}
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