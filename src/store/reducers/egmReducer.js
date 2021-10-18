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

const egmStatusInitState = {
  statusData: [],
};

export const egmStatus = (state = egmStatusInitState, action) => {
  switch (action.type) {
    case SET_EGM_STATUS:
      const item = action.egmStatus;
      const existsItem = state.statusData.find(el => el.EGMnum === item.EGMnum);
      if (existsItem) {
        return {
          ...state,
          statusData: state.statusData.map(el => (el.EGMnum === item.EGMnum ? item : el)),
        };
      } else {
        return {
          ...state,
          statusData: [...state.statusData, item],
        };
      }

    default:
      return state;
  }
};
