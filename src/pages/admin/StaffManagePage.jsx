import React from 'react';

import { Tabs } from 'antd';
import CreateStaff from '../../components/admin/staff/CreateStaff';

const { TabPane } = Tabs;
const StaffManagePage = () => (
  <Tabs tabBarGutter={60} defaultActiveKey="egm-setting">
    <TabPane tab="新增人員" key="add-staff">
      <CreateStaff />
    </TabPane>
  </Tabs>
);

export default StaffManagePage;
