import {
  SET_USER_INFO,
  SYSTEM_LOG_OUT,
  USER_LOGIN,
  USER_LOG_OUT,
} from '../types/userType';

const initialState = {
  account: null,
  token: null,
  permission: null,
  name: null,
};

// eslint-disable-next-line
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        token: action.userInfo.token,
        permission: action.userInfo.permission,
        name: action.userInfo.name,
        account: null,
      };

    case SYSTEM_LOG_OUT:
      return initialState;

    case USER_LOG_OUT:
      return {
        ...state,
        account: null,
      };

    case USER_LOGIN: {
      return {
        ...state,
        account: action.user,
      };
    }

    default:
      return state;
  }
};
