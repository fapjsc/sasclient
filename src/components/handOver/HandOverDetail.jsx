import React from 'react';

// Antd
import ProTable from '@ant-design/pro-table';
import { PrinterOutlined } from '@ant-design/icons';
import { Button } from 'antd';

// Columns
import columns from './handOverDetail/columns';

const HandOverDetail = () => {
  console.log('hand over');
  return (
    <ProTable
      className="meter-record-table"
      columns={columns}
      debounceTime={300}
      rowKey="id"
      dateFormatter="string"
      headerTitle="Meter Record"
      // request={requestPromise}
      // beforeSearchSubmit={(params) => {
      //   searchRef.current = params;
      //   return params;
      // }}
      // onChange={(pagination, filters, sorter, extra) => {
      //   if (extra.action === 'sort') setIsSort(true);
      // }}
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
          // onClick={handlePrintClick}
          type="primary"
        >
          列印
        </Button>,
      ]}
    />
  );
};

export default HandOverDetail;
