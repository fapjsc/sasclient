import React, { useRef, useState } from 'react';

// Moment
import moment from 'moment';

// Antd
import {
  PlusOutlined,
} from '@ant-design/icons';

import {
  Button,
  Tag,
  Space,
  Modal,
} from 'antd';

import ProTable from '@ant-design/pro-table';

// Components
import EgmUpdateForm from './form/EgmSettingForm';

// helpers
import { waitTime } from '../../lib/helper';

let data;

const tableListDataSource = [];

const ipList = ['192.168.10.73', '192.168.10.74', '192.168.10.113', '192.168.10.63'];
const numList = ['5號', '7號', '12號', '2號'];
const denoList = [50, 100, 500, 1000];
const lab1 = [{ name: 'jackpot' }, { name: 'on-line' }];
const lab2 = [{ name: 'jackpot' }];
const lab3 = [{ name: 'on-line' }];

for (let i = 0; i < 106; i += 1) {
  tableListDataSource.push({
    key: i,
    id: Math.floor(Math.random() * 1000),
    ip: ipList[Math.floor(Math.random() * 4)],
    number: numList[Math.floor(Math.random() * 4)],
    denomination: denoList[Math.floor(Math.random() * 4)],
    updated: Date.now() - Math.floor(Math.random() * 100000),
    created: Date.now() - Math.floor(Math.random() * 100000),

    // eslint-disable-next-line no-nested-ternary
    labels: Math.floor(Math.random() * 100) > 70
    // eslint-disable-next-line no-nested-ternary
      ? lab1 : Math.floor(Math.random() * 100) < 20
        ? lab2 : Math.floor(Math.random() * 100) < 40 ? lab3 : null,
  });
}

const EgmSetting = () => {
  const actionRef = useRef();
  const [isSort, setIsSort] = useState(false);

  // Update/create
  const [egmModalForm, setEgmModalForm] = useState(false);
  const [modalFormDone, setModalFormDone] = useState(false);
  const [current, setCurrent] = useState(undefined);

  // Update/create
  const handleSubmit = async (value) => {
    await waitTime(2000);
    setModalFormDone(true);
  };

  // 刪除
  // eslint-disable-next-line
  const deleteItem = async (id) => {
    await waitTime(2000);
  };

  // Show create/update egm modal
  const showEditModal = (item) => {
    setCurrent(item);
    setEgmModalForm(true);
  };

  // Show delete egm modal
  const showDeleteModal = (id, number) => {
    Modal.confirm({
      title: `刪除EGM ( ID： ${id} )`,
      content: `确定從系統刪除 ${number} EGM嗎？`,
      okText: '確定',
      cancelText: '取消',
      onOk: () => deleteItem(id),
    });
  };

  // 設定結束參數復歸
  const handleDone = () => {
    setModalFormDone(false);
    setEgmModalForm(false);
    setCurrent({});
  };

  // eslint-disable-next-line no-unused-vars
  const requestPromise = async (params) => {
    // console.log('call request');
    data = tableListDataSource;

    // TODO:fetch data action
    if (!isSort) {
      // data = await getMeterRecord(params);
      // console.log(data, params);
    }

    setTimeout(() => {
      if (isSort) setIsSort(false);
    }, 0);

    return Promise.resolve({
      success: true,
      data: data,
    });
  };

  const columns = [
    // {
    //   dataIndex: 'index',
    //   valueType: 'indexBorder',
    //   width: 48,
    // },
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
      title: 'Number',
      key: 'number',
      dataIndex: 'number',
      copyable: true,
    },
    {
      title: 'DE',
      key: 'denomination',
      dataIndex: 'denomination',
      hideInSearch: true,

    },
    {
      title: 'Updated',
      key: 'updated',
      dataIndex: 'updated',
      sorter: (a, b) => {
        const aTime = new Date(a.created).getTime();
        const bTime = new Date(b.created).getTime();
        return aTime - bTime;
      },
      valueType: 'dateTimeRange',
      className: 'cancel-icon',
      render: (e) => moment(e.props.text).format('YYYY-MM-DD HH:mm'),
    },
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
      render: (e) => moment(e.props.text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '狀態',
      key: 'labels',
      dataIndex: 'labels',
      search: false,
      renderFormItem: (_, { defaultRender }) => defaultRender(_),
      render: (_, record) => (
        <Space>
          {record.labels?.length ? (
            record.labels?.map(({ name }) => (
              <Tag color={name === 'jackpot' ? 'cyan' : 'magenta'} key={name}>
                {name}
              </Tag>
            ))
          ) : (
            <Space>
              <span>-</span>
            </Space>
          )}
        </Space>
      ),
    },
    {
      title: '操作',
      valueType: 'option',
      // eslint-disable-next-line no-unused-vars
      render: (text, record, _, action) => [
        <button
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#177dee',
            cursor: 'pointer',
          }}
          type="button"
          onClick={() => {
            const {
              id, ip, number, labels, denomination,
            } = record;

            const formatLabels = [];

            if (labels?.length) {
              labels?.forEach((el) => formatLabels.push(el.name));
            }

            showEditModal({
              id,
              ip,
              number,
              labels: formatLabels,
              denomination,
            });
          }}
        >
          编辑
        </button>,
        <button
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#177dee',
            cursor: 'pointer',
          }}
          type="button"
          onClick={() => {
            // console.log('pre-delete', record);
            showDeleteModal(record.id, record.number);
          }}
        >
          刪除
        </button>,

      ],
    },
  ];

  return (
    <>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        debounceTime={300}
        rowKey="id"
        dateFormatter="string"
        headerTitle="EGM設定"
        request={requestPromise}
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
            icon={<PlusOutlined />}
            onClick={() => {
              showEditModal(null);
            }}
            type="primary"
          >
            新增
          </Button>,
        ]}
      />

      <EgmUpdateForm
        visible={egmModalForm}
        current={current}
        done={modalFormDone}
        onDone={handleDone}
        onSubmit={handleSubmit}
      />

    </>
  );
};

export default EgmSetting;
