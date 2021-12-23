import React, { useState, useRef } from 'react';
import moment from 'moment';

// Print
import { useReactToPrint } from 'react-to-print';

// Antd
import ProTable from '@ant-design/pro-table';
import { PrinterOutlined } from '@ant-design/icons';
import { Button } from 'antd';

// Apis
// import { getJackpotWinRecord } from '../../lib/api';
import { getJackpotWinRecord } from '../../lib/api-store';

// helper
import { getPrintPageStyle } from '../../lib/helper';

let data;

const JackpotWinRecord = () => {
  const [isSort, setIsSort] = useState(false);

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: getPrintPageStyle(),
  });

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
    },
    {
      title: 'IP',
      key: 'egm_ip',
      dataIndex: 'egm_ip',
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
        jackpot: {
          text: 'JP-1',
        },
        secondPrize: {
          text: 'JP-2',
        },
        thirdPrize: {
          text: 'JP-3',
        },
        fourthPrize: {
          text: 'JP-4',
        },
        fifthPrize: {
          text: 'JP-5',
        },
        sixthPrize: {
          text: 'JP-6',
        },
      },
    },
    {
      title: 'Amount',
      key: 'jackpot',
      dataIndex: 'jackpot',
      hideInSearch: true,
      sorter: (a, b) => a.jackpot - b.jackpot,
      render: (text) => [
        `$${text.toFixed(0).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}`,
      ],
    },
    {
      title: 'Egm',
      key: 'name',
      dataIndex: 'name',
      copyable: true,
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

  const requestPromise = async (params) => {
    let startTime;
    let endTime;

    if (!isSort) {
      data = await getJackpotWinRecord();
    }

    setTimeout(() => {
      if (isSort) setIsSort(false);
    }, 0);

    if (params?.created) {
      startTime = new Date(params.created[0]).getTime();
      endTime = new Date(params.created[1]).getTime();
    }

    if (data.status === 400) {
      return Promise.resolve({
        success: true,
        data: data,
      });
    }

    return Promise.resolve({
      success: true,
      data: data
        .filter((item) => {
          // 1) 沒有搜尋條件
          if (!params?.egm_ip && !params?.created && !params?.name) {
            return true;
          }

          // 2) IP
          if (params?.egm_ip && !params?.created && !params?.name) {
          // return item.ip.includes(params?.ip);
            return item.egm_ip.includes(params?.egm_ip);
          }

          // 3) Created
          if (!params?.egm_ip && params?.created && !params?.name) {
            const itemTime = new Date(item.created).getTime();
            return itemTime >= startTime && itemTime <= endTime;
          }

          // 4) Name
          if (!params?.egm_ip && !params?.created && params?.name) {
            return params.name === item.name;
          }

          // 5) IP and Created
          if (params?.egm_ip && params?.created && !params?.name) {
            const itemTime = new Date(item.created).getTime();
            return item.egm_ip.includes(params?.egm_ip)
            && itemTime >= startTime && itemTime <= endTime;
          }

          // 6) IP and Name
          if (params?.egm_ip && !params?.created && params?.name) {
            return item.egm_ip.includes(params?.egm_ip)
            && params.name === item.name;
          }

          // 7) Created and Name
          if (!params?.egm_ip && params?.created && params?.name) {
            const itemTime = new Date(item.created).getTime();
            return itemTime >= startTime && itemTime <= endTime
            && params.name === item.name;
          }

          // 8) IP and Created and Name
          if (params?.egm_ip && params?.created && params?.name) {
            const itemTime = new Date(item.created).getTime();
            return item.egm_ip.includes(params?.egm_ip)
            && itemTime >= startTime && itemTime <= endTime
            && params.name === item.name;
          }

          return false;
        }),
    });
  };

  return (
    <>
      <ProTable
        className="jackpot-win-record"
        columns={columns}
        debounceTime={300}
        rowKey="id"
        dateFormatter="string"
        headerTitle="Jackpot Record"
        request={requestPromise}
      // onRequestError={(error) => {
      //   console.log(error);
      // }}
        onChange={(pagination, filters, sorter, extra) => {
          if (extra.action === 'sort') setIsSort(true);
        }}
        search={{
          layout: 'vertical',
          defaultCollapsed: true,
        }}
        pagination={{
          defaultPageSize: 10,
          showQuickJumper: true,
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PrinterOutlined />}
            onClick={() => {
              const tableBodyEl = document.querySelector('.jackpot-win-record .ant-card-body');
              printRef.current = tableBodyEl;
              handlePrint();
            }}
            type="primary"
          >
            列印
          </Button>,
        ]}
      />
    </>
  );
};

export default JackpotWinRecord;
