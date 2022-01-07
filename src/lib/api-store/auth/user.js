import {
  AGENT_URL,
  USER_LOGIN,
  SYSTEM_LOGIN,
  GET_CRYPT_KEY,
  getHeaders,
} from '../utils';

//** Auth */
// eslint-disable-next-line
export const systemLogin = async (loginData) => {
  const url = `${AGENT_URL}/${SYSTEM_LOGIN}`;
  const headers = getHeaders();

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(loginData),
  });

  const data = await response.json();

  //   console.log(data);
  if (!response.ok) throw new Error(data.message || 'Could not fetch login api.');

  if (data.status !== 200) throw new Error(data.message || 'Login fail');

  return {
    token: data.token,
    permission: data.auth,
    account: data.account,
    name: data.name,
  };
};

export const getCryptKey = async () => {
  const url = `${AGENT_URL}/${GET_CRYPT_KEY}`;

  const headers = getHeaders();
  const response = await fetch(url, { headers });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Could not fetch crypt key');
  if (data.status !== 200) throw new Error(data.message || 'Get crypt key fail.');
  // console.log(data.key.privateKey);
  //   return data.key.publicKey;
  return data.key;
};

export const userLogin = async (reqData) => {
  console.log(reqData);
  try {
    // const url = `${AGENT_URL}/${USER_LOGIN}`;
    // const headers = getHeaders();
    // const response = await fetch(url, {
    //   method: 'POST',
    //   headers,
    //   body: JSON.stringify(reqData),
    // });

    const url = `${USER_LOGIN}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Count not fetch login api');
    // if (data.status !== 200) throw new Error(data.message || 'Login fail');

    return {
      status: 200,
      result: reqData.username,
    };
  } catch (error) {
    return {
      status: 400,
      message: error.message,
    };
  }
};
