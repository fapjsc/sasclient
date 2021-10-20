import { SET_EGM_CASH_IN_OUT, RESET_EGM_CASH_IN_OUT, SET_EGM_STATUS } from '../types/egmTypes';

const cashInOutInitialState = {
  opName: '',
  action: '',
  machineNumber: null,
  amount: null,
};

export const egmCashInOutReducer = (state = cashInOutInitialState, action) => {
  switch (action.type) {
    case SET_EGM_CASH_IN_OUT:
      const { cashInOutData } = action;

      let data;
      for (const key in cashInOutData) {
        data = {
          [key]: cashInOutData[key],
        };
      }
      return {
        ...state,
        ...data,
      };

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
      let statusArr = Object.values(action.egmStatus);
      return [...statusArr];

    default:
      return state;
  }
};
