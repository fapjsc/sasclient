import React from 'react';

import { Card, Row } from 'antd';

const cardStyle = {
  width: 180,
  textAlign: 'center',
};

const textStyle = {
  fontSize: '1rem',
};

// eslint-disable-next-line
const OperationNav = ({ navClickHandler }) => {
  return (
    <Row justify="start" style={{ display: 'flex', gap: ['3rem'] }}>
      <Card
        className="move-up-animation"
        style={cardStyle}
        onClick={() => {
          navClickHandler('cash-in-out');
        }}
      >
        <h4 style={textStyle}>開/洗分</h4>
      </Card>

      <Card
        className="move-up-animation"
        style={cardStyle}
        onClick={() => {
          navClickHandler('deposit');
        }}
      >
        <h4 style={textStyle}>儲值</h4>
      </Card>

      <Card
        className="move-up-animation"
        style={cardStyle}
        onClick={() => {
          navClickHandler('withdrawal');
        }}
      >
        <h4 style={textStyle}>提領</h4>
      </Card>

      {/* <Card
        className="move-up-animation"
        style={cardStyle}
        onClick={() => {
          navClickHandler('update-member');
        }}
      >
        <h4 style={textStyle}>更新資料</h4>
      </Card> */}

      {/* <Card
        className="move-up-animation"
        style={cardStyle}
        onClick={() => {
          navClickHandler('rewards-points');
        }}
      >
        <h4 style={textStyle}>積分兌換</h4>
      </Card> */}
    </Row>
  );
};

export default OperationNav;
