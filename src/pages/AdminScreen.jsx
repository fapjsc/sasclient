import React from 'react';

// Antd
//
import { Tabs } from 'antd';

// Components
import MeterRecord from '../components/admin/MeterRecord';
import JackpotWinRecord from '../components/admin/JackpotWinRecord';
import JackpotSetting from '../components/admin/JackpotSetting';
import EgmSetting from '../components/admin/EgmSetting';

const { TabPane } = Tabs;

const AdminScreen = () => {
  //** All Menu */
  const callback = (key) => {
    console.log(key);
  };

  return (

    <Tabs tabBarGutter={60} defaultActiveKey="jackpot-win-record" onChange={callback}>

      <TabPane tab="EGM設定" key="egm-setting">
        <EgmSetting />
      </TabPane>

      <TabPane tab="Jackpot設定" key="jackpot-setting">
        <JackpotSetting />
      </TabPane>

      <TabPane tab="中獎清單" key="jackpot-win-record">
        <JackpotWinRecord />
      </TabPane>

      <TabPane tab="Meter紀錄" key="meter-record">
        <MeterRecord />
      </TabPane>

    </Tabs>

  );
};

export default AdminScreen;
