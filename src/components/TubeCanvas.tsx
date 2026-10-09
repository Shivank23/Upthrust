import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface TubeCanvasProps {
  className?: string;
}

export const TubeCanvas: React.FC<TubeCanvasProps> = ({ className = '' }) => {
  const { scrollY } = useScroll();
  
  // Subtle parallax horizontal and vertical shift linked to scroll
  const rawX = useTransform(scrollY, [0, 1600], [0, -35]);
  const rawY = useTransform(scrollY, [0, 1600], [0, 20]);
  const rawScale = useTransform(scrollY, [0, 1200], [1, 1.03]);

  const smoothX = useSpring(rawX, { stiffness: 120, damping: 24 });
  const smoothY = useSpring(rawY, { stiffness: 120, damping: 24 });
  const smoothScale = useSpring(rawScale, { stiffness: 120, damping: 24 });

  return (
    <div className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}>
      {/* 
        High-precision 3D Metallic Terracotta/Copper Looping Tube 
        Matching the geometry from Upthrust's design file (Image 3 and 4)
        Enhanced with smooth scroll parallax & ambient specular highlights
      */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          scale: smoothScale,
        }}
        className="w-full h-auto origin-center transition-transform"
      >
        <svg
          viewBox="0 0 1600 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto min-h-[300px] object-cover filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Main Metallic Copper Base Gradient */}
            <linearGradient id="tubeMetallicBase" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E64A19" />
              <stop offset="25%" stopColor="#FF7043" />
              <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.88" />
              <stop offset="55%" stopColor="#FF5722" />
              <stop offset="85%" stopColor="#BF360C" />
              <stop offset="100%" stopColor="#5D1B05" />
            </linearGradient>

            {/* Core Chrome Specular Highlight */}
            <linearGradient id="tubeGlossHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF8A65" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FF8A65" stopOpacity="0.4" />
            </linearGradient>

            {/* Ambient Occlusion Filter */}
            <filter id="metallicGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Ambient Under-glow with gentle opacity breathing */}
          <motion.path
            animate={{ opacity: [0.15, 0.28, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            d="M -50 180 C 120 180 200 160 260 240 C 310 320 220 380 180 320 C 140 260 200 170 360 170 C 560 170 650 170 720 120 C 760 80 820 40 850 110 C 870 170 820 230 760 210 C 700 190 730 230 890 235 C 1080 240 1200 240 1260 310 C 1310 370 1400 340 1400 270 C 1400 200 1330 200 1470 210 L 1650 220"
            stroke="#FF3D00"
            strokeWidth="64"
            strokeLinecap="round"
            filter="url(#metallicGlow)"
          />

          {/* BACK TUBE SEGMENTS (Rendered behind front overlaps) */}
          {/* Loop 1 Back (Left downwards loop) */}
          <circle cx="230" cy="275" r="75" stroke="url(#tubeMetallicBase)" strokeWidth="38" />
          <circle cx="230" cy="275" r="75" stroke="#3E1004" strokeWidth="38" strokeOpacity="0.5" />

          {/* Loop 2 Back (Center top loop) */}
          <circle cx="810" cy="130" r="75" stroke="url(#tubeMetallicBase)" strokeWidth="38" />

          {/* Loop 3 Back (Right bottom loop) */}
          <circle cx="1320" cy="300" r="72" stroke="url(#tubeMetallicBase)" strokeWidth="38" />
          <circle cx="1320" cy="300" r="72" stroke="#3E1004" strokeWidth="38" strokeOpacity="0.5" />

          {/* MAIN HORIZONTAL FLOWING TUBE BODY */}
          <path
            d="M -50 180 
               C 100 180, 180 170, 240 220 
               C 320 300, 240 370, 180 330 
               C 130 290, 170 200, 320 180 
               C 520 160, 640 170, 730 140 
               C 770 100, 830 30, 880 90 
               C 930 160, 840 220, 770 210 
               C 710 200, 760 230, 940 235 
               C 1120 240, 1220 240, 1270 280 
               C 1330 350, 1420 330, 1400 260 
               C 1380 200, 1310 220, 1460 210 
               L 1650 220"
            stroke="url(#tubeMetallicBase)"
            strokeWidth="42"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* TUBE SHADOW / OCCLUSION CREASES */}
          <path
            d="M 170 205 C 210 220 260 250 270 290"
            stroke="#260800"
            strokeWidth="40"
            strokeOpacity="0.45"
            strokeLinecap="round"
          />
          <path
            d="M 750 200 C 790 205 840 180 860 140"
            stroke="#260800"
            strokeWidth="40"
            strokeOpacity="0.45"
            strokeLinecap="round"
          />
          <path
            d="M 1250 260 C 1280 275 1320 300 1340 330"
            stroke="#260800"
            strokeWidth="40"
            strokeOpacity="0.45"
            strokeLinecap="round"
          />

          {/* TOP GLOSS / SPECULAR REFLECTION STROKE */}
          <path
            d="M -50 172 
               C 100 172, 180 162, 235 212 
               C 315 292, 235 362, 175 322 
               C 125 282, 165 192, 315 172 
               C 515 152, 635 162, 725 132 
               C 765 92, 825 22, 875 82 
               C 925 152, 835 212, 765 202 
               C 705 192, 755 222, 935 227 
               C 1115 232, 1215 232, 1265 272 
               C 1325 342, 1415 322, 1395 252 
               C 1375 192, 1305 212, 1455 202 
               L 1650 212"
            stroke="url(#tubeGlossHighlight)"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeOpacity="0.88"
          />

          {/* Secondary Delicate Chrome Rim Reflection */}
          <path
            d="M -50 166 
               C 100 166, 180 156, 230 206 
               C 300 286, 230 356, 170 316 
               C 120 276, 160 186, 310 166 
               C 510 146, 630 156, 720 126 
               C 760 86, 820 16, 870 76 
               C 920 146, 830 206, 760 196 
               C 700 186, 750 216, 930 221 
               C 1110 226, 1210 226, 1260 266 
               C 1320 336, 1410 316, 1390 246 
               C 1370 186, 1300 206, 1450 196 
               L 1650 206"
            stroke="#FFFFFF"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeOpacity="0.95"
          />

          {/* Ambient Core Highlights on Loops */}
          <circle cx="230" cy="275" r="75" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.75" strokeDasharray="30 120" />
          <circle cx="810" cy="130" r="75" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.75" strokeDasharray="50 140" />
          <circle cx="1320" cy="300" r="72" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.75" strokeDasharray="40 130" />
        </svg>
      </motion.div>
    </div>
  );
};
