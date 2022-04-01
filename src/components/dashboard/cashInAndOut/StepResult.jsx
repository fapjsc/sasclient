import React from 'react';

// Redux
// import { useSelector } from 'react-redux';

// Antd
import {
  Result,
  Button,
} from 'antd';

// Prop Types
import PropTypes from 'prop-types';

// Styles
import styles from './StepResult.module.scss';

const StepResult = ({ onFinish, requestErr, children }) => {
  // const { action } = useSelector((state) => state.egmCashInOutData);

  // const actionText = (actionType) => {
  //   switch (actionType) {
  //     case 'atfIn':
  //       return '開分';

  //     case 'aftOut':
  //       return '洗分';

  //     case 'aftOutDigit':
  //       return '洗分';

  //     case 'promoIn':
  //       return '招待分';

  //     default:
  //       return '未知';
  //   }
  // };

  const titleResultText = () => {
    // const text = actionText(action);
    // if (text === '未知') return '';
    if (requestErr) return '失敗';
    if (!requestErr) return '成功';
  };

  return (
    <Result
      status={requestErr ? 'error' : 'success'}
      title={
        // actionText(action) + titleResultText()
        `操作${titleResultText()}`
      }
      subTitle=""
      extra={(
        <Button type="primary" onClick={onFinish}>
          關閉
        </Button>
      )}
      className={styles.result}
    >
      {children}
    </Result>
  );
};

StepResult.propTypes = {
  onFinish: PropTypes.func.isRequired,
  requestErr: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default StepResult;
