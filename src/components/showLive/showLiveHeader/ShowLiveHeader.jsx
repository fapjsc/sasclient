import React from 'react';

// Router props
import { Link } from 'react-router-dom';

// Antd
import { RollbackOutlined } from '@ant-design/icons';

// Components
import SearchBar from '../SearchBar';

// Styles
import styles from './ShowLiveHeader.module.scss';

const ShowLiveHeader = () => (
  <header className={styles.header}>
    <Link to="/">
      <RollbackOutlined style={{ marginRight: '5px' }} />
      返回
    </Link>

    <div style={{
      width: '40%',
      position: 'absolute',
      top: '25%',
      right: '8%',
      zIndex: 20,
    }}
    >
      <SearchBar />
    </div>

  </header>

);

export default ShowLiveHeader;
