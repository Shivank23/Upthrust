import React, { useState } from 'react';
import { PageContent } from '../types';
import { Plus, Minus } from 'lucide-react';

interface FAQProps {
  faqs: PageContent['faqs'];
}

export const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section 
      id="faq" 
      className="w-full bg-neutral-50/50 py-20 sm:py-28 border-b border-black/[0.08]"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Heading & Support Note */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#FF3D00] uppercase block">
              CLARITY & PROCESS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-black leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-md pt-2">
              Everything you need to know about our sprints, team integration, CMS handoff, and performance architecture.
            </p>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 divide-y divide-black/[0.08] border-t border-b border-black/[0.08]">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className="py-5 sm:py-6 transition-colors">
                  <h3 className="m-0 p-0 font-normal">
                    <button
                      id={`faq-btn-${faq.id}`}
                      aria-controls={`faq-answer-${faq.id}`}
                      onClick={() => toggle(faq.id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00] py-2 min-h-[44px] cursor-pointer"
                    >
                      <span className="text-base sm:text-lg font-bold text-black group-hover:text-[#FF3D00] transition-colors pr-4">
                        {faq.question}
                      </span>
                      <span className="p-1 rounded-full border border-neutral-300 text-neutral-700 group-hover:border-black shrink-0 transition-colors" aria-hidden="true">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>
                  </h3>
                  
                  {isOpen && (
                    <div 
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${faq.id}`}
                      className="pt-3 pb-2 text-sm sm:text-base text-neutral-600 leading-relaxed pr-6 animate-fadeIn"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
