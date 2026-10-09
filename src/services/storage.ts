import { ContactSubmission, NewsletterSubmission, PageContent } from '../types';
import { defaultContent } from '../data/defaultContent';

const STORAGE_KEYS = {
  CONTENT: 'upthrust_page_content_v1',
  SUBMISSIONS: 'upthrust_contact_submissions_v1',
  NEWSLETTER: 'upthrust_newsletter_signups_v1',
};

export const storageService = {
  getContent(): PageContent {
    if (typeof window === 'undefined') return defaultContent;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONTENT);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load content from localStorage:', e);
    }
    return defaultContent;
  },

  saveContent(content: PageContent): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(content));
    } catch (e) {
      console.error('Failed to save content to localStorage:', e);
    }
  },

  resetContent(): PageContent {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.CONTENT);
    }
    return defaultContent;
  },

  getSubmissions(): ContactSubmission[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load contact submissions:', e);
    }
    return [];
  },

  saveSubmission(data: Omit<ContactSubmission, 'id' | 'submittedAt' | 'status'>): ContactSubmission {
    const submissions = this.getSubmissions();
    const newSubmission: ContactSubmission = {
      id: `SUB-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      submittedAt: new Date().toLocaleString(),
      status: 'new',
      ...data,
    };

    submissions.unshift(newSubmission);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
      } catch (e) {
        console.error('Failed to save submission:', e);
      }
    }
    return newSubmission;
  },

  getNewsletterSignups(): NewsletterSubmission[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NEWSLETTER);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load newsletter signups:', e);
    }
    return [];
  },

  saveNewsletterSignup(email: string, consent: boolean): NewsletterSubmission {
    const list = this.getNewsletterSignups();
    const newSignup: NewsletterSubmission = {
      id: `NL-${Date.now().toString(36).toUpperCase()}`,
      email,
      consent,
      submittedAt: new Date().toLocaleString(),
    };

    list.unshift(newSignup);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.NEWSLETTER, JSON.stringify(list));
      } catch (e) {
        console.error('Failed to save newsletter signup:', e);
      }
    }
    return newSignup;
  },

  clearAllData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.SUBMISSIONS);
      localStorage.removeItem(STORAGE_KEYS.NEWSLETTER);
    }
  },
};
