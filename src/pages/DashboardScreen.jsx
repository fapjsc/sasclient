import React from 'react';

// Antd
import { Tabs } from 'antd';

// Components
import MachineList from '../components/dashboard/gameMachine/MachineList';
import JackpotWinRecord from '../components/dashboard/JackpotWinRecord';
import CashierRecord from '../components/dashboard/cashier-record/CashierRecord';
import CashierInOut from '../components/dashboard/cashier-cash-in-out/CashierInOut';

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

      <TabPane tab="中獎紀錄" key="jackpot-record">
        <JackpotWinRecord />
      </TabPane>

      <TabPane tab="操作紀錄" key="cashier-record">
        <CashierRecord />
      </TabPane>

      <TabPane tab="櫃檯金額" key="1">
        <CashierInOut />
      </TabPane>
    </Tabs>
  );
};

export default DashboardScreen;
