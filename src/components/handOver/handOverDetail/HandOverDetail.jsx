import React, { useState, useRef } from 'react';

// Print
import { useReactToPrint } from 'react-to-print';

// Antd
import ProTable from '@ant-design/pro-table';
import { PrinterOutlined, CoffeeOutlined } from '@ant-design/icons';
import { Button } from 'antd';

// Columns
import columns from './columns';

// Components
import ModalConfirm from '../../ModalConfirm';

// Apis
// import { getHandOverDetail } from '../../../lib/api-store';

// Helpers
import { getPrintPageStyle, getPrintTableEl, getQueryEl } from '../../../lib/helper';

let data;

const HandOverDetail = () => {
  // Init State
  const [isSort, setIsSort] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  // Ref
  const printRef = useRef();
  const searchRef = useRef();

  const requestPromise = async (params) => {
    console.log(params);
    if (!isSort) {
      // data = await getHandOverDetail(params);
    }
    setTimeout(() => {
      if (isSort) setIsSort(false);
    }, 0);

    return Promise.resolve({
      success: true,
      data: data,
    });
  };

  const handoverClickHandler = () => {
    console.log('click');
    setShowModalConfirm(true);
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
    <>
      <ModalConfirm visible={showModalConfirm} setVisible={setShowModalConfirm} />
      <ProTable
        className="handover-detail-table"
        columns={columns}
        debounceTime={300}
        rowKey="id"
        dateFormatter="string"
        headerTitle="Handover Detail"
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
          <Button
            key="button"
            icon={<CoffeeOutlined />}
            onClick={handoverClickHandler}
            type="danger"
          >
            交班
          </Button>,
        ]}
      />
    </>
  );
};

export default HandOverDetail;
