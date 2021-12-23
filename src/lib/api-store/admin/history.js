import {
  AGENT_URL,
  EVENT_RECORD,
  JACKPOT_WIN_RECORD,
  METER_RECORD,
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

//** Meter  */
export const getMeterRecord = async (params) => {
  const { created, ip } = params || {};
  // const url = `${AGENT_URL}/${METER_RECORD}`;

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
