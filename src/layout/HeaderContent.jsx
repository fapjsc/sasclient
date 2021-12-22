import React from 'react';

// Antd
import { Space, Menu, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

// Hooks
import { useI18n } from '../i18n';

// Components
import AutoLogout from '../components/AutoLogout';

const HeaderContent = () => {
  const { setLocale } = useI18n();

  const handleSelectLanguage = (item) => {
    setLocale(item.key);
  };

  const menu = (
    <Menu
      onClick={(e) => {
        handleSelectLanguage(e);
      }}
    >
      <Menu.Item key="zh_TW">
        <Space>
          <p>
            🇹🇼
          </p>
          <p>
            繁體中文
          </p>
        </Space>
      </Menu.Item>
      <Menu.Item key="ja_JP">
        <Space>
          <p>
            🇯🇵
          </p>
          <p>
            日本語
          </p>
        </Space>
      </Menu.Item>
      <Menu.Item key="en_US">
        <Space>
          <p>
            🇺🇸
          </p>
          <p>
            English
          </p>
        </Space>
      </Menu.Item>
      <Menu.Item key="zh_CN">
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
