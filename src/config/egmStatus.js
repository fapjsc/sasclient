const success = 'success';
const warning = 'warning';
// const warning = 'warning';
// const unKnow = 'default';

export const temp = () => {};

export const EgmGpLpCode = (str) => {
  // const { t } = useI18n();
  // console.log(t);
  switch (str) {
  //** GP */
  case '0x00':
    return {
      color: success,
      text: '正常',
    };

  case '0x11':
    return {
      color: warning,
      text: '主門被打開',
    };

  case '0x15':
    return {
      color: warning,
      text: '卡片機架被打開',
    };

  case '0x18':
    return {
      color: warning,
      text: '機器上的交流電源斷掉了',
    };

  case '0x19':
    return {
      color: warning,
      text: '錢箱的門被打開',
    };

  case '0x1B':
    return {
      color: warning,
      text: '錢箱被移除',
    };

  case '0x1D':
    return {
      color: warning,
      text: '廣告燈箱片門被打開',
    };

  case '0x1F':
    return {
      color: success,
      text: '正常',
    };

  case '0x20':
    return {
      color: warning,
      text: '不明的狀況',
    };

  case '0x21':
    return {
      color: warning,
      text: '投幣未連接',
    };

  case '0x22':
    return {
      color: warning,
      text: '出幣未連接',
    };

  case '0x23':
    return {
      color: warning,
      text: '檢測到代幣箱空的',
    };

  case '0x25':
    return {
      color: warning,
      text: '分幣器不正常',
    };

  case '0x27':
    return {
      color: warning,
      text: '錢箱滿了',
    };

  case '0x28':
    return {
      color: warning,
      text: '鈔票卡住',
    };

  case '0x29':
    return {
      color: warning,
      text: '讀鈔機故障',
    };

  case '0x2A':
    return {
      color: warning,
      text: '鈔票反向',
    };

  case '0x2B':
    return {
      color: warning,
      text: '鈔票被拒絕',
    };

  case '0x2C':
    return {
      color: warning,
      text: '檢測到偽鈔',
    };

  case '0x2D':
    return {
      color: warning,
      text: '檢測到反向硬幣',
    };

  case '0x2E':
    return {
      color: warning,
      text: '錢箱快滿了',
    };

  case '0x3A':
    return {
      color: warning,
      text: '記憶體錯誤重置',
    };

  case '0x3B':
    return {
      color: warning,
      text: '檢測到備用電池低電量',
    };

  case '0x3C':
    return {
      color: warning,
      text: '操作中',
    };

  case '0x40':
    return {
      color: warning,
      text: '未指定',
    };

  case '0x41':
    return {
      color: warning,
      text: '機器捲軸1未連接',
    };

  case '0x42':
    return {
      color: warning,
      text: '機器捲軸2未連接',
    };

  case '0x43':
    return {
      color: warning,
      text: '機器捲軸3未連接',
    };

  case '0x44':
    return {
      color: warning,
      text: '機器捲軸4未連接',
    };

  case '0x45':
    return {
      color: warning,
      text: '機器捲軸5未連接',
    };

  case '0x46':
    return {
      color: warning,
      text: '機器捲軸裝置斷開連接',
    };

  case '0x51':
    return {
      color: warning,
      text: 'Hand pay等待中',
    };

  case '0x60':
    return {
      color: warning,
      text: '打印機連線錯誤',
    };

  case '0x61':
    return {
      color: warning,
      text: '打印機沒紙',
    };

  case '0x6F':
    return {
      color: warning,
      text: '遊戲被鎖定',
    };

  case '0x74':
    return {
      color: warning,
      text: '打印機紙張不足',
    };

  case '0x75':
    return {
      color: warning,
      text: '打印機電源關閉',
    };

  case '0x78':
    return {
      color: warning,
      text: '打印機架卡住',
    };

  case '0x79':
    return {
      color: warning,
      text: '投幣鎖定不正常',
    };

  case '0x7C':
    return {
      color: warning,
      text: '更換打印機色帶',
    };

  case '0x7E':
    return {
      color: success,
      text: '遊戲開始',
    };

  case '0x7F':
    return {
      color: success,
      text: '遊戲結束',
    };

  case '0x80':
    return {
      color: warning,
      text: '代幣箱滿了',
    };

  case '0x81':
    return {
      color: warning,
      text: '代幣箱的代幣過少',
    };

  default:
    return {
      color: warning,
      text: '未知',
    };
  }
};
