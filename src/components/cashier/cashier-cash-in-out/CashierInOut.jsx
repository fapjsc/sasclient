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

// Helpers
import { thousandsFormat } from '../../../lib/helper';

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
  fontSize: variable['font-size-2'],
  fontWeight: 'bold',
};

const gold5 = {
  color: variable['gold-5'],
};

// const red5 = {
//   color: variable['red-5'],
// };

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

  const moneyAmountRender = (dom) => {
    const domIsNum = _.isNumber(dom);
    if (domIsNum && getAmountStatus === 'completed' && !getAmountError) {
      return (
        <Space className={styles['fade-in']}>
          <span style={{ ...totalAmountStyle, ...gold5 }}>$</span>
          <span style={{ ...totalAmountStyle, ...gold5 }}>{thousandsFormat(dom)}</span>
        </Space>
      );
    }

    return <span className={styles['fade-in']} style={totalAmountStyle}>-</span>;
  };

  // const moneyBalanceRender = (dom) => {
  //   // const domIsNum = _.isNumber(dom);
  //   if (dom) {
  //     return (
  //       <Space className={styles['fade-in']}>
  //         <span style={{ ...totalAmountStyle, ...red5 }}>$</span>
  //         <span style={{ ...totalAmountStyle, ...red5 }}>{thousandsFormat(dom)}</span>
  //       </Space>
  //     );
  //   }

  //   return <span className={styles['fade-in']} style={totalAmountStyle}>-</span>;
  // };

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
    <Card
      title="櫃檯"
      extra={descriptionExtra}
      border={false}
      style={{ maxWidth: '35rem' }}
    >
      <Space>
        <ProDescriptions
          actionRef={actionRef}
          title="應有金額"
          dataSource={amountData}
        >
          <ProDescriptions.Item render={moneyAmountRender} dataIndex="amount" />
        </ProDescriptions>

        {/* <ProDescriptions
          title="差額"
          dataSource={{ balance: 1113 }}
        >
          <ProDescriptions.Item render={moneyBalanceRender} dataIndex="balance" />
        </ProDescriptions> */}
      </Space>

      <Divider style={{ color: variable['grey-dark'] }} orientation="left">設定</Divider>

      <ProForm onFinish={onFinishHandler}>
        <ProFormMoney
          name="amounts"
          label="金額"
          width="30%"
          customSymbol="$"
          rules={fromRules}
          fieldProps={{
            autoFocus: true,
          }}
        />
        <ProFormRadio.Group name="action" options={options} />
      </ProForm>
    </Card>
  );
};

export default CashierInOut;
