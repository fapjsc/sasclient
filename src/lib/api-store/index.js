//** Auth */
// user
export {
  // userLogin,
  systemLogin,
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
export { getJackpotList, jackpotSetting, jackpotDelete } from './admin/jackpot';

// EGM sys
export {
  adminGetEgmList,
  adminEgmSetting,
  adminEgmDelete,
  egmCashInOut,
  onlineSetting,
  devGetEgmList,
  devGetPlayerList,
} from './admin/egm';

// Handover
export {
  getHandOverEgmDetail,
  handoverStatistics,
  handoverRecord,
} from './handover/handover';

// Operator
export {
  cashierOperator,
  GetCashierAmounts,
  GetCashierRecord,
} from './cashier/cashier';

// Member
export {
  getFormSelectOption,
  createMember,
  updateMemberPicture,
  memberAuth,
  memberDepositAndWithdrawal,
  getMember,
  updateMember,
} from './member/addMember';

// Online
export {
  getOnlineEgmList,
} from './onLine/onLine';
