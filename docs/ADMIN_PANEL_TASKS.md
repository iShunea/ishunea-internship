# Task List pentru Admin Panel - Sistem Traduceri

## 📋 Overview
Admin Panel-ul trebuie să permită gestionarea completă a traducerilor pentru site-ul iShunea Tech Solutions în 3 limbi: EN, RO, RU.

---

## 🎯 Task List Detaliat

### **FASE 1: Backend & Database**

#### Task 1.1: Database Schema
**Prioritate:** ⚡ Critical  
**Estimare:** 1-2 ore

**Acțiuni:**
- [ ] Creează tabelul `translations` în PostgreSQL
- [ ] Adaugă index-uri pentru performanță (language, key, category)
- [ ] Adaugă constraint UNIQUE pentru (key, language)
- [ ] Creează migration script

**Schema SQL:**
```sql
CREATE TABLE translations (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) NOT NULL,
  value TEXT NOT NULL,
  language VARCHAR(5) NOT NULL CHECK (language IN ('en', 'ro', 'ru')),
  category VARCHAR(50) CHECK (category IN ('ui', 'seo', 'content', 'errors', 'validation')),
  page VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by INT REFERENCES users(id),
  updated_by INT REFERENCES users(id),
  UNIQUE(key, language)
);

CREATE INDEX idx_translations_lang ON translations(language);
CREATE INDEX idx_translations_key ON translations(key);
CREATE INDEX idx_translations_category ON translations(category, language);
```

---

#### Task 1.2: Backend API Endpoints
**Prioritate:** ⚡ Critical  
**Estimare:** 2-3 ore

**Acțiuni:**
- [ ] `GET /api/translations?lang={lang}&category={category}` - Fetch toate traducerile
- [ ] `GET /api/translations/:key?lang={lang}` - Fetch traducere specifică
- [ ] `POST /api/translations` - Creează traducere nouă
- [ ] `PUT /api/translations/:id` - Actualizează traducere
- [ ] `DELETE /api/translations/:id` - Șterge traducere
- [ ] Adaugă validare pentru language codes (en/ro/ru)
- [ ] Implementează error handling

