import React, { useRef, useState, useEffect, useCallback } from 'react';

/* ─── REVIEW DATA ─────────────────────────────────────────────────────────── */
const REVIEWS = [
  {
    id: 1,
    name: 'Arjun Mehta',
    location: 'Bangalore',
    project: 'Residential Villa',
    rating: 5,
    text: 'MakeBuilders delivered our dream home with exceptional precision. Every detail — from the Italian marble flooring to the smart home integration — exceeded our expectations. Truly a luxury experience.',
    initials: 'AM',
    color: '#00adee',
  },
  {
    id: 2,
    name: 'Priya Nair',
    location: 'Chennai',
    project: 'Interior Renovation',
    rating: 5,
    text: 'The before & after transformation of our living space is breathtaking. Their team understood our vision perfectly and executed it flawlessly. The false ceiling and LED accents are stunning.',
    initials: 'PN',
    color: '#0078ba',
  },
  {
    id: 3,
    name: 'Suresh Reddy',
    location: 'Hyderabad',
    project: 'Commercial Office',
    rating: 5,
    text: 'Our corporate office renovation was completed ahead of schedule. The quality of workmanship, attention to detail, and professionalism of the MakeBuilders team is unparalleled in the industry.',
    initials: 'SR',
    color: '#00adee',
  },
  {
    id: 4,
    name: 'Kavitha Sharma',
    location: 'Coimbatore',
    project: 'Modular Kitchen',
    rating: 5,
    text: 'The modular kitchen they designed for us is nothing short of a masterpiece. Functional, elegant, and built to last. Our guests always compliment the craftsmanship. Worth every rupee.',
    initials: 'KS',
    color: '#0090c8',
  },
  {
    id: 5,
    name: 'Rajesh Iyer',
    location: 'Bangalore',
    project: 'Smart Home Build',
    rating: 5,
    text: 'From foundation to finishing, MakeBuilders managed every aspect of our 4BHK build with remarkable expertise. The smart home automation system they installed is seamless and intuitive.',
    initials: 'RI',
    color: '#0078ba',
  },
  {
    id: 6,
    name: 'Deepa Krishnan',
    location: 'Chennai',
    project: 'Luxury Apartment',
    rating: 4,
    text: 'Professional team, premium materials, on-time delivery. The Royale package was the perfect choice for our apartment. The granite flooring and concealed wiring give it a truly upscale feel.',
    initials: 'DK',
    color: '#00adee',
  },
  {
    id: 7,
    name: 'Venkat Raman',
    location: 'Hyderabad',
    project: 'Commercial Complex',
    rating: 5,
    text: 'Managed a complex 8,000 sq.ft commercial project for us with zero compromise on quality. Their project manager\'s communication was excellent throughout. Will definitely commission them again.',
    initials: 'VR',
    color: '#0090c8',
  },
  {
    id: 8,
    name: 'Anita Bose',
    location: 'Bangalore',
    project: 'Full Home Interiors',
    rating: 5,
    text: 'The complete interior design they did for our new home is simply gorgeous. Every room tells a story. The team blended modern aesthetics with our traditional preferences beautifully.',
    initials: 'AB',
    color: '#0078ba',
  },
  {
    id: 9,
    name: 'Karthik Sundaram',
    location: 'Coimbatore',
    project: 'Industrial Build',
    rating: 4,
    text: 'Our manufacturing facility was built to exact specifications with premium materials. MakeBuilders proved that industrial construction doesn\'t have to sacrifice aesthetics for functionality.',
    initials: 'KS',
    color: '#00adee',
  },
  {
    id: 10,
    name: 'Meena Pillai',
    location: 'Chennai',
    project: 'Villa Renovation',
    rating: 5,
    text: 'Renovating our 1980s villa was a massive undertaking. MakeBuilders preserved the character while bringing it completely up to date. The result is a home that feels both timeless and modern.',
    initials: 'MP',
    color: '#0090c8',
  },
  {
    id: 11,
    name: 'Sanjay Gupta',
    location: 'Bangalore',
    project: 'Elite Package Build',
    rating: 5,
    text: 'Chose the Elite package and it was the best decision we made. Kohler fittings, Kohler showers, Italian marble — every fixture is premium. The 2-year warranty gives complete peace of mind.',
    initials: 'SG',
    color: '#0078ba',
  },
  {
    id: 12,
    name: 'Lakshmi Rao',
    location: 'Hyderabad',
    project: 'Penthouse Interiors',
    rating: 5,
    text: 'Our penthouse interiors were handled with the sophistication the space demanded. The custom wardrobes, false ceilings, and ambient lighting create a hotel-like living experience every single day.',
    initials: 'LR',
    color: '#00adee',
  },
  {
    id: 13,
    name: 'Harish Kumar',
    location: 'Bangalore',
    project: 'Office Interior',
    rating: 4,
    text: 'The workspace MakeBuilders created for our startup is both inspiring and functional. Client meetings in our new conference room have a completely different energy. Highly recommend their commercial work.',
    initials: 'HK',
    color: '#0090c8',
  },
  {
    id: 14,
    name: 'Shobha Menon',
    location: 'Coimbatore',
    project: 'Classic Package',
    rating: 5,
    text: 'Even the Classic package delivers outstanding quality. Vitrified tile flooring, weather shield paint, standard CP fittings — everything is top-notch. Value for money is extraordinary with MakeBuilders.',
    initials: 'SM',
    color: '#0078ba',
  },
  {
    id: 15,
    name: 'Dinesh Patel',
    location: 'Hyderabad',
    project: 'Row House Complex',
    rating: 5,
    text: 'Developed 12 row houses with MakeBuilders. Their ability to maintain consistent quality across all units while meeting our aggressive timeline was impressive. All units sold within weeks of completion.',
    initials: 'DP',
    color: '#00adee',
  },
  {
    id: 16,
    name: 'Asha Balakrishnan',
    location: 'Chennai',
    project: 'Kitchen & Bath',
    rating: 5,
    text: 'The kitchen and bathroom renovation they did for us completely transformed our daily life. The Jaquar fittings in the bathrooms and the modular kitchen shell are both beautiful and highly practical.',
    initials: 'AB',
    color: '#0090c8',
  },
  {
    id: 17,
    name: 'Mohan Srinivas',
    location: 'Bangalore',
    project: 'Residential Plot Build',
    rating: 4,
    text: 'Building from scratch on our plot in Whitefield, MakeBuilders handled all BBMP approvals and clearances seamlessly. Their turnkey approach removed all the stress from what can be a complex process.',
    initials: 'MS',
    color: '#0078ba',
  },
  {
    id: 18,
    name: 'Rekha Joshi',
    location: 'Coimbatore',
    project: 'Luxury Interiors',
    rating: 5,
    text: 'The attention to detail in their interior work is remarkable. Every corner, every finish is considered. Our home now looks like it belongs in an architecture magazine. Absolutely delighted.',
    initials: 'RJ',
    color: '#00adee',
  },
  {
    id: 19,
    name: 'Vikram Nambiar',
    location: 'Hyderabad',
    project: 'Smart Office Build',
    rating: 5,
    text: 'Our tech office needed a space as cutting-edge as our products. MakeBuilders delivered a fully automated, smart-enabled workspace with stunning aesthetics. Our team\'s productivity has visibly improved.',
    initials: 'VN',
    color: '#0090c8',
  },
  {
    id: 20,
    name: 'Geeta Sundaresan',
    location: 'Chennai',
    project: 'Solar + Construction',
    rating: 5,
    text: 'They integrated solar water heating and smart home features seamlessly into our build. The post-handover support has been excellent. MakeBuilders sets the gold standard for construction in South India.',
    initials: 'GS',
    color: '#0078ba',
  },
];

