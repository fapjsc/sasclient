import React, { useRef, useEffect } from 'react';

import _ from 'lodash';

// Antd
import ProForm, { ProFormMoney, ProFormRadio } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import {
  Card, message, Divider, Button, Space,
} from 'antd';

// Apis
import { cashierOperator, GetCashierAmounts } from '../../../lib/api-store';

// Hooks
import useHttp from '../../../hooks/useHttp';

// Styles
import styles from './CashierInOut.module.scss';
import variable from '../../../sass/variable.module.scss';

const options = [
  {
    value: 'in',
    label: '補鈔',
  },
  {
    value: 'out',
    label: '取鈔',
  },
  {
    value: 'set',
    label: '校正回歸',
  },
];

const totalAmountStyle = {
  color: variable['gold-5'],
  fontSize: variable['font-size-2'],
};

const CashierInOut = () => {
  // Ref
  const actionRef = useRef();

  // Hooks
  const {
    sendRequest: getAmountReq,
    data: amountData,
    status: getAmountStatus,
    error: getAmountError,
  } = useHttp(GetCashierAmounts);

  // 判斷user有沒有選擇操作類型
  const FormHasAction = (value) => Object.keys(value).includes('action');

  const resultHandler = (result, value) => {
    const type = options.find((el) => el.value === value.action);
    const { label } = type || {};
    const { amounts } = value || {};

    if (result?.status === 200) {
      message.success(`${label}: $${amounts} - 成功`);
      getAmountReq();
      return;
    }

    message.error(`${label}: $${amounts} - 失敗`);
  };

  const onFinishHandler = async (value) => {
    // 判斷User有沒有選擇操作種類
    const hasAction = FormHasAction(value);
    if (!hasAction) {
      message.error({ content: '請選擇操作項目', key: value?.amount || 1 });
      return;
    }

    // destroy message alert
    message.destroy(value?.amount || 1);

    // 獲取發送請求的結果
    const result = await cashierOperator(value);
    resultHandler(result, value);
  };

  //** Get Amount */
  const moneyAmountRender = (dom) => {
    const domIsNum = _.isNumber(dom);
    if (domIsNum && getAmountStatus === 'completed' && !getAmountError) {
      return (
        <Space className={domIsNum ? styles['fade-in'] : styles['fade-out']}>
          <span style={totalAmountStyle}>$</span>
          <span style={totalAmountStyle}>{dom}</span>
        </Space>
      );
    }

    return <span className={!domIsNum ? styles['fade-in'] : styles['fade-out']} style={totalAmountStyle}>-</span>;
  };

  useEffect(() => {
    if (getAmountError) message.error(getAmountError);
  }, [getAmountError]);

  useEffect(() => {
    getAmountReq();
  }, [getAmountReq]);

  const descriptionExtra = (
    <Button
      type="primary"
      loading={getAmountStatus === 'pending'}
      onClick={getAmountReq}
    >
      {getAmountStatus === 'pending' ? 'loading..' : '刷新'}
    </Button>
  );

  const fromRules = [
    {
      validator: (rule, value) => {
        if (value <= 0) {
          return Promise.reject(new Error('不能是負數'));
        }

        const isIntNum = _.isInteger(value);
        if (!isIntNum) {
          return Promise.reject(new Error('必須是一個正整數'));
        }

        return Promise.resolve();
      },
    },
  ];

  return (
    <Card border={false} style={{ maxWidth: '35rem' }}>
      <ProDescriptions
        actionRef={actionRef}
        title="目前金額"
        dataSource={amountData}
        extra={descriptionExtra}
      >
        <ProDescriptions.Item render={moneyAmountRender} dataIndex="amount" />
      </ProDescriptions>

      <Divider style={{ color: variable['grey-dark'] }} orientation="left">設定</Divider>

      <ProForm onFinish={onFinishHandler} scrollToFirstError>
        <ProFormMoney
          name="amounts"
          label="金額"
          width="30%"
          customSymbol="$"
          rules={fromRules}
        />
        <ProFormRadio.Group name="action" options={options} />
      </ProForm>
    </Card>
  );
};

export default CashierInOut;
