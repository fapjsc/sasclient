import { thousandsFormat } from '../../../lib/helper';

const gtZeroStyle = {
  color: '#69c0ff',
};

const ltZeroStyle = {
  color: '#ff7875',
};

const renderHandler = (dataIndex, dom, entity) => {
  // eslint-disable-next-line
  if (!dom) return <span>-</span>;

  const data = entity[dataIndex];

  // eslint-disable-next-line
  if (data < 0 || dom < 0) return <span style={ltZeroStyle}>{`$${thousandsFormat(data)}`}</span>;

  if (dataIndex === 'totalIn'
  || dataIndex === 'totalOut'
  || dataIndex === 'totalClose'
  || dataIndex === 'balance'
  // eslint-disable-next-line
  ) return <span style={gtZeroStyle}>{`$${thousandsFormat(data)}`}</span>;

  return `$${thousandsFormat(data)}`;
};

export const totalColumns = [
  {
    title: '交班帳務',
    key: 'account',
    dataIndex: 'account',
    render: (dom, entity, index) => (
      renderHandler(totalColumns[index].dataIndex, dom, entity)
    ),
  },
  {
    title: '補入金額',
    key: 'cashier-in',
    dataIndex: 'cashierIn',
    render: (dom, entity, index) => (
      renderHandler(totalColumns[index].dataIndex, dom, entity)
    ),
  },
  {
    title: '收票金額',
    key: 'tick-in',
    dataIndex: 'tickIn',
    render: (dom, entity, index) => (
      renderHandler(totalColumns[index].dataIndex, dom, entity)
    ),
  },
  {
    title: '積分卡儲值金額',
    key: 'card-in',
    dataIndex: 'cardIn',
    render: (dom, entity, index) => (
      renderHandler(totalColumns[index].dataIndex, dom, entity)
    ),
  },
  {
    title: '櫃檯開分總額',
    key: 'aft-in',
    dataIndex: 'aftIn',
    render: (dom, entity, index) => (
      renderHandler(totalColumns[index].dataIndex, dom, entity)
    ),
  },
  {
    title: '機台端開分總額',
    key: 'aft-in-egm',
    dataIndex: 'aftInEgm',
    render: (dom, entity, index) => (
      renderHandler(totalColumns[index].dataIndex, dom, entity)
    ),
  },
  {
    title: '櫃台收入總額(1)',
    key: 'total-in',
    dataIndex: 'totalIn',
    render: (dom, entity, index) => (
      renderHandler(totalColumns[index].dataIndex, dom, entity)
    ),
  },
  {
    title: '出票金額',
    key: 'tick-out',
    dataIndex: 'tickOut',
    render: (dom, entity, index) => (
      renderHandler(totalColumns[index].dataIndex, dom, entity)
    ),
  },
  {
    title: '積分卡兌換金額',
    key: 'card-out',
    dataIndex: 'cardOut',
    render: (dom, entity, index) => (
      renderHandler(totalColumns[index].dataIndex, dom, entity)
    ),
  },
  {
    title: '櫃台洗分總額',
    key: 'aft-out',
    dataIndex: 'aftOut',
    render: (dom, entity, index) => (
      renderHandler(totalColumns[index].dataIndex, dom, entity)
    ),
  },
  {
    title: '機台端洗分總額',
    key: 'aft-out-egm',
    dataIndex: 'aftOutEgm',
    render: (dom, entity, index) => (
      renderHandler(totalColumns[index].dataIndex, dom, entity)
    ),
  },
  {
    title: '彩金金額',
    key: 'jackpot',
    dataIndex: 'jackpot',
    render: (dom, entity, index) => (
      renderHandler(totalColumns[index].dataIndex, dom, entity)
    ),
  },
  {
    title: '櫃台給付總額(2)',
    key: 'total-out',
    dataIndex: 'totalOut',
    render: (dom, entity, index) => (
      renderHandler(totalColumns[index].dataIndex, dom, entity)
    ),
  },

];

export const settlementColumns = [
  {
    title: '總關閉(5)(2+3+4)',
    key: 'total-close',
    dataIndex: 'totalClose',
    render: (dom, entity, index) => (
      renderHandler(settlementColumns[index].dataIndex, dom, entity)
    ),
  },
  {
    title: '結算差額(6)(5-1)',
    key: 'balance',
    dataIndex: 'balance',
    render: (dom, entity, index) => (
      renderHandler(settlementColumns[index].dataIndex, dom, entity)
    ),
  },
];

export const payColumns = [
  {
    title: '結算金額(1-2)',
    key: 'settlement-amount',
    dataIndex: 'settlementAmount',
    render: (dom, entity, index) => (
      renderHandler(payColumns[index].dataIndex, dom, entity)
    ),
  },
  {
    title: '淨收益(1-2-5-6)',
    key: 'total-revenue',
    dataIndex: 'totalRevenue',
    render: (dom, entity, index) => (
      renderHandler(payColumns[index].dataIndex, dom, entity)
    ),
  },
];

export const handoverAmountColumns = [
  {
    title: '櫃檯金額(1-2)',
    key: 'counter-amount',
    dataIndex: 'counterAmount',
    render: (dom, entity, index) => (
      renderHandler(handoverAmountColumns[index].dataIndex, dom, entity)
    ),
  },
  {
    title: '機器鈔入(7)',
    key: 'egm-in',
    dataIndex: 'egmIn',
    render: (dom, entity, index) => (
      renderHandler(handoverAmountColumns[index].dataIndex, dom, entity)
    ),
  },
  {
    title: '總計(1-2+7)',
    key: 'total',
    dataIndex: 'total',
    render: (dom, entity, index) => (
      renderHandler(handoverAmountColumns[index].dataIndex, dom, entity)
    ),
  },
];
