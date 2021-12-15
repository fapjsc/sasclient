import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const DateDisplay = ({ styles }) => {
  const [dateAndTime, setDateAndTime] = useState('');

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setDateAndTime(
        `${date.getFullYear()
        }/${
          date.getMonth() + 1
        }/${
          date.getDate()
        }${date.toLocaleTimeString().split()}`,
      );
    }, 1000);
  }, []);

  return <div style={{ marginRight: '20rem', backgroundColor: 'red', ...styles }}>{dateAndTime}</div>;
};

DateDisplay.propTypes = {
  styles: PropTypes.shape(),
};

DateDisplay.defaultProps = {
  styles: {},
};

export default DateDisplay;
