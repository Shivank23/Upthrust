import React from 'react';
import { motion } from 'motion/react';
import { UpthrustLogo } from './UpthrustLogo';

interface HeaderProps {
  onOpenContact: () => void;
  onOpenCMS: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
  return (
    <header className="w-full relative z-30 select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        
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
