import { useEffect, useState } from 'react';

const DateDisplay = ({ style }) => {
  const [dateAndTime, setDateAndTime] = useState('');

  useEffect(() => {
    setInterval(() => {
      let date = new Date();
      setDateAndTime(
        date.getFullYear() +
          '/' +
          (date.getMonth() + 1) +
          '/' +
          date.getDate() +
          date.toLocaleTimeString().split()
      );
    }, 1000);
  }, []);

  return <div style={{ marginRight: '20rem', backgroundColor: 'red' }}>{dateAndTime}</div>;
};

export default DateDisplay;
