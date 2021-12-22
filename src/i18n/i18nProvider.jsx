import React, { useState, useEffect } from 'react';
import I18nContext from './i18nContext';

const defaultLocale = localStorage.getItem('locale');

const I18nProvider = (props) => {
  const [locale, setLocale] = useState(defaultLocale || 'zh_TW');

  const { translations, children } = props || {};

  const i18n = {
    t: (key) => translations[locale][key],
    getLocale: () => locale,
    setLocale: (selectLocale) => setLocale(selectLocale),
  };

  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  return <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>;
};

export default I18nProvider;
