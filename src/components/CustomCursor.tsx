import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClientDevice, setIsClientDevice] = useState(false);

  // Smooth spring physics for fluid movement
  const cursorX = useSpring(-100, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28 });

  const dotX = useSpring(-100, { stiffness: 1000, damping: 35 });
  const dotY = useSpring(-100, { stiffness: 1000, damping: 35 });

  useEffect(() => {
    // Only enable custom cursor for non-touch / pointer-capable devices
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsClientDevice(true);
    } else {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      // Check if target is an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.closest('.cursor-pointer')
        );
        setIsPointer(interactive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, dotX, dotY, isVisible]);

  if (!isClientDevice || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Outer Follower Ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer ? 1.9 : 1,
          borderColor: isPointer ? '#FF3D00' : 'rgba(0,0,0,0.4)',
          backgroundColor: isPointer ? 'rgba(255,61,0,0.08)' : 'rgba(0,0,0,0)',
        }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
        className="w-8 h-8 rounded-full border border-black/40 pointer-events-none transition-colors duration-150 backdrop-blur-[0.5px]"
      />

      {/* Center Precise Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer ? 0.4 : 1,
          backgroundColor: isPointer ? '#FF3D00' : '#111111',
        }}
        transition={{ duration: 0.15 }}
        className="w-1.5 h-1.5 rounded-full pointer-events-none"
      />
    </div>
  );
};
