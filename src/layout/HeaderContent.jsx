import React from 'react';
import { Space } from 'antd';

// import classes from '../components/avatar/AvatarDropdown.module.scss';

import AutoLogout from '../components/AutoLogout';

const HeaderContent = () => (
  <Space>
    <AutoLogout />
  </Space>
);

export default HeaderContent;
