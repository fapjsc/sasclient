import React from 'react';
import ReactDOM from 'react-dom';

// Toast
import { ToastContainer } from 'react-toastify';

// Antd i18n
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_TW';
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
  TW, CN, JP, US,
} from './i18n/locales';

// Components
import App from './App';

// Report
import reportWebVitals from './reportWebVitals';

// Styles
import 'react-toastify/dist/ReactToastify.css';

// moment i18n
moment.locale = 'zh_TW';

// Custom i18n
const locales = ['en_US', 'zh_TW', 'ja_JP', 'zh_CN'];

const translations = {
  // 'en-US': require('./locales/en-US').default,
  zh_CN: CN,
  zh_TW: TW,
  ja_JP: JP,
  en_US: US,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer theme="colored" />
      <ConfigProvider locale={zhCN}>
        <I18nProvider locales={locales} translations={translations}>
          <App />
        </I18nProvider>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
