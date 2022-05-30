import React, { useEffect } from 'react';

// Antd
import { Spin } from 'antd';

// Redux
import { useSelector } from 'react-redux';

// Components
import ShowLiveHeader from '../../components/showLive/showLiveHeader/ShowLiveHeader';
import Chat from '../../components/showLive/chat/Chat';
import UserList from '../../components/showLive/userList/UserList';
import StreamList from '../../components/showLive/streamList/StreamList';

// Hooks
import useHttp from '../../hooks/useHttp';

// Apis
import { getOnlineEgmList } from '../../lib/api-store';

// Socket
import { showLiveConnect } from '../../lib/socketConnection';

// Styles
import styles from './ShowLive.module.scss';

const ShowLive = () => {
  const { egmStatus } = useSelector((state) => state.showLive);

  const {
    sendRequest, data, error, status,
  } = useHttp(getOnlineEgmList);

  useEffect(() => {
    showLiveConnect();
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    console.log(data, error, status);
  }, [data, error, status]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ShowLiveHeader />
        <div className={styles.content}>
          <UserList />

          {status === 'pending' && (
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: '12rem',
              }}
            >
              <Spin size="large" />
            </div>
          )}

          {egmStatus.length > 0 && <StreamList />}

          {status !== 'pending' && egmStatus?.length === 0 && (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                fontSize: '3rem',
                paddingTop: '12rem',
                color: '#cac6c6',
              }}
            >
              <h4>目前沒有玩家</h4>
            </div>
          )}
        </div>
        <Chat />
      </div>
    </main>
  );
};

export default ShowLive;
