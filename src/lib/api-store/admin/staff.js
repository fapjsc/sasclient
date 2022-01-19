import { getHeaders, AGENT_URL, CREATE_STAFF } from '../utils';

export const temp = () => {};

export const createStaff = async (staffData) => {
  const url = `${AGENT_URL}/${CREATE_STAFF}`;
  const headers = getHeaders();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(staffData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Could not fetch create staff api.');
    if (data.status !== 200) throw new Error(data.message || 'Create staff fail.');
    return data.message;
  } catch (error) {
    return error.message;
  }
};
