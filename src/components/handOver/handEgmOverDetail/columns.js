import { thousandsFormat } from '../../../lib/helper';

const columns = [
  {
    title: 'EGM',
    key: 'number',
    dataIndex: 'number',
    hideInSearch: true,
    sorter: (a, b) => a.number - b.number,
  },
  {
    title: 'IP',
    key: 'ip',
    dataIndex: 'ip',
    copyable: true,
  },
  {
    title: 'Model',
    key: 'model',
    dataIndex: 'model',
  },
  {
    title: 'Bill_in',
    key: 'bill_in',
    dataIndex: 'bill_in',
    hideInSearch: true,
    sorter: (a, b) => a.bill_in - b.bill_in,
    render: (text) => [`$${thousandsFormat(text)}`],
  },
  {
    title: 'Tick_in',
    key: 'ticket_in',
    dataIndex: 'ticket_in',
    hideInSearch: true,
    sorter: (a, b) => a.ticket_in - b.ticket_in,
    render: (text) => [`$${thousandsFormat(text)}`],

  },
  {
    title: 'Tick_out',
    key: 'ticket_out',
    dataIndex: 'ticket_out',
    hideInSearch: true,
    sorter: (a, b) => a.ticket_out - b.ticket_out,
    render: (text) => [`$${thousandsFormat(text)}`],

  },
  {
    title: 'Credit_in',
    key: 'key_credit_in',
    dataIndex: 'key_credit_in',
    hideInSearch: true,
    sorter: (a, b) => a.key_credit_in - b.key_credit_in,
    render: (text) => [`$${thousandsFormat(text)}`],

  },
  {
    title: 'Credit_out',
    key: 'key_credit_out',
    dataIndex: 'key_credit_out',
    hideInSearch: true,
    sorter: (a, b) => a.key_credit_out - b.key_credit_out,
    render: (text) => [`$${thousandsFormat(text)}`],

  },
  {
    title: 'Card_in',
    key: 'card_in',
    dataIndex: 'card_in',
    hideInSearch: true,
    sorter: (a, b) => a.card_in - b.card_in,
    render: (text) => [`$${thousandsFormat(text)}`],

  },
  {
    title: 'Card_out',
    key: 'card_out',
    dataIndex: 'card_out',
    hideInSearch: true,
    sorter: (a, b) => a.card_out - b.card_out,
    render: (text) => [`$${thousandsFormat(text)}`],

  },
  {
    title: 'Cashier_in',
    key: 'cashier_in',
    dataIndex: 'cashier_in',
    hideInSearch: true,
    sorter: (a, b) => a.cashier_in - b.cashier_in,
    render: (text) => [`$${thousandsFormat(text)}`],

  },
  {
    title: 'Cashier_out',
    key: 'cashier_out',
    dataIndex: 'cashier_out',
    hideInSearch: true,
    sorter: (a, b) => a.cashier_out - b.cashier_out,
    render: (text) => [`$${thousandsFormat(text)}`],

  },
  {
    title: 'Hand_pay',
    key: 'handpay',
    dataIndex: 'handpay',
    hideInSearch: true,
    sorter: (a, b) => a.handpay - b.handpay,
    render: (text) => [`$${thousandsFormat(text)}`],

  },
  {
    title: 'Jackpot',
    key: 'jackpot',
    dataIndex: 'jackpot',
    hideInSearch: true,
    sorter: (a, b) => a.jackpot - b.jackpot,
    render: (text) => [`$${thousandsFormat(text)}`],

  },
  {
    title: 'Total_in',
    key: 'total_in',
    dataIndex: 'total_in',
    hideInSearch: true,
    sorter: (a, b) => a.total_in - b.total_in,
    render: (text) => [`$${thousandsFormat(text)}`],

  },
  {
    title: 'Total_out',
    key: 'total_out',
    dataIndex: 'total_out',
    hideInSearch: true,
    sorter: (a, b) => a.total_out - b.total_out,
    render: (text) => [`$${thousandsFormat(text)}`],

  },
  {
    title: 'Net_win',
    key: 'netwin',
    dataIndex: 'netwin',
    hideInSearch: true,
    sorter: (a, b) => a.netwin - b.netwin,
    render: (text) => [`$${thousandsFormat(text)}`],

  },
];

export default columns;
