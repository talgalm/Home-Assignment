import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/translation';
import he from './locales/he/translation';

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
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
