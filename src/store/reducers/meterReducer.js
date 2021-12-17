// import {
//   SEND_GET_METER_REQUEST,
//   FETCH_METER_FAIL,
//   FETCH_METER_SUCCESS,
//   CLEAN_METER_STATE,
//   SET_METER_DATA,
// } from '../types/meterTypes';

// const initialState = {
//   status: null,
//   error: null,
//   data: null,
// };

// export const meterReducers = (state = initialState, action) => {
//   switch (action.type) {
//     case SEND_GET_METER_REQUEST:
//       return {
//         status: 'pending',
//         error: null,
//         data: null,
//       };

//     case FETCH_METER_SUCCESS:
//       return {
//         status: 'completed',
//         error: null,
//         data: action.payload,
//       };

//     case FETCH_METER_FAIL:
//       return {
//         status: 'completed',
//         error: action.payload,
//         data: null,
//       };

//     case CLEAN_METER_STATE:
//       return {
//         status: null,
//         error: null,
//         data: null,
//       };
//     default:
//       return state;
//   }
// };

// export const meterDataReducer = (state = null, action) => {
//   switch (action.type) {
//     case SET_METER_DATA:
//       return {
//         meterData: action.payload,
//       };
//     default:
//       return state;
//   }
// };
