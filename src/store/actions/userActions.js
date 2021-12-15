import { SET_USER_INFO, USER_LOGOUT } from '../types/userType';

export const setUserInfo = (userInfo) => ({
  type: SET_USER_INFO,
  userInfo,
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});
