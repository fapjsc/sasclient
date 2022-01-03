import React, { useState, useEffect } from 'react';

// Router
import { Link, useLocation } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Antd
// import { LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';

// Hooks
import { useI18n } from '../i18n';

// Config
import { authorizedRoutes } from '../config/routerRole';
import { removeOwn } from '../config/config';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideNav = () => {
  // Init State
  const [collapsed, setCollapsed] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  // I18n
  const { t } = useI18n();

  // Router
  const location = useLocation();

  // Redux
  const { permission } = useSelector((state) => state.user);

  const toggle = () => {
    setCollapsed((preState) => !preState);
  };

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    setCurrentPath(path);
  }, [location.pathname]);

  const handleSideMenuName = (name) => {
    switch (name) {
      case '儀錶板':
        return t('side_nav_dashboard');

      case '會員':
        return t('side_nav_member');

      case '櫃檯值班':
        return t('side_nav_shift');

      case '櫃檯接班明細':
        return t('side_nav_shift_detail');

      case '管理介面':
        return t('side_nav_admin');

      case 'EGM系統':
        return t('side_nav_egm_system');

      case '彩金系統':
        return t('side_nav_jackpot_system');

      case '歷史紀錄':
        return t('side_nav_history');
      default:
        return name;
    }
  };

  const menuItem = authorizedRoutes
    .filter((el) => !removeOwn.includes(el.alias))
    .filter((menu) => menu.permissions.includes(permission) && menu.isMain)
    .map((menu) => (menu.alias === 'admin' ? (
      <SubMenu key={menu.alias} icon={menu.icon} title={handleSideMenuName(menu.name)}>
        {menu.subRoutes.filter((el) => !removeOwn.includes(el.alias)).map((subMenu) => (
          <Menu.Item key={subMenu.alias}>
            <Link to={subMenu.path}>{handleSideMenuName(subMenu.name)}</Link>
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

      </Menu>
    </Sider>
  );
};

export default SideNav;
