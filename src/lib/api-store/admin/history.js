import {
  AGENT_URL,
  EVENT_RECORD,
  JACKPOT_WIN_RECORD,
  METER_RECORD,
  SYSTEM_LOG,
  getHeaders,
} from '../utils';

//** Event Fetch */
export const getEventRecord = async (params) => {
  const { created, event_character: ip } = params || {};

  const ipStr = ip ? `ip=${ip}&` : '';

  const createdStr = created ? `startTime=${created[0]}&endTime=${created[1]}&` : '';

  const url = `${AGENT_URL}/${EVENT_RECORD}?${ipStr}${createdStr}`;

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

export const getJackpotWinRecord = async (params) => {
  const { created, egm_ip: ip, name } = params || {};

  const ipStr = ip ? `egm_ip=${ip}&` : '';
  const nameStr = name ? `name=${name}&` : '';
  const createdStr = created ? `startTime=${created[0]}&endTime=${created[1]}&` : '';

  const url = `${AGENT_URL}/${JACKPOT_WIN_RECORD}?${ipStr}${nameStr}${createdStr}`;

  try {
    const headers = getHeaders();

    const response = await fetch(url, { headers });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Could not fetch jackpot win record');
    if (data.status !== 200) throw new Error(data.message || 'Fetch jackpot win record fail');
    return data.result;
  } catch (error) {
    return error.message || 'Something went wrong';
  }
};

//** Meter  */
export const getMeterRecord = async (params) => {
  const { created, ip } = params || {};

  const ipStr = ip ? `ip=${ip}&` : '';
  const createdStr = created ? `startTime=${created[0]}&endTime=${created[1]}&` : '';

  const url = `${AGENT_URL}/${METER_RECORD}?${ipStr}${createdStr}`;

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

//** System log  */
export const getSysLog = async (params) => {
  const { created, admin_id: id } = params || {};

  const idStr = id ? `id=${id}&` : '';
  const createdStr = created ? `startTime=${created[0]}&endTime=${created[1]}&` : '';

  const url = `${AGENT_URL}/${SYSTEM_LOG}?${idStr}${createdStr}`;

  try {
    const headers = getHeaders();

    const response = await fetch(url, { headers });
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Could not fetch system log');
    if (data.status !== 200) throw new Error(data.message || 'Fetch system log fail');
    return data.result;
  } catch (error) {
    return error.message || 'Something went wrong';
  }
};
