import React, { useState } from 'react';
import Hero from '../components/Hero';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import Pricing from '../components/Pricing';

// ✅ IMPORT IMAGES
import b1 from '../assets/projects/houebefore1.png';
import a1 from '../assets/projects/houseafter1.png';

import b2 from '../assets/projects/housebefore2.png';
import a2 from '../assets/projects/houseafter2.png';

import b3 from '../assets/projects/housebefore3.png';
import a3 from '../assets/projects/houseafter3.png';

import b4 from '../assets/projects/housebefore4.png';
import a4 from '../assets/projects/houseafter4.png';

const CITIES = ['All', 'Bangalore', 'Chennai', 'Hyderabad', 'Coimbatore'];

// ✅ LOCAL PROJECT DATA
const PROJECTS = [
  {
    id: 1,
    title: 'Luxury Villa Renovation',
    city: 'Bangalore',
    before: b1,
    after: a1,
    year: 2024,
  },
  {
    id: 2,
    title: 'Modern Interior Upgrade',
    city: 'Chennai',
    before: b2,
    after: a2,
    year: 2023,
  },
  {
    id: 3,
    title: 'Premium House Construction',
    city: 'Hyderabad',
    before: b3,
    after: a3,
    year: 2024,
  },
  {
    id: 4,
    title: 'Classic Home Makeover',
    city: 'Coimbatore',
    before: b4,
    after: a4,
    year: 2023,
  },
];

const Home = () => {
  const [city, setCity] = useState('All');

  const filteredProjects =
    city === 'All'
      ? PROJECTS
      : PROJECTS.filter(p => p.city === city);

  return (
    <>
      <Hero />

      <section id="projects" className="bg-[#111820] px-6 md:px-12 py-28">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.4em] text-[#D6A84F] mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#D6A84F]" />
              Transformations
            </p>

            <h2 className="text-white font-display text-[clamp(38px,5vw,70px)]">
              Our <span className="text-[#D6A84F]">Work</span>
            </h2>
          </div>

          {/* CITY FILTER */}
          <div className="flex flex-wrap gap-2 mb-16">
            {CITIES.map(c => (
              <button
                key={c}
                onClick={() => setCity(c)}
                className={`
                  px-4 py-2 text-xs uppercase tracking-widest border transition
                  ${
                    city === c
                      ? 'bg-[#D6A84F] text-black border-[#D6A84F]'
                      : 'border-white/10 text-white/40 hover:text-white'
                  }
                `}
              >
                {c}
              </button>
            ))}
          </div>

          {/* PROJECT DISPLAY */}
          {filteredProjects.map(p => (
            <BeforeAfterSlider
              key={p.id}
              title={p.title}
              beforeImg={p.before}
              afterImg={p.after}
              category={p.city}
              year={p.year}
            />
          ))}

        </div>
      </section>

      <Pricing />
    </>
  );
};

export default Home;