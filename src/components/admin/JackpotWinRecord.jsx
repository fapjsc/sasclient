import React, { useState, useRef } from 'react';
import moment from 'moment';

// Print
import { useReactToPrint } from 'react-to-print';

// Antd
import ProTable from '@ant-design/pro-table';
import { PrinterOutlined } from '@ant-design/icons';
import { Button } from 'antd';

// Apis
import { getJackpotWinRecord } from '../../lib/api-store';

// helper
import { getPrintPageStyle, getPrintTableEl, getQueryEl } from '../../lib/helper';

let data;

const JackpotWinRecord = () => {
  const [isSort, setIsSort] = useState(false);

  const printRef = useRef();
  const searchRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: getPrintPageStyle(),

  });

  const handlePrintClick = () => {
    const printTableEl = getPrintTableEl('.jackpot-win-record');
    const printQueryEl = getQueryEl(searchRef);
    printTableEl.prepend(printQueryEl);
    printRef.current = printTableEl;
    handlePrint();
    printQueryEl.remove();
  };

  const columns = [
    // {
    //   title: '序號',
    //   dataIndex: 'index',
    //   valueType: 'index',
    // },
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '場地',
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
      title: '彩金',
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
      title: '金額',
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
      title: '狀態',
      key: 'status',
      dataIndex: 'status',
      hideInSearch: true,
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        // all: { text: '全部', status: 'Default' },
        success: {
          text: '派彩成功',
          status: 'Success',
        },
        fail: {
          text: '派彩失敗',
          status: 'Error',
          disabled: true,
        },
        pending: {
          text: '派彩中',
          status: 'Processing',
        },
      },
    },
    {
      title: '時間',
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
    if (!isSort) {
      data = await getJackpotWinRecord(params);
    }

    console.log(data);

    setTimeout(() => {
      if (isSort) setIsSort(false);
    }, 0);

    return Promise.resolve({
      success: true,
      data: data,
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
        beforeSearchSubmit={(params) => {
          searchRef.current = params;
          return params;
        }}
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
            onClick={handlePrintClick}
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
