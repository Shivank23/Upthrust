export interface ServiceItem {
  id: string;
  category: string;
  title: string;
  description: string;
  deliverables: string[];
  image: string;
  imageAlt: string;
  accentColor?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PageContent {
  hero: {
    topTitle: string;
    middleWord: string;
    bottomTitle: string;
    annotationLeftTop: string;
    annotationLeftPillWord: string;
    annotationLeftList: string[];
    annotationRightTop: string;
    annotationRightSquiggleWord: string;
  };
  brands: {
    statNumber: string;
    statText: string;
    brandList: string[];
  };
  servicesHeading: {
    eyebrow: string;
    subtitle: string;
  };
  services: ServiceItem[];
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
  footer: {
    mainLogoText: string;
    agencyUrl: string;
    agencyEmail: string;
    techUrl: string;
    techEmail: string;
    tagline: string;
    copyright: string;
  };
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'reviewed' | 'contacted';
}

export interface NewsletterSubmission {
  id: string;
  email: string;
  consent: boolean;
  submittedAt: string;
}

export interface DataLayerEvent {
  id: string;
  timestamp: string;
  event: string;
  payload: Record<string, any>;
}
