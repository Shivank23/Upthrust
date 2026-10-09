# Upthrust Design

A high-performance, responsive landing page for **Upthrust** — crafting bold brand identities and digital experiences.

## 🚀 Features

- **Modern Responsive Design**: Fluid clamp typography, curated animations, and mobile-first layout.
- **Interactive Visuals**: Custom continuous looping 3D tube canvas and blueprint drafting graphics.
- **Services Showcase**: Comprehensive showcase carousel and panoramic service views.
- **GTM & Analytics Ready**: Google Tag Manager `dataLayer` integration for conversion tracking (`form_submit` event).
- **Interactive CMS & Submissions Console**: Client-side preview CMS and local storage for form inquiries and newsletter subscriptions.
- **Accessible & SEO Optimized**: Semantic HTML5 markup, WCAG-compliant contrast, OpenGraph meta tags, and Schema.org structured data.

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Analytics**: Google Tag Manager (`window.dataLayer`)

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Shivank23/Upthrust.git

# Navigate into the project directory
cd Upthrust

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the local development server
npm run dev
```

Visit `http://localhost:3000` (or the port specified in terminal) to view the application.

### Building for Production

```bash
# Build the optimized production bundle
npm run build

# Preview the production build locally
npm run preview
```

## 📂 Project Structure

```text
├── index.html          # Semantic HTML, SEO meta tags, GTM dataLayer initialization
├── src/
│   ├── assets/         # Optimized visual assets and graphics
│   ├── components/     # Modular React components (Hero, Services, Footer, Modals, etc.)
│   ├── data/           # Default agency content and schema configurations
│   ├── services/       # Local persistence services
│   ├── utils/          # Google Tag Manager and utility helpers
│   ├── types/          # TypeScript interface definitions
│   ├── App.tsx         # Main application orchestrator
│   └── main.tsx        # Application entrypoint
├── package.json
└── vite.config.ts
```

## 📄 License

MIT
