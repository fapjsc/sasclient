import {
  AGENT_URL,
  EGM_LIST,
  getHeaders,
} from '../utils';

/*
===================
    Admin - EGM
===================
*/
/* Get EGM
// @ params: id: <string>,
             ip: <string>,
             number: <string>,
             denomination: <string>
*/
export const adminGetEgmList = async (params) => {
  const {
    id, ip, number, denomination,
  } = params || {};

  const idStr = id ? `id=${id}&` : '';
  const ipStr = ip ? `ip=${ip}&` : '';
  const numberStr = number ? `number=${number}&` : '';
  const denominationStr = denomination ? `denomination=${denomination}&` : '';

  const url = `${AGENT_URL}/${EGM_LIST}?${idStr}${ipStr}${numberStr}${denominationStr}`;

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
  const url = `${AGENT_URL}/${EGM_LIST}`;
  console.log(reqData);
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
