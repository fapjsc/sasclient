import React from 'react';

import { useSelector } from 'react-redux';

// Antd
import { UserOutlined } from '@ant-design/icons';

// Styles
import styles from './UserList.module.scss';

const UserList = () => {
  const { egmStatus } = useSelector((state) => state.showLive);

  return (
    <div className={styles['user-list']}>
      {egmStatus.map((el) => (
        <section key={el.ip} className={styles.user}>
          <UserOutlined />
          {el.member.member_account}
        </section>
      ))}
    </div>
  );
};

export default UserList;
