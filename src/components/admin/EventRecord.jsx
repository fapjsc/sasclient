import React, { useState } from 'react';

// Antd
import ProTable from '@ant-design/pro-table';

// Moment
import moment from 'moment';

// Apis
import { getEventRecord } from '../../lib/api';

let data;

const EventRecord = () => {
  const [isSort, setIsSort] = useState(false);
  const columns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      hideInSearch: true,
    },

    {
      title: 'IP',
      key: 'egm_ip',
      dataIndex: 'egm_ip',
      copyable: true,
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
      columns={columns}
      debounceTime={300}
      rowKey="key"
      dateFormatter="string"
      headerTitle="Event Record"
      request={requestPromise}
      onRequestError={(error) => console.log(error)}
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

    />
  );
};

export default EventRecord;
