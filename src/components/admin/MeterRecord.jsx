import React from 'react';
import moment from 'moment';
import ProTable from '@ant-design/pro-table';

const tableListDataSource = [];

const ipList = [
  '192.168.10.74',
  '192.168.10.73',
  '192.168.10.113',
  '192.168.10.76',
];

for (let i = 0; i < 1000; i += 1) {
  tableListDataSource.push({
    key: i,
    id: i + 1,
    ip: ipList[Math.floor(Math.random() * 4)],
    session: Math.floor(Math.random() * 10000),
    coin: Math.floor(Math.random() * 100000),
    win: Math.floor(Math.random() * 100000),
    promote: Math.floor(Math.random() * 100000),
    time: moment(Date.now() - Math.floor(Math.random() * 1000000)).format('lll'),
  });
}

const columns = [
  {
    title: 'ID',
    key: 'id',
    dataIndex: 'id',
    hideInSearch: true,
  },
  {
    title: 'IP',
    key: 'ip',
    dataIndex: 'ip',
    copyable: true,
  },
  {
    title: 'Session',
    key: 'session',
    dataIndex: 'session',
    sorter: (a, b) => a.session - b.session,
    hideInSearch: true,
  },
  {
    title: 'Total Coin in',
    key: 'coin',
    dataIndex: 'coin',
    sorter: (a, b) => a.coin - b.coin,
    hideInSearch: true,
  },
  {
    title: 'Total Win',
    key: 'win',
    dataIndex: 'win',
    sorter: (a, b) => a.win - b.win,
    hideInSearch: true,
  },
  {
    title: 'Promote',
    key: 'promote',
    dataIndex: 'promote',
    sorter: (a, b) => a.promote - b.promote,
    hideInSearch: true,
  },
  {
    title: 'Time',
    key: 'time',
    dataIndex: 'time',
    sorter: (a, b) => moment(a.time).format('x') - moment(b.time).format('x'),
    valueType: 'dateTime',
    tip: '搜尋結果為輸入時間之後的Meter紀錄',
    className: 'cancel-icon',
  },
];

const requestPromise = (params) => Promise.resolve({
  success: true,
  data: tableListDataSource.filter((item) => {
    // 沒有搜尋條件
    if (!params?.ip && !params?.time) {
      return true;
    }

    const paramsTime = moment(params?.time).format('x');
    const itemTime = moment(item?.time).format('x');

    // 同時有ip及Time
    if (params.ip && params.time) {
      return paramsTime < itemTime && item?.ip.includes(params?.ip);
    }

    // 只有time
    if (!params?.ip && params?.time) {
      return paramsTime < itemTime;
    }

    // 只有IP
    if (params?.ip && !params?.time) {
      return item.ip.includes(params?.ip);
    }

    return false;
  }),
});

const MeterRecord = () => (
  <ProTable
    columns={columns}
    rowKey="key"
    // search={false}
    dateFormatter="string"
    headerTitle="Meter Record"
    request={requestPromise}
    search={{
      layout: 'vertical',
      defaultCollapsed: false,
    }}
    pagination={{
      defaultPageSize: 10,
      showQuickJumper: true,
    }}
  />
);

export default MeterRecord;
