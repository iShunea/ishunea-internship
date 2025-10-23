import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useLanguage } from '../contexts/SEOContext';
import { useLocation } from 'react-router-dom';
import {
  generateTitle,
  generateDescription,
  generateCanonical,
  generateHreflangs,
  generateOGImage,
  getRobotsTag,
  generateBreadcrumbSchema
} from '../utils/seoHelpers';
import seoDefaults from '../config/seo-defaults.json';

const SEOHead = ({ 
  pageData = {}, 
  schemas = [], 
  customMeta = {},
  breadcrumbs = null 
}) => {
  const { currentLang } = useLanguage();
  const location = useLocation();
  
  const title = customMeta.title || generateTitle(pageData);
  const description = customMeta.description || generateDescription(pageData);
  const canonical = customMeta.canonical || generateCanonical(location.pathname, currentLang);
  const hreflangs = generateHreflangs(location.pathname);
  const ogImage = customMeta.ogImage || generateOGImage(pageData);
  const robots = customMeta.robots || getRobotsTag(pageData);
  const ogType = customMeta.ogType || seoDefaults.page_types[pageData.page_type]?.og_type || 'website';
  const ogLocale = seoDefaults.defaults_per_lang[currentLang]?.og_locale || 'en_US';
  
  const breadcrumbSchema = breadcrumbs ? generateBreadcrumbSchema(breadcrumbs) : null;
  const allSchemas = breadcrumbSchema ? [...schemas, breadcrumbSchema] : schemas;

  return (
    <Helmet>
      <html lang={currentLang} />
      
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      
      <link rel="canonical" href={canonical} />
      
      {hreflangs.map(({ lang, url }) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={url}
        />
      ))}
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={String(seoDefaults.site.og.width)} />
      <meta property="og:image:height" content={String(seoDefaults.site.og.height)} />
      <meta property="og:site_name" content={seoDefaults.site.og.site_name} />
      <meta property="og:locale" content={ogLocale} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      <meta name="theme-color" content={seoDefaults.site.theme_color} />
      
      <link rel="icon" href={seoDefaults.site.icons.favicon} />
      <link rel="apple-touch-icon" href={seoDefaults.site.icons.apple_touch} />
      <link rel="manifest" href={seoDefaults.site.icons.manifest} />
      
      {allSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

SEOHead.propTypes = {
  pageData: PropTypes.object,
  schemas: PropTypes.arrayOf(PropTypes.object),
  customMeta: PropTypes.object,
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }))
};

export default SEOHead;
