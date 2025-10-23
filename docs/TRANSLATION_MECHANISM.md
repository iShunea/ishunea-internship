# Translation Mechanism - Multi-Language Support System

## Overview
This document describes the **backend-driven translation system** implemented for iShunea Tech Solutions, supporting 3 languages (English, Romanian, Russian) with centralized management via Admin Panel. The same architecture can be replicated for EasyReserv and other projects.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          ADMIN PANEL                             │
│  (Content Management - Add/Edit/Delete Translations)            │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND API + DATABASE                        │
│                                                                   │
│  ┌────────────────┐      ┌──────────────────────────────┐      │
│  │   PostgreSQL   │◄────►│   API Endpoints              │      │
│  │   Database     │      │   GET /api/translations      │      │
│  │                │      │   ?lang={en|ro|ru}           │      │
│  │  translations  │      │   &category={ui|seo|content} │      │
│  │    table       │      └──────────────────────────────┘      │
│  └────────────────┘                                              │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React App)                          │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  translationService.js (API Layer)                        │  │
│  │  • Fetch translations from backend                        │  │
│  │  • Two-tier caching (Memory + localStorage)              │  │
│  │  • 5-minute TTL with auto-refresh                         │  │
│  │  • Fallback to hardcoded translations if API fails       │  │
│  └────────────────────────┬─────────────────────────────────┘  │
│                            │                                     │
│                            ▼                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  TranslationContext (React Context)                       │  │
│  │  • Global translation state management                    │  │
│  │  • Current language state (en/ro/ru)                      │  │
│  │  • setLanguage() method                                   │  │
│  │  • Automatic re-fetch on language change                 │  │
│  └────────────────────────┬─────────────────────────────────┘  │
│                            │                                     │
│                            ▼                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  useTranslation() Hook                                    │  │
│  │  • t('key') - Get translation by key                      │  │
│  │  • language - Current language code                       │  │
│  │  • setLanguage() - Change language                        │  │
│  └────────────────────────┬─────────────────────────────────┘  │
│                            │                                     │
│                            ▼                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  React Components (UI)                                    │  │
│  │  const { t } = useTranslation();                          │  │
│  │  <h1>{t('home.title')}</h1>                               │  │
│  │  <p>{t('home.description')}</p>                           │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Initial Load
```
User opens website
    ↓
TranslationContext initializes
    ↓
Check localStorage cache (valid for 5 minutes)
    ↓
If cache exists and valid → Use cached translations
    ↓
If no cache or expired → Fetch from API
    ↓
GET /api/translations?lang=en
    ↓
Response: [{ key: "home.title", value: "Welcome" }, ...]
    ↓
Transform to {key: value} object
    ↓
Store in memory (Map) + localStorage with timestamp
    ↓
Components render with translations
```

### 2. Language Switch
```
User clicks language selector (EN → RO)
    ↓
setCurrentLang('ro') called (via useLanguage hook)
    ↓
TranslationContext detects language change
    ↓
Check localStorage cache for 'ro'
    ↓
If cache exists and valid → Use cached translations
    ↓
If no cache or expired → Fetch from API
    ↓
GET /api/translations?lang=ro
    ↓
Response: [{ key: "home.title", value: "Bun venit" }, ...]
    ↓
Transform to {key: value} object
    ↓
Store in cache
    ↓
Components re-render with Romanian translations
```

### 3. Admin Panel Updates
```
Admin adds/edits translation in Admin Panel
    ↓
POST /api/translations
    ↓
Database updated
    ↓
Frontend cache expires after 5 minutes (or manual refresh via refreshTranslations())
    ↓
Next fetch gets updated translations
```

## Database Schema

### Translations Table
```sql
CREATE TABLE translations (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) NOT NULL,           -- e.g., 'home.title', 'nav.services'
  language VARCHAR(10) NOT NULL,       -- 'en', 'ro', 'ru'
  category VARCHAR(50) NOT NULL,       -- 'ui', 'seo', 'content'
  value TEXT NOT NULL,                 -- Translated text
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(key, language, category)      -- One translation per key+lang+category
);

-- Indexes for performance
CREATE INDEX idx_translations_key_lang ON translations(key, language);
CREATE INDEX idx_translations_lang_category ON translations(language, category);
```

