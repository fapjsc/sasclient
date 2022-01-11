import React, { useState, useEffect } from 'react';

// Router
import { Link, useLocation, useHistory } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Antd
import { LogoutOutlined } from '@ant-design/icons';
import {
  Layout, Menu,
} from 'antd';

// Config
import { AuthorizedRoutes } from '../config/routerRole';
import { removeOwn } from '../config/config';

// Helpers
import { _logOutHandler } from '../lib/helper';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideNav = () => {
  // Init State
  const [collapsed, setCollapsed] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  // Router
  const location = useLocation();
  const history = useHistory();

  // Redux
  const { permission } = useSelector((state) => state.user);

  const toggle = () => {
    setCollapsed((preState) => !preState);
  };

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    setCurrentPath(path);
  }, [location.pathname]);

  const logoutHandler = () => {
    _logOutHandler(true);
    history.replace('/login');
  };

  const menuItem = AuthorizedRoutes()
    .filter((el) => !removeOwn.includes(el.alias))
    .filter((menu) => menu.permissions.includes(permission) && menu.isMain)
    .map((menu) => (menu.alias === 'admin' ? (
      <SubMenu key={menu.alias} icon={menu.icon} title={menu.name}>
        {menu.subRoutes.filter((el) => !removeOwn.includes(el.alias)).map((subMenu) => (
          <Menu.Item key={subMenu.alias}>
            <Link to={subMenu.path}>{subMenu.name}</Link>
          </Menu.Item>
        ))}
      </SubMenu>
    ) : (
      <Menu.Item key={menu.alias} icon={menu.icon}>
        <Link to={menu.path}>{menu.name}</Link>
      </Menu.Item>
    )));

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
      <div className={collapsed ? 'logo logo-short' : 'logo logo-rectangle'} />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['home']}
        selectedKeys={[currentPath]}
      >
        {menuItem}
        <Menu.Item onClick={logoutHandler} icon={<LogoutOutlined />} key="leave">離開系統</Menu.Item>
      </Menu>

    </Sider>
  );
};

export default SideNav;
