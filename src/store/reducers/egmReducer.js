import {
  SET_EGM_CASH_IN_OUT,
  RESET_EGM_CASH_IN_OUT,
  SET_EGM_STATUS,
} from '../types/egmTypes';

const cashInOutInitialState = {
  action: null,
  ip: null,
  amount: null,
};

export const egmCashInOutReducer = (state = cashInOutInitialState, action) => {
  switch (action.type) {
    case SET_EGM_CASH_IN_OUT: {
      return {
        ...state,
        ...action.cashInOutData,
      };
    }

    case RESET_EGM_CASH_IN_OUT:
      return {
        ...cashInOutInitialState,
      };

    default:
      return state;
  }
};

const egmStatusInitState = [];

export const egmStatus = (state = egmStatusInitState, action) => {
  switch (action.type) {
    case SET_EGM_STATUS:
      // const statusArr = Object.values(action.egmStatus);
      return [...Object.values(action.egmStatus)].sort((a, b) => a.number - b.number);

    default:
      return state;
  }
};
