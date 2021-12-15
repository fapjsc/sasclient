import React from 'react';

import { useHistory } from 'react-router-dom';

// Helpers
import { Result, Button } from 'antd';
import { _getUserRole } from '../lib/helper';

const AccessDenied = () => {
  const history = useHistory();

  const onClickHandler = () => {
    const role = _getUserRole();
    if (role) {
      history.push('/home');
    } else {
      history.replace('/login');
    }
  };
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={(
        <Button type="primary" onClick={onClickHandler}>
          Back
        </Button>
      )}
    />
  );
};

export default AccessDenied;
