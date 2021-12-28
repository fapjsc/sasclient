import React, { useRef, useState } from 'react';

// Print
import { useReactToPrint } from 'react-to-print';

// Moment
import moment from 'moment';

// Antd
import ProTable from '@ant-design/pro-table';
import { PrinterOutlined } from '@ant-design/icons';
import { Button } from 'antd';

// Helpers
import { getPrintPageStyle, getPrintTableEl, getQueryEl } from '../../lib/helper';

// APis
import { getSysLog } from '../../lib/api-store';

// Hooks
import { useI18n } from '../../i18n';

let data;

const SystemLog = () => {
  // Init State
  const [isSort, setIsSort] = useState(false);

  // Hooks
  const { getLocale } = useI18n();

  // Ref
  const printRef = useRef();
  const searchRef = useRef();

  const columns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      // sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Role',
      key: 'name',
      dataIndex: 'name',
      // copyable: true,
      hideInSearch: true,
    },
    {
      title: 'Role ID',
      key: 'admin_id',
      dataIndex: 'admin_id',
      copyable: true,
    },
    {
      title: 'LOG',
      key: getLocale(),
      dataIndex: getLocale(),
      hideInSearch: true,
    },

    // {
    //   title: 'Updated',
    //   key: 'updated',
    //   dataIndex: 'updated',
    //   hideInSearch: true,
    //   sorter: (a, b) => {
    //     const aTime = new Date(a.created).getTime();
    //     const bTime = new Date(b.created).getTime();
    //     return aTime - bTime;
    //   },
    //   valueType: 'dateTimeRange',
    //   className: 'cancel-icon',
    //   render: (e) => moment(e.props.text).format('YYYY-MM-DD HH:mm:ss'),
    // },
    {
      title: 'Created',
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
    const printTableEl = getPrintTableEl('.system-log');
    const printQueryEl = getQueryEl(searchRef);
    printTableEl.prepend(printQueryEl);
    printRef.current = printTableEl;
    handlePrint();
    printQueryEl.remove();
  };

  const requestPromise = async (params) => {
    if (!isSort) {
      data = await getSysLog(params);
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
      className="system-log"
      columns={columns}
      debounceTime={300}
      rowKey="id"
      dateFormatter="string"
      headerTitle="System Log"
      request={requestPromise}
      beforeSearchSubmit={(params) => {
        console.log(params);

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
  );
};

export default SystemLog;
