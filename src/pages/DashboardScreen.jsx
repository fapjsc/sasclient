import React from 'react';

// Antd
import { Tabs } from 'antd';

// Components
import MachineList from '../components/dashboard/gameMachine/MachineList';

const { TabPane } = Tabs;

const DashboardScreen = () => {
  const callback = (key) => {
    // eslint-disable-next-line
    console.log(key);
  };
  return (
    <Tabs
      defaultActiveKey="egm"
      onChange={callback}
      tabBarGutter={60}
      size="lg"
      style={{ padding: '12px' }}
    >

      <TabPane tab="EGM狀態" key="egm">
        <MachineList />
      </TabPane>

      <TabPane tab="統計圖表" key="charts">
        統計圖表
      </TabPane>

    </Tabs>
  );
};

export default DashboardScreen;
