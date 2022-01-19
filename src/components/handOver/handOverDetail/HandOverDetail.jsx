import React, { useRef, useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Antd
import {
  Descriptions, Typography, Button, Row, Col,
} from 'antd';
import ProDescriptions from '@ant-design/pro-descriptions';
import ProForm, { ProFormDigit, ProFormGroup } from '@ant-design/pro-form';
import { CoffeeOutlined } from '@ant-design/icons';

import {
  totalColumns,
} from './columns';

// Apis
import { handoverStatistics } from '../../../lib/api-store/handover/handover';

// Actions
import {
  setHandoverInput,
  handoverInputReset,
} from '../../../store/actions/handoverInputActions';

// Styles
import variable from '../../../sass/variable.module.scss';

const contentStyle = {
  color: variable['grey-light'],
};

const labelStyle = {
  color: variable['grey-light'],
};

const colorRed = {
  color: variable['red-5'],
};

const colorBlue = {
  color: variable['blue-md'],
};

const { Text } = Typography;

let data;

// eslint-disable-next-line
const HandOverDetail = ({onShow}) => {
  // Redux
  const dispatch = useDispatch();
  const { inputData } = useSelector((state) => state.handoverInput);
  // eslint-disable-next-line
  const { inputTotal, totalClose, balance } = inputData || {};

  // Init State
  const [amountTotal, setAmountTotal] = useState({
    amountInput: 0,
    amountOutput: 0,
    amountMinus: 0,
  });

  // Ref
  const actionRef = useRef();
  // const dataRef = useRef();

  //** 總計  */
  const requestPromiseTotal = async () => {
    data = await handoverStatistics();

    setAmountTotal({
      amountInput: data.totalInput, // 1
      amountOutput: data.totalOutput, // 2
      amountMinus: data.totalInput - data.totalOutput, // 3
    });

    return Promise.resolve({
      success: true,
      data: data,
    });
  };

  const onFinishHandler = (value) => {
    const currentTotal = (value?.inputHandover || 0) + (value?.inputOther || 0); // 3 + 4
    const getTotalClose = amountTotal.amountOutput + currentTotal; // 2 + 3 + 4
    const getBalance = getTotalClose - amountTotal.amountInput; // 5 - 1

    const formatInputData = {
      inputHandover: value?.inputHandover || 0,
      inputOther: value?.inputOther || 0,
      inputTotal: currentTotal,
      totalClose: getTotalClose,
      balance: getBalance,
    };
    dispatch(setHandoverInput(formatInputData));
  };

  const onResetHandler = () => {
    dispatch(handoverInputReset());
  };

  return (
    <>
      <Row justify="end">
        <Col>
          <Button
            onClick={onShow}
            type="danger"
            icon={<CoffeeOutlined />}
          >
            交班
          </Button>
        </Col>
      </Row>
      <ProDescriptions
        request={requestPromiseTotal}
        columns={totalColumns}
        actionRef={actionRef}
        labelStyle={labelStyle}
        contentStyle={contentStyle}
      />
      <br />
      <br />

      <Descriptions
        title=" 勞動報酬"
        contentStyle={contentStyle}
        labelStyle={labelStyle}
        bordered
      >
        <Descriptions.Item label="結算金額 (1-2)">
          <Text style={amountTotal.amountMinus < 0 && colorRed}>
            {`$${amountTotal.amountMinus}`}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="淨收益 (1-2-5-6)">
          <Text style={amountTotal.amountMinus - totalClose - balance < 0 && colorRed}>
            {`$${amountTotal.amountMinus - totalClose - balance || 0}`}
          </Text>
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />

      <Descriptions
        title="交班金額"
        contentStyle={contentStyle}
        labelStyle={labelStyle}
        bordered
      >
        <Descriptions.Item label="櫃檯金額 (1-2)">
          <Text style={amountTotal.amountMinus < 0 && colorRed}>
            {`$${amountTotal.amountMinus}`}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="機器鈔入(7)">$0</Descriptions.Item>
        <Descriptions.Item label="總計 (1-2+7)">{`$${amountTotal.amountMinus + 0}`}</Descriptions.Item>
      </Descriptions>
      <br />
      <br />

      <Descriptions
        title="結算查詢"
        contentStyle={colorBlue}
        labelStyle={colorBlue}
        bordered
      >
        <Descriptions.Item label="總關閉(5)(2+3+4)">
          <Text style={totalClose >= 0 ? colorBlue : colorRed}>
            {`$${totalClose || amountTotal.amountOutput || 0}`}
          </Text>
        </Descriptions.Item>

        <Descriptions.Item label="結算差額(6)(5-1)">
          <Text style={totalClose >= 0 ? colorBlue : colorRed}>
            {`$${balance || 0}`}
          </Text>
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />

      <ProForm onFinish={onFinishHandler} onReset={onResetHandler}>
        <ProFormGroup>
          <ProFormDigit
            label="交班餘額(3)"
            min={1}
            width="100%"
            name="inputHandover"
          />
          <ProFormDigit
            label="其他收入(4)"
            min={1}
            width="100%"
            name="inputOther"
          />
        </ProFormGroup>
      </ProForm>
    </>
  );
};

export default HandOverDetail;
