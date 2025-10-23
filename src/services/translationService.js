const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ishunea-backend.replit.app';

class TranslationService {
  constructor() {
    this.cache = new Map();
    // Cache TTL: 5 minutes for development (easier testing when data changes in Admin)
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
      localStorage.setItem('translations_cache', JSON.stringify({
        data
      }));
    } catch (error) {
      console.warn('Failed to save translations to localStorage:', error);
    }
  }

  async fetchTranslations(language) {
    this.cache.delete(language);
    console.log(`Fetching translations for language: ${language}...`);

    try {
      const response = await fetch(`${API_BASE_URL}/api/translations?lang=${language}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      const translations = {};
      data.forEach(item => {
        translations[item.key] = item.value;
      });
      
      // If backend returns too few keys, use fallbacks instead
      if (Object.keys(translations).length < 10) {
        console.log(`Backend returned only ${Object.keys(translations).length} keys, using fallbacks instead`);
        const fallbacks = this.getFallbackTranslations(language);
        console.log(`Using fallback translations for language: ${language}`, Object.keys(fallbacks).length, 'keys');
        return fallbacks;
      }
      
      this.cache.set(language, {
        translations,
        timestamp: Date.now()
      });
      this.saveToLocalStorage();
      
      return translations;
    } catch (error) {
      console.error('Failed to fetch translations:', error);
      const fallbacks = this.getFallbackTranslations(language);
      console.log(`Using fallback translations for language: ${language}`, Object.keys(fallbacks).length, 'keys');
      return fallbacks;
    }
  }

  getFallbackTranslations(language) {
    const translations = {
      ro: {
        'common.loading': 'Se încarcă...',
        'common.error': 'Eroare',
        'nav.home': 'Acasă',
        'nav.company': 'Companie',
        'nav.services': 'Servicii',
        'nav.works': 'Proiecte',
        'nav.about': 'Despre',
        'nav.blog': 'Blog',
        'nav.contacts': 'Contacte',
        'nav.careers': 'Cariere',
        'nav.menu': 'meniu',
        'home.hero.title': 'Transformăm ideile tale în digital',
        'home.hero.description': 'Soluții complete pentru sisteme ERP, CRM, aplicații mobile și platforme web',
        'home.hero.button': 'contactează-ne',
        'home.advantage.title': 'Simplu la fiecare etapă',
        'home.advantage.card1': 'dezvoltare completă a produsului',
        'home.advantage.card2': 'echipă de profesioniști calificați',
        'home.advantage.card3': 'abordare transparentă și individuală',
        'home.advantage.card4': 'securitate de nivel înalt a soluției dezvoltate',
        'home.advantage.card5': 'la curent cu noile tehnologii',
        'home.advantage.card6': 'construim relații pe termen lung',
        'home.progress.title': 'Cum funcționează',
        'home.progress.intro': 'Procesele noastre sunt transparente, astfel încât veți ști la ce lucrăm și de ce',
        'home.progress.step1.title': 'Analiză, Discuție și Ofertă',
        'home.progress.step1.description': 'Analizăm obiectivele și așteptările dvs., trecând prin toate cerințele. Apoi estimăm prețul și timpul pentru dezvoltarea produsului.',
        'home.progress.step2.title': 'Cercetare și Wireframing',
        'home.progress.step2.description': 'Creăm un wireframe pentru a stabili arhitectura produsului. Aceasta va oferi tuturor o imagine de ansamblu asupra riscurilor și oportunităților dvs.',
        'home.progress.step3.title': 'Design de Produs',
        'home.progress.step3.description': 'Echipa noastră de design creează un prototip de înaltă calitate al soluției dvs. bazat pe wireframe-uri, parcurgând toate ecranele și elementele.',
        'home.progress.step4.title': 'Dezvoltare Soluție',
        'home.progress.step4.description': 'Echipa noastră de dezvoltatori construiește produsul dvs. folosind standarde moderne de codare și tehnologii dovedite pentru a asigura că este rapid, securizat și scalabil.',
        'home.progress.step5.title': 'Testare și Asigurare Calitate',
        'home.progress.step5.description': 'Produsul trece prin mai multe faze de testare pentru a ne asigura că nu există bug-uri sau întârzieri și că produsul oferă o experiență bună utilizatorului.',
        'home.progress.step6.title': 'Lansare Produs',
        'home.progress.step6.description': 'Acesta nu este sfârșitul angajamentului nostru. Oferim suport tehnic pentru o perioadă de timp, astfel încât să nu fiți singur odată ce lucrarea este finalizată.',
        'home.cta.title': 'Nu ești sigur de ce ai nevoie?',
        'home.cta.description': 'Solicită o consultație pentru a vă oferi baza noastră de cunoștințe și a vă ajuta să configurați cea mai bună soluție digitală pentru afacerea dvs.',
        'home.cta.button': 'solicită acum',
        'home.blog.title': 'Ultimele articole'
      },
      en: {
        'common.loading': 'Loading...',
        'common.error': 'Error',
        'nav.home': 'Home',
        'nav.company': 'Company',
        'nav.services': 'Services',
        'nav.works': 'Works',
        'nav.about': 'About',
        'nav.blog': 'Blog',
        'nav.contacts': 'Contacts',
        'nav.careers': 'Careers',
        'nav.menu': 'menu',
        'home.hero.title': 'Moving your ideas to digital',
        'home.hero.description': 'The ultimate solutions for ERP systems, CRMs, mobile apps and web platforms',
        'home.hero.button': 'contact us',
        'home.advantage.title': 'Simple at every stage',
        'home.advantage.card1': 'full cycle product development',
        'home.advantage.card2': 'team of qualified professionals',
        'home.advantage.card3': 'transparent and individual approach',
        'home.advantage.card4': 'high-level security of developed solution',
        'home.advantage.card5': 'up-to-date with new technologies',
        'home.advantage.card6': 'build long-term relationships',
        'home.progress.title': 'How it works',
        'home.progress.intro': 'Our processes are transparent so you will know what we are working on, and why',
        'home.progress.step1.title': 'Analysis, Discussion & Offer',
        'home.progress.step1.description': 'We analyse your objectives and expectations going through all the requirements. Then we have an estimation of the price & time for product development.',
        'home.progress.step2.title': 'Research & Wireframing',
        'home.progress.step2.description': "We set up a wireframe to establish the architecture of the product. This will give everyone the insight on the 'big picture' of your risks and opportunities.",
        'home.progress.step3.title': 'Product Design',
        'home.progress.step3.description': 'Our design team create high-quality prototype of your solution based on the wireframes and going through all the screens and elements.',
        'home.progress.step4.title': 'Solution Development',
        'home.progress.step4.description': 'Our team of developers build your product using modern coding standards and proven technologies to ensure that it is quickly, secure and scalable.',
        'home.progress.step5.title': 'Testing & Quality Assurance',
        'home.progress.step5.description': 'The product goes through several testing phases to ensure that there are no bugs or lags and the product itself provides a good user experience.',
        'home.progress.step6.title': 'Product Launch',
        'home.progress.step6.description': 'This is not the end of our commitment. We provide technical support for a period of time so you will not be on your own once the work is completed.',
        'home.cta.title': 'Not sure about what you need?',
        'home.cta.description': 'Request a consultation so we offer our knowledge base to help you set up the best digital solution for your business',
        'home.cta.button': 'request now',
        'home.blog.title': 'Latest articles'
      },
      ru: {
        'common.loading': 'Загрузка...',
        'common.error': 'Ошибка',
        'nav.home': 'Главная',
        'nav.company': 'Компания',
        'nav.services': 'Услуги',
        'nav.works': 'Проекты',
        'nav.about': 'О нас',
        'nav.blog': 'Блог',
        'nav.contacts': 'Контакты',
        'nav.careers': 'Карьера',
        'nav.menu': 'меню',
        'home.hero.title': 'Воплощаем ваши идеи в цифру',
        'home.hero.description': 'Комплексные решения для ERP-систем, CRM, мобильных приложений и веб-платформ',
        'home.hero.button': 'связаться с нами',
        'home.advantage.title': 'Просто на каждом этапе',
        'home.advantage.card1': 'полный цикл разработки продукта',
        'home.advantage.card2': 'команда квалифицированных профессионалов',
        'home.advantage.card3': 'прозрачный и индивидуальный подход',
        'home.advantage.card4': 'высокий уровень безопасности разработанного решения',
        'home.advantage.card5': 'в курсе новых технологий',
        'home.advantage.card6': 'строим долгосрочные отношения',
        'home.progress.title': 'Как это работает',
        'home.progress.intro': 'Наши процессы прозрачны, поэтому вы будете знать, над чем мы работаем и почему',
        'home.progress.step1.title': 'Анализ, Обсуждение и Предложение',
        'home.progress.step1.description': 'Мы анализируем ваши цели и ожидания, изучая все требования. Затем оцениваем стоимость и сроки разработки продукта.',
        'home.progress.step2.title': 'Исследование и Каркасное моделирование',
        'home.progress.step2.description': 'Мы создаём каркас для определения архитектуры продукта. Это даст всем понимание общей картины ваших рисков и возможностей.',
        'home.progress.step3.title': 'Дизайн Продукта',
        'home.progress.step3.description': 'Наша команда дизайнеров создаёт высококачественный прототип вашего решения на основе каркасов, прорабатывая все экраны и элементы.',
        'home.progress.step4.title': 'Разработка Решения',
        'home.progress.step4.description': 'Наша команда разработчиков создаёт ваш продукт, используя современные стандарты кодирования и проверенные технологии.',
        'home.progress.step5.title': 'Тестирование и Обеспечение Качества',
        'home.progress.step5.description': 'Продукт проходит несколько этапов тестирования, чтобы убедиться в отсутствии ошибок или задержек, а сам продукт обеспечивает хороший пользовательский опыт.',
        'home.progress.step6.title': 'Запуск Продукта',
        'home.progress.step6.description': 'Это не конец нашего обязательства. Мы предоставляем техническую поддержку в течение определённого времени.',
        'home.cta.title': 'Не уверены, что вам нужно?',
        'home.cta.description': 'Запросите консультацию, чтобы мы предложили нашу базу знаний и помогли настроить лучшее цифровое решение для вашего бизнеса',
        'home.cta.button': 'запросить сейчас',
        'home.blog.title': 'Последние статьи'
      }
    };
    
    return translations[language] || translations.en;
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

export default new TranslationService();
