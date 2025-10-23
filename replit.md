# iShunea Tech Solutions - Web Application

## Overview
This React-based web application for iShunea Tech Solutions showcases the company's services, portfolio, blog, careers, and contact information. It's built with Vite and React Router, focusing on dynamic content management, comprehensive SEO, and multi-language support. The project aims to provide a robust, scalable, and SEO-optimized online presence for iShunea Tech Solutions.

## User Preferences
- **Translation Strategy**: Backend-driven translations with fallback system. Translations are fetched from API and fall back to in-code translations when backend returns insufficient data (<10 keys).
- **Content Management**: All dynamic content (services, blog, portfolio) to be managed from backend/admin panel
- **Language Detection**: Purely URL-based (`/` = RO, `/en/` = EN, `/ru/` = RU) without localStorage persistence to avoid caching conflicts

## System Architecture
The application uses React 18.3.1 with Vite 5.4.1 for a fast development experience. Styling is handled with custom CSS and Bootstrap 5.3.3. Key architectural decisions include:

### UI/UX Decisions
- **Responsive Design**: Adapts to various screen sizes.
- **Dynamic Content Display**: Carousels and content sections are dynamically populated from API.
- **Professional Layout**: Optimized white space for a clean, professional look, especially on portfolio pages.
- **Adaptive Logo Color**: Logo automatically changes color based on background:
  - Black (#000000) on white backgrounds (Services, Works, Contacts, About, Careers, Blogs)
  - Black (#000000) in all modal forms for better visibility against light backgrounds
  - Yellow (#FBDF06) on dark backgrounds (Homepage only)
- **Modal Design**: Modal backgrounds use soft gray (#f5f5f5) instead of pure white to reduce eye strain.

### Technical Implementations
- **Frontend Framework**: React 18.3.1.
- **Build Tool**: Vite 5.4.1.
- **Routing**: React Router DOM v6 for client-side navigation.
- **State Management**: React Context API for global state, specifically for SEO, translations, blog, services, and portfolio works.
- **Image Optimization**: `react-lazy-load-image-component` for efficient image loading.
- **Content Rendering**: `react-markdown` for displaying blog article content.
- **Analytics & Tracking**:
    - Google Tag Manager (GTM-NT6WCJL) integrated in `index.html`.
    - GTM script loaded in `<head>` for optimal tracking performance.
    - Noscript fallback for users with JavaScript disabled.
    - Form submission tracking for all contact forms (ShowCall, ShowJob, ShowAlert).
    - Comprehensive validation and error handling with GTM event tracking.
    - See `docs/GTM_TRACKING_IMPLEMENTATION.md` for full implementation details.
- **SEO Implementation**:
    - `react-helmet-async` for dynamic meta tags.
    - Comprehensive meta tags (title, description, Open Graph, Twitter Cards).
    - `hreflang` tags for multi-language SEO.
    - Schema.org structured data (Organization, WebSite, BlogPosting, Article, BreadcrumbList).
    - Dynamic canonical URLs and robots meta tags.
- **Multi-language Support**:
    - Backend-driven translation system with automatic fallback to hardcoded translations (45 keys per language).
    - URL-based language detection (`/` = RO, `/en/` = EN, `/ru/` = RU) without localStorage persistence.
    - `useTranslation()` hook exported from `TranslationContext` for all components.
    - `LanguageSwitcher` component for seamless language changes.
    - Integrated with SEO for correct `hreflang` generation.
    - Complete navigation bar translation (8 keys): company, services, works, contacts, about, careers, blog, menu.
    - Complete HomePage translation (37 keys): hero, advantages, progress steps, CTA, blog section.
- **Dynamic Content Services**: Dedicated API services (`blogService`, `servicesService`, `worksService`) for fetching and caching content with a 1-hour TTL. Services include robust error handling and graceful fallbacks.
- **Data Normalization**: Context providers normalize API data to ensure consistent field names (`id`, `link`, `title`, `imageSrc`, `date`, `tags`) across the application, with fallback chains for image sources.

### Feature Specifications
- **Homepage**: Features hero section, advantages, progress steps, call-to-action, blog highlights, and project highlights.
- **Portfolio (Works)**: Displays company projects with individual detail pages.
- **Services**: Lists services offered, each with a dedicated detail page.
- **Blog**: Provides a listing of articles and individual article view pages.
- **About, Careers, Contacts**: Standard informational pages.
- **Dynamic Content**: All core content (blogs, services, works) is fetched from a backend API, enabling content management via an Admin Panel.

## External Dependencies
- **Backend API**: `https://ishunea-backend.replit.app` (configurable via `VITE_API_URL`).
    - **Translations**: `GET /api/translations?lang={en|ro|ru}&category={ui|seo|content}`
    - **Blog Posts**: `GET /blogs`, `GET /blogs/:id`, `GET /blogs/tags`
    - **Services**: `GET /services`, `GET /services/:id`
    - **Portfolio Works**: `GET /works`, `GET /works/:id`
    - **Team Members**: `GET /team`
- **Cloudflare R2 Bucket**: Used for hosting images, dynamically linked from the backend content.
- **Admin Panel**: Separate application for managing dynamic content and translations.