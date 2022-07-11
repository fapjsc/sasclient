import {
  AGENT_URL,
  EGM_LIST,
  AFT,
  getHeaders,
  EGM_ONLINE_SETTING,
  EGM_SETTING,
  DEV_EGM_LIST,
  DEV_PLAYER_LIST,
} from '../utils';

/*
===================
    Admin - EGM
===================
*/

export const adminGetEgmList = async () => {
  const url = `${AGENT_URL}/${EGM_LIST}`;

  try {
    const headers = getHeaders();

    const response = await fetch(url, { headers });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Could not fetch egm list');
    }
    if (data.status !== 200) {
      throw new Error(data.message || 'Fetch egm list fail');
    }

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

// Online setting
export const onlineSetting = async (reqData) => {
  const url = `${AGENT_URL}/${EGM_ONLINE_SETTING}`;
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
    return data;
  } catch (error) {
    return {
      status: 400,
      message: error.message || 'Something went wrong',
    };
  }
};

//** Cash in out */
export const egmCashInOut = async (params) => {
  if (!params) return;
  const url = `${AGENT_URL}/${AFT}`;

  if (Array.isArray(params)) {
    if (params[1] === 'percentile' || params[1] === 'thousands') {
      let digit;
      if (params[1] === 'percentile') digit = 100;
      if (params[1] === 'thousands') digit = 1000;
      params = {
        action: 'aftOutDigit',
        ip: params[2],
        quick: true,
        digit,
        cardID: params[3] && params[3],
      };
    } else {
      params = {
        action: params[0],
        ip: params[2],
        quick: true,
        cashAmount: params[1],
        cardID: params[3] && params[3],
      };
    }
  }

  const headers = getHeaders();

  const {
    ip, cashAmount, action, digit, quick, cardID,
  } = params || {};

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      action,
      digit,
      ip,
      cashAmount,
      cardId: cardID && cardID,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not operation cash in or cash out');
  }
  if (data.status !== 200) {
    throw new Error(data.message || 'cash in or cash out fail');
  }

  return { ...data, quick };
};

// For Dev
export const devGetEgmList = async () => {
  const url = `${AGENT_URL}${DEV_EGM_LIST}`;

  try {
    const headers = getHeaders();

    const response = await fetch(url, { headers });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Could not fetch egm list');
    }

    // if (data.status !== 200) {
    //   throw new Error(data.message || 'Fetch egm list fail');
    // }

    const formatData = [];

    Object.values(data).forEach((value) => {
      formatData.push(value);
    });

    return data;
  } catch (error) {
    return {
      status: 400,
      message: error.message || 'Something went wrong',
    };
  }
};

export const devGetPlayerList = async () => {
  const url = `${AGENT_URL}${DEV_PLAYER_LIST}`;

  try {
    const headers = getHeaders();

    const response = await fetch(url, { headers });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Could not fetch egm list');
    }

    // if (data.status !== 200) {
    //   throw new Error(data.message || 'Fetch egm list fail');
    // }

    // const formatData = [];

    // Object.values(data).forEach((value) => {
    //   formatData.push(value);
    // });

    return data;
  } catch (error) {
    return {
      status: 400,
      message: error.message || 'Something went wrong',
    };
  }
};
