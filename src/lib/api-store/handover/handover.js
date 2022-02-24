import {
  AGENT_URL,
  getHeaders,
  HAND_OVER_STATISTICS_DETAIL,
  // HAND_OVER_EGM_DETAIL,
  HAND_OVER_RECORD,
} from '../utils';

export const getHandOverEgmDetail = async () => {
  try {
    // const { created } = params || {};
    // const createdStr = created ? `startTime=${created[0]}&endTime=${created[1]}&` : '';
    const url = `${AGENT_URL}/${HAND_OVER_STATISTICS_DETAIL}?`;
    const headers = getHeaders();
    const response = await fetch(url, { headers });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Could not fetch handover detail');
    }
    if (data.status !== 200) {
      throw new Error(data.message || 'Fetch handover fail.');
    }
    return data.result.egmList;
  } catch (error) {
    return {
      status: 400,
      message: error.message || 'Something went wrong',
    };
  }
};

export const handoverStatistics = async () => {
  try {
    const headers = getHeaders();
    const url = `${AGENT_URL}/${HAND_OVER_STATISTICS_DETAIL}`;

    const response = await fetch(url, { headers });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Could not fetch handover record');
    }

    if (data.status !== 200) {
      throw new Error(data.message || 'Fetch handover record fail');
    }
    console.log(data);
    return data.result.statistics;
  } catch (error) {
    return {
      status: 400,
      message: error.message || 'Something went wrong',
    };
  }
};

export const handoverRecord = async () => {
  try {
    const headers = getHeaders();
    const url = `${AGENT_URL}/${HAND_OVER_RECORD}`;

    const response = await fetch(url, { headers });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Could not fetch handover record');
    }

    if (data.status !== 200) {
      throw new Error(data.message || 'Fetch handover record fail');
    }
    return data.result;
  } catch (error) {
    return {
      status: 400,
      message: error.message || 'Something went wrong',
    };
  }
};
