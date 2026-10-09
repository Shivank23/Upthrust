import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PageContent } from '../types';
const VENUS_BUST_WEBP = '/images/venus_bust_facing_left.webp';
const VENUS_BUST_PNG = '/images/venus_bust_facing_left.png';

interface HeroProps {
  content: PageContent['hero'];
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ content, onContactClick }) => {
  const { scrollY } = useScroll();
  // Subtle scroll parallax that adds physical depth without causing layout shift
  const yBustParallax = useTransform(scrollY, [0, 600], [0, 45]);
  const opacityBust = useTransform(scrollY, [0, 700], [1, 0.75]);

  return (
    <section 
      className="relative w-full bg-transparent select-none overflow-hidden"
      aria-label="Upthrust Hero: Bold Design That Performs"
    >
      {/* Precision Crosshair (+) Markers */}
      <div className="absolute inset-0 pointer-events-none hidden md:block z-0" aria-hidden="true">
        <span className="absolute top-[8px] left-[80px] text-neutral-300 font-mono text-sm leading-none">+</span>
        <span className="absolute top-[8px] left-[50%] text-neutral-300 font-mono text-sm leading-none -translate-x-1/2">+</span>
        <span className="absolute top-[8px] right-[80px] text-neutral-300 font-mono text-sm leading-none">+</span>
        <span className="absolute top-[160px] left-[160px] text-neutral-300 font-mono text-sm leading-none">+</span>
        <span className="absolute top-[160px] right-[160px] text-neutral-300 font-mono text-sm leading-none">+</span>
        <span className="absolute top-[320px] left-[80px] text-neutral-300 font-mono text-sm leading-none">+</span>
        <span className="absolute top-[320px] right-[240px] text-neutral-300 font-mono text-sm leading-none">+</span>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-3 sm:px-8 lg:px-12 pt-4 sm:pt-8 pb-8 sm:pb-14 z-10 flex flex-col items-center">
        
        {/* 1. TOP HEADLINE: "BOLD DESIGN" (Instant paint for optimal LCP & FCP) */}
        <h1 
          className="w-full text-center relative z-20 m-0 p-0 font-anton font-black italic tracking-[-0.035em] uppercase text-[15vw] sm:text-[14vw] md:text-[13vw] lg:text-[160px] xl:text-[180px] leading-[0.88] select-none flex items-center justify-center gap-2 sm:gap-6 md:gap-8 flex-wrap"
        >
          <span className="hero-display-text hero-title-enter">
            {content.topTitle?.split(' ')[0] || 'BOLD'}
          </span>
          <span className="hero-display-text hero-title-enter" style={{ animationDelay: '0.08s' }}>
            {content.topTitle?.split(' ')[1] || 'DESIGN'}
          </span>
        </h1>

        {/* 2. CENTER STAGE: Aphrodite / Venus Bust flanked by editorial annotations */}
        <div className="relative w-full -mt-2 sm:-mt-8 md:-mt-12 -mb-2 sm:-mb-8 md:-mb-12 min-h-[250px] xs:min-h-[290px] sm:min-h-[420px] md:min-h-[480px] flex items-center justify-between">
          
          {/* LEFT COLUMN: Annotations */}
          <div 
            className="z-20 flex flex-col justify-center gap-3 xs:gap-5 sm:gap-10 pl-0 xs:pl-1 sm:pl-4 max-w-[105px] xs:max-w-[140px] sm:max-w-[200px]"
          >
            {/* STRATEGY IS CHEAPER */}
            <div className="relative inline-block">
              <span className="block font-black text-[10px] xs:text-xs sm:text-sm tracking-wider text-black uppercase">
                {content.annotationLeftTop || 'STRATEGY IS'}
              </span>
              <div className="relative inline-block mt-0.5">
                <span className="font-black text-[10px] xs:text-xs sm:text-sm tracking-wider text-black uppercase">
                  {content.annotationLeftPillWord || 'CHEAPER'}
                </span>
                {/* Hand-drawn Orange Oval Callout Stroke with animated path drawing */}
                <svg 
                  aria-hidden="true"
                  className="absolute -inset-x-2 xs:-inset-x-3.5 -inset-y-1 xs:-inset-y-1.5 w-[calc(100%+16px)] xs:w-[calc(100%+28px)] h-[calc(100%+10px)] xs:h-[calc(100%+14px)] pointer-events-none" 
                  viewBox="0 0 120 40" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path 
                    d="M10 21C10 10 32 4 64 4C96 4 114 11 114 21C114 31 90 37 56 37C22 37 6 30 7 19C8 10 30 5 60 5" 
                    stroke="#FF3D00" 
                    strokeWidth="2.4" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
                  />
                </svg>
              </div>
            </div>

            {/* IDENTITY · EXPERIENCE · MOTION · */}
            <div className="space-y-1 xs:space-y-1.5 text-black font-black text-xs xs:text-sm sm:text-base lg:text-lg tracking-wider uppercase">
              <div className="flex items-center gap-1 xs:gap-1.5">
                <span>IDENTITY</span>
                <span className="font-black text-lg xs:text-xl" aria-hidden="true">·</span>
              </div>
              <div className="flex items-center gap-1 xs:gap-1.5">
                <span>EXPERIENCE</span>
                <span className="font-black text-lg xs:text-xl" aria-hidden="true">·</span>
              </div>
              <div className="relative inline-block">
                <div className="flex items-center gap-1 xs:gap-1.5">
                  <span>MOTION</span>
                  <span className="font-black text-lg xs:text-xl" aria-hidden="true">·</span>
                </div>
                {/* Double Brush Underline with animated draw */}
                <svg 
                  aria-hidden="true"
                  className="absolute -bottom-2 xs:-bottom-2.5 left-0 w-20 xs:w-28 h-3.5 xs:h-4 pointer-events-none" 
                  viewBox="0 0 100 14" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path 
                    d="M2 7C14 2 26 12 38 6C50 1 62 11 74 6C82 3 90 8 96 6" 
                    stroke="#FF3D00" 
                    strokeWidth="3.2" 
                    strokeLinecap="round" 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.8, ease: "easeInOut" }}
                  />
                  <motion.path 
                    d="M6 11C20 8 35 13 48 10C60 7 75 12 90 9" 
                    stroke="#FF3D00" 
                    strokeWidth="1.8" 
                    strokeLinecap="round" 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.95, ease: "easeInOut" }}
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* CENTER: Classical Aphrodite / Venus Bust Sculpture with Floating Breathing Motion & Scroll Parallax */}
          <motion.div 
            style={{ 
              y: yBustParallax,
              opacity: opacityBust 
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-44 xs:w-56 sm:w-72 md:w-88 lg:w-[420px] xl:w-[460px] pointer-events-none select-none"
          >
            {/* Ambient Idle Floating Oscillation */}
            <motion.div
              animate={{ y: [-4, 6, -4] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.button
                type="button"
                onClick={onContactClick}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                aria-label="Click sculpture to initiate creative inquiry with Upthrust"
                className="w-full h-auto cursor-pointer pointer-events-auto filter contrast-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00] rounded-lg"
              >
                <picture>
                  <source srcSet={VENUS_BUST_WEBP} type="image/webp" />
                  <img
                    src={VENUS_BUST_PNG}
                    alt="Classical Greek sculpture with chromatic iridescent finish representing bold form"
                    width={460}
                    height={520}
                    style={{ aspectRatio: '460 / 520' }}
                    className="w-full h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.12)]"
                    loading="eager"
                    decoding="async"
                    // @ts-expect-error fetchpriority attribute
                    fetchpriority="high"
                  />
                </picture>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Annotations & Rotating Blueprint Schematic */}
          <div 
            className="z-20 flex flex-col justify-between h-full pr-0 xs:pr-1 sm:pr-4 text-right max-w-[105px] xs:max-w-[140px] sm:max-w-[200px]"
          >
            {/* COMFORTABLE IS EXPENSIVE */}
            <div className="relative inline-block self-end">
              <span className="block font-black text-[10px] xs:text-xs sm:text-sm tracking-wider text-black uppercase">
                {content.annotationRightTop || 'COMFORTABLE'}
              </span>
              <div className="relative inline-block mt-0.5">
                <span className="block font-black text-[10px] xs:text-xs sm:text-sm tracking-wider text-black uppercase">
                  {content.annotationRightSquiggleWord || 'IS EXPENSIVE'}
                </span>
                {/* Squiggly Underline with animated draw */}
                <svg 
                  aria-hidden="true"
                  className="absolute -bottom-1.5 xs:-bottom-2 right-0 w-24 xs:w-32 h-2.5 xs:h-3.5 pointer-events-none" 
                  viewBox="0 0 120 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path 
                    d="M2 6C15 2 28 10 42 5C56 1 70 10 84 5C98 1 106 8 116 5" 
                    stroke="#FF3D00" 
                    strokeWidth="3.2" 
                    strokeLinecap="round" 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.0, delay: 0.7, ease: "easeInOut" }}
                  />
                </svg>
              </div>
            </div>

            {/* Giant THAT Callout */}
            <div className="my-1.5 xs:my-3 sm:my-6 relative z-30">
              <span className="font-anton font-black italic text-4xl xs:text-5xl sm:text-7xl lg:text-[100px] xl:text-[116px] uppercase tracking-[-0.03em] leading-none inline-block select-none hero-display-text">
                {content.middleWord || 'THAT'}
              </span>
            </div>

            {/* Technical Blueprint Vector Drafting Schematic with continuous ambient slow rotation */}
            <div 
              aria-hidden="true"
              className="absolute right-[-10px] bottom-[-30px] sm:bottom-[-40px] w-36 xs:w-48 sm:w-64 md:w-76 lg:w-[340px] aspect-square pointer-events-none select-none z-0 opacity-40 sm:opacity-60"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                className="w-full h-full origin-center"
              >
                <svg viewBox="0 0 400 400" fill="none" className="w-full h-full text-neutral-400 stroke-current">
                  <circle cx="200" cy="200" r="180" strokeWidth="0.8" strokeDasharray="3 3" />
                  <circle cx="200" cy="200" r="150" strokeWidth="1" />
                  <circle cx="200" cy="200" r="110" strokeWidth="0.75" />
                  <circle cx="200" cy="200" r="75" strokeWidth="1.2" strokeDasharray="6 2" />
                  <circle cx="200" cy="200" r="35" strokeWidth="0.8" />
                  
                  {Array.from({ length: 48 }).map((_, i) => (
                    <line
                      key={i}
                      x1="200"
                      y1="15"
                      x2="200"
                      y2={i % 4 === 0 ? "35" : "25"}
                      strokeWidth={i % 4 === 0 ? "1.4" : "0.75"}
                      transform={`rotate(${i * 7.5} 200 200)`}
                    />
                  ))}

                  <line x1="200" y1="0" x2="200" y2="400" strokeWidth="0.6" strokeDasharray="5 5" />
                  <line x1="0" y1="200" x2="400" y2="200" strokeWidth="0.6" strokeDasharray="5 5" />
                  <polygon points="200,45 330,120 330,280 200,355 70,280 70,120" strokeWidth="0.8" strokeDasharray="3 3" />
                  <polygon points="200,90 295,145 295,255 200,310 105,255 105,145" strokeWidth="0.6" />
                  
                  <text x="215" y="45" fontSize="10" fontFamily="monospace" fill="#888">SEC-A // ISO-9001</text>
                  <text x="215" y="195" fontSize="9" fontFamily="monospace" fill="#888">Ø300.0 TOL ±0.01</text>
                </svg>
              </motion.div>
            </div>
          </div>

        </div>

        {/* 3. BOTTOM HEADLINE: "PERFORMS" */}
        <div className="w-full text-center relative z-20">
          <div 
            aria-hidden="true"
            className="font-anton font-black italic tracking-[-0.035em] uppercase text-[15vw] sm:text-[14vw] md:text-[13vw] lg:text-[160px] xl:text-[180px] leading-[0.88] select-none"
          >
            <span className="hero-display-text hero-title-enter" style={{ animationDelay: '0.12s' }}>
              {content.bottomTitle || 'PERFORMS'}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
