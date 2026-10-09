import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { storageService } from '../services/storage';
import { trackFormSubmission } from '../utils/gtm';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  preSelectedService = 'Strategy and Insight',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState(preSelectedService);
  const [budget, setBudget] = useState('$30k – $60k');
  const [message, setMessage] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  useEffect(() => {
    if (preSelectedService) {
      setService(preSelectedService);
    }
  }, [preSelectedService]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Valid business email is required';
    }
    if (!company.trim()) newErrors.company = 'Company name is required';
    if (!message.trim() || message.length < 10) {
      newErrors.message = 'Please provide at least a brief summary (10+ characters)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        // 1. Store submission in demonstrable storage
        const saved = storageService.saveSubmission({
          name,
          email,
          company,
          service,
          budget,
          message,
        });

        // 2. Trigger required GTM event
        trackFormSubmission('contact', {
          submission_id: saved.id,
          name,
          email,
          company,
          service,
          budget,
          message_length: message.length,
        });

        setSubmissionId(saved.id);
        setIsSuccess(true);
        setIsSubmitting(false);
      } catch (err) {
        console.error('Submission failed:', err);
        setIsSubmitting(false);
      }
    }, 450);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="relative w-full max-w-2xl bg-[#0F0F0F] border border-neutral-800 text-white shadow-2xl rounded-2xl overflow-hidden my-4 sm:my-8 max-h-[92vh] flex flex-col"
      >
        
        {/* Top Header bar */}
        <div className="px-5 sm:px-8 py-4 sm:py-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF3D00]" aria-hidden="true" />
            <h2 id="contact-modal-title" className="text-base sm:text-lg font-bold tracking-tight text-white">
              Initiate Project Brief // Upthrust Design
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00]"
            aria-label="Close project brief dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="py-6 text-center space-y-6" role="status" aria-live="polite">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Brief Received Successfully
                </h3>
                <p className="text-sm text-neutral-400 max-w-md mx-auto">
                  Thank you, <span className="text-white font-semibold">{name}</span>. Our partners will review your requirements for <span className="text-[#FF3D00] font-semibold">{service}</span> and reach out within 24 hours.
                </p>
              </div>

              {/* Demonstrable Tech Badge for Interview */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-left max-w-md mx-auto text-xs space-y-2 font-mono">
                <div className="flex items-center justify-between text-neutral-400 pb-1 border-b border-neutral-800">
                  <span>Reference ID:</span>
                  <span className="text-white font-bold">{submissionId}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>GTM Event:</span>
                  <span className="text-[#FF3D00]">form_submit (Dispatched)</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Storage State:</span>
                  <span className="text-emerald-400">Persisted in DB / LocalStore</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={handleReset}
                  className="bg-[#FF3D00] hover:bg-[#E03500] text-white font-anton tracking-wider text-sm uppercase px-8 py-3 rounded-none transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-[44px]"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                    Your Name <span className="text-[#FF3D00]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className="w-full bg-neutral-900 border border-neutral-800 text-base sm:text-sm text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#FF3D00] transition-colors"
                  />
                  {errors.name && <p id="contact-name-error" className="text-xs text-red-400">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                    Work Email <span className="text-[#FF3D00]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className="w-full bg-neutral-900 border border-neutral-800 text-base sm:text-sm text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#FF3D00] transition-colors"
                  />
                  {errors.email && <p id="contact-email-error" className="text-xs text-red-400">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-company" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                    Company / Brand <span className="text-[#FF3D00]">*</span>
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Acme Labs"
                    aria-invalid={errors.company ? 'true' : 'false'}
                    aria-describedby={errors.company ? 'contact-company-error' : undefined}
                    className="w-full bg-neutral-900 border border-neutral-800 text-base sm:text-sm text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#FF3D00] transition-colors"
                  />
                  {errors.company && <p id="contact-company-error" className="text-xs text-red-400">{errors.company}</p>}
                </div>

                {/* Service Selection */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-service" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                    Primary Service Focus
                  </label>
                  <select
                    id="contact-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 text-base sm:text-sm text-white px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#FF3D00] transition-colors min-h-[44px]"
                  >
                    <option value="Strategy and Insight">Strategy and Insight</option>
                    <option value="Brand & visual identity">Brand & visual identity</option>
                    <option value="Product & digital experience">Product & digital experience</option>
                    <option value="Creative & campaign production">Creative & campaign production</option>
                    <option value="Comprehensive Enterprise Transformation">Full Enterprise Transformation</option>
                  </select>
                </div>
              </div>

              {/* Budget tier */}
              <div className="space-y-1.5">
                <span className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                  Estimated Engagement Budget
                </span>
                <div className="grid grid-cols-3 gap-2" role="group" aria-label="Estimated Engagement Budget">
                  {['$15k – $30k', '$30k – $60k', '$60k+'].map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setBudget(tier)}
                      className={`py-2.5 text-xs font-medium rounded-lg border text-center transition-all min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00] ${
                        budget === tier
                          ? 'border-[#FF3D00] bg-neutral-800 text-white font-semibold'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                      aria-pressed={budget === tier}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                  Project Scope & Goals <span className="text-[#FF3D00]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what challenge you are solving, target timelines, or what bold outcome you need..."
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className="w-full bg-neutral-900 border border-neutral-800 text-base sm:text-sm text-white p-3.5 rounded-lg focus:outline-none focus:border-[#FF3D00] transition-colors resize-none"
                />
                {errors.message && <p id="contact-message-error" className="text-xs text-red-400">{errors.message}</p>}
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  <span>Triggers GTM dataLayer conversion</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-[#FF3D00] hover:bg-[#E03500] text-white font-anton tracking-wider text-sm sm:text-base uppercase px-8 py-3 rounded-none transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {isSubmitting ? (
                    <span>Submitting Brief...</span>
                  ) : (
                    <>
                      <span>Transmit Brief</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </motion.div>
    </motion.div>
  );
};
