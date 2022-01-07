import moment from 'moment';

const columns = [
  {
    title: 'ID',
    key: 'id',
    dataIndex: 'id',
    hideInSearch: true,
  },
  {
    title: 'Egm',
    key: 'egm',
    dataIndex: 'egm',
    hideInSearch: true,
  },
  {
    title: 'Model',
    key: 'model',
    dataIndex: 'model',
    hideInSearch: true,
  },
  {
    title: 'Bill_in',
    key: 'billIn',
    dataIndex: 'billIn',
    hideInSearch: true,
  },
  {
    title: 'Tick_in',
    key: 'tickIn',
    dataIndex: 'tickIn',
    hideInSearch: true,
  },
  {
    title: 'Tick_out',
    key: 'tickOut',
    dataIndex: 'tickOut',
    hideInSearch: true,
  },
  {
    title: 'Credit_in',
    key: 'creditIn',
    dataIndex: 'creditIn',
    hideInSearch: true,
  },
  {
    title: 'Credit_out',
    key: 'creditOut',
    dataIndex: 'creditOut',
    hideInSearch: true,
  },
  {
    title: 'Card_in',
    key: 'cardIn',
    dataIndex: 'cardIn',
    hideInSearch: true,
  },
  {
    title: 'Card_out',
    key: 'cardOut',
    dataIndex: 'cardOut',
    hideInSearch: true,
  },
  {
    title: 'Cashier_in',
    key: 'cashierIn',
    dataIndex: 'cashierIn',
    hideInSearch: true,
  },
  {
    title: 'Cashier_out',
    key: 'cashierOut',
    dataIndex: 'cashierOut',
    hideInSearch: true,
  },
  {
    title: 'Hand_pay',
    key: 'handPay',
    dataIndex: 'handPay',
    hideInSearch: true,
  },
  {
    title: 'Jackpot',
    key: 'jackpot',
    dataIndex: 'jackpot',
    hideInSearch: true,
  },
  {
    title: 'Total_in',
    key: 'totalIn',
    dataIndex: 'totalIn',
    hideInSearch: true,
  },
  {
    title: 'Total_out',
    key: 'totalOut',
    dataIndex: 'totalOut',
    hideInSearch: true,
  },
  {
    title: 'Net_win',
    key: 'netWin',
    dataIndex: 'netWin',
    hideInSearch: true,
  },
  {
    title: 'Time',
    key: 'created',
    dataIndex: 'created',
    sorter: (a, b) => {
      const aTime = new Date(a.created).getTime();
      const bTime = new Date(b.created).getTime();
      return aTime - bTime;
    },
    valueType: 'dateTimeRange',
    className: 'cancel-icon',
    render: (e) => moment(e.props.text).format('YYYY-MM-DD HH:mm:ss'),
  },
];

export default columns;
