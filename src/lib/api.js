import { v4 as uuid } from 'uuid';

// Local Server
const localServer = 'http://192.168.10.60/api';
const AGENT_URL = 'http://192.168.10.102:3030';

// History api
const METER_RECORD = 'sasClient/meterRecord';
const JACKPOT_WIN_RECORD = 'sasClient/jackpotRecord';
const EVENT_RECORD = 'sasClient/eventRecord';

// Jackpot api
const JACKPOT_SETTING = 'sasClient/jackpotSetting';

// Egm api
const EGM_SETTING = 'sasClient/egmSetting';

// Get Headers
const getHeaders = (token = null) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `bearer ${token}`);

  return headers;
};

//** Auth */
export const userLogin = async (loginData) => {
  const url = `${localServer}/SignApi`;
  const headers = getHeaders();

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(loginData),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.msg || 'Login failed.');

  return data;
};

//** EGM fetch */
// EGM List
export const getEgmList = async (token) => {
  const url = `${localServer}/EgmApi`;
  const headers = getHeaders(token);

  const response = await fetch(url, { headers });

  const data = await response.json();

  if (!response.ok) throw new Error(data.msg || 'Could Not Fetch Egm List.');

  if (data.code !== 10) throw new Error(data.msg || 'Request Reject');

  return data.egmList;
};

/*
===================
   Admin - History
===================
*/

//** Meter  */
export const getMeterRecord = async (params) => {
  const { created, ip } = params || {};
  // const url = `${AGENT_URL}/${METER_RECORD}`;

  let url;
  // 1) 沒有參數
  if (!created && !ip) url = `${AGENT_URL}/${METER_RECORD}`;

  // 2) Create (time)
  if (created && !ip) { url = `${AGENT_URL}/${METER_RECORD}?startTime=${created[0]}&endTime=${created[1]}`; }

  // 3) IP
  if (!created && ip) { url = `${AGENT_URL}/${METER_RECORD}?ip=${ip}`; }

  // 4) Create and IP
  if (created && ip) { url = `${AGENT_URL}/${METER_RECORD}?ip=${ip}&startTime=${created[0]}&endTime=${created[1]}`; }

  try {
    const headers = getHeaders();

    const response = await fetch(url, { headers });
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Could not fetch meter record');
    if (data.status !== 200) throw new Error(data.message || 'Fetch meter record fail');
    return data.result;
  } catch (error) {
    return error.message || 'Something went wrong';
  }
};

//** Jackpot win record fetch */
export const getJackpotWinRecord = async () => {
  const url = `${AGENT_URL}/${JACKPOT_WIN_RECORD}`;

  try {
    const headers = getHeaders();

    const response = await fetch(url, { headers });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Could not fetch jackpot win record');
    if (data.status !== 200) throw new Error(data.message || 'Fetch jackpot win record fail');
    return data.result;
  } catch (error) {
    return {
      status: 400,
      message: error.message,
    } || 'Something went wrong';
  }
};

//** Event Fetch */
export const getEventRecord = async (params) => {
  const { created, event_character: ip } = params || {};
  // const url = `${AGENT_URL}/${METER_RECORD}`;
  let url;
  // 1) 沒有參數
  if (!created && !ip) url = `${AGENT_URL}/${EVENT_RECORD}`;

  // 2) Create (time)
  if (created && !ip) { url = `${AGENT_URL}/${EVENT_RECORD}?startTime=${created[0]}&endTime=${created[1]}`; }

  // 3) IP
  if (!created && ip) { url = `${AGENT_URL}/${EVENT_RECORD}?ip=${ip}`; }

  // 4) Create and IP
  if (created && ip) { url = `${AGENT_URL}/${EVENT_RECORD}?ip=${ip}&startTime=${created[0]}&endTime=${created[1]}`; }

  try {
    const headers = getHeaders();

    const response = await fetch(url, { headers });
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Could not fetch meter record');
    if (data.status !== 200) throw new Error(data.message || 'Fetch meter record fail');
    return data.result;
  } catch (error) {
    return error.message || 'Something went wrong';
  }
};

//** Get jackpot list */
export const getJackpotList = async () => {
  const url = `${AGENT_URL}/${JACKPOT_SETTING}`;
  try {
    const headers = getHeaders();
    const response = await fetch(url, { headers });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Could not fetch jackpot list');

    if (data.status !== 200) throw new Error(data.message || 'fetch jackpot list fail');

    // console.log(data, 'get jackpot list');

    const formatData = data.result.map((el) => ({
      ...el,
      id: uuid(),
      key: uuid(),
    }));

    return formatData;
  } catch (error) {
    return error.message || 'Something went wrong';
  }
};

/*
=====================
    Admin - Jackpot
=====================
*/
//** Jackpot settings */
export const jackpotSetting = async (reqData) => {
  reqData.forEach((el) => {
    if (el.index) delete el.index;
  });

  const url = `${AGENT_URL}/${JACKPOT_SETTING}`;
  try {
    const headers = getHeaders();

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(reqData),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Could not setting jackpot');

    if (data.status !== 200) throw new Error(data.message || 'jackpot set fail');

    return data;
  } catch (error) {
    return {
      status: 400,
      message: error.message || 'Something went wrong',
    };
  }
};

//** Jackpot Delete */
export const jackpotDelete = async (level) => {
  const url = `${AGENT_URL}/${JACKPOT_SETTING}`;
  try {
    const headers = getHeaders();

    const response = await fetch(url, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({ level }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Could not delete jackpot');

    if (data.status !== 200) throw new Error(data.message || 'jackpot delete fail');
    // console.log(data, 'delete jackpot');
    return data;
  } catch (error) {
    return {
      status: 400,
      message: error.message || 'Something went wrong',
    };
  }
};

/*
===================
    Admin - EGM
===================
*/
//** Get EGM */
export const adminGetEgmList = async () => {
  const url = `${AGENT_URL}/${EGM_SETTING}`;

  try {
    const headers = getHeaders();

    const response = await fetch(url, { headers });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Could not fetch egm list');
    if (data.status !== 200) throw new Error(data.message || 'Fetch egm list fail');
    return data.result;
  } catch (error) {
    return {
      status: 400,
      message: error.message,
    } || 'Something went wrong';
  }
};

//** Egm Setting */
export const adminEgmSetting = async (reqData) => {
  const url = `${AGENT_URL}/${EGM_SETTING}`;
  try {
    const headers = getHeaders();

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(reqData),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Could not setting EGM');

    if (data.status !== 200) throw new Error(data.message || 'EGM set fail');

    return data;
  } catch (error) {
    return {
      status: 400,
      message: error.message || 'Something went wrong',
    };
  }
};

//** Egm Delete */
export const adminEgmDelete = async (level) => {
  const url = `${AGENT_URL}/${EGM_SETTING}`;
  try {
    const headers = getHeaders();

    const response = await fetch(url, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({ level }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Could not delete EGM');

    if (data.status !== 200) throw new Error(data.message || 'EGM delete fail');
    // console.log(data, 'delete jackpot');
    return data;
  } catch (error) {
    return {
      status: 400,
      message: error.message || 'Something went wrong',
    };
  }
};
