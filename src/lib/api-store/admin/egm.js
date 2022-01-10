import {
  AGENT_URL,
  EGM_LIST,
  AFT,
  getHeaders,
} from '../utils';

/*
===================
    Admin - EGM
===================
*/

export const adminGetEgmList = async (params) => {
  console.log(params);
  const {
    id, ip, model, number, denomination, created,
  } = params || {};

  const idStr = id ? `id=${id}&` : '';
  const ipStr = ip ? `ip=${ip}&` : '';
  const modelStr = model ? `model=${model}&` : '';
  const numberStr = number ? `number=${number}&` : '';
  const denominationStr = denomination ? `denomination=${denomination}&` : '';
  const createdStr = created ? `startTime=${created[0]}&endTime=${created[1]}&` : '';

  const url = `${AGENT_URL}/${EGM_LIST}?${idStr}${modelStr}${ipStr}${numberStr}${denominationStr}${createdStr}`;

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
      message: error.message || 'Something went wrong',
    };
  }
};

//** Egm Setting */
export const adminEgmSetting = async (reqData) => {
  const url = `${AGENT_URL}/${EGM_LIST}`;
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
export const adminEgmDelete = async (id) => {
  const url = `${AGENT_URL}/${EGM_LIST}`;
  try {
    const headers = getHeaders();

    const response = await fetch(url, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({ id }),
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

//** Cash in out */
// {"ip": "192.168.10.73", "cashAmount": 2000
export const egmCashInOut = async (params) => {
  if (!params) return;
  const url = `${AGENT_URL}/${AFT}`;

  if (Array.isArray(params)) {
    console.log('快速開分');

    if (params[1] === 'percentile'
    || params[1] === 'thousands'
    ) {
      let digit;
      if (params[1] === 'percentile') digit = 100;
      if (params[1] === 'thousands') digit = 1000;
      params = {
        action: 'aftOutDigit',
        ip: params[2],
        quick: true,
        digit,
      };
    } else {
      params = {
        action: params[0],
        ip: params[2],
        quick: true,
        cashAmount: params[1],
      };
    }
  }

  const headers = getHeaders();

  const {
    ip, cashAmount, action, digit, quick,
  } = params || {};

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      action,
      digit,
      ip,
      cashAmount,
    }),
  });

  const data = await response.json();

  console.log(data);

  if (!response.ok) throw new Error(data.message || 'Could not operation cash in or cash out');
  if (data.status !== 200) throw new Error(data.message || 'cash in or cash out fail');

  return { ...data, quick };
};
