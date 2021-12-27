import {
  SET_USER_INFO,
  USER_LOGOUT,
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
        account: action.userInfo.account,
        name: action.userInfo.name,
      };

    case USER_LOGOUT:
      return initialState;

    default:
      return state;
  }
};
