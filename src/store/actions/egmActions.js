import { SET_EGM_CASH_IN_OUT, RESET_EGM_CASH_IN_OUT, SET_EGM_STATUS } from '../types/egmTypes';

export const setEgmCashInOut = (cashInOutData) => ({
  type: SET_EGM_CASH_IN_OUT,
  cashInOutData,
});

export const restEgmCashInOut = () => ({
  type: RESET_EGM_CASH_IN_OUT,
});

export const setEgmStatus = (egmStatus) => ({
  type: SET_EGM_STATUS,
  egmStatus,
});
