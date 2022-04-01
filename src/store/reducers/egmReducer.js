// Helper
import {
  egmIsDisconnect, isEmptyObj,
} from '../../lib/helper';

import { EgmGpLpCode } from '../../config/egmStatus';

import {
  SET_EGM_CASH_IN_OUT,
  RESET_EGM_CASH_IN_OUT,
  SET_EGM_STATUS,
} from '../types/egmTypes';

const cashInOutInitialState = {
  action: null,
  ip: null,
  cashAmount: null,
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

const egmStatusInitState = {
  // sections: [],
  sections: null,
};

export const egmStatus = (state = egmStatusInitState, action) => {
  switch (action.type) {
  case SET_EGM_STATUS:
  {
    const isEmpty = isEmptyObj(action.egmStatus);
    if (isEmpty) {
      return {
        ...state,
      };
    }
    const total = Object.values(action.egmStatus).map((el) => ({
      ...el,
      signalConnectionTime: el.signalConnectionTime
        && new Date(el.signalConnectionTime).toString(),
    })).sort((a, b) => a.number - b.number);

    const disconnectArr = Object.values(action.egmStatus)
      .filter((el) => egmIsDisconnect(el?.signalConnectionTime))
      .sort((a, b) => a.number - b.number);

    const isConnectArr = total.filter((item) => !disconnectArr.some((el) => el.id === item.id))
      .sort((a, b) => a.number - b.number);

    const warningArr = isConnectArr.filter((el) => EgmGpLpCode(el?.status).color === 'warning');
    const successArr = isConnectArr.filter((el) => EgmGpLpCode(el?.status).color === 'success');

    return {
      ...state,
      // sections: [...Object.values(action.egmStatus)],
      sections: {
        all: {
          key: 'all', title: '全部', value: total.length, items: total,
        },
        success: {
          key: 'success', title: '正常', value: successArr.length, items: successArr.sort((a, b) => a.number - b.numbers),
        },
        warning: {
          key: 'warning', title: '異常處理', value: warningArr.length, items: warningArr,
        },
        error: {
          key: 'error', title: '無法連線', value: disconnectArr.length, items: disconnectArr,
        },
      },
    };
  }

  default:
    return state;
  }
};