### Example Data
```sql
-- English UI translations
INSERT INTO translations (key, language, category, value) VALUES
('home.title', 'en', 'ui', 'Welcome to iShunea'),
('nav.services', 'en', 'ui', 'Services'),
('nav.works', 'en', 'ui', 'Portfolio'),
('footer.contact', 'en', 'ui', 'Get in Touch');

-- Romanian UI translations
INSERT INTO translations (key, language, category, value) VALUES
('home.title', 'ro', 'ui', 'Bun venit la iShunea'),
('nav.services', 'ro', 'ui', 'Servicii'),
('nav.works', 'ro', 'ui', 'Portofoliu'),
('footer.contact', 'ro', 'ui', 'Contactează-ne');

-- Russian UI translations
INSERT INTO translations (key, language, category, value) VALUES
('home.title', 'ru', 'ui', 'Добро пожаловать в iShunea'),
('nav.services', 'ru', 'ui', 'Услуги'),
('nav.works', 'ru', 'ui', 'Портфолио'),
('footer.contact', 'ru', 'ui', 'Свяжитесь с нами');
```

## Backend API Implementation

### API Endpoint
```javascript
// GET /api/translations?lang={en|ro|ru}
// Query params: lang (required)

app.get('/api/translations', async (req, res) => {
  try {
    const { lang } = req.query;
    
    // Validate language
    const validLangs = ['en', 'ro', 'ru'];
    if (!lang || !validLangs.includes(lang)) {
      return res.status(400).json({ 
        error: 'Invalid language. Must be: en, ro, or ru' 
      });
    }
    
    // Query all translations for the language
    const query = 'SELECT key, value FROM translations WHERE language = $1';
    const result = await db.query(query, [lang]);
    
    // Return as array of {key, value} objects
    const translations = result.rows.map(row => ({
      key: row.key,
      value: row.value
    }));
    
    res.json(translations);
    
  } catch (error) {
    console.error('Translation API error:', error);
    res.status(500).json({ error: 'Failed to fetch translations' });
  }
});
```

### Response Format
```json
[
  { "key": "home.title", "value": "Welcome to iShunea" },
  { "key": "home.subtitle", "value": "Innovative Tech Solutions" },
  { "key": "nav.services", "value": "Services" },
  { "key": "nav.works", "value": "Portfolio" },
  { "key": "nav.about", "value": "About Us" },
  { "key": "nav.blog", "value": "Blog" },
  { "key": "nav.contact", "value": "Contact" },
  { "key": "footer.copyright", "value": "© 2025 iShunea Tech Solutions" },
  { "key": "footer.contact", "value": "Get in Touch" }
]
```

## Frontend Implementation

### 1. Translation Service (`src/services/translationService.js`)

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ishunea-backend.replit.app';

class TranslationService {
  constructor() {
    this.cache = new Map();
    // Cache TTL: 5 minutes (can be adjusted for production)
    this.CACHE_TTL = 5 * 60 * 1000;
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    try {
      const cached = localStorage.getItem('translations_cache');
      if (cached) {
        const { data } = JSON.parse(cached);
        Object.entries(data).forEach(([lang, cacheEntry]) => {
          const age = Date.now() - cacheEntry.timestamp;
          if (age < this.CACHE_TTL) {
            this.cache.set(lang, {
              translations: cacheEntry.translations,
              timestamp: cacheEntry.timestamp
            });
          }
        });
      }
    } catch (error) {
      console.warn('Failed to load translations from localStorage:', error);
    }
  }

  saveToLocalStorage() {
    try {
      const data = {};
      this.cache.forEach((cacheEntry, lang) => {
        data[lang] = cacheEntry;
      });
      localStorage.setItem('translations_cache', JSON.stringify({ data }));
    } catch (error) {
      console.warn('Failed to save translations to localStorage:', error);
    }
  }

