import React, { useState, useRef } from 'react';
import moment from 'moment';

// Print
import { useReactToPrint } from 'react-to-print';

// Antd
import ProTable from '@ant-design/pro-table';
import { PrinterOutlined } from '@ant-design/icons';
import { Button } from 'antd';

// Apis
// import { getMeterRecord } from '../../lib/api';
import { getMeterRecord } from '../../lib/api-store';

// Helpers
import { thousandsFormat, getPrintPageStyle } from '../../lib/helper';

let data;

const MeterRecord = () => {
  // Init State
  const [isSort, setIsSort] = useState(false);

  // Ref
  const printRef = useRef();

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
      key: 'total_coin_in',
      dataIndex: 'total_coin_in',
      sorter: (a, b) => a.total_coin_in - b.total_coin_in,
      hideInSearch: true,
      render: (text) => [`${thousandsFormat(text)}`],
    },
    {
      title: 'Total Win',
      key: 'total_win',
      dataIndex: 'total_win',
      sorter: (a, b) => a.total_win - b.total_win,
      hideInSearch: true,
      render: (text) => [`${thousandsFormat(text)}`],
    },
    {
      title: 'Promote',
      key: 'promote_credit',
      dataIndex: 'promote_credit',
      sorter: (a, b) => a.promote_credit - b.promote_credit,
      hideInSearch: true,
      render: (text) => [`${thousandsFormat(text)}`],
    },
    {
      title: 'Credit',
      key: 'credit',
      dataIndex: 'credit',
      sorter: (a, b) => a.credit - b.credit,
      hideInSearch: true,
      render: (text) => [`${thousandsFormat(text)}`],
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

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: getPrintPageStyle(),

  });

  const requestPromise = async (params) => {
    if (!isSort) {
      data = await getMeterRecord(params);
    }
    setTimeout(() => {
      if (isSort) setIsSort(false);
    }, 0);

    return Promise.resolve({
      success: true,
      data: data,
    });
  };

  return (
    <ProTable
      className="meter-record-table"
      columns={columns}
      debounceTime={300}
      rowKey="id"
      dateFormatter="string"
      headerTitle="Meter Record"
      request={requestPromise}
      // onRequestError={(error) => console.log(error)}
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
            const tableBodyEl = document.querySelector('.meter-record-table .ant-card-body');
            printRef.current = tableBodyEl;
            handlePrint();
          }}
          type="primary"
        >
          列印
        </Button>,
      ]}
    />
  );
};

export default MeterRecord;
