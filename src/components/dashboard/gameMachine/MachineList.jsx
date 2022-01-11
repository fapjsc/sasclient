import React, { useState, useRef, useEffect } from 'react';

import { gsap } from 'gsap';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Prop types
import PropTypes from 'prop-types';

// Toastify
import { toast } from 'react-toastify';

// Antd
import { Dropdown, Menu, Space } from 'antd';

// Actions
import { setEgmCashInOut } from '../../../store/actions/egmActions';

// Components
import CashInAndOut from '../cashInAndOut/CashInAndOut';
import EgmStatisticCard from '../egmStatisticCard/EgmStatisticCard';

// Config
import { EgmGpLpCode } from '../../../config/egmStatus';

// Icons
import {} from '@ant-design/icons';

// Helpers
import { egmIsDisconnect } from '../../../lib/helper';

// Style
import styles from './MachineList.module.scss';

//** All Menu */
// eslint-disable-next-line
const AllMenu = ({ item, isDisconnect }) => {
  return (
    <Menu key={item.number}>
      <Menu.Item key="machineNo">
        機台編號：
        {item.number}
      </Menu.Item>
      <Menu.Item key="machineIP">
        機台編號：
        {item.ip}
      </Menu.Item>
      <Menu.Item key="model">
        廠牌：
        {item.model}
      </Menu.Item>
      <Menu.Item key="memberNo">
        會員編號：
        {null}
      </Menu.Item>
      <Menu.Item key="credit">
        積分：
        {item.creditInCent}
      </Menu.Item>
      <Menu.Item key="machineStatus">
        狀態：
        {isDisconnect ? '無法連線' : EgmGpLpCode(item.status).text}
      </Menu.Item>
    </Menu>
  );
};

//** Machine List */
const MachineList = () => {
  // Init State
  const [showCashInAndOut, setShowCashInAndOut] = useState(false);
  const [selectType, setSelectType] = useState('all');

  // Ref
  const toastRef = useRef(null);
  const egmDashboardRef = useRef(null);

  // Redux
  const dispatch = useDispatch();
  const { sections } = useSelector((state) => state.egmStatus);

  const onClickHandler = (ip, isDisconnect) => {
    if (isDisconnect) {
      toastRef.current = toast.error(`${ip} 無法連線`);
      return;
    }

    toast.dismiss();

    setShowCashInAndOut(true);
    dispatch(setEgmCashInOut({ ip }));
  };

  const onFilterHandler = (status) => {
    setSelectType(status);
  };

  const dropEl = sections
    && sections[selectType].items.map((el) => {
      const { color } = EgmGpLpCode(el.status);
      const isDisconnect = egmIsDisconnect(el.signalConnectionTime);
      return (
        <Dropdown
          key={el.id}
          arrow
          overlay={<AllMenu item={el} isDisconnect={isDisconnect} />}
        >
          <div
            role="presentation"
            color={isDisconnect ? 'danger' : color}
            onClick={() => onClickHandler(el.ip, isDisconnect)}
            className={styles['drum-pad']}
          >
            {el.number === 0 ? '未設定' : el.number || '未知'}
          </div>
        </Dropdown>
      );
    });

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(egmDashboardRef.current, { transform: 'scale(0.85)', duration: 0.1, ease: 'ease.out' })
      .to(egmDashboardRef.current, { transform: 'scale(1)', duration: 0.6, ease: 'bounce.out' });
  }, [selectType]);

  return (
    <>
      {/* 開分操作 */}
      <CashInAndOut
        visible={showCashInAndOut}
        setVisible={setShowCashInAndOut}
      />

      <EgmStatisticCard onFilterHandler={onFilterHandler} />

      <div ref={egmDashboardRef}>
        <Space size={[36, 24]} wrap>
          {dropEl}
        </Space>
      </div>
    </>
  );
};

AllMenu.propTypes = {
  item: PropTypes.shape({
    number: PropTypes.number.isRequired,
    creditInCent: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    signalConnectionTime: PropTypes.string,
    ip: PropTypes.string,
    model: PropTypes.string,
  }).isRequired,
  isDisconnect: PropTypes.bool.isRequired,
};

export default MachineList;
