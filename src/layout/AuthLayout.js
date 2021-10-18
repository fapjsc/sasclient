import { useState } from 'react';

import SideNav from './SideNav';
import TheFooter from './TheFooter';
// Components
import AutoLogout from '../components/AutoLogout';

import { Link } from 'react-router-dom';

import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons';

import { Layout } from 'antd';

const { Header, Content } = Layout;

const TheLayout = ({ children }) => {
  console.log('auth layout');
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <SideNav />
        <Layout className="site-layout">
          <Header style={{ display: 'flex', alignItems: 'center' }}>
            <AutoLogout />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <TheFooter />
        </Layout>
      </Layout>
    </>
  );
};

export default TheLayout;
