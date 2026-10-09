import React from 'react';
import { PageContent } from '../types';
import { Quote } from 'lucide-react';

interface TestimonialsProps {
  testimonials: PageContent['testimonials'];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section 
      id="proof" 
      className="w-full bg-white text-black py-20 sm:py-28 border-b border-black/[0.08] select-none"
      aria-label="Client testimonials and measurable performance proof"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#FF3D00] uppercase block mb-2">
            PROVEN PERFORMANCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-black leading-tight">
            Audacious design. Uncompromising commercial impact.
          </h2>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div 
              key={item.id}
              className="bg-neutral-50/80 border border-black/[0.08] p-8 rounded-xl flex flex-col justify-between hover:border-black/20 hover:shadow-lg transition-all duration-300 group"
            >
              <div>
                {/* Metric chip */}
                <div className="inline-block px-3 py-1 rounded bg-[#FF3D00]/10 border border-[#FF3D00]/20 text-[#FF3D00] font-mono text-xs font-bold mb-6">
                  {item.metric}
                </div>

                <Quote className="w-8 h-8 text-neutral-300 group-hover:text-[#FF3D00] transition-colors mb-4" />

                <p className="text-base sm:text-lg font-medium text-neutral-800 leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-black/[0.06]">
                <h3 className="font-bold text-sm text-black m-0">{item.author}</h3>
                <div className="text-xs text-neutral-500 font-medium">
                  {item.role} · <span className="text-black font-semibold">{item.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
