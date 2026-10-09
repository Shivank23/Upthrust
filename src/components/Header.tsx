import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { UpthrustLogo } from './UpthrustLogo';

interface HeaderProps {
  onOpenContact: () => void;
  onOpenCMS: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 w-full z-40 select-none transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-black/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] py-2 sm:py-3'
          : 'bg-white/95 border-b border-transparent py-3 sm:py-5'
      }`}
      style={{
        backgroundImage: !isScrolled ? `
          linear-gradient(to right, rgba(0, 0, 0, 0.055) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.055) 1px, transparent 1px)
        ` : undefined,
        backgroundSize: '80px 80px',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between transition-all">
        
        {/* Brand Lockup: Logo matching Figma */}
        <motion.a 
          href="/" 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00] rounded py-1"
          aria-label="Upthrust Design"
        >
          <UpthrustLogo />
        </motion.a>

        {/* Right Action: Exact "CONTACT US" in bold orange matching Figma */}
        <motion.button
          onClick={onOpenContact}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="font-anton font-black tracking-wider uppercase text-lg sm:text-xl lg:text-2xl text-[#FF3D00] hover:text-[#E03500] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00]"
        >
          CONTACT US
        </motion.button>

      </div>
    </header>
  );
};

