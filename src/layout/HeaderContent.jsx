import React, { useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Antd
import {
  Space, Menu, Dropdown, Avatar,
} from 'antd';

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

const HeaderContent = () => {
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

  const avatarMenu = (
    <Menu>
      <Menu.Item key="logout">
        <Space>
          {/* <p>
            <LogoutOutlined />
          </p> */}
          {/* <p>登出</p> */}
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
          <Space style={{ marginRight: '3rem' }}>
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
          </Space>
        )}

      </Space>

      <AutoLogout />
    </>
  );
};

export default HeaderContent;