  async fetchTranslations(language) {
    // Check memory cache first
    if (this.cache.has(language)) {
      const cacheEntry = this.cache.get(language);
      const age = Date.now() - cacheEntry.timestamp;
      
      if (age < this.CACHE_TTL) {
        return cacheEntry.translations;
      } else {
        this.cache.delete(language);
      }
    }

    // Fetch from API
    try {
      const response = await fetch(`${API_BASE_URL}/api/translations?lang=${language}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform array [{key, value}] to object {key: value}
      const translations = {};
      data.forEach(item => {
        translations[item.key] = item.value;
      });
      
      // Cache the translations
      this.cache.set(language, {
        translations,
        timestamp: Date.now()
      });
      this.saveToLocalStorage();
      
      return translations;
    } catch (error) {
      console.error('Failed to fetch translations:', error);
      return this.getFallbackTranslations(language);
    }
  }

  getFallbackTranslations(language) {
    // Hardcoded fallback translations for when API fails
    return {
      'common.loading': 'Loading...',
      'common.error': 'Error',
      'nav.home': 'Home',
      'nav.services': 'Services',
      'nav.works': 'Works',
      'nav.about': 'About',
      'nav.blog': 'Blog',
      'nav.contacts': 'Contacts',
      'nav.careers': 'Careers'
    };
  }

  clearCache() {
    this.cache.clear();
    localStorage.removeItem('translations_cache');
  }

  async refreshTranslations(language) {
    this.cache.delete(language);
    return this.fetchTranslations(language);
  }
}

// Export singleton instance
export default new TranslationService();
```

### 2. SEO Context (Language Management) (`src/contexts/SEOContext.jsx`)

```javascript
import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within SEOProvider');
  }
  return context;
};

export const SEOProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    // Detect language from URL path
    const pathLang = window.location.pathname.split('/')[1];
    if (['en', 'ro', 'ru'].includes(pathLang)) {
      setCurrentLang(pathLang);
    } else {
      setCurrentLang('en');
    }
  }, []);

  const languageValue = {
    currentLang,
    setCurrentLang,
    availableLangs: ['en', 'ro', 'ru']
  };

  return (
    <LanguageContext.Provider value={languageValue}>
      {children}
    </LanguageContext.Provider>
  );
};
```

### 3. Translation Context (`src/contexts/TranslationContext.jsx`)

```javascript
import { createContext, useContext, useState, useEffect } from 'react';
import translationService from '../services/translationService';
import { useLanguage } from './SEOContext';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const { currentLang } = useLanguage(); // Get language from SEOContext
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTranslations();
  }, [currentLang]);

  const loadTranslations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await translationService.fetchTranslations(currentLang);
      setTranslations(data);
    } catch (err) {
      console.error('Error loading translations:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const t = (key, fallback = '') => {
    return translations[key] || fallback || key;
  };

  const refreshTranslations = async () => {
    const data = await translationService.refreshTranslations(currentLang);
    setTranslations(data);
  };

  return (
    <TranslationContext.Provider 
      value={{ 
        t, 
        translations, 
        loading, 
        error,
        refreshTranslations,
        currentLang 
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
};
```

### 4. App Integration (`src/main.jsx`)

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { SEOProvider } from './contexts/SEOContext';
import { TranslationProvider } from './contexts/TranslationContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SEOProvider>
      <TranslationProvider>
        <App />
      </TranslationProvider>
    </SEOProvider>
  </React.StrictMode>
);
```

**Important:** SEOProvider must wrap TranslationProvider because TranslationProvider depends on the `useLanguage` hook from SEOContext.

### 5. Component Usage

```javascript
import React from 'react';
import { useTranslation } from '../contexts/TranslationContext';
import { useLanguage } from '../contexts/SEOContext';

const HomePage = () => {
  const { t } = useTranslation();
  const { currentLang, setCurrentLang } = useLanguage();

  return (
    <div>
      {/* Language Selector */}
      <select value={currentLang} onChange={(e) => setCurrentLang(e.target.value)}>
        <option value="en">English</option>
        <option value="ro">Română</option>
        <option value="ru">Русский</option>
      </select>

      {/* Translated Content */}
      <h1>{t('home.title')}</h1>
      <p>{t('home.subtitle')}</p>
      
      {/* Navigation */}
      <nav>
        <a href="/services">{t('nav.services')}</a>
        <a href="/works">{t('nav.works')}</a>
        <a href="/about">{t('nav.about')}</a>
        <a href="/blog">{t('nav.blog')}</a>
        <a href="/contact">{t('nav.contact')}</a>
      </nav>
    </div>
  );
};

export default HomePage;
```

## Implementation Steps for New Projects (e.g., EasyReserv)

### Step 1: Backend Setup

1. **Create Database Table**
   ```sql
   CREATE TABLE translations (
     id SERIAL PRIMARY KEY,
     key VARCHAR(255) NOT NULL,
     language VARCHAR(10) NOT NULL,
     category VARCHAR(50) NOT NULL,
     value TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW(),
     UNIQUE(key, language, category)
   );
   ```

2. **Create API Endpoint**
   ```javascript
   app.get('/api/translations', async (req, res) => {
     // See "Backend API Implementation" section above
   });
   ```

3. **Seed Initial Translations**
   ```sql
   -- Add your initial translations for all 3 languages
   INSERT INTO translations (key, language, category, value) VALUES
   ('app.title', 'en', 'ui', 'EasyReserv'),
   ('app.title', 'ro', 'ui', 'EasyReserv'),
   ('app.title', 'ru', 'ui', 'EasyReserv');
   ```

### Step 2: Frontend Setup

1. **Install Dependencies** (if not already installed)
   ```bash
   npm install
   ```

2. **Create SEO Context (Language Management)**
   - Copy `src/contexts/SEOContext.jsx`
   - This manages the current language state
   - Language is detected from URL path (e.g., /en/, /ro/, /ru/)

3. **Create Translation Service**
   - Copy `src/services/translationService.js`
   - Update `API_BASE_URL` to your backend URL in the file
   - This is a singleton class that handles API calls and caching

4. **Create Translation Context**
   - Copy `src/contexts/TranslationContext.jsx`
   - This depends on SEOContext for language state

5. **Wrap App with Providers**
   ```javascript
   // src/main.jsx
   import { SEOProvider } from './contexts/SEOContext';
   import { TranslationProvider } from './contexts/TranslationContext';
   
   ReactDOM.createRoot(document.getElementById('root')).render(
     <SEOProvider>
       <TranslationProvider>
         <App />
       </TranslationProvider>
     </SEOProvider>
   );
   ```

6. **Use in Components**
   ```javascript
   import { useTranslation } from '../contexts/TranslationContext';
   import { useLanguage } from '../contexts/SEOContext';
   
   const MyComponent = () => {
     const { t } = useTranslation();
     const { currentLang, setCurrentLang } = useLanguage();
     
     return (
       <div>
         <h1>{t('my.translation.key')}</h1>
         <button onClick={() => setCurrentLang('ro')}>Switch to Romanian</button>
       </div>
     );
   };
   ```

### Step 3: Admin Panel Integration

1. **Create Translation Management UI**
   - List all translations
   - Add new translations
   - Edit existing translations
   - Delete translations

2. **Admin API Endpoints**
   ```javascript
   // POST /api/translations - Create translation
   // PUT /api/translations/:id - Update translation
   // DELETE /api/translations/:id - Delete translation
   ```

3. **Cache Invalidation**
   - After admin updates, clear frontend cache
   - Option 1: Manual refresh button in admin (calls refreshTranslations())
   - Option 2: WebSocket notification to frontend
   - Option 3: Wait for 5-minute TTL expiration (automatic)

## Translation Categories

### UI Translations (`category: 'ui'`)
- Navigation labels
- Button text
- Form labels
- Error messages
- General UI text

### SEO Translations (`category: 'seo'`)
- Page titles
- Meta descriptions
- Open Graph titles/descriptions
- Alt text for images

### Content Translations (`category: 'content'`)
- Blog post titles/content
- Service descriptions
- About page content
- Any dynamic content

## Caching Strategy

### Two-Tier Cache System

1. **Memory Cache (Map)**
   - Fastest access
   - Lost on page refresh
   - Used for immediate lookups

2. **localStorage Cache**
   - Persists across page refreshes
   - Survives browser restarts
   - Fallback when memory cache is empty

### Cache TTL (Time To Live)
- **Current Implementation**: 5 minutes (300000 ms)
- **Development**: 5 minutes allows for quick testing when admin updates translations
- **Production**: 5 minutes ensures fresh content; can be adjusted in translationService.js if needed

### Cache Invalidation
```javascript
// Import the singleton instance
import translationService from './services/translationService';

// Clear all translation caches
translationService.clearCache();

// Or refresh translations for current language
const { refreshTranslations } = useTranslation();
await refreshTranslations();
```

## Best Practices

### 1. Translation Key Naming Convention
```javascript
// Format: section.component.element
'home.hero.title'           // Home page, hero section, title
'nav.header.services'       // Navigation, header, services link
'form.contact.submit'       // Form, contact form, submit button
'error.validation.email'    // Error, validation, email field
```

### 2. Fallback Strategy
```javascript
// Always provide fallback
const { t } = useTranslation();

// Option 1: Key as fallback
<h1>{t('home.title')}</h1>  // Shows 'home.title' if translation missing

// Option 2: Custom fallback
<h1>{t('home.title', 'Welcome')}</h1>  // Shows 'Welcome' if missing
```

### 3. Loading States
```javascript
const { t, loading } = useTranslation();

if (loading) {
  return <div>Loading translations...</div>;
}

return <h1>{t('home.title')}</h1>;
```

### 4. Error Handling
```javascript
// translationService.js already includes:
// - API error handling with try-catch
// - Fallback to hardcoded essential translations
// - Console error logging
// - Graceful degradation when backend unavailable
```

### 5. Performance Optimization
```javascript
// Preload translations for better UX
import translationService from '../services/translationService';

useEffect(() => {
  // Preload all languages on app start
  ['en', 'ro', 'ru'].forEach(lang => {
    translationService.fetchTranslations(lang);
  });
}, []);
```

### 6. SEO Considerations
```javascript
// Use hreflang tags for multilingual SEO
<Helmet>
  <link rel="alternate" hreflang="en" href="https://example.com/en" />
  <link rel="alternate" hreflang="ro" href="https://example.com/ro" />
  <link rel="alternate" hreflang="ru" href="https://example.com/ru" />
</Helmet>
```

## Troubleshooting

### Issue 1: Translations Not Loading
**Solution:**
```javascript
// Check browser console for errors
// Verify API URL is correct
console.log(import.meta.env.VITE_API_URL);

// Check network tab for API response
// Clear cache and retry
import translationService from './services/translationService';
translationService.clearCache();
```

### Issue 2: Cache Not Updating
**Solution:**
```javascript
// Clear cache manually
import translationService from './services/translationService';
translationService.clearCache();

// Or adjust TTL in translationService.js
this.CACHE_TTL = 5 * 60 * 1000; // 5 minutes
```

### Issue 3: Language Switch Not Working
**Solution:**
```javascript
// Ensure SEOProvider wraps TranslationProvider in main.jsx
// Use setCurrentLang from useLanguage hook, not from useTranslation
import { useLanguage } from './contexts/SEOContext';

const { setCurrentLang } = useLanguage();
setCurrentLang('ro'); // This will trigger translation reload
```

## Environment Variables

```env
# .env file
VITE_API_URL=https://your-backend.replit.app
```

```javascript
// Access in code
const API_URL = import.meta.env.VITE_API_URL;
```

## Testing

### Test Translation Service
```javascript
import translationService from './services/translationService';

// Test API fetch
const translations = await translationService.fetchTranslations('en');
console.log(translations);

// Test cache (should return instantly from cache)
const cached = await translationService.fetchTranslations('en');
console.log(cached === translations); // Should use cache
```

### Test Translation Context
```javascript
import { render, screen } from '@testing-library/react';
import { SEOProvider } from './contexts/SEOContext';
import { TranslationProvider } from './contexts/TranslationContext';

test('provides translations to components', async () => {
  render(
    <SEOProvider>
      <TranslationProvider>
        <TestComponent />
      </TranslationProvider>
    </SEOProvider>
  );
  
  expect(await screen.findByText('Welcome')).toBeInTheDocument();
});
```

## Migration from Static to Backend-Driven

### Before (Static JSON)
```javascript
// src/locales/en.json
{
  "home.title": "Welcome",
  "nav.services": "Services"
}

// Component
import en from '../locales/en.json';
const title = en['home.title'];
```

### After (Backend-Driven)
```javascript
// Component
import { useTranslation } from '../contexts/TranslationContext';

const { t } = useTranslation();
const title = t('home.title');
```

**Migration Steps:**
1. Set up backend database and API (see Backend API Implementation section)
2. Import existing translation data to database
3. Implement SEO Context for language management
4. Implement translation service singleton class with hardcoded fallbacks
5. Implement translation context with useTranslation hook
6. Replace static imports with useTranslation hook in components
7. Test thoroughly with all 3 languages
8. Confirm API integration works correctly

## Summary

### Key Benefits
✅ **Centralized Management** - All translations in one database  
✅ **Admin Panel Control** - Edit translations without code changes  
✅ **Performance** - Two-tier caching with 5-minute TTL  
✅ **Scalability** - Easy to add new languages  
✅ **Reliability** - Fallback to hardcoded essential translations if API fails  
✅ **SEO-Friendly** - Supports hreflang and multilingual SEO  

### Architecture Summary
- **Backend**: PostgreSQL database + REST API (returns array of {key, value})
- **Frontend**: SEO Context (language management) + Translation Service (singleton class) + Translation Context + useTranslation hook
- **Admin**: CRUD interface for translation management
- **Caching**: Two-tier (Memory Map + localStorage) with 5-minute TTL
- **Languages**: EN, RO, RU (easily extensible)
- **Fallback**: Hardcoded essential translations when API fails

### Key Implementation Details
- Translation service is a **singleton class instance** (not functional exports)
- Language state is managed by **SEOContext**, accessed via `useLanguage()` hook
- TranslationContext **depends on SEOContext**, so SEOProvider must wrap TranslationProvider
- API returns **array** of objects, service transforms to key-value object for component use
- Cache TTL is **5 minutes** (adjustable in translationService.js)
- Components use `t()` function from `useTranslation()` for translations
- Language switching via `setCurrentLang()` from `useLanguage()` hook

This pattern is production-ready and can be replicated for any React + Node.js project requiring multi-language support.
