import React, { useState } from 'react';

const ProjectCard = ({ title, description, city, category, images, pricing, isFeatured }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col bg-surface border border-white/10 overflow-hidden transition-all duration-500 hover:border-accent/30"
    >

      {/* IMAGE */}
      <div className="relative overflow-hidden aspect-[4/3]">

        {/* AFTER */}
        <img
          src={images?.after}
          alt="After"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            hovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />

        {/* BEFORE */}
        <img
          src={images?.before}
          alt="Before"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            hovered ? 'opacity-100 scale-100 grayscale brightness-50' : 'opacity-0 scale-105'
          }`}
        />

        {/* HOVER LABEL */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <span className="text-xs uppercase tracking-widest px-4 py-2 border border-accent/40 bg-black/70 backdrop-blur text-accent">
            Before
          </span>
        </div>

        {/* FEATURED */}
        {isFeatured && (
          <div className="absolute top-3 left-3 bg-accent text-black text-xs px-2 py-1 uppercase tracking-wider">
            Featured
          </div>
        )}

        {/* TAGS */}
        <div className="absolute bottom-3 right-3 flex gap-2">
          {[category, city].filter(Boolean).map(tag => (
            <span
              key={tag}
              className="text-xs uppercase tracking-widest px-2 py-1 bg-black/70 backdrop-blur border border-white/10 text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-6">

        <h3 className="text-sm uppercase tracking-widest text-white mb-2">
          {title}
        </h3>

        {description && (
          <p className="text-white/40 text-sm mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* PRICE */}
        {pricing?.packageType && (
          <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
            <span className="text-xs uppercase tracking-widest text-white/30">
              {pricing.packageType} Package
            </span>

            {pricing.totalCost && (
              <span className="text-accent font-semibold">
                ₹{pricing.totalCost.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        )}

      </div>
    </article>
  );
};

export default ProjectCard;