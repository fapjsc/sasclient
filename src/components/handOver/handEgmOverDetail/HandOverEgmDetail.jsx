import React, { useState, useRef } from 'react';

// Print
import { useReactToPrint } from 'react-to-print';

// Antd
import ProTable from '@ant-design/pro-table';
import { PrinterOutlined } from '@ant-design/icons';
import { Button } from 'antd';

// Columns
import columns from './columns';

// Apis
import { getHandOverEgmDetail } from '../../../lib/api-store';

// Helpers
import { getPrintPageStyle, getPrintTableEl, getQueryEl } from '../../../lib/helper';

let data;

const HandOverEgmDetail = () => {
  // Init State
  const [isSort, setIsSort] = useState(false);

  // Ref
  const printRef = useRef();
  const searchRef = useRef();

  const requestPromise = async (params) => {
    if (!isSort) {
      data = await getHandOverEgmDetail(params);
    }

    setTimeout(() => {
      if (isSort) setIsSort(false);
    }, 0);

    const { ip, model } = params || {};

    console.log(data);

    return Promise.resolve({
      success: true,
      data: data?.sort((a, b) => a.number - b.number)?.filter((item) => {
        if (ip && !model) {
          return item.ip === ip;
        }

        if (!ip && model) {
          return item.model === model;
        }

        if (ip && model) {
          return item.model === model && item.ip === ip;
        }

        return true;
      }) || [],
    });
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: getPrintPageStyle(),

  });

  const handlePrintClick = () => {
    const printTableEl = getPrintTableEl('.handover-detail-table');
    const printQueryEl = getQueryEl(searchRef);
    printTableEl.prepend(printQueryEl);
    printRef.current = printTableEl;
    handlePrint();
    printQueryEl.remove();
  };
  return (
    <ProTable
      className="handover-detail-table"
      columns={columns}
      debounceTime={300}
      rowKey="ip"
      dateFormatter="string"
      headerTitle="Handover Detail"
      request={requestPromise}
      scroll={{ x: true }}
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
  );
};

export default HandOverEgmDetail;
