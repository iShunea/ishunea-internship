import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SEOContext = createContext();
const LanguageContext = createContext();

export const useSEO = () => {
  const context = useContext(SEOContext);
  if (!context) {
    throw new Error('useSEO must be used within SEOProvider');
  }
  return context;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within SEOProvider');
  }
  return context;
};

export const SEOProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(() => {
    const pathLang = window.location.pathname.split('/')[1];
    
    if (['en', 'ru'].includes(pathLang)) {
      return pathLang;
    }
    
    return 'ro';
  });
  
  const [seoData, setSeoData] = useState({});

  useEffect(() => {
    const pathLang = window.location.pathname.split('/')[1];
    if (['en', 'ru'].includes(pathLang) && pathLang !== currentLang) {
      setCurrentLang(pathLang);
    } else if (!['en', 'ru'].includes(pathLang) && currentLang !== 'ro') {
      setCurrentLang('ro');
    }
  }, [window.location.pathname]);

  const changeLanguage = (newLang) => {
    if (['en', 'ro', 'ru'].includes(newLang)) {
      const currentPath = window.location.pathname;
      const pathParts = currentPath.split('/').filter(Boolean);
      
      if (['en', 'ru'].includes(pathParts[0])) {
        pathParts[0] = newLang;
      } else {
        if (newLang !== 'ro') {
          pathParts.unshift(newLang);
        }
      }
      
      const newPath = newLang === 'ro' ? `/${pathParts.slice(1).join('/')}` : `/${pathParts.join('/')}`;
      window.location.href = newPath || '/';
    }
  };

  const updateSEO = (data) => {
    setSeoData(data);
  };

  const languageValue = {
    currentLang,
    setCurrentLang,
    changeLanguage,
    availableLangs: ['en', 'ro', 'ru']
  };

  const seoValue = {
    seoData,
    updateSEO
  };

  return (
    <LanguageContext.Provider value={languageValue}>
      <SEOContext.Provider value={seoValue}>
        {children}
      </SEOContext.Provider>
    </LanguageContext.Provider>
  );
};

SEOProvider.propTypes = {
  children: PropTypes.node.isRequired
};
