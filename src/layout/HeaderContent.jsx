import React, { useEffect } from 'react';

// Router Props
import { useHistory } from 'react-router-dom';

// Antd
import {
  Space, Menu, Dropdown, Avatar,
} from 'antd';
import { LogoutOutlined, GlobalOutlined } from '@ant-design/icons';

// Hooks
import { useI18n } from '../i18n';

// Helpers
import { _getUserName, _logOutHandler } from '../lib/helper';

// Components
import AutoLogout from '../components/AutoLogout';
import Clock from '../components/Clock';

const HeaderContent = () => {
  // Router Props
  const history = useHistory();

  const { setLocale, getLocale } = useI18n();

  const handleSelectLanguage = (item) => {
    setLocale(item.key);
  };

  const logoutHandler = () => {
    _logOutHandler(true);
    history.replace('/login');
  };

  const i18nMenu = (
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

  const avatarMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={logoutHandler}>
        <Space>
          <p>
            <LogoutOutlined />
          </p>
          <p>
            離開系統
          </p>
        </Space>
      </Menu.Item>
    </Menu>
  );

  //** I18N */
  useEffect(() => {
    localStorage.setItem('locale', getLocale());
  });

  return (
    <>
      <Space>
        <Clock />
      </Space>
      <Space style={{
        display: 'flex',
        float: 'right',
        marginLeft: 'auto',
        overflow: 'hidden',
        marginRight: '1rem',
      }}
      >
        <Space style={{ marginRight: '3rem' }}>
          <Dropdown overlay={avatarMenu}>
            <span style={{ cursor: 'pointer' }}>
              <Avatar
                src="https://joeschmoe.io/api/v1/random"
                size="small"
                menu={avatarMenu}
                style={{ backgroundColor: '#91d5ff', marginBottom: '1px' }}
              />
              <span style={{ marginLeft: '5px' }}>{_getUserName()?.toUpperCase()}</span>
            </span>
          </Dropdown>
        </Space>

        <Dropdown overlay={i18nMenu}>
          <Space style={{ cursor: 'pointer' }}>
            <Avatar
              icon={<GlobalOutlined />}
              size="small"
              menu={avatarMenu}
              style={{ fontSize: '1.5rem', color: '#91d5ff' }}
            />
          </Space>
        </Dropdown>

      </Space>

      <AutoLogout />

    </>
  );
};

export default HeaderContent;
