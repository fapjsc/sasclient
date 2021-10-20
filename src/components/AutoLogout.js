import { useState, useEffect } from 'react';

// Router
import { useHistory } from 'react-router-dom';

// Helpers
import { _resetAllReducer } from '../lib/helper';

// Antd
import { Statistic } from 'antd';

const timeRange = 1000 * 1 * 60 * 60;

const AutoLogout = () => {
  const [deadLine, setDeadLine] = useState(Date.now() + timeRange);

  const history = useHistory();

  const onFinishHandler = () => {
    // true代表要清空localStorage
    _resetAllReducer(true);
    history.replace('/login');
  };

  const changeTime = () => {
    setDeadLine(Date.now() + timeRange);
  };

  useEffect(() => {
    window.addEventListener('mouseover', changeTime);
    window.addEventListener('keypress', changeTime);

    return () => {
      window.removeEventListener('mouseover', changeTime);
      window.removeEventListener('keypress', changeTime);
    };
  }, []);

  return (
    <Statistic.Countdown style={{ display: 'none' }} onFinish={onFinishHandler} value={deadLine} />
  );
};

export default AutoLogout;
