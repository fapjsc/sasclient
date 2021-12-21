import React from 'react';
import { Space, Menu, Dropdown } from 'antd';

// import classes from '../components/avatar/AvatarDropdown.module.scss';

import { GlobalOutlined } from '@ant-design/icons';
// import { DownOutlined } from '@ant-design/icons';

import AutoLogout from '../components/AutoLogout';

const HeaderContent = () => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Space>
          <p>
            🇹🇼
          </p>
          <p>
            繁體中文
          </p>
        </Space>
      </Menu.Item>
      <Menu.Item key="1">
        <Space>
          <p>
            🇯🇵
          </p>
          <p>
            日本語
          </p>
        </Space>
      </Menu.Item>
      <Menu.Item key="2">
        <Space>
          <p>
            🇺🇸
          </p>
          <p>
            English
          </p>
        </Space>
      </Menu.Item>
      <Menu.Item key="3">
        <Space>
          <p>
            🇨🇳
          </p>
          <p>
            简体中文
          </p>
        </Space>
      </Menu.Item>
    </Menu>
  );
  return (
    <div style={{
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'flex-end',
    }}
    >
      <Dropdown overlay={menu} style={{ backgroundColor: 'blue' }}>
        <div>
          <GlobalOutlined style={{ fontSize: '1.3rem', cursor: 'pointer' }} />
        </div>
      </Dropdown>

      <Space>
        <AutoLogout />
      </Space>
    </div>
  );
};

export default HeaderContent;