/* ─── STAR COMPONENT ──────────────────────────────────────────────────────── */
const StarRating = ({ rating }) => (
  <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
    {[1, 2, 3, 4, 5].map(i => (
      <svg
        key={i}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill={i <= rating ? '#F5A623' : 'none'}
        stroke={i <= rating ? '#F5A623' : '#d1d5db'}
        strokeWidth="1.2"
      >
        <path d="M7 1l1.545 3.09L12 4.636l-2.5 2.41.59 3.41L7 8.773l-3.09 1.682.59-3.41L2 4.636l3.455-.546z" />
      </svg>
    ))}
  </div>
);

/* ─── AVATAR ──────────────────────────────────────────────────────────────── */
const Avatar = ({ initials, color, size = 44 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: `${color}18`,
      border: `1.5px solid ${color}30`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      fontFamily: "'Poppins', sans-serif",
      fontSize: size * 0.32,
      fontWeight: 700,
      color: color,
      letterSpacing: '0.04em',
    }}
  >
    {initials}
  </div>
);

/* ─── SINGLE REVIEW CARD ──────────────────────────────────────────────────── */
const ReviewCard = ({ review, isVisible }) => {
  return (
    <div
      style={{
        width: 320,
        flexShrink: 0,
        background: '#ffffff',
        border: '1px solid #edf2f7',
        padding: '28px 28px 26px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.09)';
        e.currentTarget.style.borderColor = 'rgba(0,173,238,0.25)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = '#edf2f7';
        e.currentTarget.style.transform = isVisible ? 'translateY(0)' : 'translateY(20px)';
      }}
    >
      {/* ACCENT TOP BORDER */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${review.color}, transparent)`,
          opacity: 0.5,
        }}
      />

      {/* QUOTE MARK */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          right: 20,
          fontSize: 64,
          lineHeight: 1,
          fontFamily: 'Georgia, serif',
          color: 'rgba(0,173,238,0.06)',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        "
      </div>

      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Avatar initials={review.initials} color={review.color} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              color: '#111827',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {review.name}
          </div>
          <div
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 11,
              color: '#9ca3af',
              marginTop: 2,
              letterSpacing: '0.02em',
            }}
          >
            {review.location}
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>

      {/* REVIEW TEXT */}
      <p
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 13,
          lineHeight: 1.75,
          color: '#4b5563',
          margin: 0,
          flex: 1,
        }}
      >
        {review.text}
      </p>

      {/* PROJECT TAG */}
      {review.project && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingTop: 12, borderTop: '1px solid #f3f4f6' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1.5L10.5 4.5V10.5H7.5V7.5H4.5V10.5H1.5V4.5L6 1.5Z" stroke={review.color} strokeWidth="1" strokeLinejoin="round" fill="none"/>
          </svg>
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 10,
              fontWeight: 600,
              color: review.color,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
            }}
          >
            {review.project}
          </span>
        </div>
      )}
    </div>
  );
};

/* ─── MAIN REVIEWS COMPONENT ──────────────────────────────────────────────── */
const Reviews = ({ autoScroll = true, speed = 0.5 }) => {
  const trackRef    = useRef(null);
  const sectionRef  = useRef(null);
  const animFrameRef = useRef(null);
  const offsetRef   = useRef(0);
  const isPausedRef = useRef(false);
  const touchStartX = useRef(0);
  const touchOffsetRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);


  /* ─── Intersection Observer for section reveal ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* ─── Infinite auto-scroll animation ── */
  const CARD_WIDTH  = 320 + 20; // card + gap
  const TOTAL_WIDTH = REVIEWS.length * CARD_WIDTH;

  useEffect(() => {
    if (!autoScroll) return;
    const track = trackRef.current;
    if (!track) return;

    const animate = () => {
      if (!isPausedRef.current) {
        offsetRef.current += speed;
        if (offsetRef.current >= TOTAL_WIDTH) {
          offsetRef.current -= TOTAL_WIDTH;
        }
        if (track) {
          track.style.transform = `translateX(-${offsetRef.current}px)`;
        }
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [autoScroll, speed, TOTAL_WIDTH]);

  /* ─── Touch / mouse drag to scrub ── */
  const handleMouseEnter  = () => { isPausedRef.current = true; };
  const handleMouseLeave  = () => { isPausedRef.current = false; };

  const handleTouchStart  = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchOffsetRef.current = offsetRef.current;
    isPausedRef.current = true;
  };
  const handleTouchMove   = (e) => {
    const delta = touchStartX.current - e.touches[0].clientX;
    offsetRef.current = touchOffsetRef.current + delta;
    if (offsetRef.current < 0) offsetRef.current += TOTAL_WIDTH;
    if (offsetRef.current >= TOTAL_WIDTH) offsetRef.current -= TOTAL_WIDTH;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
    }
  };
  const handleTouchEnd    = () => { isPausedRef.current = false; };

  /* ─── Manual nav arrows ── */
  const scroll = useCallback((dir) => {
    isPausedRef.current = true;
    offsetRef.current += dir * CARD_WIDTH;
    if (offsetRef.current < 0) offsetRef.current += TOTAL_WIDTH;
    if (offsetRef.current >= TOTAL_WIDTH) offsetRef.current -= TOTAL_WIDTH;
    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.45s cubic-bezier(0.22,1,0.36,1)';
      trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
      setTimeout(() => {
        if (trackRef.current) trackRef.current.style.transition = 'none';
        isPausedRef.current = false;
      }, 480);
    }
  }, [CARD_WIDTH, TOTAL_WIDTH]);

  /* ─── Duplicate reviews for seamless loop ── */
  const loopedReviews = [...REVIEWS, ...REVIEWS, ...REVIEWS];

  return (
    <section
      ref={sectionRef}
      id="reviews"
      style={{
        background: '#f8f9fa',
        padding: '96px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* TOP RULE */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: '#e5e7eb' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: '#e5e7eb' }} />

      {/* SUBTLE BG DECORATION */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '-5%',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, rgba(0,173,238,0.04) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* ─── HEADER ─────────────────────────────────────── */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 48px',
          marginBottom: 52,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>

          <div>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: '#00adee',
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span style={{ display: 'inline-block', width: 32, height: 1, background: '#00adee', verticalAlign: 'middle' }} />
              Client Stories
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(34px, 4.5vw, 58px)',
                fontWeight: 700,
                color: '#111827',
                lineHeight: 1,
                margin: 0,
              }}
            >
              What Our Clients{' '}
              <span style={{ color: '#00adee', fontStyle: 'italic' }}>Say</span>
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {/* RATING SUMMARY */}
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 40,
                  fontWeight: 700,
                  color: '#111827',
                  lineHeight: 1,
                }}
              >
                4.9
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 2, margin: '6px 0 4px' }}>
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#F5A623">
                    <path d="M7 1l1.545 3.09L12 4.636l-2.5 2.41.59 3.41L7 8.773l-3.09 1.682.59-3.41L2 4.636l3.455-.546z" />
                  </svg>
                ))}
              </div>
              <div
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 11,
                  color: '#9ca3af',
                  letterSpacing: '0.05em',
                }}
              >
                {REVIEWS.length} verified reviews
              </div>
            </div>

            {/* NAV ARROWS */}
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { dir: -1, icon: 'M9 6L5 10l4 4' },
                { dir:  1, icon: 'M5 6l4 4-4 4' },
              ].map(({ dir, icon }) => (
                <button
                  key={dir}
                  onClick={() => scroll(dir)}
                  style={{
                    width: 44,
                    height: 44,
                    background: '#ffffff',
                    border: '1.5px solid #e5e7eb',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
                    borderRadius: 0,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#00adee';
                    e.currentTarget.style.background = '#f0faff';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  aria-label={dir === -1 ? 'Previous reviews' : 'Next reviews'}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d={icon.replace(/(\d+)/g, n => String(Number(n) + 3))} stroke="#00adee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ─── CAROUSEL TRACK ─────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.3s',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* LEFT FADE MASK */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 80,
            background: 'linear-gradient(90deg, #f8f9fa, transparent)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />
        {/* RIGHT FADE MASK */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 80,
            background: 'linear-gradient(-90deg, #f8f9fa, transparent)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        {/* INNER OVERFLOW CONTAINER */}
        <div
          style={{
            overflow: 'hidden',
            paddingBottom: 4,
          }}
        >
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: 20,
              willChange: 'transform',
              paddingLeft: 48,
              paddingRight: 48,
            }}
          >
            {loopedReviews.map((review, idx) => (
              <ReviewCard
                key={`${review.id}-${idx}`}
                review={review}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ─── BOTTOM CTA ─────────────────────────────────── */}
      <div
        style={{
          maxWidth: 1200,
          margin: '52px auto 0',
          padding: '0 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s',
        }}
      >
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 13,
            color: '#9ca3af',
            margin: 0,
          }}
        >
          Trusted by 240+ homeowners and businesses across South India
        </p>
        <a
          href="#contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#00adee',
            color: '#fff',
            padding: '12px 28px',
            fontFamily: "'Poppins', sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 16px rgba(0,173,238,0.25)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#0090c8';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,173,238,0.35)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#00adee';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,173,238,0.25)';
          }}
        >
          Start Your Project
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

    </section>
  );
};

export default Reviews;