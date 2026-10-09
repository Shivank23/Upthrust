import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageContent } from '../types';
import { TubeCanvas } from './TubeCanvas';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ServicesShowcaseProps {
  content: PageContent;
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({ 
  content, 
  onSelectService 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const services = content.services;
  const currentService = services[activeIndex] || services[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  return (
    <section 
      id="services" 
      className="relative w-full bg-black text-white pt-14 sm:pt-20 pb-20 sm:pb-28 overflow-hidden select-none"
      aria-label="What can we do for you: Services Showcase"
    >
      {/* 3D Glossy Metallic Orange Looping Ribbon Tube with subtle floating motion */}
      <motion.div 
        animate={{ y: [-4, 6, -4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-0 top-12 sm:top-16 z-0 pointer-events-none opacity-95"
      >
        <TubeCanvas />
      </motion.div>

      {/* Perspective Curved Wireframe Grid Background at Bottom */}
      <div className="absolute inset-x-0 bottom-0 h-80 sm:h-96 opacity-30 pointer-events-none select-none z-0">
        <svg viewBox="0 0 1440 380" fill="none" className="w-full h-full text-neutral-400 stroke-current">
          <path d="M0 380 Q720 200 1440 380" strokeWidth="0.8" />
          <path d="M0 320 Q720 160 1440 320" strokeWidth="0.75" />
          <path d="M0 260 Q720 120 1440 260" strokeWidth="0.7" />
          <path d="M0 200 Q720 80 1440 200" strokeWidth="0.6" strokeDasharray="4 4" />
          <path d="M0 140 Q720 40 1440 140" strokeWidth="0.5" strokeDasharray="3 3" />
          {Array.from({ length: 27 }).map((_, i) => {
            const x = (i * 55);
            return (
              <line 
                key={i} 
                x1={x} 
                y1="380" 
                x2={720 + (x - 720) * 0.22} 
                y2="50" 
                strokeWidth="0.6" 
                strokeOpacity="0.5" 
              />
            );
          })}
        </svg>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12" role="region" aria-roledescription="carousel" aria-label="Our Strategic Design Services">
        
        {/* Top Eyebrow & Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-2"
        >
          <h2 className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-neutral-300 uppercase block m-0">
            {content.servicesHeading.eyebrow || 'WHAT CAN WE DO FOR YOU'}
          </h2>

          {/* Quick slide switcher arrows */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-11 h-11 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00] cursor-pointer"
              aria-label="Previous service slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <span className="font-mono text-xs text-neutral-400 px-1" aria-live="polite">
              0{activeIndex + 1} / 0{services.length}
            </span>
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-11 h-11 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00] cursor-pointer"
              aria-label="Next service slide"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Big White Headline with animated crossfade */}
        <div className="mb-6 sm:mb-12 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h3 
              key={currentService.id + '-title'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight font-sans m-0"
            >
              {currentService.title}
            </motion.h3>
          </AnimatePresence>
        </div>

        {/* Two-Column Card Layout with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentService.id + '-content'}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
          >
            
            {/* Left: Floating Showcase Card with Persona & Wireframe Boards */}
            <div className="lg:col-span-7">
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl overflow-hidden border border-neutral-700/60 bg-neutral-900 shadow-[0_25px_60px_rgba(0,0,0,0.9)] group"
              >
                <div className="relative aspect-[4/3] w-full bg-neutral-950 overflow-hidden">
                  <img
                    src={currentService.image}
                    alt={currentService.imageAlt}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </motion.div>
            </div>

            {/* Right: Copy, Deliverables List with ✦, and CONTACT Button */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-8">
              
              {/* Punchy statement */}
              <p className="text-lg sm:text-xl font-medium text-white leading-snug tracking-tight">
                {currentService.description}
              </p>

              {/* Deliverables with ✦ bullets */}
              <ul className="space-y-3.5 text-sm sm:text-base text-neutral-200">
                {currentService.deliverables.map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-[#FF3D00] text-sm mt-0.5 select-none font-bold" aria-hidden="true">
                      ✦
                    </span>
                    <span className="font-medium">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CONTACT Button */}
              <div className="pt-2">
                <motion.button
                  onClick={() => onSelectService(currentService.title)}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="bg-white hover:bg-neutral-100 text-[#FF3D00] font-anton tracking-wider text-base sm:text-lg px-8 py-3.5 uppercase shadow-lg border border-white cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label={`Inquire about ${currentService.title}`}
                >
                  CONTACT
                </motion.button>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

        {/* Tab Selector for all 4 services with interactive spring animations */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex items-center gap-3 overflow-x-auto no-scrollbar" role="tablist" aria-label="Select service capability">
          {services.map((svc, idx) => {
            const isActive = idx === activeIndex;
            return (
              <motion.button
                key={svc.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIndex(idx)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={`px-4 py-3 min-h-[44px] rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00] ${
                  isActive
                    ? 'bg-neutral-800 text-white border border-[#FF3D00] shadow-[0_0_15px_rgba(255,61,0,0.25)]'
                    : 'bg-neutral-950/80 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <span className="text-[#FF3D00] mr-1.5 font-mono">0{idx + 1}</span>
                {svc.title}
              </motion.button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
