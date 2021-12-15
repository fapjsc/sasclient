import React from 'react';

// Redux
import { useSelector } from 'react-redux';

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
  const { action } = useSelector((state) => state.egmCashInOutData);

  const titleText = () => {
    if (action === 'cashIn') return '開分';
    if (action === 'cashOut') return '洗分';
  };

  const titleResultText = () => {
    if (requestErr) return '失敗';
    if (!requestErr) return '成功';
  };

  return (
    <Result
      status={requestErr ? 'error' : 'success'}
      title={
          titleText() + titleResultText()
        }
      subTitle=""
      extra={(
        <>
          {/* <Button type="primary" onClick={againClickHandler}>
              再來一次
            </Button> */}
          <Button type="primary" onClick={onFinish}>
            關閉
          </Button>
        </>
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
