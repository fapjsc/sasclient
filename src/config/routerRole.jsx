// @see https://github.com/AlanWei/react-acl-router

import React from 'react';
import {
  DesktopOutlined,
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
  DashboardOutlined,
} from '@ant-design/icons';

//** Authorized Pages */
import DashboardScreen from '../pages/DashboardScreen';
import HandOverScreen from '../pages/HandOverScreen';
import CashierScreen from '../pages/CashierScreen';
import MemberScreen from '../pages/MemberScreen';

// Admin Page
import EgmSettingScreen from '../pages/admin/EgmSettingScreen';
import JackpotSettingScreen from '../pages/admin/JackpotSettingScreen';
import HistoryRecordScreen from '../pages/admin/historyRecordScreen';
import StaffManageScreen from '../pages/admin/StaffManagePage';
import DevScreen from '../pages/admin/DevScreen';

//** unAuthorized Pages */
import Login from '../pages/Login';
import AccessDenied from '../pages/AccessDenied';
import ShowLive from '../pages/ShowLive/ShowLive';

// Hooks
// import { useI18n } from '../i18n';

export const AuthorizedRoutes = () => [
  {
    path: '/dashboard',
    exact: true,
    permissions: ['admin', 'op'],
    redirect: '/access-denied',
    component: DashboardScreen,
    alias: 'dashboard',
    // name: t('side_nav_dashboard'),
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
    // name: t('side_nav_member'),
    name: '會員',
    icon: <UserOutlined />,
    isMain: true,
  },
  {
    path: '/cashier',
    exact: true,
    permissions: ['admin', 'op'],
    redirect: '/access-denied',
    component: CashierScreen,
    alias: 'cashier',
    // name: t('side_nav_shift'),
    name: '櫃檯',
    icon: <DesktopOutlined />,
    isMain: true,
  },
  {
    path: '/handover',
    exact: true,
    permissions: ['admin', 'op'],
    redirect: '/access-denied',
    component: HandOverScreen,
    alias: 'handover',
    // name: t('side_nav_shift_detail'),
    name: '交班明細',
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
    // name: t('side_nav_admin'),
    name: 'Admin',
    icon: <SettingOutlined />,
    isMain: true,

    subRoutes: [
      {
        path: '/admin/egm-setting',
        alias: 'egm-setting',
        // name: t('side_nav_egm_system'),
        name: 'EGM設定',
      },
      {
        path: '/admin/jackpot-setting',
        alias: 'jackpot',
        // name: t('side_nav_jackpot_system'),
        name: 'Jackpot',
      },
      {
        path: '/admin/staff-manage',
        alias: 'staff-manage',
        name: '員工管理',
      },
      {
        path: '/admin/history-record',
        alias: 'history-record',
        // name: t('side_nav_history'),
        name: '歷史紀錄',
      },
      {
        path: '/admin/dev-screen',
        alias: 'dev-screen',
        // name: t('side_nav_history'),
        name: '工程',
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
  {
    path: '/admin/staff-manage',
    exact: true,
    permissions: ['admin'],
    redirect: '/access-denied',
    component: StaffManageScreen,
    isMain: false,
  },
  {
    path: '/admin/dev-screen',
    exact: true,
    permissions: ['admin'],
    redirect: '/access-denied',
    component: DevScreen,
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
    path: '/show-live',
    exact: true,
    component: ShowLive,
  },
  {
    path: '/access-denied',
    exact: true,
    component: AccessDenied,
  },
];
