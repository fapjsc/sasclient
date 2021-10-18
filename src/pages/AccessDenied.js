// Helpers
import { _getUserRole } from '../lib/helper';

import { Result, Button } from 'antd';

const AccessDenied = ({ history }) => {
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
      extra={
        <Button type="primary" onClick={onClickHandler}>
          Back
        </Button>
      }
    />
  );
};

export default AccessDenied;
