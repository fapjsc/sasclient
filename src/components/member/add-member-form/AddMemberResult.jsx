import React from 'react';

import { Result, Button } from 'antd';

// eslint-disable-next-line
const AddMemberResult = ({ onResetHandler }) => {
  const onClickHandler = () => {
    onResetHandler();
  };
  return (
    <div
      style={{
        minHeight: '40vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Result
        status="success"
        title="新增會員成功"
        extra={(
          <Button onClick={onClickHandler} type="primary">
            返回
          </Button>
        )}
      />
    </div>
  );
};

export default AddMemberResult;
