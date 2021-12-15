import { SET_USER_INFO, USER_LOGOUT } from '../types/userType';

const initialState = {
  token: '',
  loginInfo: {
    account: 'admin',
  },
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        token: action.userInfo.token,
        loginInfo: action.userInfo.loginInfo,
      };

    case USER_LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export const temp = () => {};
