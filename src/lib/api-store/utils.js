import { _getUserToken } from '../helper';

// Local Server
// export const localServer = 'http://192.168.10.60/api';
// export const AGENT_URL = 'http://192.168.10.119:3030';

export { AGENT_URL } from '../../config/config';

// History api
export const METER_RECORD = 'sasClient/meterRecord';
export const JACKPOT_WIN_RECORD = 'sasClient/jackpotRecord';
export const EVENT_RECORD = 'sasClient/eventRecord';
export const SYSTEM_LOG = 'sasClient/accountEventRecord';

// Jackpot api
export const JACKPOT_SETTING = 'sasClient/jackpotSetting';

// Egm api
export const EGM_LIST = 'sasClient/egmList';
// export const CASH_IN = 'sasClient/aftIn';
// export const CASH_OUT = 'sasClient/aftOut';
// export const PROMO_IN = 'sasClient/promoIn';
export const AFT = 'sasClient/aft';

// Auth api
export const USER_LOGIN = 'login/sasClient';
export const GET_CRYPT_KEY = 'login/getKey';

// Handover api
export const HAND_OVER_DETAIL = 'https://jsonplaceholder.typicode.com/posts/1/comments';

// Get Headers
export const getHeaders = (token = null) => {
  const headers = new Headers();
  if (!token) token = _getUserToken();

  if (token) headers.append('Authorization', `bearer ${token}`);
  headers.append('Content-Type', 'application/json');

  return headers;
};
