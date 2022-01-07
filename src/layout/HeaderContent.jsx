import React, { useEffect, useState } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Antd
import {
  Space, Menu, Dropdown, Avatar, Button,
} from 'antd';
import { LogoutOutlined, GlobalOutlined } from '@ant-design/icons';

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
import ModalUserLogin from '../components/modal/ModalUserLogin';

// Actions
import { userLogoutAction } from '../store/actions/userActions';

// Config
import { i18nTypes } from '../config/config';

const HeaderContent = () => {
  // Init State
  const [showLoginModel, setShowLoginModel] = useState(false);

  // Redux
  const { account } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Hooks
  const { setLocale, getLocale } = useI18n();

  const handleSelectLanguage = (item) => {
    setLocale(item.key);
  };

  const i18nMenu = (
    <Menu
      onClick={(e) => {
        handleSelectLanguage(e);
      }}
    >
      {i18nTypes.map((el) => (
        <Menu.Item key={el.key}>
          <Space>
            <p>{el.icon}</p>
            <p>{el.lan}</p>
          </Space>
        </Menu.Item>
      ))}
    </Menu>
  );

  const userLogoutHandler = () => {
    dispatch(userLogoutAction());
  };

  useEffect(() => {
    connectWithSocket();

    return () => {
      closeSocketWithAgent();
    };
  }, []);

  const avatarMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={userLogoutHandler}>
        <Space>
          <p>
            <LogoutOutlined />
          </p>
          <p>登出</p>
        </Space>
      </Menu.Item>
    </Menu>
  );

  //** I18N */
  useEffect(() => {
    const locale = getLocale();
    localStorage.setItem('locale', locale);
  });

  const onCancelHandler = () => {
    setShowLoginModel(false);
  };

  return (
    <>
      <ModalUserLogin onVisible={showLoginModel} onCancel={onCancelHandler} />

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

        {!account && (
          <div style={{ marginRight: '1rem' }}>
            <Button onClick={() => setShowLoginModel(true)}>LOGIN</Button>
          </div>
        )}

        <Dropdown overlay={i18nMenu}>
          <Space style={{ cursor: 'pointer', marginBottom: '1px' }}>
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
