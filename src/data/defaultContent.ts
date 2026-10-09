import { PageContent } from '../types';
import strategyPersonaImg from '../assets/images/strategy_persona_board_1791552527651.webp';
import brandIdentityImg from '../assets/images/brand_identity_mockup_1791552546405.webp';
import digitalUiImg from '../assets/images/digital_ui_dashboard_1791552562246.webp';

export const defaultContent: PageContent = {
  hero: {
    topTitle: 'BOLD DESIGN',
    middleWord: 'THAT',
    bottomTitle: 'PERFORMS',
    annotationLeftTop: 'STRATEGY IS',
    annotationLeftPillWord: 'CHEAPER',
    annotationLeftList: ['IDENTITY', 'EXPERIENCE', 'MOTION'],
    annotationRightTop: 'COMFORTABLE',
    annotationRightSquiggleWord: 'IS EXPENSIVE',
  },
  brands: {
    statNumber: '100+',
    statText: "Brands trusted us to define how they're seen.",
    brandList: ['zomato', 'BOSCH', "L'ORÉAL", 'VEGA', 'DELL', "L'ORÉAL"],
  },
  servicesHeading: {
    eyebrow: 'WHAT CAN WE DO FOR YOU',
    subtitle: 'High-impact capabilities structured to unlock outsized commercial value at every customer touchpoint.',
  },
  services: [
    {
      id: 'strategy',
      category: 'WHAT CAN WE DO FOR YOU',
      title: 'Strategy and Insight',
      description: 'We interrogate what others assume. Then we build the brief behind the brief.',
      deliverables: [
        'Brand strategy & positioning',
        'Messaging & tone of voice',
        'Audience & competitor research',
        'Workshops & creative sprints',
      ],
      image: strategyPersonaImg,
      imageAlt: 'Upthrust strategy boards, user personas and design sprint wireframes',
      accentColor: '#FF3D00',
    },
    {
      id: 'identity',
      category: 'WHAT CAN WE DO FOR YOU',
      title: 'Brand & visual identity',
      description: 'We build systems, not just logos. So you own the category, not just the conversation.',
      deliverables: [
        'Brand identity & visual language',
        'Guidelines & naming',
        'Illustration & iconography',
        'Brand architecture & systems',
      ],
      image: brandIdentityImg,
      imageAlt: 'Upthrust comprehensive brand identity system, color swatches and neon brand mark',
      accentColor: '#FF5722',
    },
    {
      id: 'product',
      category: 'WHAT CAN WE DO FOR YOU',
      title: 'Product & digital experience',
      description: 'We design for humans and metrics. So users stay, engage, and come back.',
      deliverables: [
        'UI/UX & website design',
        'Design systems & prototyping',
        'User research & testing',
        'Motion graphics & micro-interactions',
      ],
      image: digitalUiImg,
      imageAlt: 'Modern dark UI UX dashboard and mobile application product design by Upthrust',
      accentColor: '#FF6D00',
    },
    {
      id: 'creative',
      category: 'WHAT CAN WE DO FOR YOU',
      title: 'Creative & campaign production',
      description: 'We turn attention into action. Then we prove it worked.',
      deliverables: [
        'Campaign creative & social content',
        'Presentations & pitch decks',
        'Marketing collateral & ad creative',
        'Experiential & spatial design for exhibitions, placemaking and branded environments. Just ask.',
      ],
      image: brandIdentityImg,
      imageAlt: 'Billboard campaign and outdoor high-impact creative marketing collateral',
      accentColor: '#FF3D00',
    },
  ],
  testimonials: [
    {
      id: 'test-1',
      quote: 'Upthrust revamped our digital identity and product experience. The immediate lift in conversion was +38%, but more importantly, our brand finally commands authority.',
      author: 'Vikram Seth',
      role: 'VP of Brand & Growth',
      company: 'Zomato',
      metric: '+38% Conversion Lift',
    },
    {
      id: 'test-2',
      quote: 'They bridge the rare gap between audacious visual aesthetics and uncompromising engineering rigor. An indispensable partner for global campaigns.',
      author: 'Elena Rostova',
      role: 'Global Creative Lead',
      company: "L'Oréal",
      metric: '4.2x Engagement',
    },
    {
      id: 'test-3',
      quote: 'Fast, fearless, and deeply strategic. Upthrust helped us clarify our market positioning and translate complex tech into human desire.',
      author: 'Marcus Vance',
      role: 'Director of Product Innovation',
      company: 'Dell Technologies',
      metric: '60+ Markets Rolled Out',
    },
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'What makes Upthrust different from conventional creative agencies?',
      answer: 'We do not build generic aesthetics. We combine bold, boundary-pushing art direction with conversion science, technical engineering rigor, and category-defining positioning that measurably moves commercial needle.',
    },
    {
      id: 'faq-2',
      question: 'How do you structure an end-to-end design engagement?',
      answer: 'Every project begins with a 2-week Discovery & Insight sprint to interrogate market assumptions. We then move into rapid prototyping, design systems creation, and motion-led production with weekly milestones and transparent deliverables.',
    },
    {
      id: 'faq-3',
      question: 'Can content and design systems be managed easily by internal teams?',
      answer: 'Yes. Every project includes structured design tokens, production-ready component code, and an intuitive headless CMS setup so non-technical stakeholders can effortlessly update copy, imagery, and product content post-launch.',
    },
    {
      id: 'faq-4',
      question: 'How quickly can Upthrust kick off a new sprint?',
      answer: 'We maintain dedicated sprint capacity for ambitious tier-1 brands and fast-growing innovators. Contact our partner team to schedule an initial scoping session within 48 hours.',
    },
  ],
  footer: {
    mainLogoText: 'UPTHRUST DESIGN',
    agencyUrl: 'upthrust.agency',
    agencyEmail: 'hello@upthrust.agency',
    techUrl: 'upthrust.io',
    techEmail: 'hello@upthrust.io',
    tagline: 'Bold design that performs. Built for the world’s most ambitious brands.',
    copyright: '© Upthrust Design. All rights reserved.',
  },
};
