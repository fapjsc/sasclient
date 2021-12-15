import React, { useState, useEffect } from 'react';

// Router
import { Link, useHistory, useLocation } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Antd
import { LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';

// Helpers
import { _resetAllReducer } from '../lib/helper';

// Config
import { authorizedRoutes } from '../config/routerRole';

const { Sider } = Layout;

const SideNav = () => {
  // Init State
  const [collapsed, setCollapsed] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  // Router
  const history = useHistory();
  const location = useLocation();

  // Redux
  const { user } = useSelector((state) => state);
  const {
    loginInfo: { account },
  } = user;

  const toggle = () => {
    setCollapsed((preState) => !preState);
  };

  const logoutHandler = () => {
    _resetAllReducer(true);
    history.replace('/login');
  };

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    setCurrentPath(path);
  }, [location.pathname]);

  const menuItem = authorizedRoutes
    .filter((menu) => menu.permissions.includes(account))
    .map((menu) => (
      <Menu.Item key={menu.alias} icon={menu.icon}>
        <Link to={menu.path}>{menu.name}</Link>
      </Menu.Item>
    ));

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
      <div className="logo">LOGO</div>

      <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']} selectedKeys={[currentPath]}>
        {menuItem}
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logoutHandler}>
          離開系統
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideNav;
