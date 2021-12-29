//** Auth */
// user
export {
  userLogin,
  getCryptKey,
} from './auth/user';

//** Admin */
// History
export {
  getEventRecord,
  getJackpotWinRecord,
  getMeterRecord,
  getSysLog,
} from './admin/history';

// Jackpot sys
export {
  getJackpotList,
  jackpotSetting,
  jackpotDelete,
} from './admin/jackpot';

// EGM sys
export {
  adminGetEgmList,
  adminEgmSetting,
  adminEgmDelete,
  egmCashInOut,
} from './admin/egm';
