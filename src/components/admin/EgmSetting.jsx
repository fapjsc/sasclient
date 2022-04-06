import React, { useRef, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

// Antd
import ProTable from '@ant-design/pro-table';
import {
  Tag,
  Space,
  Modal,
  message,
} from 'antd';

// Components
import EgmSettingForm from './form/EgmSettingForm';
import OnlineSettingForm from './form/OnlineSettingForm';

// Apis
import { adminGetEgmList, adminEgmSetting, adminEgmDelete } from '../../lib/api-store';

let data;

const EgmSetting = () => {
  const actionRef = useRef();

  // Init State
  const [egmModalForm, setEgmModalForm] = useState(false);
  const [modalFormDone, setModalFormDone] = useState(false);
  const [onlineModalForm, setOnlineModalForm] = useState(false);
  const [current, setCurrent] = useState(undefined);
  const [modelEnum, setModelEnum] = useState({});
  const [brandEnum, setBrandEnum] = useState({});
  const [egmNameEnum, seEgmNameEnum] = useState({});
  // const [statusEnum, setStateEnum] = useState({});

  const requestPromise = async (params) => {
    const { ip } = params;

    data = await adminGetEgmList(params);

    const modelObj = {};
    const brandObj = {};
    const egmNameObj = {};
    // const StatusObj = {};

    data.forEach((el) => {
      // console.log(el);
      if (el.model) {
        modelObj[el.model] = { text: el.model };
      }

      if (el.brand_name) {
        brandObj[el.brand_name] = { text: el.brand_name };
      }

      if (el.name) {
        egmNameObj[el.name] = { text: el.name };
      }
    });

    setBrandEnum(brandObj);
    setModelEnum(modelObj);
    seEgmNameEnum(egmNameObj);
    // setStateEnum(StatusObj);

    // console.log(StatusObj);

    if (ip) {
      data = data.filter((el) => el.ip === ip);
    }

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

  const onlineEditModal = (item) => {
    setCurrent(item);
    setOnlineModalForm((prev) => !prev);
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
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      search: false,
    },

    {
      title: 'IP',
      key: 'ip',
      dataIndex: 'ip',
      copyable: true,
    },
    {
      title: 'Model',
      key: 'model',
      dataIndex: 'model',
      copyable: true,
      tip: 'Online 圖片',
      search: false,
      filters: true,
      onFilter: true,
      valueEnum: modelEnum,
    },
    {
      title: '廠牌',
      key: 'brand',
      dataIndex: 'brand_name',
      copyable: true,
      tip: 'Online 圖片',
      search: false,
      filters: true,
      onFilter: true,
      valueEnum: brandEnum,
    },
    {
      title: '名稱',
      key: 'name',
      dataIndex: 'name',
      copyable: true,
      tip: '頁面顯示',
      search: false,
      filters: true,
      onFilter: true,
      valueEnum: egmNameEnum,
    },
    {
      title: 'Number',
      key: 'number',
      dataIndex: 'number',
      search: false,
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: 'DE',
      key: 'denomination',
      dataIndex: 'denomination',
      copyable: true,
      search: false,
    },

    {
      title: '狀態',
      key: 'labels',
      dataIndex: 'labels',
      search: false,
      tip: '點擊標籤後開始設定',
      sorter: ((a, b) => (b.label.online + b.label.jackpot) - (a.label.online + a.label.jackpot)),

      renderFormItem: (_, { defaultRender }) => defaultRender(_),
      render: (_, record) => {
        const { label } = record;
        const element = Object.entries(label)
          .map(([type, value]) => {
            if (value === 1) {
              return (
                <Space key={uuidv4()} size="large">
                  <Tag
                    style={{ cursor: type === 'online' && 'pointer' }}
                    onClick={() => {
                      if (type === 'online') {
                        onlineEditModal(record);
                      }
                    }}
                    color={type === 'jackpot' ? 'cyan' : 'magenta'}
                  >
                    {type}
                  </Tag>
                </Space>
              );
            }
            return (
              null
            );
          });

        return element;
      },
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
              id, model, ip, number, label, denomination, brand_name: brand, name,
            } = record;

            const formatLabels = [];

            Object.entries(label).forEach(([key, value]) => {
              if (value) {
                formatLabels.push(key);
              }
            });

            showEditModal({
              id,
              ip,
              number,
              model,
              labels: formatLabels,
              denomination,
              brand,
              name,
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
            showDeleteModal(record.id, record.number);
          }}
        >
          刪除
        </button>,
      ],
    },
  ];

  console.log(current);

  return (
    <>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        debounceTime={300}
        rowKey="id"
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

      />

      <EgmSettingForm
        visible={egmModalForm}
        current={current}
        done={modalFormDone}
        onDone={handleDone}
        onSubmit={handleSubmit}
      />

      <OnlineSettingForm
        visible={onlineModalForm}
        setVisible={setOnlineModalForm}
        onDone={handleDone}
        currentID={current?.id}
        currentStreamID={current?.ip?.split('.')[3]}
        buttons={current?.buttons}
        brand={current?.brand_name}
      />
    </>
  );
};

export default EgmSetting;
