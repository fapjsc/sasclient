import React, { useRef, useState } from 'react';

// Moment
import moment from 'moment';

// Antd
import ProTable from '@ant-design/pro-table';
import {
  Tag,
  Space,
  Modal,
  message,
} from 'antd';

// Components
import EgmUpdateForm from './form/EgmSettingForm';

// Apis
import { adminGetEgmList, adminEgmSetting, adminEgmDelete } from '../../lib/api-store';

let data;

const EgmSetting = () => {
  const actionRef = useRef();
  const [isSort, setIsSort] = useState(false);

  // Update/create
  const [egmModalForm, setEgmModalForm] = useState(false);
  const [modalFormDone, setModalFormDone] = useState(false);
  const [current, setCurrent] = useState(undefined);

  // eslint-disable-next-line no-unused-vars
  const requestPromise = async (params, sort, filter) => {
    if (!isSort) {
      data = await adminGetEgmList(params);
    }

    setTimeout(() => {
      if (isSort) setIsSort(false);
    }, 0);

    return Promise.resolve({
      success: true,
      data: data,
    });
  };

  // Update/create
  const handleSubmit = async (value) => {
    const result = await adminEgmSetting(value);

    if (result.status === 200) {
      setModalFormDone(true);
    } else {
      message.error(result.message);
    }
  };

  // 刪除
  const deleteItem = async (id) => {
    const result = await adminEgmDelete(id);
    if (result.status === 200) {
      message.success('EGM已經刪除');
      actionRef.current.reload();
    } else {
      message.error(result.message);
    }
  };

  // Show create/update egm modal
  const showEditModal = (item) => {
    setCurrent(item);
    setEgmModalForm(true);
  };

  // Show delete egm modal
  const showDeleteModal = (id, number) => {
    Modal.confirm({
      title: '刪除EGM',
      content: (
        <Space>
          <span>確定刪除EGM</span>
          <Tag style={{ margin: 0 }} color="gold">{`${number}號`}</Tag>
          <span>嗎？</span>
        </Space>
      ),
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
    actionRef.current.reload();
  };

  const columns = [
    // {
    //   dataIndex: 'index',
    //   valueType: 'indexBorder',
    //   width: 48,
    // },
    // {
    //   title: 'ID',
    //   key: 'id',
    //   dataIndex: 'id',
    // },
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
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: 'DE',
      key: 'denomination',
      dataIndex: 'denomination',
      copyable: true,
    },
    {
      title: 'Updated',
      key: 'updated',
      dataIndex: 'updated',
      hideInSearch: true,
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
      hideInSearch: true,
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
            record.labels?.map((type) => (
              <Tag color={type === 'jackpot' ? 'cyan' : 'magenta'} key={type}>
                {type}
              </Tag>
            ))
          ) : (
            <Space key="none">
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
          key="edit"
          type="button"
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#177dee',
            cursor: 'pointer',
          }}
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
          key="delete"
          type="button"
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#177dee',
            cursor: 'pointer',
          }}
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
        onChange={(pagination, filters, sorter, extra) => {
          if (extra.action === 'sort') setIsSort(true);
        }}
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
