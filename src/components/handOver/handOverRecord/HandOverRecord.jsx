import React, { useRef } from 'react';

import { useReactToPrint } from 'react-to-print';

// Antd
import ProTable from '@ant-design/pro-table';
import { PrinterOutlined } from '@ant-design/icons';
import { Button } from 'antd';

// Apis
import { handoverRecord } from '../../../lib/api-store';

// Helper
import {
  transToTimestamp,
  transToTimeString,
  getPrintPageStyle,
  getPrintTableEl,
  getQueryEl,
} from '../../../lib/helper';

// Columns
import columns from './columns';

let data;

const HandoverRecord = () => {
  // Ref
  const printRef = useRef();
  const searchRef = useRef();

  // Async Request
  const requestPromise = async (params) => {
    const { created } = params || {};

    if (!created) {
      data = await handoverRecord();
    }

    if (created) {
      data = data.filter((el) => transToTimeString(el.created) >= (created[0])
      && transToTimeString(el.created) <= (created[1]));
    }

    data.sort((a, b) => transToTimestamp(b.created) -
    transToTimestamp(a.created));

    return Promise.resolve({
      success: true,
      data: data,
    });
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: getPrintPageStyle(),

  });

  const handlePrintClick = () => {
    const printTableEl = getPrintTableEl('.handover-record');
    const printQueryEl = getQueryEl(searchRef);
    printTableEl.prepend(printQueryEl);
    printRef.current = printTableEl;
    handlePrint();
    printQueryEl.remove();
  };

  return (
    <ProTable
      className="handover-record"
      columns={columns}
      request={requestPromise}
      rowKey="id"
      scroll={{ x: true }}
      headerTitle="handover-record"
      beforeSearchSubmit={(params) => {
        searchRef.current = params;
        return params;
      }}
      pagination={{
        defaultPageSize: 10,
        showQuickJumper: true,
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

export default HandoverRecord;
