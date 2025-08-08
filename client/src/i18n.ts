import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your translation files
import en from './locales/en/translation.json';
import he from './locales/he/translation.json';

i18n
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      he: {
        translation: he,
      },
    },
    fallbackLng: 'he',
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

export default i18n;
