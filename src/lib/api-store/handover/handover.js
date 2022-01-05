import {
  HAND_OVER_DETAIL,
  AGENT_URL,
  getHeaders,
} from '../utils';

export const getHandOverDetail = async (params) => {
  console.log(params);
  try {
    const url = `${AGENT_URL}/${HAND_OVER_DETAIL}`;
    const headers = getHeaders();
    const response = await fetch(url, { headers });
    const data = await response.json();
    // console.log(data);
    if (!response.ok) throw new Error(data.message || 'Could not fetch handover detail');
    if (data.status !== 200) throw new Error(data.message || 'Fetch handover fail.');
    return data;
  } catch (error) {
    return {
      status: 400,
      message: error.message || 'Something went wrong',
    };
  }
};

export const temp = () => {};
