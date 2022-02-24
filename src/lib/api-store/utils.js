import { _getUserToken } from '../helper';

export { AGENT_URL } from '../../config/config';

// Get Headers
export const getHeaders = (token = null) => {
  const headers = new Headers();
  if (!token) token = _getUserToken();

  if (token) headers.append('Authorization', `bearer ${token}`);
  headers.append('Content-Type', 'application/json');

  return headers;
};

// History api
export const METER_RECORD = 'sasClient/meterRecord';
export const JACKPOT_WIN_RECORD = 'sasClient/jackpotRecord';
export const EVENT_RECORD = 'sasClient/eventRecord';
export const SYSTEM_LOG = 'sasClient/accountEventRecord';

// Jackpot api
export const JACKPOT_SETTING = 'sasClient/jackpotSetting';

// Egm api
export const EGM_LIST = 'sasClient/egmList';
export const AFT = 'sasClient/aft';

// Staff
export const CREATE_STAFF = 'login/register';

// Auth api
export const SYSTEM_LOGIN = 'login/sasClient';

export const GET_CRYPT_KEY = 'login/getKey';

// Cashiers api
export const CASHIER_OPERATOR = 'sasClient/cashier';
export const GET_CASHIER_RECORD = 'sasClient/cashierOperationRecord';

// Handover api
export const HAND_OVER_STATISTICS_DETAIL = 'sasClient/handoverStatistics';
export const HAND_OVER_RECORD = 'sasClient/handoverRecord';
export const HAND_OVER_LOGIN = 'sasClient/handover';

// Member api
export const GET_FORM_SELECT_OPTION = 'sasClient/getCreateData';
export const CREATE_MEMBER = 'sasClient/createMember';
export const UPDATE_MEMBER_PICTURE = 'sasClient/updateMemberPicture';
export const MEMBER_LOGIN = 'sasClient/loginMember';
export const MEMBER_DEPOSIT = 'sasClient/deposit';
export const GET_MEMBER = 'sasClient/getMember';
export const MEMBER_WITHDRAWAL = 'sasClient/withdrawal';
export const MEMBER_UPDATE = 'sasClient/updateMember';
