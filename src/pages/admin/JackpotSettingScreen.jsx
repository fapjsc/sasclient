import React from 'react';
// Antd
import { Tabs } from 'antd';

// Components
import JackpotSetting from '../../components/admin/JackpotSetting';

const { TabPane } = Tabs;

const JackpotSettingScreen = () => {
  const callback = (key) => {
    // eslint-disable-next-line
    console.log(key);
  };
  return (
    <Tabs tabBarGutter={60} defaultActiveKey="jackpot-setting" onChange={callback}>

      <TabPane tab="Jackpot設定" key="jackpot-setting">
        <JackpotSetting />
      </TabPane>

    </Tabs>
  );
};

export default JackpotSettingScreen;
