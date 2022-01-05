import React from 'react';

// Antd
import { Tabs } from 'antd';

// Components
import HandOverDetail from '../components/handOver/handOverDetail/HandOverDetail';

const { TabPane } = Tabs;

const CashierScreen = () => {
  const callback = (key) => {
    // eslint-disable-next-line
    console.log(key);
  };
  return (
    <Tabs
      defaultActiveKey="handover-detail"
      onChange={callback}
      tabBarGutter={60}
      size="lg"
      // style={{ padding: '12px 0' }}s
    >
      <TabPane tab="交班明細" key="handover-detail">
        <HandOverDetail />
      </TabPane>

      <TabPane tab="交班記錄" key="handover-history">
        交班記錄
      </TabPane>
    </Tabs>
  );
};

export default CashierScreen;
