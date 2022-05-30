import showLiveTypes from '../types/showLiveTypes';

const initialState = {
  messages: [],
  egmStatus: [],
};

const showLiveReducer = (state = initialState, action) => {
  switch (action.type) {
  case showLiveTypes.SET_CHAT_MESSAGES:
    return {
      ...state,
      messages: [...state.messages, action.payload],
    };

  case showLiveTypes.SET_SHOW_LIVE_EGM_STATUS:
    return {
      ...state,
      egmStatus: action.payload || [],
    };

  default:
    return state;
  }
};

export default showLiveReducer;
