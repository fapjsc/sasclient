import React from 'react';

// Antd
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const MemberScreen = () => {
  const callback = (key) => {
    // eslint-disable-next-line
    console.log(key);
  };
  return (
    <Tabs
      defaultActiveKey="1"
      onChange={callback}
      tabBarGutter={60}
      size="lg"
      style={{ padding: '12px' }}
    >
      <TabPane tab="新增會員" key="1">
        新增會員
      </TabPane>

      <TabPane tab="儲值" key="2">
        儲值
      </TabPane>

      <TabPane tab="提領" key="3">
        提領
      </TabPane>

      <TabPane tab="積點兌換" key="4">
        積點兌換
      </TabPane>

      <TabPane tab="會員明細" key="5">
        會員明細
      </TabPane>
    </Tabs>
  );
};

export default MemberScreen;
