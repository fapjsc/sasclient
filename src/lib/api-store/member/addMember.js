import {
  AGENT_URL,
  getHeaders,
  GET_FORM_SELECT_OPTION,
  CREATE_MEMBER,
  UPDATE_MEMBER_PICTURE,
  MEMBER_LOGIN,
} from '../utils';

export const temp = () => {};

export const getFormSelectOption = async () => {
  const headers = getHeaders();
  const url = `${AGENT_URL}/${GET_FORM_SELECT_OPTION}`;

  const response = await fetch(url, { headers });
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || 'Could not fetch api');
  if (data.status !== 200) {
    throw new Error(data.message || 'Fetch select option fail.');
  }

  return data.result;
};

export const createMember = async (memberData) => {
  const headers = getHeaders();
  const url = `${AGENT_URL}/${CREATE_MEMBER}`;

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(memberData),
  });
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || 'Could not fetch api');
  if (data.status !== 200) {
    throw new Error(data.message || 'Fetch select option fail.');
  }

  return data.result;
};

export const updateMemberPicture = async (params) => {
  const headers = getHeaders();
  const { picture, member_id: id } = params || {};
  const url = `${AGENT_URL}/${UPDATE_MEMBER_PICTURE}`;

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ member_id: id, picture }),
  });
  const data = await response.json();

  if (!response.ok) { throw new Error(data.message || 'Could not fetch upload picture api'); }
  if (data.status !== 200) {
    throw new Error(data.message || 'Upload picture fail.');
  }

  return data.result;
};

export const memberAuth = async (params) => {
  const headers = getHeaders();
  const url = `${AGENT_URL}/${MEMBER_LOGIN}`;

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
  const data = await response.json();

  if (!response.ok) { throw new Error(data.message || 'Could not fetch login api'); }
  if (data.status !== 200) {
    throw new Error(data.message || 'Login fail.');
  }

  return data.result;
};
