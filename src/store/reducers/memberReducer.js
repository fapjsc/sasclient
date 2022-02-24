import memberActionTypes from '../types/memberTypes';

const initialState = {
  currentCard: '',
  memberData: {},
  showInfo: false,
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
        currentCard: '',
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
