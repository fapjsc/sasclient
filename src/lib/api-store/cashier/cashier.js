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

export const GetCashierRecord = async () => {
  try {
    const url = `${AGENT_URL}/${GET_CASHIER_RECORD}`;
    const headers = getHeaders();

    const response = await fetch(url, { headers });

    const data = await response.json();

    console.log(data);

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
