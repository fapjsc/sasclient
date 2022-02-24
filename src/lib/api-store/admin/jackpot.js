import { v4 as uuid } from 'uuid';

import {
  AGENT_URL,
  JACKPOT_SETTING,
  getHeaders,
} from '../utils';

/*
=====================
    Admin - Jackpot
=====================
*/

export const getJackpotList = async () => {
  const url = `${AGENT_URL}/${JACKPOT_SETTING}`;

  try {
    const headers = getHeaders();
    const response = await fetch(url, { headers });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Could not fetch jackpot list');

    if (data.status !== 200) throw new Error(data.message || 'fetch jackpot list fail');

    // console.log(data, 'get jackpot list');

    const formatData = data.result.map((el) => ({
      ...el,
      id: uuid(),
      key: uuid(),
    }));

    console.log(formatData);

    return formatData;
  } catch (error) {
    return error.message || 'Something went wrong';
  }
};

// //** Jackpot settings */
// export const jackpotSetting = async (reqData) => {
//   reqData.forEach((el) => {
//     if (el.index) delete el.index;
//   });

//   const url = `${AGENT_URL}/${JACKPOT_SETTING}`;
//   try {
//     const headers = getHeaders();

//     const response = await fetch(url, {
//       method: 'POST',
//       headers,
//       body: JSON.stringify(reqData),
//     });

//     const data = await response.json();

//     if (!response.ok) throw new Error(data.message || 'Could not setting jackpot');

//     if (data.status !== 200) throw new Error(data.message || 'jackpot set fail');

//     return data;
//   } catch (error) {
//     return {
//       status: 400,
//       message: error.message || 'Something went wrong',
//     };
//   }
// };

// //** Jackpot Delete */
// export const jackpotDelete = async (level) => {
//   const url = `${AGENT_URL}/${JACKPOT_SETTING}`;
//   try {
//     const headers = getHeaders();

//     const response = await fetch(url, {
//       method: 'DELETE',
//       headers,
//       body: JSON.stringify({ level }),
//     });

//     const data = await response.json();

//     if (!response.ok) throw new Error(data.message || 'Could not delete jackpot');

//     if (data.status !== 200) throw new Error(data.message || 'jackpot delete fail');
//     // console.log(data, 'delete jackpot');
//     return data;
//   } catch (error) {
//     return {
//       status: 400,
//       message: error.message || 'Something went wrong',
//     };
//   }
// };

//** Jackpot settings */
export const jackpotSetting = async (reqData) => {
  reqData.forEach((el) => {
    if (el.index) delete el.index;
  });

  const url = `${AGENT_URL}/${JACKPOT_SETTING}`;
  const headers = getHeaders();

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(reqData),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || 'Could not setting jackpot');

  if (data.status !== 200) throw new Error(data.message || 'jackpot set fail');

  return data.status;
};

//** Jackpot Delete */
export const jackpotDelete = async (level) => {
  const url = `${AGENT_URL}/${JACKPOT_SETTING}`;
  const headers = getHeaders();

  const response = await fetch(url, {
    method: 'DELETE',
    headers,
    body: JSON.stringify({ level }),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || 'Could not delete jackpot');

  if (data.status !== 200) throw new Error(data.message || 'jackpot delete fail');
  // console.log(data, 'delete jackpot');
  return data;
};