**Response Format Example:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "key": "nav.home",
      "value": "Home",
      "language": "en",
      "category": "ui",
      "page": "navigation",
      "updated_at": "2025-10-15T10:00:00Z"
    }
  ]
}
```

---

#### Task 1.3: Bulk Import/Export
**Prioritate:** 🔶 High  
**Estimare:** 2 ore

**Acțiuni:**
- [ ] `POST /api/translations/import` - Import JSON/CSV
- [ ] `GET /api/translations/export?lang={lang}` - Export toate traducerile
- [ ] Validare format import
- [ ] Duplicate detection & update strategy

**Import JSON Format:**
```json
{
  "language": "en",
  "translations": [
    {
      "key": "nav.home",
      "value": "Home",
      "category": "ui",
      "page": "navigation"
    }
  ]
}
```

---

### **FASE 2: Admin Panel UI**

#### Task 2.1: Pagină Translations Management
**Prioritate:** ⚡ Critical  
**Estimare:** 3-4 ore

**Acțiuni:**
- [ ] Creează componentă TranslationsPage
- [ ] Tabelare cu toate traducerile (DataTable/AG Grid)
- [ ] Filtrare după: limbă, categorie, pagină, key search
- [ ] Sortare după coloane
- [ ] Paginare (50-100 items per page)

**Coloane Tabel:**
| Key | EN | RO | RU | Category | Page | Actions |
|-----|----|----|-----|----------|------|---------|
| nav.home | Home | Acasă | Главная | ui | navigation | Edit/Delete |

---

#### Task 2.2: Add/Edit Translation Modal
**Prioritate:** ⚡ Critical  
**Estimare:** 2-3 ore

**Acțiuni:**
- [ ] Modal pentru adăugare/editare traducere
- [ ] Form cu câmpuri:
  - Key (auto-suggest din keys existente)
  - Value EN (required)
  - Value RO (required)
  - Value RU (required)
  - Category (dropdown: ui, seo, content, errors, validation)
  - Page (dropdown: home, services, blog, etc.)
  - Description (optional, pentru context)
- [ ] Validare client-side
- [ ] Preview key naming convention
- [ ] Butoane: Save All / Save & Add New / Cancel

---

#### Task 2.3: Multi-language Editing View
**Prioritate:** 🔶 High  
**Estimare:** 2 ore

**Acțiuni:**
- [ ] Side-by-side editor pentru toate limbile
- [ ] Highlight missing translations (câmpuri goale)
- [ ] Character count pentru SEO fields (title max 60, description max 160)
- [ ] Rich text editor pentru content fields (optional)

---

#### Task 2.4: Bulk Operations
**Prioritate:** 🟡 Medium  
**Estimare:** 2 ore

**Acțiuni:**
- [ ] Select multiple translations (checkboxes)
- [ ] Bulk delete
- [ ] Bulk category change
- [ ] Bulk export selection

---

#### Task 2.5: Import/Export UI
**Prioritate:** 🔶 High  
**Estimare:** 2 ore

**Acțiuni:**
- [ ] Upload JSON/CSV file pentru import
- [ ] Preview înainte de import
- [ ] Conflict resolution (overwrite / skip / merge)
- [ ] Download button pentru export (JSON/CSV)
- [ ] Export filtrat (doar limba selectată / categoria selectată)

---

#### Task 2.6: Search & Filters
**Prioritate:** 🔶 High  
**Estimare:** 1-2 ore

**Acțiuni:**
- [ ] Search bar (search în key și values pentru toate limbile)
- [ ] Filter dropdowns:
  - Language (EN/RO/RU/All)
  - Category (UI/SEO/Content/All)
  - Page (Home/Services/Blog/All)
- [ ] Show only missing translations toggle
- [ ] Show only recently updated (last 7 days)

---

### **FASE 3: Features Avansate**

#### Task 3.1: Translation History/Audit Log
**Prioritate:** 🟡 Medium  
**Estimare:** 2-3 ore

**Acțiuni:**
- [ ] Tabel `translation_history` în DB
- [ ] Log changes (who, when, old value, new value)
- [ ] View history button în admin panel
- [ ] Restore previous version feature

---

#### Task 3.2: Missing Translations Report
**Prioritate:** 🔶 High  
**Estimare:** 1 ora

**Acțiuni:**
- [ ] Dashboard widget: Missing translations count per language
- [ ] List of keys missing translations
- [ ] Quick add button pentru fiecare missing key

---

#### Task 3.3: Translation Suggestions (AI - Optional)
**Prioritate:** 🟢 Low (Nice to have)  
**Estimare:** 3-4 ore

**Acțiuni:**
- [ ] Integrare OpenAI API pentru auto-traducere
- [ ] "Suggest Translation" button
- [ ] Review și approve workflow
- [ ] Cost tracking pentru API calls

---

#### Task 3.4: Permissions & Roles
**Prioritate:** 🟡 Medium  
**Estimare:** 2 ore

**Acțiuni:**
- [ ] Role: Translation Manager (full access)
- [ ] Role: Translator (doar edit, fără delete)
- [ ] Role: Viewer (doar view)
- [ ] Restrict delete operations pentru admin only

---

### **FASE 4: Testing & Deployment**

#### Task 4.1: Initial Data Seeding
**Prioritate:** ⚡ Critical  
**Estimare:** 1-2 ore

**Acțiuni:**
- [ ] Seed script cu traduceri default pentru:
  - Navigation (nav.home, nav.services, etc.)
  - Common UI (common.loading, common.error, etc.)
  - SEO meta tags (seo.home.title, seo.home.description, etc.)
- [ ] Minim 50-100 traduceri de bază pentru fiecare limbă

---

#### Task 4.2: Testing
**Prioritate:** ⚡ Critical  
**Estimare:** 2 ore

**Acțiuni:**
- [ ] Test CRUD operations
- [ ] Test import/export
- [ ] Test filters și search
- [ ] Test validări
- [ ] Test API responses

---

#### Task 4.3: Documentation
**Prioritate:** 🔶 High  
**Estimare:** 1 oră

**Acțiuni:**
- [ ] User guide pentru Translation Management
- [ ] Key naming conventions document
- [ ] Best practices pentru SEO translations

---

## 📊 Prioritate Tasks (în ordine)

### Sprint 1 (MVP - 1-2 săptămâni):
1. Task 1.1: Database Schema ⚡
2. Task 1.2: Backend API Endpoints ⚡
3. Task 2.1: Translations Management Page ⚡
4. Task 2.2: Add/Edit Translation Modal ⚡
5. Task 4.1: Initial Data Seeding ⚡

### Sprint 2 (Features - 1 săptămână):
6. Task 1.3: Bulk Import/Export 🔶
7. Task 2.5: Import/Export UI 🔶
8. Task 2.6: Search & Filters 🔶
9. Task 3.2: Missing Translations Report 🔶

### Sprint 3 (Nice to Have):
10. Task 2.3: Multi-language Editing View 🔶
11. Task 3.1: Translation History 🟡
12. Task 3.4: Permissions & Roles 🟡
13. Task 3.3: AI Suggestions 🟢

---

## 🎨 UI/UX Mockup Suggestions

### Main Translations Page Layout:
```
┌─────────────────────────────────────────────────────────────┐
│ 🌍 Translations Management                                  │
├─────────────────────────────────────────────────────────────┤
│ [➕ Add New] [⬆️ Import] [⬇️ Export] [🔄 Refresh]           │
│                                                              │
│ 🔍 Search: [_____________]  Language: [All ▾]               │
│    Category: [All ▾]  Page: [All ▾]  □ Show only missing   │
├─────────────────────────────────────────────────────────────┤
│ Key              │ EN         │ RO         │ RU    │ Actions│
│──────────────────┼────────────┼────────────┼───────┼────────│
│ nav.home         │ Home       │ Acasă      │ Главная│ ✏️ 🗑️  │
│ nav.services     │ Services   │ Servicii   │ Услуги │ ✏️ 🗑️  │
│ home.hero.title  │ Moving...  │ Mutăm...   │ -      │ ✏️ 🗑️  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Tech Stack Recomandat

**Backend:**
- Node.js + Express / Django / FastAPI
- PostgreSQL pentru database
- Redis pentru caching (optional)

**Admin Panel:**
- React + Vite (consistency cu frontend)
- Ant Design / Material-UI pentru componente
- React Query pentru API state management
- AG Grid / TanStack Table pentru tabele

---

## ✅ Definition of Done

Pentru fiecare task, consider DONE când:
- [ ] Codul este implementat și testat
- [ ] API endpoints răspund corect (status codes, format)
- [ ] UI este functional și responsive
- [ ] Validările funcționează
- [ ] Error handling este implementat
- [ ] Documentation este actualizată

---

**Estimare Totală:** 25-35 ore (3-5 zile lucru full-time)
**MVP (Sprint 1):** 10-15 ore (1-2 zile)
