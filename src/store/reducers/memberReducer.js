import memberActionTypes from '../types/memberTypes';

const initialState = {
  currentCard: '',
  memberData: {},
};

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

    case memberActionTypes.SET_CURRENT_MEMBER_CARD:
      return {
        ...state,
        currentCard: action.payload,
      };
    default:
      return state;
  }
};
