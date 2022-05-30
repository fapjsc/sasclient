import React, { useState, useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Components
import Video from '../../Video';

// Styles
import styles from './StreamList.module.scss';

const StreamList = () => {
  const [playStatus, setPlayStatus] = useState('loading');
  const { egmStatus } = useSelector((state) => state.showLive);

  useEffect(() => {
    console.log(playStatus);
  }, [playStatus]);

  return (
    <section className={styles['stream-list']}>
      {
        egmStatus.map((el) => (
          <div key={el.ip} className={styles.stream}>
            <Video
              rtcUrl={el.stream}
              play
              setPlayStatus={setPlayStatus}
              egmStatus={egmStatus}
            />
            <span className={styles['member-name']}>{`帳號：${el.member.member_account}`}</span>
          </div>
        ))
      }
    </section>
  );
};

export default StreamList;
