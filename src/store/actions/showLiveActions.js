import showLiveTypes from '../types/showLiveTypes';

export const setShowLiveChatMessage = (message) => ({
  type: showLiveTypes.SET_CHAT_MESSAGES,
  payload: message,
});

export const setShowLiveEgmStatus = (egmStatus) => ({
  type: showLiveTypes.SET_SHOW_LIVE_EGM_STATUS,
  payload: egmStatus,
});
