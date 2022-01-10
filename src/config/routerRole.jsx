// @see https://github.com/AlanWei/react-acl-router

import React from 'react';
import {
  DesktopOutlined,
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
  DashboardOutlined,
  // DollarOutlined,
  // HomeOutlined,
  // ToolOutlined,
  // FileZipOutlined,

} from '@ant-design/icons';

//** Authorized Pages */
import DashboardScreen from '../pages/DashboardScreen';
import HandOverScreen from '../pages/HandOverScreen';
// import AdminScreen from '../pages/AdminScreen';
import CashierScreen from '../pages/CashierScreen';
import MemberScreen from '../pages/MemberScreen';

// Admin Page
import EgmSettingScreen from '../pages/admin/EgmSettingScreen';
import JackpotSettingScreen from '../pages/admin/JackpotSettingScreen';
import HistoryRecordScreen from '../pages/admin/historyRecordScreen';

//** unAuthorized Pages */
import Login from '../pages/Login';
import AccessDenied from '../pages/AccessDenied';

export const authorizedRoutes = [
  {
    path: '/dashboard',
    exact: true,
    permissions: ['admin', 'op'],
    redirect: '/access-denied',
    component: DashboardScreen,
    alias: 'dashboard',
    name: '儀錶板',
    icon: <DashboardOutlined />,
    isMain: true,
  },
  {
    path: '/member',
    exact: true,
    permissions: ['admin', 'op'],
    redirect: '/access-denied',
    component: MemberScreen,
    alias: 'member',
    name: '會員',
    icon: <UserOutlined />,
    isMain: true,

  },
  {
    path: '/operator',
    exact: true,
    permissions: ['admin', 'op'],
    redirect: '/access-denied',
    component: CashierScreen,
    alias: 'operator',
    name: '櫃檯值班',
    icon: <DesktopOutlined />,
    isMain: true,

  },
  {
    path: '/cashier',
    exact: true,
    permissions: ['admin', 'op'],
    redirect: '/access-denied',
    component: HandOverScreen,
    alias: 'cashier',
    name: '櫃檯接班明細',
    icon: <FileTextOutlined />,
    isMain: true,

  },

  {
    path: '/admin',
    exact: true,
    permissions: ['admin'],
    redirect: '/access-denied',
    // component: AdminScreen,
    alias: 'admin',
    name: '管理介面',
    icon: <SettingOutlined />,
    isMain: true,

    subRoutes: [
      {
        path: '/admin/egm-setting',
        alias: 'egm-setting',
        name: 'EGM系統',
      },
      {
        path: '/admin/jackpot-setting',
        alias: 'jackpot',
        name: '彩金系統',
      },
      {
        path: '/admin/history-record',
        alias: 'history-record',
        name: '歷史紀錄',
      },

    ],
  },
  {
    path: '/admin/egm-setting',
    exact: true,
    permissions: ['admin'],
    redirect: '/access-denied',
    component: EgmSettingScreen,
    isMain: false,
  },
  {
    path: '/admin/jackpot-setting',
    exact: true,
    permissions: ['admin'],
    redirect: '/access-denied',
    component: JackpotSettingScreen,
    isMain: false,
    alias: 'jackpot',
  },
  {
    path: '/admin/history-record',
    exact: true,
    permissions: ['admin'],
    redirect: '/access-denied',
    component: HistoryRecordScreen,
    isMain: false,
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
