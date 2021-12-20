import React from 'react';

// Antd
import { Tabs } from 'antd';

// Components
import EgmSetting from '../../components/admin/EgmSetting';

const { TabPane } = Tabs;

const EgmSettingScreen = () => {
  //** All Menu */
  const callback = (key) => {
    console.log(key);
  };

  return (
    <Tabs tabBarGutter={60} defaultActiveKey="egm-setting" onChange={callback}>

      <TabPane tab="EGM設定" key="egm-setting">
        <EgmSetting />
      </TabPane>

    </Tabs>
  );
};

export default EgmSettingScreen;
