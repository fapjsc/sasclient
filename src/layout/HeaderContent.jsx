import React, { useEffect } from 'react';

// Router
import { useHistory } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Antd
import {
  Space, Menu, Dropdown, Avatar, Button,
} from 'antd';

// Antd Icon
import { LogoutOutlined } from '@ant-design/icons';

// Hooks
import { useI18n } from '../i18n';

// Socket
import {
  connectWithSocket,
  closeSocketWithAgent,
} from '../lib/socketConnection';

// Components
import AutoLogout from '../components/AutoLogout';
import Clock from '../components/Clock';

// Helpers
import { _logOutHandler } from '../lib/helper';

const HeaderContent = () => {
  // Router
  const history = useHistory();

  // Redux
  const { account } = useSelector((state) => state.user);

  // Hooks
  // eslint-disable-next-line
  const { setLocale, getLocale } = useI18n();

  useEffect(() => {
    connectWithSocket();

    return () => {
      closeSocketWithAgent();
    };
  }, []);

  const logoutHandler = () => {
    _logOutHandler(true);
    history.replace('/login');
  };

  const avatarMenu = (
    <Menu>
      <Menu.Item key="logout">
        <Space direction="vertical">
          <span>Name</span>
          <span>Number</span>
        </Space>
      </Menu.Item>
    </Menu>
  );

  //** I18N */
  useEffect(() => {
    const locale = getLocale();
    localStorage.setItem('locale', locale);
  });

  return (
    <>
      <Space>
        <Clock />
      </Space>

      <Space
        style={{
          display: 'flex',
          float: 'right',
          marginLeft: 'auto',
          overflow: 'hidden',
          marginRight: '1rem',
        }}
      >
        {account && (
          <Space size="large" style={{ marginRight: '3rem' }}>

            <Space>
              <Button type="danger">交班</Button>
            </Space>

            <Dropdown overlay={avatarMenu}>
              <span style={{ cursor: 'pointer' }}>
                <Avatar
                  src="https://joeschmoe.io/api/v1/random"
                  size="small"
                  menu={avatarMenu}
                  style={{ backgroundColor: '#91d5ff', marginBottom: '1px' }}
                />

                <span style={{ marginLeft: '5px' }}>{account}</span>
              </span>
            </Dropdown>

            <Space style={{ cursor: 'pointer' }} onClick={logoutHandler}>
              <span>
                <LogoutOutlined />
              </span>
              <span>離開系統</span>
            </Space>
          </Space>
        )}

      </Space>

      <AutoLogout />
    </>
  );
};

export default HeaderContent;
