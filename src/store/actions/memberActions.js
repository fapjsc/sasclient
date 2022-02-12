import memberActionTypes from '../types/memberTypes';

export const setMemberData = (memberData) => ({
  type: memberActionTypes.SET_MEMBER_DATA,
  payload: memberData,
});

export const clearMemberData = () => ({
  type: memberActionTypes.CLEAR_MEMBER_DATA,
});

export const temp = () => {};
