// eslint-disable-next-line
import React, { useRef, useState , useEffect} from 'react';

// uuid
// eslint-disable-next-line
import { v4 as uuid } from 'uuid';
// Antd
// eslint-disable-next-line
import { message, Modal, notification, Form, Button, Space } from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
// eslint-disable-next-line
import ProForm, { ProFormRadio, ProFormDependency, ProFormField } from '@ant-design/pro-form';
// eslint-disable-next-line
import ProCard from '@ant-design/pro-card';
// eslint-disable-next-line
import { SmileOutlined, PlusOutlined } from '@ant-design/icons';

// helpers
// eslint-disable-next-line
import { isEmptyObj } from '../../lib/helper';

// Hooks
import useHttp from '../../hooks/useHttp';

// Apis
// eslint-disable-next-line
import { jackpotSetting, getJackpotList, jackpotDelete } from '../../lib/api-store';

let data;
const JackpotSetting = () => {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  // const [editForm] = Form.useForm();

  const actionRef = useRef();

  const {
    // eslint-disable-next-line
    sendRequest: jackpotSetReq,
    error: setJackpotErr,
    status: setJackpotStatus,
    data: setJackpotData,
  } = useHttp(jackpotSetting);

  const {
    sendRequest: jackpotDeleteReq,
    error: deleteJackpotErr,
    data: deleteJackpotData,
  } = useHttp(jackpotDelete);

  // Show delete egm modal
  const showDeleteModal = (level, id) => {
    Modal.confirm({
      title: `刪除 ( Level： ${level} )`,
      content: `點擊确定會直接從系統Jackpot level-${level}`,
      okText: '確定',
      cancelText: '取消',
      onOk: () => jackpotDeleteReq(level, id),
    });
  };

  const columns = [
    {
      title: 'Level',
      key: 'level',
      dataIndex: 'level',
      valueType: 'digit',
      tip: '＊彩金層數，最大6層',
      formItemProps: () => ({
        rules: [{ required: true }],
      }),
    },
    {
      title: 'Group',
      key: 'group_id',
      dataIndex: 'group_id',
      formItemProps: () => ({
        rules: [{ required: true }],
      }),
    },
    {
      title: 'Min Value',
      key: 'min_value',
      dataIndex: 'min_value',
      valueType: 'digit',
      tip: '＊必須比max value小',
      // eslint-disable-next-line
      formItemProps: (form, { rowIndex }) => {
        const currentRow = Object.values(form.getFieldsValue())[0];
        const max = currentRow?.max_value;
        return ({
          rules: [{
            type: 'number',
            max: max && max - 1,
            required: true,
          }],
        });
      },
    },
    {
      title: 'Max Value',
      key: 'max_value',
      dataIndex: 'max_value',
      valueType: 'digit',
      tip: '＊必須比min value大',
      formItemProps: (form) => {
        const currentRow = Object.values(form.getFieldsValue())[0];
        const min = currentRow?.min_value;
        return ({
          rules: [{
            type: 'number',
            min: min && min + 1,
            required: true,
          }],
        });
      },

    },
    {
      title: 'Ratio',
      key: 'ratio',
      dataIndex: 'ratio',
      valueType: 'digit',
      tip: '＊每次押碼的步進量',
      formItemProps: () => ({
        rules: [{ required: true, message: '此項為必填' }],
      }),
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      width: 250,
      render: (text, record, _, action) => [
        <Button
          type="link"
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </Button>,
        <Button
          type="link"
          key="delete-btn"
          onClick={() => {
            // setDataSource(dataSource.filter((item) => item.id !== record.id));
            showDeleteModal(record.level, record.id);
          }}
          style={{
            display: _ + 1 === dataSource.length ? 'block' : 'none',
          }}
        >
          刪除
        </Button>,
      ],
    },
  ];

  const requestPromise = async () => {
    data = await getJackpotList();

    setDataSource(data);

    return Promise.resolve({
      success: true,
      data: data,
    });
  };

  useEffect(() => {
    if (setJackpotErr) {
      message.error('設定失敗');
      return;
    }

    if (setJackpotData) {
      message.success('設定成功');
      requestPromise();
    }
  }, [setJackpotErr, setJackpotData]);

  useEffect(() => {
    if (deleteJackpotErr) {
      message.error('刪除失敗');
      return;
    }

    if (deleteJackpotData) {
      message.success('刪除成功');
      requestPromise();
    }
  }, [deleteJackpotErr, deleteJackpotData]);

  return (
    <>
      <Space />
      <EditableProTable
        rowKey="id"
        actionRef={actionRef}
        headerTitle={<span style={{ color: '#f5222d' }}>*設定完成記得點擊[保存設定]</span>}
        maxLength={6}
        recordCreatorProps={false}
        columns={columns}
        request={requestPromise}
        value={dataSource}
        onChange={(value) => {
          setShowSaveBtn(true);
          setDataSource(value);
        }}
        toolBarRender={() => [
          <Button
            type={showSaveBtn ? 'primary' : 'secondary'}
            key="save-data"
            disabled={!showSaveBtn}
            loading={setJackpotStatus === 'pending'}
            onClick={() => {
              jackpotSetReq(dataSource);
              setShowSaveBtn(false);
            }}
          >
            保存設定
          </Button>,
          <Button
            key="add-data"
            style={{ cursor: dataSource.length === 6 && 'not-allowed' }}
            disabled={dataSource.length === 6}
            onClick={() => {
              actionRef.current?.addEditRecord?.({
                level: dataSource?.length + 1,
              });
            }}
            icon={<PlusOutlined />}
          >
            {dataSource.length === 6 ? '已達最大層數' : '新增一層'}
          </Button>,
        ]}
        editable={{
          editableKeys,
          onChange: setEditableRowKeys,
          actionRender: (row, config, dom) => [dom.save, dom.cancel],
        }}
      />
    </>
  );
};

export default JackpotSetting;
