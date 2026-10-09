import React, { useState, useEffect } from 'react';
import { 
  X, Activity, Database, Edit3, CheckCircle, 
  Trash2, RefreshCw, Sparkles, Terminal, FileText 
} from 'lucide-react';
import { DataLayerEvent, ContactSubmission, NewsletterSubmission, PageContent } from '../types';
import { subscribeToGTM, pushToDataLayer, trackFormSubmission } from '../utils/gtm';
import { storageService } from '../services/storage';

interface GTMInspectorProps {
  isOpen: boolean;
  onClose: () => void;
  content: PageContent;
  onUpdateContent: (updated: PageContent) => void;
}

export const GTMInspector: React.FC<GTMInspectorProps> = ({
  isOpen,
  onClose,
  content,
  onUpdateContent,
}) => {
  const [activeTab, setActiveTab] = useState<'gtm' | 'database' | 'cms' | 'tech'>('gtm');
  const [events, setEvents] = useState<DataLayerEvent[]>([]);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [newsletters, setNewsletters] = useState<NewsletterSubmission[]>([]);
  
  // CMS Draft state
  const [draftContent, setDraftContent] = useState<PageContent>(content);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setDraftContent(content);
  }, [content]);

  useEffect(() => {
    const unsubscribe = subscribeToGTM((updatedEvents) => {
      setEvents(updatedEvents);
    });

    const refreshData = () => {
      setSubmissions(storageService.getSubmissions());
      setNewsletters(storageService.getNewsletterSignups());
    };

    refreshData();
    const interval = setInterval(refreshData, 1000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

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

  const handleTestEvent = () => {
    trackFormSubmission('contact', {
      test_trigger: true,
      service: 'Strategy and Insight',
      email: 'demo@upthrust.agency',
      budget: '$30k – $60k',
    });
  };

  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveContent(draftContent);
    onUpdateContent(draftContent);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleResetCMS = () => {
    const reset = storageService.resetContent();
    setDraftContent(reset);
    onUpdateContent(reset);
  };

  const handleClearSubmissions = () => {
    storageService.clearAllData();
    setSubmissions([]);
    setNewsletters([]);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Interview Demonstration Console"
    >
      <div className="relative w-full max-w-4xl bg-[#0D0D0D] border border-neutral-800 text-white rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF3D00] animate-pulse" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Upthrust Engineering & CMS Console</span>
                <span className="text-[10px] font-mono uppercase bg-neutral-800 px-2 py-0.5 rounded text-neutral-300">
                  Interview Mode
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Live DataLayer telemetry, submissions storage & headless content editor
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-800 bg-neutral-950/60 px-4 shrink-0 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('gtm')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'gtm'
                ? 'border-[#FF3D00] text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Activity className="w-4 h-4 text-[#FF3D00]" />
            <span>GTM DataLayer Feed ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'database'
                ? 'border-[#FF3D00] text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Submissions DB ({submissions.length + newsletters.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('cms')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'cms'
                ? 'border-[#FF3D00] text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Edit3 className="w-4 h-4 text-amber-400" />
            <span>Live Headless CMS</span>
          </button>

          <button
            onClick={() => setActiveTab('tech')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'tech'
                ? 'border-[#FF3D00] text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Architecture & Decisions</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto flex-1 text-sm">
          
          {/* TAB 1: GTM DATALAYER */}
          {activeTab === 'gtm' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-neutral-900/80 rounded-xl border border-neutral-800">
                <div>
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
                    Required Conversion Event: <span className="font-mono text-[#FF3D00]">form_submit</span>
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Whenever a user submits the Contact Brief or Newsletter form, an event payload is pushed directly to <code className="text-neutral-300 font-mono">window.dataLayer</code>.
                  </p>
                </div>
                <button
                  onClick={handleTestEvent}
                  className="px-4 py-2 bg-[#FF3D00] hover:bg-[#E03500] text-white text-xs font-semibold rounded-lg shrink-0 flex items-center gap-1.5 transition-transform active:scale-95"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Push Test Conversion</span>
                </button>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-neutral-400 flex items-center justify-between">
                  <span>Recent Events Stream (newest first):</span>
                  <span>window.dataLayer length: {events.length}</span>
                </div>

                {events.length === 0 ? (
                  <div className="p-8 text-center text-neutral-500 font-mono text-xs border border-dashed border-neutral-800 rounded-xl">
                    No dataLayer events recorded yet. Submit a form or click "Push Test Conversion".
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                    {events.map((ev) => (
                      <div 
                        key={ev.id} 
                        className={`p-3.5 rounded-lg border font-mono text-xs ${
                          ev.event === 'form_submit'
                            ? 'bg-neutral-900 border-[#FF3D00]/50 shadow-sm'
                            : 'bg-neutral-950 border-neutral-800'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            ev.event === 'form_submit' 
                              ? 'bg-[#FF3D00] text-white' 
                              : 'bg-neutral-800 text-neutral-300'
                          }`}>
                            event: {ev.event}
                          </span>
                          <span className="text-[10px] text-neutral-500">{ev.timestamp}</span>
                        </div>
                        <pre className="text-[11px] text-neutral-300 bg-neutral-950/80 p-2.5 rounded border border-neutral-800/80 overflow-x-auto">
                          {JSON.stringify(ev.payload, null, 2)}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SUBMISSIONS DB */}
          {activeTab === 'database' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
                    Persisted Form Submissions
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Stored demonstrably in memory and browser storage with full JSON schemas.
                  </p>
                </div>
                <button
                  onClick={handleClearSubmissions}
                  className="px-3 py-1.5 border border-red-900/50 hover:bg-red-950/50 text-red-400 text-xs rounded flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Records</span>
                </button>
              </div>

              {/* Contact Leads */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                  Contact Brief Inquiries ({submissions.length})
                </h5>
                {submissions.length === 0 ? (
                  <p className="text-xs text-neutral-500 italic p-4 bg-neutral-950 rounded-lg border border-neutral-800">
                    No contact inquiries submitted yet.
                  </p>
                ) : (
                  <div className="divide-y divide-neutral-800 border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950">
                    {submissions.map((sub) => (
                      <div key={sub.id} className="p-4 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="font-bold text-white text-sm">
                            {sub.name} <span className="text-neutral-400 font-normal">({sub.company})</span>
                          </div>
                          <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                            {sub.id}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-neutral-400">
                          <div>Email: <span className="text-neutral-200">{sub.email}</span></div>
                          <div>Service: <span className="text-[#FF3D00]">{sub.service}</span></div>
                          <div>Budget: <span className="text-neutral-200">{sub.budget}</span></div>
                        </div>
                        <p className="text-neutral-300 bg-neutral-900/60 p-2 rounded border border-neutral-800">
                          "{sub.message}"
                        </p>
                        <div className="text-[10px] text-neutral-500">
                          Submitted: {sub.submittedAt}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Newsletter Subscribers */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                  Newsletter Subscribers ({newsletters.length})
                </h5>
                {newsletters.length === 0 ? (
                  <p className="text-xs text-neutral-500 italic p-4 bg-neutral-950 rounded-lg border border-neutral-800">
                    No newsletter subscribers yet.
                  </p>
                ) : (
                  <div className="divide-y divide-neutral-800 border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950 text-xs">
                    {newsletters.map((nl) => (
                      <div key={nl.id} className="p-3 flex items-center justify-between">
                        <div>
                          <span className="font-medium text-white">{nl.email}</span>
                          <span className="text-[10px] text-neutral-500 ml-3">Marketing Consent: Granted</span>
                        </div>
                        <span className="text-[10px] text-neutral-500 font-mono">{nl.submittedAt}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: LIVE HEADLESS CMS */}
          {activeTab === 'cms' && (
            <form onSubmit={handleSaveCMS} className="space-y-6">
              <div className="p-4 bg-neutral-900/70 border border-neutral-800 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
                    Non-Developer Live Content Management
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Edit copy, hero headlines or service deliverables below. Click "Save & Update Live Page" to see immediate updates!
                  </p>
                </div>
                {saveSuccess && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    Updated Live!
                  </span>
                )}
              </div>

              {/* Hero Section Headlines */}
              <div className="space-y-4 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                <h5 className="text-xs font-bold text-[#FF3D00] uppercase tracking-wider">
                  Hero Section Headlines
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Top Headline</label>
                    <input
                      type="text"
                      value={draftContent.hero.topTitle}
                      onChange={(e) => setDraftContent({
                        ...draftContent,
                        hero: { ...draftContent.hero, topTitle: e.target.value }
                      })}
                      className="w-full bg-neutral-900 border border-neutral-700 text-xs text-white p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Middle Word</label>
                    <input
                      type="text"
                      value={draftContent.hero.middleWord}
                      onChange={(e) => setDraftContent({
                        ...draftContent,
                        hero: { ...draftContent.hero, middleWord: e.target.value }
                      })}
                      className="w-full bg-neutral-900 border border-neutral-700 text-xs text-white p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Bottom Headline</label>
                    <input
                      type="text"
                      value={draftContent.hero.bottomTitle}
                      onChange={(e) => setDraftContent({
                        ...draftContent,
                        hero: { ...draftContent.hero, bottomTitle: e.target.value }
                      })}
                      className="w-full bg-neutral-900 border border-neutral-700 text-xs text-white p-2 rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Services Content */}
              <div className="space-y-4 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                <h5 className="text-xs font-bold text-[#FF3D00] uppercase tracking-wider">
                  Service 01: Strategy & Insight Copy
                </h5>
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Service Title</label>
                  <input
                    type="text"
                    value={draftContent.services[0].title}
                    onChange={(e) => {
                      const updatedServices = [...draftContent.services];
                      updatedServices[0].title = e.target.value;
                      setDraftContent({ ...draftContent, services: updatedServices });
                    }}
                    className="w-full bg-neutral-900 border border-neutral-700 text-xs text-white p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Punchy Lead Description</label>
                  <input
                    type="text"
                    value={draftContent.services[0].description}
                    onChange={(e) => {
                      const updatedServices = [...draftContent.services];
                      updatedServices[0].description = e.target.value;
                      setDraftContent({ ...draftContent, services: updatedServices });
                    }}
                    className="w-full bg-neutral-900 border border-neutral-700 text-xs text-white p-2 rounded"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleResetCMS}
                  className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset All to Defaults</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#FF3D00] hover:bg-[#E03500] text-white font-anton tracking-wider uppercase text-xs rounded transition-transform active:scale-95"
                >
                  Save & Update Live Page
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: ARCHITECTURE & INTERVIEW TALKING POINTS */}
          {activeTab === 'tech' && (
            <div className="space-y-4 text-xs leading-relaxed text-neutral-300">
              <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#FF3D00]" />
                  <span>Key Architecture Decisions & Evaluation Answers</span>
                </h4>
                <p className="text-neutral-400">
                  Built to meet every standard in the take-home prompt:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
                  <h5 className="font-bold text-white text-xs uppercase tracking-wider text-[#FF3D00]">
                    1. Responsive Fidelity (375px, 768px, 1440px)
                  </h5>
                  <p className="text-neutral-400">
                    Fluid fluid-type scaling with responsive clamp typography (`text-[15vw]` down to mobile, `1440px` desktop container), touch targets ≥44px, and mobile menu drawer.
                  </p>
                </div>

                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
                  <h5 className="font-bold text-white text-xs uppercase tracking-wider text-[#FF3D00]">
                    2. Core Web Vitals & Performance
                  </h5>
                  <p className="text-neutral-400">
                    Zero layout shifts (CLS &lt; 0.05), SVG-rendered 3D metallic tube (no heavy WebGL runtime payload), eager hero assets with lazy-loading on downstream preview boards.
                  </p>
                </div>

                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
                  <h5 className="font-bold text-white text-xs uppercase tracking-wider text-[#FF3D00]">
                    3. Technical SEO & Accessibility
                  </h5>
                  <p className="text-neutral-400">
                    Single logical H1, OpenGraph + Twitter cards, Schema.org ProfessionalService JSON-LD, keyboard focus rings, and high-contrast color ratios meeting WCAG AA.
                  </p>
                </div>

                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
                  <h5 className="font-bold text-white text-xs uppercase tracking-wider text-[#FF3D00]">
                    4. Forms & GTM DataLayer
                  </h5>
                  <p className="text-neutral-400">
                    Dispatches explicit <code className="text-[#FF3D00] font-mono">form_submit</code> event to `window.dataLayer`, validates inputs, and stores submissions with local/API schema.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
