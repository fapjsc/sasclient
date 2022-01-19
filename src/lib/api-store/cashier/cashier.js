import {
  AGENT_URL,
  CASHIER_OPERATOR,
  GET_CASHIER_RECORD,
  getHeaders,
} from '../utils';

export const GetCashierAmounts = async () => {
  const url = `${AGENT_URL}/${CASHIER_OPERATOR}`;
  const headers = getHeaders();

  const response = await fetch(url, { headers });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || 'Could not set counter');
  if (data.status !== 200) throw new Error(data.message || 'set counter amount fail');
  return { amount: data.result };
};

export const cashierOperator = async (value) => {
  try {
    const url = `${AGENT_URL}/${CASHIER_OPERATOR}`;
    const headers = getHeaders();

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(value),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Could not set counter');
    if (data.status !== 200) throw new Error(data.message || 'set counter amount fail');

    return data;
  } catch (error) {
    return {
      status: 400,
      message: error.message || 'Something went wrong',
    };
  }
};

export const GetCashierRecord = async (params) => {
  try {
    const {
      charactor, operationCode, target, created,
    } = params || {};

    const charactorStr = charactor ? `charactor=${charactor}&` : '';
    const operationStr = operationCode ? `operation_code=${operationCode}&` : '';
    const targetStr = target ? `target=${target}&` : '';
    const createdStr = created ? `startTime=${created[0]}&endTime=${created[1]}&` : '';
    const url = `${AGENT_URL}/${GET_CASHIER_RECORD}?${charactorStr}${operationStr}${targetStr}${createdStr}`;
    const headers = getHeaders();

    const response = await fetch(url, { headers });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Could not set counter');
    if (data.status !== 200) throw new Error(data.message || 'set counter amount fail');
    return data.result;
  } catch (error) {
    return {
      status: 400,
      message: error.message || 'Something went wrong',
    };
  }
};
