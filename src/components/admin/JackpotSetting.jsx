import React, { useRef, useState } from 'react';

// uuid
import { v4 as uuid } from 'uuid';

// Antd
import { message, Modal, notification } from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import ProForm, { ProFormRadio, ProFormDependency, ProFormField } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { SmileOutlined } from '@ant-design/icons';

// helpers
import { isEmptyObj } from '../../lib/helper';

// Apis
import { jackpotSetting, getJackpotList, jackpotDelete } from '../../lib/api';

let data;

message.config({
  maxCount: 3,
});

export default () => {
  const [editableKeys, setEditableRowKeys] = useState(() => []);
  const [position, setPosition] = useState('bottom');

  const formRef = useRef();

  const requestPromise = async () => {
    data = await getJackpotList();

    return Promise.resolve({
      success: true,
      data: data,
    });
  };

  // 刪除
  const deleteItem = async (level, id) => {
    const result = await jackpotDelete(level);

    if (result.status === 200) {
      message.success(`Jackpot level ${level} 已經刪除`);
      const currentData = formRef.current?.getFieldValue('table');
      formRef.current?.setFieldsValue({
        table: currentData.filter((item) => item.id !== id),
      });

      data = data.filter((el) => el.id !== id);
    } else {
      message.error(`Jackpot level ${level} 刪除失敗`);
    }
  };

  // Show delete egm modal
  const showDeleteModal = (level, id) => {
    Modal.confirm({
      title: `刪除 ( Level： ${level} )`,
      content: `點擊确定會直接從系統Jackpot level-${level}`,
      okText: '確定',
      cancelText: '取消',
      onOk: () => deleteItem(level, id),
    });
  };

  const handleOnFinish = async (values) => {
    const result = await jackpotSetting(values.table);

    if (result.status === 200) {
      message.success(result.message);
    } else {
      message.error('update fail');
    }
  };

  const columns = [
    {
      title: 'Level',
      key: 'level',
      dataIndex: 'level',
      valueType: 'digit',
      tip: '＊彩金層數，最大6層',

      formItemProps: (form, { rowIndex }) => ({
        rules: [{
          type: 'number',
          max: rowIndex + 1,
          min: rowIndex + 1,
          required: true,
        }],
      }),
    },
    {
      title: 'Group',
      key: 'group_id',
      dataIndex: 'group_id',
    },
    {
      title: 'Min Value',
      key: 'min_value',
      dataIndex: 'min_value',
      valueType: 'digit',
      tip: '＊必須比max value小',
      formItemProps: (form, { rowIndex }) => {
        const existsItem = isEmptyObj(form.getFieldsValue());
        if (existsItem) return;

        const max = form?.getFieldValue()?.table[rowIndex]?.max_value;
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
      formItemProps: (form, { rowIndex }) => {
        const existsItem = isEmptyObj(form.getFieldsValue());
        if (existsItem) return;

        const min = form.getFieldsValue()?.table[rowIndex]?.min_value;
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
      dataIndex: 'option',
      valueType: 'option',
      tip: '＊新增或編輯需要點擊提交按鈕才會生效，刪除則不需要點擊提交按鈕就會生效',
      render: (text, record, _, action) => [
        <button
          key="edit"
          type="button"
          style={{
            border: 'none', backgroundColor: 'transparent', color: '#177ddc', cursor: 'pointer',
          }}
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </button>,
        <button
          key="delete"
          type="button"
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            color: '#177ddc',
            cursor: 'pointer',
            display: _ + 1 === formRef.current?.getFieldValue('table')?.length ? 'block' : 'none',
          }}
          onClick={() => {
            showDeleteModal(record.level, record.id);
          }}
        >
          删除
        </button>,
      ]
      ,
    },
  ];

  return (
    <ProForm
      formRef={formRef}
      // initialValues={{
      //   table: data,
      // }}
      onFinish={handleOnFinish}
      // onFinishFailed={(e) => console.log(e)}
    >
      <EditableProTable
        rowKey="id"
        headerTitle="Jackpot setting"
        maxLength={6}
        name="table"
        columns={columns}
        request={requestPromise}
        recordCreatorProps={position !== 'hidden'
          ? {
            position: position,
            creatorButtonText: '新增層數 (最多6層)',
            record: (index) => (
              {
                level: index + 1,
                id: uuid(),
                key: uuid(),
              })
            ,
          }
          : false}
        toolBarRender={() => [
          <ProFormRadio.Group
            key="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value),
            }}
            options={[
              {
                label: '新增',
                value: 'bottom',
              },
              {
                label: '隐藏',
                value: 'hidden',
              },
            ]}
          />,
        ]}
        editable={{
          type: 'multiple',
          editableKeys,
          onChange: setEditableRowKeys,
          actionRender: (row, config, defaultDom) => [defaultDom.save, defaultDom.cancel],
          onSave: () => {
            if (!localStorage.getItem('notify')) {
              notification.open({
                message: '操作提醒',
                description:
                  '新增或是更新必需點擊左下方提交按鈕才會生效',
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
              });

              localStorage.setItem('notify', true);
            }
          },
        }}
      />

      <ProForm.Item>
        <ProCard
          title="表格數據"
          collapsible
          defaultCollapsed
          headerBordered
        >
          <ProFormDependency name={['table']}>
            {({ table }) => {
              const tableData = {
                length: table?.length,
                data: table,
              };
              return (
                <ProFormField
                  ignoreFormItem
                  mode="read"
                  valueType="jsonCode"
                  text={JSON.stringify(tableData)}
                  fieldProps={{
                    style: {
                      width: '100%',
                      backgroundColor: '#272928',
                    },
                  }}
                />
              );
            }}
          </ProFormDependency>
        </ProCard>
      </ProForm.Item>
    </ProForm>
  );
};
