import CryptoJS from 'crypto-js';
import moment from 'moment';
import store from '../store/store';

// Actions
// import { restEgmCashInOut } from '../store/actions/egmActions';
import { systemLogout } from '../store/actions/userActions';

const key = CryptoJS.enc.Utf8.parse('N2841A3412APCD6F'); // 16位進制key
const iv = CryptoJS.enc.Utf8.parse('AUCDTF12H41P34Y2'); //  16位進制key的偏移量

// /** 解密*/
export const _decrypt = (word) => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};

// /** 加密*/
export const _encrypt = (word) => {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString().toUpperCase();
};

// /** 存入本地*/
export const _setToken = (setKey, loginData) => {
  try {
    if (!localStorage) {
      return false;
    }
    const ZeroTime = new Date(new Date().toLocaleDateString()).getTime(); // 今天0點的時間戳

    // const time = ZeroTime + 12 * 60 * 60 * 1000; // 中午12點的時間戳
    const time = ZeroTime;
    const tem = new Date() - 1; // 當前的時間戳

    let cacheExpireDate; // 過期時間

    //
    if (time > tem) {
      cacheExpireDate = time;
    } else {
      cacheExpireDate = time + 24 * 60 * 60 * 1000; // 過期時間
    }
    const cacheVal = { exp: cacheExpireDate, loginData };
    localStorage.setItem(_encrypt(setKey), _encrypt(JSON.stringify(cacheVal))); // 存入缓存值
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
  }
};

// 清除緩存,一般不手動調用
const _removeLocalStorage = (remoteKey) => {
  if (!localStorage) return false;
  localStorage.removeItem(remoteKey);
};

export const _getUserData = (getKey) => {
  if (!localStorage) return false;

  try {
    const cacheVal = localStorage.getItem(_encrypt(getKey));

    const result = JSON.parse(_decrypt(cacheVal));

    if (!result) return null;

    return result || null;
  } catch (e) {
    _removeLocalStorage(key);
    return null;
  }
};

export const _getUserRole = () => {
  const userInfo = _getUserData('token');
  return userInfo?.loginData?.permission;
};

export const _getUserToken = () => {
  const userInfo = _getUserData('token');
  return userInfo?.loginData?.token;
};

export const _getUserName = () => {
  const userInfo = _getUserData('token');
  return userInfo?.loginData?.name || '未知';
};

export const _getUserAccount = () => {
  const userInfo = _getUserData('token');
  return userInfo?.loginData?.account;
};

export const _checkTokenExpire = () => {
  const result = _getUserData('token');
  const now = new Date() - 1; // 當前時間搓

  // 沒有token數據
  if (!result) {
    return null;
  }

  //緩存過期
  if (now > result?.exp) {
    _removeLocalStorage(_encrypt(key));
    return {
      status: 401,
      message: 'token expire',
    };
  }
  return {
    status: 200,
    data: result.exp,
  };
};

export const _removeLocalStorageExLocale = () => {
  const locale = localStorage.getItem('locale');
  localStorage.clear();
  localStorage.setItem('locale', locale || 'zh_TW');
};

//第一個參數：決定是不是要清除localStorage, 預設是null
export const _logOutHandler = (clearStorage = null) => {
  store.dispatch(systemLogout());
  if (clearStorage) _removeLocalStorageExLocale();
};

// 判斷是否為空物件
export const isEmptyObj = (obj) => (Object.keys(obj).length === 0);

// 千分位加上小數點
export const thousandsFormat = (text) => (text * 1).toFixed(0).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

//** Print Helpers */
// Print Page Style
export const getPrintPageStyle = () => `
@media print {
  .ant-table-cell, td span {
    color: black !important;
  }

  .ant-picker-input {
    color: red !important;
  }

  svg {
    display: none !important;
  }

  button {
    display: none !important;
  }
}
`;

// Get Print Table El
export const getPrintTableEl = (classNameStr) => document.querySelector(`${classNameStr} .ant-card-body`);

// Get Print query El
export const getQueryEl = (searchRef) => {
  const {
    egm_ip: egmIP,
    ip: meterIP,
    name,
    created,
    event_character: eventIP,
    admin_id: adminId,
  } = searchRef.current || {};

  const searchEl = document.createElement('p');

  searchEl.innerText = `
  ID: ${adminId || '未填寫'} | IP：${egmIP || meterIP || eventIP || '未填寫'} | Number: ${name || '未填寫'} | 開始時間：${created ? created[0] : '未填寫'} | 結束時間：${created ? created[1] : '未填寫'}
  `;

  return searchEl;
};

export const egmIsDisconnect = (connectTime) => {
  if (!connectTime) return true;

  return (new Date() - new Date(connectTime)) > (1 * 1000 * 60);
};

export const transToTimestamp = (time) => moment(time).format('X');

export const transToTimeString = (time) => moment(time).format('YYYY-MM-DD HH:mm:ss');

//** for test */
export const waitTime = (time) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(true);
  }, time * 1000);
});
