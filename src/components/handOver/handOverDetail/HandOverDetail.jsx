import React, { useRef } from 'react';
import { Divider } from 'antd';

// Antd
import ProDescriptions from '@ant-design/pro-descriptions';
import ProForm, { ProFormText, ProFormGroup } from '@ant-design/pro-form';

// Columns
import {
  totalColumns, settlementColumns, payColumns, handoverAmountColumns,
} from './columns';

// Helpers
import { waitTime } from '../../../lib/helper';

// Styles
import variable from '../../../sass/variable.module.scss';

let data;

const dividerStyle = {
  color: variable['grey-dark'],
};

const contentStyle = {
  color: variable['grey-light'],
};

const labelStyle = {
  color: variable['grey-light'],
};

const HandOverDetail = () => {
  const actionRef = useRef();

  //** 總計  */
  const requestPromiseTotal = async () => {
    // data = await getMeterRecord(params);
    data = {
      account: '23523212',
      cashierIn: '20200730',
      tickIn: '-12121',
      tickOut: '124323',
      cardIn: '124323',
      cardOut: '124323',
      aftIn: '124323',
      aftOut: '124323',
      aftInEgm: '124323',
      aftOutEgm: '124323',
      totalIn: '124323',
      totalOut: '124323',
      jackpot: '124323',
    };
    return Promise.resolve({
      success: true,
      data: data,
    });
  };

  //** 勞動報酬 */
  const requestPromisePay = async () => {
    // data = await getMeterRecord(params);
    data = {
      settlementAmount: '235232',
      totalRevenue: '20200730',
    };
    return Promise.resolve({
      success: true,
      data: data,
    });
  };

  //** 交班金額 */
  const requestPromiseHandoverAmount = async () => {
    // data = await getMeterRecord(params);
    data = {
      counterAmount: '235232',
      egmIn: '20200730',
      total: '0',
    };
    return Promise.resolve({
      success: true,
      data: data,
    });
  };

  //** 結算查詢 */
  const requestPromiseTotalSettlement = async () => {
    // data = await getMeterRecord(params);
    data = {
      totalClose: '235232',
      balance: '20200730',
    };
    return Promise.resolve({
      success: true,
      data: data,
    });
  };

  const onFinishHandler = async (value) => {
    await waitTime(2000);
  };

  return (
    <>
      <Divider
        dashed
        plain
        style={dividerStyle}
        orientation="left"
      >
        總計
      </Divider>
      <ProDescriptions
        request={requestPromiseTotal}
        columns={totalColumns}
        actionRef={actionRef}
        labelStyle={labelStyle}
        contentStyle={contentStyle}
      />
      <br />

      <Divider
        dashed
        plain
        style={dividerStyle}
        orientation="left"
      >
        勞動報酬
      </Divider>
      <ProDescriptions
        request={requestPromisePay}
        columns={payColumns}
        labelStyle={labelStyle}
        contentStyle={contentStyle}
      />
      <br />

      <Divider
        dashed
        plain
        style={dividerStyle}
        orientation="left"
      >
        交班金額
      </Divider>
      <ProDescriptions
        request={requestPromiseHandoverAmount}
        columns={handoverAmountColumns}
        labelStyle={labelStyle}
        contentStyle={contentStyle}
      />
      <br />

      <Divider
        dashed
        plain
        style={dividerStyle}
        orientation="left"
      >
        結算查詢
      </Divider>
      <ProDescriptions
        request={requestPromiseTotalSettlement}
        columns={settlementColumns}
        labelStyle={labelStyle}
        contentStyle={contentStyle}
      />
      <br />
      <ProForm
        onFinish={onFinishHandler}
      >
        <ProFormGroup>
          <ProFormText
            width="sm"
            name="handover"
            label="交班餘額(3)"
          />
          <ProFormText
            width="sm"
            name="other"
            label="其他收入(4)"
          />
        </ProFormGroup>
      </ProForm>
    </>
  );
};

export default HandOverDetail;
