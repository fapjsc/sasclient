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

// Hooks
import { useI18n } from '../i18n';

export const AuthorizedRoutes = () => {
  const { t } = useI18n();

  return [
    {
      path: '/dashboard',
      exact: true,
      permissions: ['admin', 'op'],
      redirect: '/access-denied',
      component: DashboardScreen,
      alias: 'dashboard',
      name: t('side_nav_dashboard'),
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
      name: t('side_nav_member'),
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
      name: t('side_nav_shift'),
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
      name: t('side_nav_shift_detail'),
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
      name: t('side_nav_admin'),
      icon: <SettingOutlined />,
      isMain: true,

      subRoutes: [
        {
          path: '/admin/egm-setting',
          alias: 'egm-setting',
          name: t('side_nav_egm_system'),
        },
        {
          path: '/admin/jackpot-setting',
          alias: 'jackpot',
          name: t('side_nav_jackpot_system'),
        },
        {
          path: '/admin/history-record',
          alias: 'history-record',
          name: t('side_nav_history'),
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
};

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
