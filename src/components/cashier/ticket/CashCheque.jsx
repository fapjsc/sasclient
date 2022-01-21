import React, { useState, useEffect, useRef } from 'react';

// Antd
import {
  Input, Row, Col, Button, Divider,
} from 'antd';

const CashCheque = () => {
  const [barcode, setBarcode] = useState('');

  const inputRef = useRef();

  const onChangeHandler = (e) => {
    // console.log(e);
    setBarcode(e.target.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  });

  return (
    <Row>
      <Col span={12}>
        <Divider orientation="left">請輸入票卷碼</Divider>
        <Input
          ref={inputRef}
          style={{ width: 'calc(100% - 200px)' }}
          size="large"
          prefix=""
          value={barcode}
          onChange={onChangeHandler}
        />
        <Button
          size="large"
          type="primary"
        >
          查詢
        </Button>
      </Col>
    </Row>
  );
};

export default CashCheque;
