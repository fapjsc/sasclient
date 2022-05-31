import React from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Antd
import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';

// Actions
import { setFilterText } from '../../../store/actions/showLiveActions';

// Styles
import styles from './UserList.module.scss';

const UserList = () => {
  const { egmStatus, filterText } = useSelector((state) => state.showLive);

  const dispatch = useDispatch();

  const userSelectClick = (value) => {
    dispatch(setFilterText(value));
  };

  const cancelSelect = () => {
    dispatch(setFilterText(''));
  };
  return (
    <div className={styles['user-list']}>
      <Button disabled={!filterText || !egmStatus.length} onClick={cancelSelect} style={{ marginBottom: '1rem' }}>全部</Button>
      {egmStatus.map((el) => (
        <section role="presentation" onClick={() => userSelectClick(el.member.member_account)} key={el.ip} className={styles.user}>
          <UserOutlined />
          {el.member.member_account}
        </section>
      ))}
    </div>
  );
};

export default UserList;
