import React, { useRef, useState, useEffect } from 'react';

import PropTypes from 'prop-types';

// Redux
import { useSelector } from 'react-redux';

// Antd
import {
  Descriptions, Typography, Button,
} from 'antd';

import ProDescriptions from '@ant-design/pro-descriptions';

import { CoffeeOutlined, ReloadOutlined } from '@ant-design/icons';

// Apis
import { handoverStatistics } from '../../../lib/api-store/handover/handover';

// Helpers
import { thousandsFormat, transToTimeString } from '../../../lib/helper';

// Columns
import { totalColumns } from './columns';

// Styles
import variable from '../../../sass/variable.module.scss';

const contentStyle = {
  color: variable['grey-light'],
  textAlign: 'right',
};

const labelStyle = {
  color: variable['grey-light'],
};

const { Title } = Typography;

let data;

const HandOverDetail = ({ onShow }) => {
  const {
    data: loginData,
    loading: loginLading,
    error: loginError,
  } = useSelector((state) => state.handoverLogin);

  // Init State
  const [amountTotal, setAmountTotal] = useState({
    amountInput: 0,
    amountOutput: 0,
    amountMinus: 0,
  });

  // Ref
  const actionRef = useRef();
  const buttonRef = useRef();
  // const dataRef = useRef();

  const requestPromiseTotal = async () => {
    data = await handoverStatistics();

    setAmountTotal({
      amountInput: data.totalInput, // 1
      amountOutput: data.totalOutput, // 2
      amountMinus: data.totalInput - data.totalOutput, // 3
    });

    console.log(data);

    return Promise.resolve({
      success: true,
      data: data,
    });
  };

  useEffect(() => {
    if (!loginData || loginError || loginLading) return;
    actionRef.current?.reload();
  }, [loginData, loginLading, loginError]);

  return (
    <>
      <ProDescriptions
        column={2}
        tooltip={`更新時間: ${transToTimeString(new Date())}`}
        title="報表"
        bordered
        request={requestPromiseTotal}
        columns={totalColumns}
        actionRef={actionRef}
        labelStyle={labelStyle}
        contentStyle={contentStyle}
        extra={(
          <>
            <Button
              ref={buttonRef}
              onClick={onShow}
              type="danger"
              icon={<CoffeeOutlined />}
            >
              交班
            </Button>
            <Button
              ref={buttonRef}
              onClick={() => actionRef.current?.reload()}
              type="ghost"
              icon={<ReloadOutlined />}
            >
              刷新
            </Button>
          </>
        )}
      />
      <br />
      <br />

      <Descriptions
        contentStyle={contentStyle}
        labelStyle={labelStyle}
      >
        <Descriptions.Item label="結算金額 (1-2)">
          <Title
            type={amountTotal.amountMinus < 0 ? 'danger' : 'success'}
            level={2}
          >
            {`$${thousandsFormat(amountTotal.amountMinus)}`}
          </Title>
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

HandOverDetail.propTypes = {
  onShow: PropTypes.func.isRequired,
};

export default HandOverDetail;
