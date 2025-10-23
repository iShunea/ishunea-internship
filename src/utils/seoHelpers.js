import seoDefaults from '../config/seo-defaults.json';

export const interpolate = (template, data) => {
  if (!template) return '';
  
  return template.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
    const keys = path.trim().split('.');
    let value = data;
    
    for (const key of keys) {
      value = value?.[key];
    }
    
    return value !== undefined ? value : match;
  });
};

export const generateTitle = (pageData) => {
  const { page_type = 'home', ...pageInfo } = pageData;
  const pageTypeConfig = seoDefaults.page_types[page_type];
  
  if (!pageTypeConfig) {
    return seoDefaults.rules.home_title;
  }
  
  const titleTemplate = pageTypeConfig.title;
  return interpolate(titleTemplate, { page: pageInfo, site: seoDefaults.site });
};

export const generateDescription = (pageData) => {
  const { page_type = 'home', ...pageInfo } = pageData;
  const pageTypeConfig = seoDefaults.page_types[page_type];
  
  if (!pageTypeConfig) {
    return seoDefaults.page_types.home.description;
  }
  
  const descTemplate = pageTypeConfig.description;
  const description = interpolate(descTemplate, { page: pageInfo, site: seoDefaults.site });
  
  return description.length > seoDefaults.rules.description_max 
    ? description.substring(0, seoDefaults.rules.description_max - 3) + '...'
    : description;
};

export const generateCanonical = (path, lang = 'ro') => {
  let cleanPath = path.replace(/\/$/, '') || '/';
  
  const pathParts = cleanPath.split('/').filter(Boolean);
  if (['en', 'ro', 'ru'].includes(pathParts[0])) {
    pathParts.shift();
  }
  
  const basePath = pathParts.length > 0 ? `/${pathParts.join('/')}` : '/';
  
  if (lang === 'ro') {
    return `${seoDefaults.site.domain}${basePath}`;
  } else {
    return `${seoDefaults.site.domain}/${lang}${basePath}`;
  }
};

export const generateHreflangs = (path) => {
  let cleanPath = path.replace(/\/$/, '') || '/';
  
  const pathParts = cleanPath.split('/').filter(Boolean);
  if (['en', 'ro', 'ru'].includes(pathParts[0])) {
    pathParts.shift();
  }
  
  const basePath = pathParts.length > 0 ? `/${pathParts.join('/')}` : '/';
  
  const hreflangs = [];
  
  seoDefaults.site.langs.forEach(lang => {
    const langPath = lang === 'ro' ? basePath : `/${lang}${basePath}`;
    hreflangs.push({
      lang: lang,
      url: `${seoDefaults.site.domain}${langPath}`
    });
  });
  
  hreflangs.push({
    lang: 'x-default',
    url: `${seoDefaults.site.domain}${basePath}`
  });
  
  return hreflangs;
};

export const generateOGImage = (pageData) => {
  const { page_type = 'home', slug } = pageData;
  const pageTypeConfig = seoDefaults.page_types[page_type];
  
  if (!pageTypeConfig) {
    return seoDefaults.site.og.default_image;
  }
  
  let ogImage = pageTypeConfig.og_image;
  if (slug && ogImage.includes('{{page.slug}}')) {
    ogImage = ogImage.replace('{{page.slug}}', slug);
  }
  
  return `${seoDefaults.site.domain}${ogImage}`;
};

export const getRobotsTag = (pageData) => {
  const { page_type = 'home' } = pageData;
  const pageTypeConfig = seoDefaults.page_types[page_type];
  
  return pageTypeConfig?.robots || seoDefaults.rules.robots_index_default;
};

export const generateBreadcrumbSchema = (breadcrumbs) => {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
};

export const getOrganizationSchema = () => {
  return seoDefaults.schema.organization;
};

export const getWebSiteSchema = () => {
  return seoDefaults.schema.website;
};

export const generateBlogPostingSchema = (blogData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blogData.title,
    description: blogData.description,
    image: blogData.image,
    author: {
      '@type': 'Organization',
      name: seoDefaults.site.brand
    },
    publisher: {
      '@type': 'Organization',
      name: seoDefaults.site.brand,
      logo: {
        '@type': 'ImageObject',
        url: `${seoDefaults.site.domain}/static/brand/logo.png`
      }
    },
    datePublished: blogData.datePublished,
    dateModified: blogData.dateModified || blogData.datePublished
  };
};

export const generateArticleSchema = (articleData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: articleData.title,
    description: articleData.description,
    image: articleData.image,
    author: {
      '@type': 'Organization',
      name: seoDefaults.site.brand
    },
    publisher: {
      '@type': 'Organization',
      name: seoDefaults.site.brand,
      logo: {
        '@type': 'ImageObject',
        url: `${seoDefaults.site.domain}/static/brand/logo.png`
      }
    },
    datePublished: articleData.datePublished,
    dateModified: articleData.dateModified || articleData.datePublished
  };
};
