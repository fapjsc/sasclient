import React, { useState, useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Components
import Video from '../../Video';

// Styles
import styles from './StreamList.module.scss';

const StreamList = () => {
  const [playStatus, setPlayStatus] = useState('loading');
  const { egmStatus, filterText } = useSelector((state) => state.showLive);

  const [filterEgm, setFilterEgm] = useState([]);

  useEffect(() => {
    console.log(playStatus);
  }, [playStatus]);

  useEffect(() => {
    if (filterText) {
      const filterList = egmStatus.filter((el) => el.member.member_account.includes(filterText));
      setFilterEgm(filterList);
      return;
    }

    setFilterEgm(egmStatus);
  }, [filterText, egmStatus]);

  return (
    <section className={styles['stream-list']}>
      {
        filterEgm.map((el) => (
          <div key={el.ip} className={styles.stream}>
            <div style={{ height: '80%', width: '100%' }}>
              <Video
                rtcUrl={el.stream}
                play
                setPlayStatus={setPlayStatus}
                egmStatus={egmStatus}
              />
            </div>
            <div className={styles['member-name']}>
              <div>
                玩家：
                {el.member.member_account}
              </div>

              <div>
                遊戲：
                {el.name}
              </div>

            </div>
          </div>
        ))
      }
    </section>
  );
};

export default StreamList;
