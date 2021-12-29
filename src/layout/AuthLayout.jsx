import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

// Layout
import { Layout } from 'antd';

// Components
import SideNav from './SideNav';
import HeaderContent from './HeaderContent';
import ModalResult from '../components/ModalResult';

// Helper
import { _checkTokenExpire } from '../lib/helper';

// Antd
const { Header, Content } = Layout;

const TheLayout = ({ children }) => {
  console.log('auth layout');
  const [tokenIsExpires, setTokenIsExpires] = useState(false);

  useEffect(() => {
    const result = _checkTokenExpire();

    if (!result || result?.status === 401) {
      console.log(result);
      setTokenIsExpires(true);
    }
  }, [setTokenIsExpires]);
  return (
    <>
      <ModalResult isModalVisible={tokenIsExpires} />
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
