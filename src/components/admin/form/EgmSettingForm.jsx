import React from 'react';

import PropTypes from 'prop-types';

import
ProForm,
{
  ModalForm,
  ProFormText,
  ProFormCheckbox,
  ProFormSelect,
  //   ProFormTextArea,
  //   ProFormDateTimePicker,
} from '@ant-design/pro-form';

import {
  Button,
  Result,
} from 'antd';

const EgmUpdateForm = (props) => {
  const {
    visible,
    done,
    onDone,
    onSubmit,
    current,
  } = props;

  if (!visible) {
    return null;
  }

  return (
    <ModalForm
      visible={visible}
      width={640}
      title={done ? null : `EGM${current ? `設定： Number ${current.number}` : '新增'}`}
    //   className={styles.standardListForm}
      onFinish={async (values) => {
        await onSubmit(values);
        // onSubmit(values);
      }}
      initialValues={current}
      submitter={{
        render: (_, dom) => (done ? null : dom),
      }}
    //   trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done ?
          {
            padding: '72px 0',
          }
          : {},
      }}
    >
      {!done ? (
        <>
          <ProForm.Group style={{ display: 'none' }}>
            <ProFormText
              test="id"
              name="id"
              label="EGM Id"
              disabled
              width="25%"
              className="test"
            />
          </ProForm.Group>

          <ProForm.Group>
            <ProFormText
              name="ip"
              label="EGM IP"
              rules={[
                {
                  required: true,
                  message: '請輸入EGM IP',
                },
              ]}
            />

            <ProFormText
              name="denomination"
              label="Denomination"
              rules={[
                {
                  required: true,
                  message: '請輸入EGM denomination',
                },
              ]}
            />
          </ProForm.Group>

          <ProForm.Group>
            <ProFormText
              name="number"
              label="EGM Number"
              rules={[
                {
                  required: true,
                  message: '請輸入EGM Number',
                },
              ]}
            />

            <ProFormText
              name="model"
              label="EGM Model"
              rules={[
                {
                  required: true,
                  message: '請輸入EGM Model',
                },
              ]}
            />

            <ProFormSelect
              width="xs"
              name="type"
              tooltip="非必填，默認為交換"
              label="排列方式"
              options={[
                {
                  value: 'insert',
                  label: '插入',
                },
                {
                  value: 'replace',
                  label: '交換',
                },
              ]}
            />

          </ProForm.Group>

          <ProFormCheckbox.Group
            name="labels"
            layout="vertical"
            options={['jackpot', 'on-line']}
          />
        </>
      ) : (
        <Result
          status="success"
          title="設定成功"
          subTitle="some description"
          extra={(
            <Button type="primary" onClick={onDone}>
              返回
            </Button>
            )}
        //   className={styles.formResult}
        />
      )}
    </ModalForm>
  );
};

EgmUpdateForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  done: PropTypes.bool.isRequired,
  onDone: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    ip: PropTypes.string,
    number: PropTypes.string,
    denomination: PropTypes.number,
    labels: PropTypes.arrayOf(PropTypes.string),
    model: PropTypes.string,
  }),
};

EgmUpdateForm.defaultProps = {
  current: null,
};

export default EgmUpdateForm;
