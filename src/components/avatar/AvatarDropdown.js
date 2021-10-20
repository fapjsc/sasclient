import React from 'react';
import { Avatar, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import classes from './AvatarDropdown.module.scss';

import HeaderDropdown from '../headerDropdown/HeaderDropdown';

const AvatarDropDown = () => {
  const menuHeaderDropdown = (
    <Menu selectedKeys={[]} className={classes.menu}>
      <Menu.Item key="logout">
        <LogoutOutlined />
        登出
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${classes.action} ${classes.account}`}>
        <Avatar
          size="small"
          alt="avatar"
          src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          className={classes.avatar}
        />
        <span className="anticon">Mike</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropDown;
