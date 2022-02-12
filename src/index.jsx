import React from 'react';
import ReactDOM from 'react-dom';

// Toast
import { ToastContainer } from 'react-toastify';

// Antd i18n
import { ConfigProvider } from 'antd';
import zhTW from 'antd/lib/locale/zh_TW';
// import enUS from 'antd/lib/locale/en_US';

// Moment
import moment from 'moment';
import 'moment/locale/zh-tw';

// Redux
import { Provider } from 'react-redux';
import store from './store/store';

// Custom i18n
import { I18nProvider } from './i18n';

// locals
import {
  // eslint-disable-next-line
  zh_TW, zh_CN, ja_JP, en_US,
} from './i18n/locales';

// Components
import App from './App';

// Report
import reportWebVitals from './reportWebVitals';

// Styles
import 'react-toastify/dist/ReactToastify.css';
import './sass/animation.scss';
import './sass/utils-style.scss';

import { i18nTypes } from './config/config';

// moment i18n
moment.locale = localStorage.getItem('locale') || 'zh_TW';

// Custom i18n
const locales = i18nTypes.map((el) => el.key);

const translations = {
  zh_CN,
  zh_TW,
  ja_JP,
  en_US,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer theme="colored" />
      <ConfigProvider locale={zhTW}>
        <I18nProvider locales={locales} translations={translations}>
          <App />
        </I18nProvider>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
