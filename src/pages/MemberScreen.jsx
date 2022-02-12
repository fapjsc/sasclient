import React from 'react';

// Components
import { Tabs } from 'antd';
import AddMemberForm from '../components/member/AddMemberForm';
import MemberAuth from '../components/member/member-operation/MemberAuth';

// Antd

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
        <AddMemberForm />
      </TabPane>

      <TabPane tab="會員操作" key="2">
        <MemberAuth />
      </TabPane>

      {/* <TabPane tab="提領" key="3">
        提領
      </TabPane>

      <TabPane tab="積點兌換" key="4">
        積點兌換
      </TabPane>

      <TabPane tab="會員明細" key="5">
        會員明細
      </TabPane> */}
    </Tabs>
  );
};

export default MemberScreen;
