import React, { useRef, useState } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import ProForm, { ProFormRadio, ProFormDependency, ProFormField } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { v4 as uuid } from 'uuid';

import { isEmptyObj } from '../../lib/helper';

const defaultData = [
  {
    id: uuid(),
    level: 'JP-1',
    group: '1',
    min_value: 100,
    max_value: 200,
    ratio: 0.001,
  },
  {
    id: uuid(),
    level: 'JP-2',
    group: '1',
    min_value: 100,
    max_value: 200,
    ratio: 0.002,
  },
  {
    id: uuid(),
    level: 'JP-3',
    group: '1',
    min_value: 100,
    max_value: 200,
    ratio: 0.003,
  },
  {
    id: uuid(),
    level: 'JP-4',
    group: '1',
    min_value: 100,
    max_value: 200,
    ratio: 0.004,
  },
  {
    id: uuid(),
    level: 'JP-5',
    group: '1',
    min_value: 100,
    max_value: 200,
    ratio: 0.005,
  },
  {
    id: uuid(),
    level: 'JP-6',
    group: '1',
    min_value: 100,
    max_value: 200,
    ratio: 0.006,
  },

];
export default () => {
  const [editableKeys, setEditableRowKeys] = useState(() => []);
  const [position, setPosition] = useState('bottom');
  const formRef = useRef();

  const columns = [
    {
      title: 'Level',
      key: 'level',
      dataIndex: 'level',
      // editable: false,
    },
    {
      title: 'Group',
      key: 'group',
      dataIndex: 'group',
    },
    {
      title: 'Min Value',
      key: 'min_value',
      dataIndex: 'min_value',
      valueType: 'digit',
      formItemProps: (form, { rowIndex }) => {
        const existsItem = isEmptyObj(form.getFieldsValue());
        if (existsItem) return;

        const max = form?.getFieldValue()?.table[rowIndex]?.max_value;
        return ({
          rules: [{
            type: 'number',
            max: max && max - 1,
            min: 100,
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
      formItemProps: () => ({
        rules: [{ required: true, message: '此項為必填' }],
      }),
    },
    {
      title: '操作',
      key: 'option',
      dataIndex: 'option',
      valueType: 'option',

      render: (text, record, _, action) => [
        <button
          style={{
            border: 'none', backgroundColor: 'transparent', color: '#177ddc', cursor: 'pointer',
          }}
          type="button"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </button>,
        <button
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            color: '#177ddc',
            cursor: 'pointer',
            display: _ + 1 === formRef.current?.getFieldValue('table').length ? 'block' : 'none',
          }}
          type="button"
          key="delete"
          onClick={() => {
            const tableDataSource = formRef.current?.getFieldValue('table');

            formRef.current?.setFieldsValue({
              table: tableDataSource.filter((item) => item.id !== record.id),
            });
          }}
        >
          删除
        </button>,
      ]
      ,
    },
  ];

  const waitTime = (time) => new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });

  return (
    <ProForm
      formRef={formRef}
      initialValues={{
        table: defaultData,
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
      }}
    >
      <EditableProTable
        rowKey="id"
        headerTitle="Jackpot setting"
        maxLength={6}
        name="table"
        columns={columns}
        recordCreatorProps={position !== 'hidden'
          ? {
            position: position,
            record: () => ({ id: uuid(), level: `JP-${formRef.current?.getFieldValue('table').length + 1}` }),
            creatorButtonText: '新增層數 (最多6層)',
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
                length: table.length,
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
