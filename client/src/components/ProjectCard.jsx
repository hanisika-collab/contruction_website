import React, { useState } from 'react';

const ProjectCard = ({ title, description, city, category, images, pricing, isFeatured }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col bg-white border border-border overflow-hidden card-lift"
      style={{
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.3s',
        ...(hovered ? {
          transform: 'translateY(-6px)',
          boxShadow: '0 24px 48px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,173,238,0.15)',
          borderColor: 'rgba(0,173,238,0.3)',
        } : {}),
      }}
    >

      {/* IMAGE */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>

        {/* AFTER */}
        <img
          src={images?.after}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          style={{
            opacity: hovered ? 0 : 1,
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        />

        {/* BEFORE */}
        <img
          src={images?.before}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'scale(1)' : 'scale(1.06)',
            filter: 'grayscale(0.6) brightness(0.75)',
          }}
        />

        {/* HOVER OVERLAY */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{
            background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%)',
            opacity: hovered ? 1 : 0,
          }}
        >
          <span className="text-[10px] uppercase tracking-widest px-4 py-2 border border-white/60 bg-black/30 backdrop-blur text-white font-ui font-700">
            Before
          </span>
        </div>

        {/* FEATURED BADGE */}
        {isFeatured && (
          <div
            className="absolute top-3 left-3 text-white text-[10px] px-3 py-1 uppercase tracking-wider font-ui font-700"
            style={{ background: 'linear-gradient(90deg,#00adee,#0090c8)' }}
          >
            Featured
          </div>
        )}

        {/* TAGS */}
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          {[category, city].filter(Boolean).map(tag => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-widest px-2.5 py-1 bg-white/90 backdrop-blur text-text font-ui font-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-sm uppercase tracking-widest text-text font-ui font-700 mb-2 transition-colors duration-200 group-hover:text-accent">
          {title}
        </h3>
        {description && (
          <p className="text-muted text-sm mb-4 line-clamp-2 leading-relaxed font-body">
            {description}
          </p>
        )}
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