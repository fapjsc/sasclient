import React, { useState, useEffect } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';

const Clock = () => {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    const clockLoop = setInterval(() => { setDateState(new Date()); }, 1000);

    return () => {
      clearInterval(clockLoop);
    };
  }, []);

  const timezone = localStorage.getItem('locale')?.replace('_', '-');
  return (
    <p>
      <ClockCircleOutlined style={{ marginRight: '5px', fontSize: '1rem' }} />
      {dateState.toLocaleString(timezone || 'zh-TW', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      })}
    </p>
  );
};

export default Clock;
