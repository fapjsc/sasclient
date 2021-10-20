import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const OperatorScreen = () => {
  const callback = key => {
    console.log(key);
  };

  return (
    <Tabs
      defaultActiveKey="1"
      onChange={callback}
      tabBarGutter={80}
      size="lg"
      style={{ padding: '12px' }}
    >
      <TabPane tab="會員註冊" key="1">
        會員註冊
      </TabPane>
      <TabPane tab="補票/兑票" key="2">
        補票/兑票
      </TabPane>
      <TabPane tab="清鈔" key="3">
        機台清鈔
      </TabPane>
      <TabPane tab="補入金額" key="4">
        櫃檯補入金額
      </TabPane>
    </Tabs>
  );
};

export default OperatorScreen;
