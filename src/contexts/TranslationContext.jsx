import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import translationService from '../services/translationService';
import { useLanguage } from './SEOContext';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const { currentLang } = useLanguage();
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTranslations = useCallback(async () => {
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
  }, [currentLang]);

  useEffect(() => {
    loadTranslations();
  }, [currentLang, loadTranslations]);

  const t = (key, fallback = '') => {
    return translations[key] || key;
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

TranslationProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
};
