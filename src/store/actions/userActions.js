import { SET_USER_INFO, USER_LOGOUT } from '../types/userType';

export const setUserInfo = userInfo => {
  return {
    type: SET_USER_INFO,
    userInfo,
  };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
  };
};
