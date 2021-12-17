// import { AGENT_URL, METER_RECORD } from '../../lib/api';

// import {
//   SEND_GET_METER_REQUEST,
//   FETCH_METER_FAIL,
//   FETCH_METER_SUCCESS,
//   SET_METER_DATA,
// } from '../types/meterTypes';

// export const getMeterRecord = () => async (dispatch) => {
//   dispatch({ type: SEND_GET_METER_REQUEST });

//   try {
//     const url = `${AGENT_URL}/${METER_RECORD}`;
//     const response = await fetch(url, { headers: { 'Content-Type': 'application/json' } });

//     const data = await response.json();

//     if (!response.ok) throw new Error(data.message || 'Could not fetch meter record');

//     dispatch({ type: FETCH_METER_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: FETCH_METER_FAIL, payload: error.message });
//   }
// };

// export const setMeterData = (meterData) => ({
//   type: SET_METER_DATA,
//   payload: meterData,
// });
