import React, { useState, useEffect } from 'react';

// Router
import { Link, useHistory, useLocation } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Antd
import { LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';

// Hooks
import { useI18n } from '../i18n';

// Helpers
import { _resetAllReducer } from '../lib/helper';

// Config
import { authorizedRoutes } from '../config/routerRole';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideNav = () => {
  // Init State
  const [collapsed, setCollapsed] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  // I18n
  const { t } = useI18n();

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

  const handleSideMenuName = (name) => {
    if (name === '儀錶板') {
      return t('side_nav_dashboard');
    }

    if (name === '會員') {
      return t('side_nav_member');
    }

    if (name === '櫃檯值班') {
      return t('side_nav_shift');
    }

    if (name === '櫃檯接班明細') {
      return t('side_nav_shift_detail');
    }
    if (name === '管理介面') {
      return t('side_nav_admin');
    }
    return name;
  };

  const menuItem = authorizedRoutes
    .filter((menu) => menu.permissions.includes(account) && menu.isMain)
    .map((menu) => (menu.alias === 'admin' ? (
      <SubMenu key={menu.alias} icon={menu.icon} title={handleSideMenuName(menu.name)}>
        {menu.subRoutes.map((subMenu) => (
          <Menu.Item key={subMenu.alias}>
            <Link to={subMenu.path}>{subMenu.name}</Link>
          </Menu.Item>
        ))}
      </SubMenu>
    ) : (
      <Menu.Item key={menu.alias} icon={menu.icon}>
        <Link to={menu.path}>{handleSideMenuName(menu.name)}</Link>
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

        <Menu.Item
          key="logout"
          icon={<LogoutOutlined />}
          onClick={logoutHandler}
        >
          {t('side_nav_logout')}
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideNav;
