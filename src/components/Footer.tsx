import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageContent } from '../types';
import { storageService } from '../services/storage';
import { trackFormSubmission } from '../utils/gtm';
import { ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface FooterProps {
  content: PageContent['footer'];
}

export const Footer: React.FC<FooterProps> = ({ content }) => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    if (!consent) {
      setErrorMessage('Please check the consent box.');
      setStatus('error');
      return;
    }

    setStatus('submitting');

    setTimeout(() => {
      try {
        storageService.saveNewsletterSignup(email, consent);
        trackFormSubmission('newsletter', { email, consent });
        setStatus('success');
        setEmail('');
        setConsent(false);
      } catch {
        setErrorMessage('Failed to submit. Please try again.');
        setStatus('error');
      }
    }, 350);
  };

  return (
    <footer 
      id="footer"
      className="w-full bg-black text-white pt-16 sm:pt-24 pb-10 select-none overflow-hidden"
      aria-label="Footer"
    >
      <h2 className="sr-only">Upthrust Agency Information and Contact Channels</h2>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* GIANT "UPTHRUST DESIGN" WORDMARK WITH CLOVER LOGO (Exact match from Image 2) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full text-center relative pb-6 sm:pb-8"
        >
          <div className="flex flex-wrap items-baseline justify-center gap-4 sm:gap-8">
            <span className="font-anton font-black tracking-[-0.02em] uppercase text-white text-[13vw] sm:text-[12vw] lg:text-[142px] xl:text-[160px] leading-none">
              UPTHRUST
            </span>
            <span className="font-anton font-black tracking-[-0.02em] uppercase text-white text-[13vw] sm:text-[12vw] lg:text-[142px] xl:text-[160px] leading-none">
              DESIGN
            </span>
          </div>

          {/* Upthrust 3-Petal Orange Clover Emblem with delightful spring rotation on hover */}
          <motion.div 
            whileHover={{ rotate: 120, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute left-1/2 bottom-[-16px] -translate-x-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 cursor-pointer"
            title="Upthrust Emblem"
          >
            <svg viewBox="0 0 100 100" fill="#FF3D00" className="w-full h-full drop-shadow-md">
              <circle cx="50" cy="32" r="23" />
              <circle cx="32" cy="65" r="23" />
              <circle cx="68" cy="65" r="23" />
              <circle cx="50" cy="52" r="17" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Horizontal dividing line */}
        <div className="w-full h-[1px] bg-neutral-800 relative z-0" />

        {/* 3 COLUMNS GRID (Exact match to Image 2) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 py-10 sm:py-14 border-b border-neutral-900"
        >
          
          {/* Column 1: upthrust.agency */}
          <div className="md:col-span-3 space-y-3">
            <a 
              href="https://upthrust.agency" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans text-neutral-200 hover:text-white transition-colors group"
            >
              <span className="underline underline-offset-4 decoration-neutral-700 hover:decoration-white">upthrust.agency</span>
              <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              Strategic brand identities & digital design experiences for market leaders.
            </p>
            <a 
              href="mailto:hello@upthrust.agency"
              className="text-xs text-neutral-400 hover:text-[#FF3D00] transition-colors block font-sans"
            >
              hello@upthrust.agency
            </a>
          </div>

          {/* Column 2: upthrust.io */}
          <div className="md:col-span-3 space-y-3">
            <a 
              href="https://upthrust.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans text-neutral-200 hover:text-white transition-colors group"
            >
              <span className="underline underline-offset-4 decoration-neutral-700 hover:decoration-white">upthrust.io</span>
              <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              Engineering, design systems & high-performance digital infrastructure.
            </p>
            <a 
              href="mailto:hello@upthrust.io"
              className="text-xs text-neutral-400 hover:text-[#FF3D00] transition-colors block font-sans"
            >
              hello@upthrust.io
            </a>
          </div>

          {/* Column 3: Sign up for our emails */}
          <div className="md:col-span-6 space-y-3 pl-0 md:pl-6">
            <h3 className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-200">
              Sign up for our emails
            </h3>

            {status === 'success' ? (
              <div 
                className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-start gap-2.5"
                role="status"
                aria-live="polite"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <p className="font-semibold text-emerald-200">Subscribed successfully!</p>
                  <p className="text-neutral-400">
                    Thank you for subscribing. We'll be in touch with curated updates.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                {/* Checkbox text */}
                <label 
                  htmlFor="newsletter-consent"
                  className="flex items-start gap-2.5 text-[11px] text-neutral-400 leading-tight cursor-pointer select-none"
                >
                  <input
                    id="newsletter-consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded border-neutral-700 bg-neutral-900 text-[#FF3D00] focus:ring-[#FF3D00] cursor-pointer min-w-[16px] min-h-[16px]"
                  />
                  <span>
                    By checking this box sign up for our newsletter and receive marketing emails and updates on our services. You can unsubscribe at any time.
                  </span>
                </label>

                {/* Email input field */}
                <div className="space-y-2">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address for newsletter updates
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="typehere@youremail.com"
                    className="w-full bg-neutral-950 border-b border-neutral-700 text-base sm:text-xs text-neutral-200 py-2 placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors"
                  />

                  {/* Simple text/button Submit with hover feedback */}
                  <motion.button
                    type="submit"
                    disabled={status === 'submitting'}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-xs font-semibold text-neutral-300 hover:text-white transition-colors pt-1 cursor-pointer disabled:opacity-50 block min-h-[44px] flex items-center"
                    aria-label="Submit newsletter subscription"
                  >
                    {status === 'submitting' ? 'Submitting...' : 'Submit →'}
                  </motion.button>
                </div>

                {errorMessage && (
                  <div 
                    className="flex items-center gap-1.5 text-xs text-red-400 pt-1"
                    role="alert"
                    aria-live="assertive"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </form>
            )}

            {/* Quick links below the form (as in Image 2) */}
            <div className="flex items-center gap-5 pt-3 text-xs text-neutral-400">
              <a href="https://upthrust.agency" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1 group">
                <span>upthrust.agency</span>
                <ArrowUpRight className="w-3 h-3 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a href="https://upthrust.io" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1 group">
                <span>upthrust.io</span>
                <ArrowUpRight className="w-3 h-3 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </motion.div>

        {/* BOTTOM ROW (Image 2) */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-neutral-500 font-sans">
          <div>
            <p>{content?.tagline || 'Bold design that performs. Built for the world’s most ambitious brands.'}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-neutral-500">
            <div className="flex items-center gap-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-neutral-300">
                Instagram
              </a>
              <span>,</span>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-neutral-300">
                LinkedIn
              </a>
            </div>

            <a href="#" className="hover:text-neutral-300">
              Privacy Policy
            </a>

            <span>{content?.copyright || '© Upthrust Design. All rights reserved.'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
