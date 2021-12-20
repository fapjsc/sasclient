import React from 'react';

// Antd
import { Tabs } from 'antd';

// Components
import JackpotWinRecord from '../../components/admin/JackpotWinRecord';
import MeterRecord from '../../components/admin/MeterRecord';
import EventRecord from '../../components/admin/EventRecord';

const { TabPane } = Tabs;

const historyRecord = () => {
  const callback = (key) => {
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

      <TabPane tab="事件紀錄" key="event-record">
        <EventRecord />
      </TabPane>

    </Tabs>
  );
};

export default historyRecord;
