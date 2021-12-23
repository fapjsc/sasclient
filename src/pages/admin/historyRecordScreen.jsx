import React from 'react';

// Antd
import { Tabs } from 'antd';

// Components
import JackpotWinRecord from '../../components/admin/JackpotWinRecord';
import MeterRecord from '../../components/admin/MeterRecord';
import EventRecord from '../../components/admin/EventRecord';
import SystemLog from '../../components/admin/SystemLog';

// import Print from '../../components/print/Print';

const { TabPane } = Tabs;

const historyRecord = () => {
  const callback = (key) => {
    // eslint-disable-next-line
    console.log(key);
  };
  return (
    <Tabs tabBarGutter={60} defaultActiveKey="jackpot-win-record" onChange={callback}>

      <TabPane tab="中獎紀錄" key="jackpot-win-record">
        <JackpotWinRecord />
      </TabPane>

      <TabPane tab="Meter紀錄" key="meter-record">
        <MeterRecord />
      </TabPane>

      <TabPane tab="EGM事件" key="event-record">
        <EventRecord />
      </TabPane>

      <TabPane tab="系統日誌" key="system-log">
        <SystemLog />
      </TabPane>

    </Tabs>
  );
};

export default historyRecord;
