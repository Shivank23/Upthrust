import React, { useState, useEffect, Suspense } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandsStrip } from './components/BrandsStrip';
import { ServicesShowcase } from './components/ServicesShowcase';
import { Footer } from './components/Footer';
import { defaultContent } from './data/defaultContent';
import { storageService } from './services/storage';
import { PageContent } from './types';
import { Activity, ChevronDown, ChevronUp } from 'lucide-react';
import { CustomCursor } from './components/CustomCursor';
import { BackToTop } from './components/BackToTop';

// Lazy-loaded non-critical components to maximize Lighthouse performance and minimize initial JS bundle
const ContactModal = React.lazy(() => import('./components/ContactModal').then((m) => ({ default: m.ContactModal })));
const GTMInspector = React.lazy(() => import('./components/GTMInspector').then((m) => ({ default: m.GTMInspector })));
const Testimonials = React.lazy(() => import('./components/Testimonials').then((m) => ({ default: m.Testimonials })));
const FAQ = React.lazy(() => import('./components/FAQ').then((m) => ({ default: m.FAQ })));

export default function App() {
  const [content, setContent] = useState<PageContent>(defaultContent);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCMSOpen, setIsCMSOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Strategy and Insight');
  const [showExtendedContent, setShowExtendedContent] = useState(false);

  // Smooth scroll progress tracker for top border
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const loaded = storageService.getContent();
    setContent(loaded);

    // Keyboard shortcut (Shift + C) to toggle CMS / GTM Console cleanly without screen clutter
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        setIsCMSOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenContactWithService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased flex flex-col selection:bg-[#FF3D00] selection:text-white">
      {/* Editorial Interactive Spring Cursor */}
      <CustomCursor />

      {/* Floating Back To Top button with Circular Scroll Indicator */}
      <BackToTop />

      {/* Precision Orange Scroll Progress Line across top of viewport */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#FF3D00] origin-left z-50 pointer-events-none shadow-[0_0_8px_rgba(255,61,0,0.8)]"
        style={{ scaleX }}
      />

      {/* 1. Header & Hero sharing the continuous grid from top of viewport matching Figma */}
      <div className="relative w-full bg-white overflow-hidden">
        {/* Continuous Precision Square Grid covering Navbar and Hero */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-90 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 0, 0, 0.055) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.055) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
          aria-hidden="true"
        />

        <Header
          onOpenContact={() => {
            setSelectedService('Strategy and Insight');
            setIsContactOpen(true);
          }}
          onOpenCMS={() => setIsCMSOpen(true)}
        />

        <Hero
          content={content.hero}
          onContactClick={() => {
            setSelectedService('Strategy and Insight');
            setIsContactOpen(true);
          }}
        />
      </div>

      <main id="main-content" className="flex-1" tabIndex={-1}>

        {/* 3. Brands Strip: "100+ Brands..." + Zomato, Bosch, L'Oréal, Vega, Dell matching Figma */}
        <BrandsStrip content={content.brands} />

        {/* 4. Services Showcase: 3D Terracotta Looping Tube + "Strategy and Insight" + Wireframe Grid */}
        <ServicesShowcase
          content={content}
          onSelectService={handleOpenContactWithService}
        />

        {/* Optional Extended Client Proof & FAQs (For Interview CMS Demo) */}
        <div className="bg-neutral-950 border-t border-neutral-900 py-4 px-6 flex justify-center">
          <button
            onClick={() => setShowExtendedContent(!showExtendedContent)}
            className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-2 py-1.5 px-4 rounded border border-neutral-800 hover:border-neutral-600 transition-colors cursor-pointer"
          >
            <span>{showExtendedContent ? 'Hide' : 'Show'} Proof Metrics & FAQs (CMS Demo)</span>
            {showExtendedContent ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {showExtendedContent && (
          <Suspense fallback={<div className="py-12 bg-neutral-950 text-center text-xs font-mono text-neutral-400">Loading proof & insights...</div>}>
            <div className="animate-fadeIn">
              <Testimonials testimonials={content.testimonials} />
              <FAQ faqs={content.faqs} />
            </div>
          </Suspense>
        )}
      </main>

      {/* 5. Giant Footer: "UPTHRUST DESIGN" + 3-Leaf Clover + 3 Columns + Working Newsletter */}
      <Footer content={content.footer} />

      {/* Interactive Contact Project Brief Modal - Lazy loaded on demand */}
      {isContactOpen && (
        <Suspense fallback={null}>
          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
            preSelectedService={selectedService}
          />
        </Suspense>
      )}

      {/* Live Headless CMS & GTM DataLayer Telemetry Console - Lazy loaded on demand */}
      {isCMSOpen && (
        <Suspense fallback={null}>
          <GTMInspector
            isOpen={isCMSOpen}
            onClose={() => setIsCMSOpen(false)}
            content={content}
            onUpdateContent={(updated) => setContent(updated)}
          />
        </Suspense>
      )}

      {/* Discreet CMS Trigger (Bottom-Right, minimal icon on hover or press Shift+C) */}
      <div className="fixed bottom-3 right-3 z-40 opacity-20 hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsCMSOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black text-white text-[10px] font-mono rounded-full border border-neutral-700 shadow-lg hover:border-[#FF3D00] transition-colors cursor-pointer"
          title="Open GTM Inspector & Headless CMS (or press Shift + C)"
        >
          <Activity className="w-3 h-3 text-[#FF3D00]" />
          <span>CMS</span>
        </button>
      </div>
    </div>
  );
}
