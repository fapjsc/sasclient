import React from 'react';

import _ from 'lodash';

import { thousandsFormat } from '../../../lib/helper';

const colorBlue = {
  color: '#69c0ff',
};

const colorRed = {
  color: '#ff7875',
};

const renderHandler = (dataIndex, dom, entity) => {
  if (!_.isNumber(dom)) return <span>-</span>;

  const data = entity[dataIndex];

  if (data < 0 || dom < 0) {
    return <span style={colorRed}>{`$${thousandsFormat(data)}`}</span>;
  }

  if (dataIndex === 'totalInput' || dataIndex === 'totalOutput') {
    return <span style={colorBlue}>{`$${thousandsFormat(data)}`}</span>;
  }

  return `$${thousandsFormat(data)}`;
};

export const totalColumns = [
  {
    title: '交班帳務',
    key: 'initialCash',
    dataIndex: 'initialCash',
    render: (dom, entity, index) => renderHandler(totalColumns[index].dataIndex, dom, entity),
  },
  {
    title: '補入金額',
    key: 'cashRecharges',
    dataIndex: 'cashRecharges',
    render: (dom, entity, index) => renderHandler(totalColumns[index].dataIndex, dom, entity),
  },
  {
    title: '收票金額',
    key: 'printedTickets',
    dataIndex: 'printedTickets',
    render: (dom, entity, index) => renderHandler(totalColumns[index].dataIndex, dom, entity),
  },
  {
    title: '積分卡儲值金額',
    key: 'salesCustomerCard',
    dataIndex: 'salesCustomerCard',
    render: (dom, entity, index) => renderHandler(totalColumns[index].dataIndex, dom, entity),
  },
  {
    title: '櫃檯開分總額',
    key: 'cashierIn',
    dataIndex: 'cashierIn',
    render: (dom, entity, index) => renderHandler(totalColumns[index].dataIndex, dom, entity),
  },
  {
    title: '機台端開分總額',
    key: 'GCreditBoxIn',
    dataIndex: 'GCreditBoxIn',
    render: (dom, entity, index) => renderHandler(totalColumns[index].dataIndex, dom, entity),
  },
  {
    title: '櫃台收入總額(1)',
    key: 'totalInput',
    dataIndex: 'totalInput',
    render: (dom, entity, index) => renderHandler(totalColumns[index].dataIndex, dom, entity),
  },
  {
    title: '出票金額',
    key: 'ticketsPaidByCashier',
    dataIndex: 'ticketsPaidByCashier',
    render: (dom, entity, index) => renderHandler(totalColumns[index].dataIndex, dom, entity),
  },
  {
    title: '積分卡兌換金額',
    key: 'paymentsCustomerCard',
    dataIndex: 'paymentsCustomerCard',
    render: (dom, entity, index) => renderHandler(totalColumns[index].dataIndex, dom, entity),
  },
  {
    title: '櫃台洗分總額',
    key: 'cashierOut',
    dataIndex: 'cashierOut',
    render: (dom, entity, index) => renderHandler(totalColumns[index].dataIndex, dom, entity),
  },
  {
    title: '機台端洗分總額',
    key: 'GCreditBoxOut',
    dataIndex: 'GCreditBoxOut',
    render: (dom, entity, index) => renderHandler(totalColumns[index].dataIndex, dom, entity),
  },
  {
    title: '彩金金額',
    key: 'jackpotPayment',
    dataIndex: 'jackpotPayment',
    render: (dom, entity, index) => renderHandler(totalColumns[index].dataIndex, dom, entity),
  },
  {
    title: '櫃台給付總額(2)',
    key: 'totalOutput',
    dataIndex: 'totalOutput',
    render: (dom, entity, index) => renderHandler(totalColumns[index].dataIndex, dom, entity),
  },
];

// export const settlementColumns = [
//   {
//     title: '總關閉(5)(2+3+4)',
//     key: 'total-close',
//     dataIndex: 'totalClose',
//     render: (dom, entity, index) =>
//      renderHandler(settlementColumns[index].dataIndex, dom, entity),
//   },
//   {
//     title: '結算差額(6)(5-1)',
//     key: 'balance',
//     dataIndex: 'balance',
//     render:
//           (dom, entity, index) => renderHandler(settlementColumns[index].dataIndex, dom, entity),
//   },
// ];

// export const payColumns = [
//   {
//     title: '結算金額(1-2)',
//     key: 'settlement-amount',
//     dataIndex: 'settlementAmount',
//   },
//   {
//     title: '淨收益(1-2-5-6)',
//     key: 'total-revenue',
//     dataIndex: 'totalRevenue',
//     // render: (dom, entity, index) => renderHandler(payColumns[index].dataIndex, dom, entity),
//   },
// ];

// export const handoverAmountColumns = [
//   {
//     title: '櫃檯金額(1-2)',
//     key: 'counter-amount',
//     dataIndex: 'counterAmount',
//     // eslint-disable-next-line
//     render: (dom, entity, index) =>
// renderHandler(handoverAmountColumns[index].dataIndex, dom, entity),
//   },
//   {
//     title: '機器鈔入(7)',
//     key: 'egm-in',
//     dataIndex: 'egmIn',
//     // eslint-disable-next-line
//     render: (dom, entity, index) => r
// enderHandler(handoverAmountColumns[index].dataIndex, dom, entity),
//   },
//   {
//     title: '總計(1-2+7)',
//     key: 'total',
//     dataIndex: 'total',
//     // eslint-disable-next-line
//     render: (dom, entity, index) =>
//       renderHandler(handoverAmountColumns[index].dataIndex, dom, entity),
//   },
// ];

export const temp = () => {};
