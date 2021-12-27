import { _getUserToken } from '../helper';

// Local Server
export const localServer = 'http://192.168.10.60/api';
export const AGENT_URL = 'http://192.168.10.110:3030';

// History api
export const METER_RECORD = 'sasClient/meterRecord';
export const JACKPOT_WIN_RECORD = 'sasClient/jackpotRecord';
export const EVENT_RECORD = 'sasClient/eventRecord';

// Jackpot api
export const JACKPOT_SETTING = 'sasClient/jackpotSetting';

// Egm api
export const EGM_LIST = 'sasClient/egmList';

// Auth api
export const USER_LOGIN = 'login/sasClient';
export const GET_CRYPT_KEY = 'login/getKey';

// Get Headers
export const getHeaders = () => {
  const token = _getUserToken();
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `bearer ${token}`);

  return headers;
};
