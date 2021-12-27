const localServer = 'http://192.168.10.60/api';

// Get Headers
const getHeaders = (token = null) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `bearer ${token}`);

  return headers;
};

//** Auth */
// export const userLogin = async (loginData) => {
//   const url = `${localServer}/SignApi`;
//   const headers = getHeaders();

//   const response = await fetch(url, {
//     method: 'POST',
//     headers,
//     body: JSON.stringify(loginData),
//   });

//   const data = await response.json();

//   if (!response.ok) throw new Error(data.msg || 'Login failed.');

//   return data;
// };

//** Get EGM List */
// EGM List
export const getEgmList = async (token) => {
  const url = `${localServer}/EgmApi`;
  const headers = getHeaders(token);

  const response = await fetch(url, { headers });

  const data = await response.json();

  if (!response.ok) throw new Error(data.msg || 'Could Not Fetch Egm List.');

  if (data.code !== 10) throw new Error(data.msg || 'Request Reject');

  return data.egmList;
};

export const temp = () => {};
