import React, { useState, useRef } from 'react';

// Print
import { useReactToPrint } from 'react-to-print';

// Antd
import ProTable from '@ant-design/pro-table';
import { PrinterOutlined } from '@ant-design/icons';
import { Button } from 'antd';

// Moment
import moment from 'moment';

// Apis
// import { getEventRecord } from '../../lib/api';
import { getEventRecord } from '../../lib/api-store';

// helpers
import { getPrintPageStyle, getPrintTableEl, getQueryEl } from '../../lib/helper';

let data;

const EventRecord = () => {
  // Init State
  const [isSort, setIsSort] = useState(false);

  // Ref
  const printRef = useRef();
  const searchRef = useRef();

  const columns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      hideInSearch: true,
    },

    {
      title: 'IP',
      key: 'event_character',
      dataIndex: 'event_character',
      copyable: true,
    },

    {
      title: 'Event',
      key: 'event',
      dataIndex: 'event',
      copyable: true,
      width: '50%',
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

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: getPrintPageStyle(),
  });

  const handlePrintClick = () => {
    const printTableEl = getPrintTableEl('.egm-event-record');
    const printQueryEl = getQueryEl(searchRef);
    printTableEl.prepend(printQueryEl);
    printRef.current = printTableEl;
    handlePrint();
    printQueryEl.remove();
  };

  const requestPromise = async (params) => {
    if (!isSort) {
      data = await getEventRecord(params);
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
      className="egm-event-record"
      columns={columns}
      debounceTime={300}
      rowKey="id"
      dateFormatter="string"
      headerTitle="EGM Event Record"
      request={requestPromise}
      beforeSearchSubmit={(params) => {
        searchRef.current = params;
        return params;
      }}
      pagination={{
        defaultPageSize: 10,
        showQuickJumper: true,
      }}
      onChange={(pagination, filters, sorter, extra) => {
        if (extra.action === 'sort') setIsSort(true);
      }}
      search={{
        layout: 'vertical',
        defaultCollapsed: true,
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
  );
};

export default EventRecord;
