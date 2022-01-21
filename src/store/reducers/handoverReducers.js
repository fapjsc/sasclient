import handoverActionTypes from '../types/handoverTypes';

// const handoverInputInitialState = {
//   inputData: {
//     inputHandover: 0,
//     inputOther: 0,
//     inputTotal: 0,
//     totalClose: 0,
//     balance: 0,
//   },
// };

const handoverLoginInitialState = {
  loading: false,
  data: null,
  error: '',
};

// export const handoverInputReducers = (state = handoverInputInitialState, action) => {
//   switch (action.type) {
//     case handoverActionTypes.HANDOVER_INPUT: {
//       return {
//         inputData: action.payload,
//       };
//     }

//     case handoverActionTypes.HANDOVER_INPUT_RESET:
//       return handoverInputInitialState;

//     default:
//       return state;
//   }
// };

export const handoverLoginReducers = (state = handoverLoginInitialState, action) => {
  switch (action.type) {
    case handoverActionTypes.HAND_OVER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case handoverActionTypes.HAND_OVER_LOGIN_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: '',
      };

    case handoverActionTypes.HAND_OVER_LOGIN_FAIL:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };

    case handoverActionTypes.HAND_OVER_LOGIN_STATUS_CLEAR:
      return handoverLoginInitialState;

    default:
      return state;
  }
};

export const tmp = () => {};
