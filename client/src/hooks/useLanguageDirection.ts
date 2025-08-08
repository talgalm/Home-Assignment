import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export const useLanguageDirection = () => {
  const { i18n } = useTranslation();
  
  const direction = useMemo(() => {
    return i18n.language === 'he' ? 'rtl' : 'ltr';
  }, [i18n.language]);
  
  return direction;
};
