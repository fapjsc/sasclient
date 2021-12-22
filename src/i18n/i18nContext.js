import { createContext } from 'react';

const i18nContext = createContext({
  t: () => '',
  getLocale: () => {}, // 取得當前語系
  setLocale: () => {}, // 設定語系
});

export default i18nContext;
