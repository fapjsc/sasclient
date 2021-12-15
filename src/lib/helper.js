import CryptoJS from 'crypto-js';
import store from '../store/store';

// Actions
import { restEgmCashInOut } from '../store/actions/egmActions';
import { userLogout } from '../store/actions/userActions';

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
export const _setToken = (setKey, stringVal, loginInfo) => {
  try {
    if (!localStorage) {
      return false;
    }
    const tem = new Date() - 1; // 當前的時間戳
    const ZeroTime = new Date(new Date().toLocaleDateString()).getTime(); // 今天0點的時間戳
    const time = ZeroTime + 12 * 60 * 60 * 1000; // 中午12點的時間戳

    let cacheExpireDate; // 過期時間

    //
    if (time > tem) {
      cacheExpireDate = time;
    } else {
      cacheExpireDate = time + 24 * 60 * 60 * 1000; // 過期時間
    }
    const cacheVal = { val: stringVal, exp: cacheExpireDate, loginInfo };
    localStorage.setItem(_encrypt(key), _encrypt(JSON.stringify(cacheVal))); // 存入缓存值
  } catch (e) {
    console.log(e);
  }
};

// 清除緩存,一般不手動調用
const _removeLocalStorage = (remoteKey) => {
  if (!localStorage) return false;
  localStorage.removeItem(remoteKey);
};

// /** 取Token*/
export const _getToken = (getKey) => {
  if (!localStorage) return false;

  try {
    const cacheVal = localStorage.getItem(_encrypt(getKey));
    const result = JSON.parse(_decrypt(cacheVal));

    if (!result) return null;

    // let now = new Date() - 1; // 當前時間搓

    // 緩存過期
    // if (now > result.exp) {
    //   console.log(_encrypt(key));
    //   _removeLocalStorage(_encrypt(key));
    //   return '';
    // }

    return {
      token: result.val,
      loginInfo: result.loginInfo,
    };
  } catch (e) {
    _removeLocalStorage(key);
    return null;
  }
};

export const _getUserRole = () => {
  const userInfo = _getToken('token');
  if (userInfo) {
    return userInfo.loginInfo.account;
  }
  return '';
};

//==== Redux Helper
//** reset all reducer */
//第一個參數：決定是不是要清除localStorage, 預設是null
export const _resetAllReducer = (clearStorage = null) => {
  store.dispatch(userLogout());
  store.dispatch(restEgmCashInOut());
  if (clearStorage) localStorage.clear();
};
