import React from 'react';

// Prop Types
import PropTypes from 'prop-types';

// Redux
import { useSelector } from 'react-redux';

// Antd
import {
  Descriptions,
  Statistic,
} from 'antd';

const StepDescriptions = ({ bordered }) => {
  const {
    opName, action, amount, machineNumber,
  } = useSelector((state) => state.egmCashInOutData);

  return (
    <Descriptions column={1} bordered={bordered}>
      <Descriptions.Item label="操作人員">
        {' '}
        {opName}
      </Descriptions.Item>
      <Descriptions.Item label="操作項目">
        {' '}
        {action === 'cashIn' ? '開分' : '洗分'}
      </Descriptions.Item>
      <Descriptions.Item label="機器編號">
        {' '}
        {machineNumber}
      </Descriptions.Item>
      <Descriptions.Item label="操作金額">
        <Statistic
          value={amount}
          suffix={(
            <span
              style={{
                fontSize: 14,
              }}
            >
              元
            </span>
            )}
          precision={0}
        />
      </Descriptions.Item>
    </Descriptions>
  );
};

StepDescriptions.propTypes = {
  bordered: PropTypes.bool,
};

StepDescriptions.defaultProps = {
  bordered: false,
};

export default StepDescriptions;
