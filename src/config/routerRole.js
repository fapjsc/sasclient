// @see https://github.com/AlanWei/react-acl-router
import { PieChartOutlined, DesktopOutlined, HomeOutlined } from '@ant-design/icons';

//** Authorized Pages */
import HomeScreen from '../pages/HomeScreen';
import AccountScreen from '../pages/AccountScreen';
import AdminScreen from '../pages/AdminScreen';

//** unAuthorized Pages */
import Login from '../pages/Login';
import AccessDenied from '../pages/AccessDenied';

export const authorizedRoutes = [
  {
    path: '/home',
    exact: true,
    permissions: ['admin', 'op'],
    redirect: '/access-denied',
    component: HomeScreen,
    alias: 'home',
    name: '主頁',
    icon: <PieChartOutlined />,
  },
  {
    path: '/account',
    exact: true,
    permissions: ['admin', 'op'],
    redirect: '/access-denied',
    component: AccountScreen,
    alias: 'account',
    name: '帳務',
    icon: <DesktopOutlined />,
  },
  {
    path: '/admin',
    exact: true,
    permissions: ['admin'],
    redirect: '/access-denied',
    component: AdminScreen,
    alias: 'admin',
    name: '管理介面',
    icon: <HomeOutlined />,
  },
];

export const unAuthorizedRoutes = [
  {
    path: '/',
    exact: true,
    redirect: '/login',
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/access-denied',
    exact: true,
    component: AccessDenied,
  },
];
