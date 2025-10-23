# Navigation Translation Keys

This document lists all translation keys used for the navigation bar across all 3 languages.

## Navigation Keys

### Main Navigation
- `nav.company` - Company dropdown button
  - RO: "Companie"
  - EN: "Company"
  - RU: "Компания"

- `nav.services` - Services link
  - RO: "Servicii"
  - EN: "Services"
  - RU: "Услуги"

- `nav.works` - Works/Portfolio link
  - RO: "Proiecte"
  - EN: "Works"
  - RU: "Проекты"

- `nav.contacts` - Contacts link
  - RO: "Contacte"
  - EN: "Contacts"
  - RU: "Контакты"

### Company Dropdown Items
- `nav.about` - About page
  - RO: "Despre"
  - EN: "About"
  - RU: "О нас"

- `nav.careers` - Careers page
  - RO: "Cariere"
  - EN: "Careers"
  - RU: "Карьера"

- `nav.blog` - Blog page
  - RO: "Blog"
  - EN: "Blog"
  - RU: "Блог"

### Mobile Menu
- `nav.menu` - Mobile menu button
  - RO: "meniu"
  - EN: "menu"
  - RU: "меню"

## Total Navigation Keys: 8

All navigation keys are implemented in:
- `src/components/Header.jsx` - Main navigation component
- `src/services/translationService.js` - Fallback translations

## Implementation Notes
- Navigation uses `useTranslation()` hook from `TranslationContext`
- Fallback system ensures navigation always displays even if backend API fails
- URL-based language detection (`/` = RO, `/en/` = EN, `/ru/` = RU)
