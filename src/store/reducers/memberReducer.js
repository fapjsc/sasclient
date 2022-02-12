import memberActionTypes from '../types/memberTypes';

const initialState = {};

export const temp = () => {};

export const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case memberActionTypes.SET_MEMBER_DATA:
      return {
        ...state,
        memberData: action.payload,
        showInfo: true,
      };

    case memberActionTypes.CLEAR_MEMBER_DATA:
      return {
        ...state,
        memberData: {},
        showInfo: false,
      };
    default:
      return state;
  }
};
