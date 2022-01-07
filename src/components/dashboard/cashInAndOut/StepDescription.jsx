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

// Helper
import { _getUserName } from '../../../lib/helper';

const StepDescriptions = ({ bordered }) => {
  const {
    action, cashAmount, ip,
  } = useSelector((state) => state.egmCashInOutData);

  const actionText = (actionType) => {
    switch (actionType) {
      case 'atfIn':
        return '開分';

      case 'aftOut':
        return '洗分';

      case 'aftOutDigit':
        return '洗分';

      case 'promoIn':
        return '招待分';

      default:
        return '未知';
    }
  };

  return (
    <Descriptions column={1} bordered={bordered}>
      <Descriptions.Item label="操作人員">
        {_getUserName()}
      </Descriptions.Item>
      <Descriptions.Item label="操作項目">
        {actionText(action)}

      </Descriptions.Item>
      <Descriptions.Item label="EGM IP">
        {ip}
      </Descriptions.Item>
      <Descriptions.Item label="操作金額">
        <Statistic
          value={cashAmount}
          suffix={(
            <span style={{ fontSize: 14 }}>
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
