import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ToastContainer } from 'react-toastify';

// import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_TW';
import { ConfigProvider } from 'antd';

// Moment
import moment from 'moment';
import 'moment/locale/zh-tw';

// Redux
import { Provider } from 'react-redux';

import App from './App';
import reportWebVitals from './reportWebVitals';

import 'react-toastify/dist/ReactToastify.css';

import store from './store/store';

moment.locale = 'zh_TW';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer theme="colored" />
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
