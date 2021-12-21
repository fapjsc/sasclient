import React from 'react';

import PropTypes from 'prop-types';

// Layout
import { Layout } from 'antd';
// import TheFooter from './TheFooter';
import SideNav from './SideNav';
import HeaderContent from './HeaderContent';

// Antd
const { Header, Content } = Layout;

const TheLayout = ({ children }) => {
  console.log('auth layout');
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <SideNav />
        <Layout className="site-layout">
          <Header style={{
            padding: 0,
          }}
          >
            <HeaderContent />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <div
              className="site-layout-background"
              style={{
                padding: 12, minHeight: 360,
              }}
            >
              {children}
            </div>
          </Content>
          {/* <TheFooter /> */}
        </Layout>
      </Layout>
    </>
  );
};

TheLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default TheLayout;
