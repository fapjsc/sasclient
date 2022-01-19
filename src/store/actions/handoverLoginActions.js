import handoverActionTypes from '../types/handoverTypes';

import { getHeaders, AGENT_URL, HAND_OVER_LOGIN } from '../../lib/api-store/utils';

export const handoverLogin = (loginData) => async (dispatch) => {
  dispatch({ type: handoverActionTypes.HAND_OVER_LOGIN_REQUEST });
  const url = `${AGENT_URL}/${HAND_OVER_LOGIN}`;
  const headers = getHeaders();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Could not fetch login api');
    if (data.status !== 200) throw new Error(data.message || 'Fetch login api fail.');

    dispatch({
      type: handoverActionTypes.HAND_OVER_LOGIN_SUCCESS,
      payload: data.result,
    });
  } catch (error) {
    dispatch({
      type: handoverActionTypes.HAND_OVER_LOGIN_FAIL,
      payload: error.message,
    });
  }
};

export const handoverLoginStatusClear = () => ({
  type: handoverActionTypes.HAND_OVER_LOGIN_STATUS_CLEAR,
});
