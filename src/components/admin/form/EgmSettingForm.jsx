import React from 'react';

import PropTypes from 'prop-types';

import
ProForm,
{
  ModalForm,
  ProFormText,
  ProFormCheckbox,
  ProFormSelect,
} from '@ant-design/pro-form';

import {
  Button,
  Result,
} from 'antd';

const EgmSettingForm = (props) => {
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
      onFinish={async (values) => {
        await onSubmit(values);
      }}
      initialValues={current}
      submitter={{
        render: (_, dom) => (done ? null : dom),
      }}
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
              width="25%"
              className="test"
            />
          </ProForm.Group>

          <ProForm.Group>
            <ProFormText
              name="ip"
              label="EGM IP"
              disabled
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
              disabled
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
              name="model"
              label="EGM Model"
              rules={[
                {
                  required: true,
                  message: '請輸入EGM Model',
                },
              ]}
            />
            <ProFormText
              name="brand"
              label="廠牌"
              rules={[
                {
                  required: true,
                  message: '請輸入EGM Name',
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
              name="name"
              label="EGM Name"
              rules={[
                {
                  required: true,
                  message: '請輸入EGM Name',
                },
              ]}
            />
          </ProForm.Group>

          <ProFormSelect
            width="20%"
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

          <ProFormCheckbox.Group
            name="labels"
            layout="vertical"
            options={['jackpot', 'online']}
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

EgmSettingForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  done: PropTypes.bool.isRequired,
  onDone: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    ip: PropTypes.string,
    number: PropTypes.number,
    denomination: PropTypes.string,
    labels: PropTypes.arrayOf(PropTypes.string),
    model: PropTypes.string,
    // brandName: PropTypes.string,
    // buttons: PropTypes.arrayOf(PropTypes.object),
  }),
};

EgmSettingForm.defaultProps = {
  current: null,
};

export default EgmSettingForm;
