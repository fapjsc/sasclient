import {
  SET_USER_INFO,
  SYSTEM_LOG_OUT,
  USER_LOGIN,
  USER_LOG_OUT,
} from '../types/userType';

export const setUserInfo = (userInfo) => ({
  type: SET_USER_INFO,
  userInfo,
});

export const systemLogout = () => ({
  type: SYSTEM_LOG_OUT,
});

export const userLogoutAction = () => ({
  type: USER_LOG_OUT,
});

export const userLoginAction = (user) => ({
  type: USER_LOGIN,
  user,
});
