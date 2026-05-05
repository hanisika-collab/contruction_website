import React, { useState } from 'react';

const ProjectCard = ({ title, description, city, category, images, pricing, isFeatured }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col bg-white border border-border overflow-hidden transition-all duration-400 hover:border-accent hover:shadow-lg hover:shadow-accent/10"
    >

      {/* IMAGE */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>

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
            hovered ? 'opacity-100 scale-100 grayscale brightness-75' : 'opacity-0 scale-105'
          }`}
        />

        {/* HOVER LABEL */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-xs uppercase tracking-widest px-4 py-2 border border-white bg-black/40 backdrop-blur text-white font-ui font-700">
            Before
          </span>
        </div>

        {/* FEATURED BADGE */}
        {isFeatured && (
          <div className="absolute top-3 left-3 bg-accent text-white text-[10px] px-2 py-1 uppercase tracking-wider font-ui font-700">
            Featured
          </div>
        )}

        {/* TAGS */}
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          {[category, city].filter(Boolean).map(tag => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-widest px-2 py-1 bg-white/90 backdrop-blur text-text font-ui font-600"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-5">

        <h3 className="text-sm uppercase tracking-widest text-text font-ui font-700 mb-2">
          {title}
        </h3>

        {description && (
          <p className="text-muted text-sm mb-4 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {/* PRICE */}
        {pricing?.packageType && (
          <div className="flex justify-between items-center border-t border-border pt-4 mt-auto">
            <span className="text-xs uppercase tracking-widest text-muted font-ui">
              {pricing.packageType} Package
            </span>
            {pricing.totalCost && (
              <span className="text-accent font-ui font-700 text-sm">
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