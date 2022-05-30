// Agent server ip
export const AGENT_URL = process.env.REACT_APP_AGENT_SERVER;

// SRS server ip
export const STREAM_SERVER_EXTERNAL = process.env.REACT_APP_SRS_SERVER;

export const autoLogoutTime = 1000 * 1 * 60 * 60; // 一小時

// export const removeOwn = [''];

export const i18nTypes = [
  {
    icon: '🇹🇼',
    lan: '繁體中文',
    key: 'zh_TW',
  },
  {
    icon: '🇯🇵',
    lan: '日本語',
    key: 'ja_JP',
  },
  {
    icon: '🇺🇸',
    lan: 'English',
    key: 'en_US',
  },
  {
    icon: '🇨🇳',
    lan: '简体中文',
    key: 'zh_CN',
  },
];

// online 設定倍率按鈕自動輸入選項
export const subBtnOptions = {
  aristocrat: [
    { value: 'bet-1' },
    { value: 'bet-2' },
    { value: 'bet-3' },
    { value: 'bet-5' },
    { value: 'bet-7' },
    { value: 'bet-10' },
    { value: 'bet-15' },
    { value: 'bet-20' },
    { value: 'bet-25' },
    { value: 'bet-30' },
    { value: '1-1' },
    { value: '1-2' },
    { value: '1-3' },
    { value: '1-4' },
    { value: '1-5' },
  ],

  aruze: [
    { value: 'bet-1' },
    { value: 'bet-3' },
    { value: 'bet-5' },
    { value: 'bet-7' },
    { value: 'bet-9' },
    { value: 'bet-25' },
    { value: 'bet-40' },
    { value: 'bet-50' },
    { value: 'bet-75' },
    { value: 'bet-80' },
    { value: 'bet-100' },
    { value: 'bet-125' },
    { value: 'bet-150' },
    { value: 'bet-200' },
    { value: 'bet-250' },
    { value: 'bet-375' },
    { value: 'bet-400' },
    { value: 'bet-500' },
    { value: 'bet-600' },
    { value: 'bet-625' },
  ],

  igt: [
    { value: 'bet-1' },
    { value: 'bet-3' },
    { value: 'bet-5' },
    { value: 'bet-7' },
    { value: 'bet-9' },
    { value: 'bet-50' },
    { value: 'bet-75' },
    { value: 'bet-125' },
    { value: 'bet-375' },
    { value: 'bet-625' },
    { value: 'way-3' },
    { value: 'way-9' },
    { value: 'way-27' },
    { value: 'way-81' },
    { value: 'way-243' },
  ],

  bally: [
    { value: 'gold-1' },
    { value: 'gold-2' },
    { value: 'gold-3' },
    { value: 'gold-4' },
    { value: 'gold-5' },
    { value: 'play-1' },
    { value: 'play-2' },
    { value: 'play-3' },
    { value: 'play-6' },
    { value: 'play-10' },
  ],
};
