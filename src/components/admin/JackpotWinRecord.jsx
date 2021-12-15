import React from 'react';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';

const JackpotWinRecord = () => {
  const tableListDataSource = [];

  const ipList = [
    '192.168.10.74',
    '192.168.10.73',
    '192.168.10.113',
    '192.168.10.76',
  ];

  const levelList = ['JP1', 'JP2', 'JP3', 'JP4', 'JP5', 'JP6'];

  const placeList = ['location1', 'location2', 'location3', 'location4'];

  const memberList = ['Jack', 'Pizza', 'Cool', 'Beer'];

  const statusList = ['success', 'pending', 'fail', 'success'];

  // const winList = [
  //   1, -1, 1, -1,
  // ];

  for (let i = 0; i < 10; i += 1) {
    tableListDataSource.push({
      key: i,
      id: i + 1,
      place: placeList[Math.floor(Math.random() * 4)],
      ip: ipList[Math.floor(Math.random() * 4)],
      level: levelList[Math.floor(Math.random() * 4)],
      amount: Math.floor(Math.random() * 100000),
      member: memberList[Math.floor(Math.random() * 4)],
      status: statusList[Math.floor(Math.random() * 4)],
      time: moment(Date.now() - Math.floor(Math.random() * 1000000)).format(
        'lll',
      ),
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
      title: 'Place',
      key: 'place',
      dataIndex: 'place',
      hideInSearch: true,
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        location1: {
          text: '場地1',
        },
        location2: {
          text: '場地2',
        },
        location3: {
          text: '場地3',
        },
        location4: {
          text: '場地4',
        },
      },
    },
    {
      title: 'IP',
      key: 'ip',
      dataIndex: 'ip',
      copyable: true,
    },

    {
      title: 'Level',
      key: 'level',
      dataIndex: 'level',
      hideInSearch: true,
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        JP1: {
          text: 'JP1',
        },
        JP2: {
          text: 'JP2',
        },
        JP3: {
          text: 'JP3',
        },
        JP4: {
          text: 'JP4',
        },
      },
    },
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
      hideInSearch: true,
      sorter: (a, b) => a.amount - b.amount,
      render: (text) => [
        `$${text.toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}`,
      ],
    },
    {
      title: 'Member',
      key: 'member',
      dataIndex: 'member',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      hideInSearch: true,
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        success: {
          text: 'Success',
          status: 'Success',
        },
        fail: {
          text: 'Fail',
          status: 'Error',
          disabled: true,
        },
        pending: {
          text: 'Pending',
          status: 'Processing',
        },
      },
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
      if (!params?.ip && !params?.time && !params?.member) {
        return true;
      }

      const paramsTime = moment(params?.time).format('x');
      const itemTime = moment(item?.time).format('x');

      //** Three Params */
      // 1) IP && Time && Member
      if (params?.ip && params?.time && params?.member) {
        return paramsTime < itemTime
        && item.ip.includes(params?.ip)
        && item?.member === params?.member;
      }

      //** Two Params */
      // 2) IP && Time
      if (params?.ip && params?.time && !params?.member) {
        return paramsTime < itemTime && item.ip.includes(params?.ip);
      }

      // 3) IP && Member
      if (params?.ip && params?.member && !params?.time) {
        return item.ip.includes(params?.ip) && params.member === item.member;
      }

      // 4) Time && Member
      if (params?.time && params?.member && !params?.time) {
        return paramsTime < itemTime && params.member === item.member;
      }

      //** One Params */
      // 5) Member
      if (params?.member && !params?.ip && !params?.time) {
        return params.member === item.member;
      }

      // 6) Time
      if (params?.time && !params?.ip && !params?.member) {
        return paramsTime < itemTime;
      }

      // 7) IP
      if (params?.ip && !params?.time && !params?.member) {
        return item.ip.includes(params?.ip);
      }

      return false;
    }),
  });

  return (
    <ProTable
      columns={columns}
      rowKey="key"
      dateFormatter="string"
      headerTitle="Jackpot win record"
      request={requestPromise}
      // search={false}
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
};

export default JackpotWinRecord;
