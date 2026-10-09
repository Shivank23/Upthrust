import React from 'react';
import { motion } from 'motion/react';
import { PageContent } from '../types';

interface BrandsStripProps {
  content: PageContent['brands'];
}

export const BrandsStrip: React.FC<BrandsStripProps> = ({ content }) => {
  return (
    <section 
      id="brands" 
      className="w-full bg-white border-t border-b border-black/[0.08] relative select-none overflow-hidden"
      aria-label="100+ Trusted Brands"
    >
      <div className="max-w-[1440px] mx-auto">
        <div 
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 items-stretch divide-y sm:divide-y-0 sm:divide-x divide-black/[0.08] relative"
        >
          
          {/* Column 1: "100+ Brands trusted us to define how they're seen." */}
          <div 
            className="col-span-2 sm:col-span-1 p-5 sm:p-7 flex flex-col justify-center bg-white relative border-b sm:border-b-0 border-black/[0.08] group"
          >
            {/* Top '+' marker at grid intersection */}
            <span className="absolute -top-3.5 -right-2 text-neutral-300 font-mono text-sm leading-none hidden lg:block select-none" aria-hidden="true">+</span>
            
            <motion.h2 
              whileHover={{ scale: 1.05, x: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="font-anton font-black text-3xl sm:text-4xl text-black tracking-tight leading-none mb-1 m-0 flex items-baseline gap-1"
            >
              <span className="text-[#FF3D00]">{content.statNumber}</span>
            </motion.h2>
            <p className="text-xs text-neutral-700 leading-snug font-medium max-w-[140px]">
              {content.statText}
            </p>
          </div>

          {/* Column 2: zomato */}
          <div 
            className="p-4 sm:p-7 flex items-center justify-center relative group hover:bg-neutral-50/70 transition-colors border-r border-black/[0.08] sm:border-r-0 cursor-pointer"
          >
            <span className="absolute -top-3.5 -right-2 text-neutral-300 font-mono text-sm leading-none hidden lg:block select-none" aria-hidden="true">+</span>
            <motion.span 
              whileHover={{ scale: 1.12, y: -3, color: "#FF3D00" }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="font-black text-2xl sm:text-3xl tracking-tighter text-black lowercase italic font-sans inline-block transition-colors duration-200" 
              aria-label="Zomato"
            >
              zomato
            </motion.span>
            <span className="absolute bottom-2 inset-x-8 h-0.5 bg-[#FF3D00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
          </div>

          {/* Column 3: swatch */}
          <div 
            className="p-4 sm:p-7 flex items-center justify-center relative group hover:bg-neutral-50/70 transition-colors cursor-pointer"
          >
            <span className="absolute -top-3.5 -right-2 text-neutral-300 font-mono text-sm leading-none hidden lg:block select-none" aria-hidden="true">+</span>
            <motion.div 
              whileHover={{ scale: 1.12, y: -3, color: "#FF3D00" }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="flex items-center gap-1 cursor-pointer transition-colors duration-200"
              aria-label="Swatch"
            >
              <span className="font-black text-xl sm:text-2xl tracking-tight text-black lowercase font-sans">swatch</span>
              <span className="text-[#FF3D00] font-black text-base leading-none select-none">+</span>
            </motion.div>
            <span className="absolute bottom-2 inset-x-8 h-0.5 bg-[#FF3D00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
          </div>

          {/* Column 4: L'ORÉAL */}
          <div 
            className="p-4 sm:p-7 flex items-center justify-center relative group hover:bg-neutral-50/70 transition-colors border-r border-black/[0.08] sm:border-r-0 cursor-pointer"
          >
            <span className="absolute -top-3.5 -right-2 text-neutral-300 font-mono text-sm leading-none hidden lg:block select-none" aria-hidden="true">+</span>
            <motion.span 
              whileHover={{ scale: 1.12, y: -3, color: "#FF3D00" }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="font-extrabold text-base sm:text-lg tracking-[0.2em] text-black uppercase font-sans inline-block transition-colors duration-200" 
              aria-label="L'Oréal"
            >
              L'ORÉAL
            </motion.span>
            <span className="absolute bottom-2 inset-x-8 h-0.5 bg-[#FF3D00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
          </div>

          {/* Column 5: VEGA */}
          <div 
            className="p-4 sm:p-7 flex items-center justify-center relative group hover:bg-neutral-50/70 transition-colors cursor-pointer"
          >
            <span className="absolute -top-3.5 -right-2 text-neutral-300 font-mono text-sm leading-none hidden lg:block select-none" aria-hidden="true">+</span>
            <motion.span 
              whileHover={{ scale: 1.12, y: -3, color: "#FF3D00" }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="font-anton font-black text-xl sm:text-2xl tracking-[0.15em] text-black uppercase inline-block transition-colors duration-200" 
              aria-label="Vega"
            >
              VEGA
            </motion.span>
            <span className="absolute bottom-2 inset-x-8 h-0.5 bg-[#FF3D00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
          </div>

          {/* Column 6: DELL */}
          <div 
            className="p-4 sm:p-7 flex items-center justify-center relative group hover:bg-neutral-50/70 transition-colors border-r border-black/[0.08] sm:border-r-0 cursor-pointer"
          >
            <span className="absolute -top-3.5 -right-2 text-neutral-300 font-mono text-sm leading-none hidden lg:block select-none" aria-hidden="true">+</span>
            <motion.div 
              whileHover={{ scale: 1.12, y: -3, color: "#FF3D00" }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="flex items-baseline font-black text-2xl sm:text-3xl tracking-tight text-black uppercase font-sans cursor-pointer transition-colors duration-200" 
              aria-label="Dell"
            >
              <span>D</span>
              <span className="inline-block transform -rotate-12 translate-y-[-1px]">E</span>
              <span>LL</span>
            </motion.div>
            <span className="absolute bottom-2 inset-x-8 h-0.5 bg-[#FF3D00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
          </div>

          {/* Column 7: L'ORÉAL (2nd instance) */}
          <div 
            className="p-4 sm:p-7 flex items-center justify-center relative group hover:bg-neutral-50/70 transition-colors col-span-2 sm:col-span-1 cursor-pointer"
          >
            <motion.span 
              whileHover={{ scale: 1.12, y: -3, color: "#FF3D00" }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="font-extrabold text-base sm:text-lg tracking-[0.2em] text-black uppercase font-sans inline-block transition-colors duration-200" 
              aria-label="L'Oréal"
            >
              L'ORÉAL
            </motion.span>
            <span className="absolute bottom-2 inset-x-8 h-0.5 bg-[#FF3D00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
          </div>

        </div>
      </div>
    </section>
  );
};
