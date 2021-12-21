// Local Server
const localServer = 'http://192.168.10.60/api';
const AGENT_URL = 'http://192.168.10.105:3030';
const METER_RECORD = 'sasClient/meterRecord';
const JACKPOT_WIN_RECORD = 'sasClient/jackpotRecord';
const EVENT_RECORD = 'sasClient/eventRecord';

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
      status: 'error',
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
    console.log(data);
    return data.result;
  } catch (error) {
    return error.message || 'Something went wrong';
  }
};
