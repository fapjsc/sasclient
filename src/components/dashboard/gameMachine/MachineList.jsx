import React, { useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Prop types
import PropTypes from 'prop-types';

// Toastify
import { toast } from 'react-toastify';

// Antd
import {
  Dropdown, Menu, Space,
} from 'antd';

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
import classes from './MachineList.module.scss';

//** All Menu */
const AllMenu = ({ item, isDisconnect }) => (
  <Menu key={item.number}>
    <Menu.Item key="machineNo">
      機台編號：
      {item.number}
    </Menu.Item>
    <Menu.Item key="machineIP">
      機台編號：
      {item.ip}
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

// const category = {
//   total: { count: 0 },
//   success: { count: 0 },
//   process: { count: 0 },
//   warning: { count: 0 },
//   danger: { count: 0 },
//   default: { count: 0 },
// };

//** Machine List */
const MachineList = () => {
  // Init State
  const [showCashInAndOut, setShowCashInAndOut] = useState(false);

  // Redux
  const dispatch = useDispatch();
  const { egmStatus } = useSelector((state) => state);

  const category = {
    total: { count: egmStatus.length },
  };

  const onClickHandler = (ip) => {
    setShowCashInAndOut(true);
    dispatch(setEgmCashInOut({ ip }));
  };

  //** ALL */
  const allDropdownEl = egmStatus
    && egmStatus.map((el) => {
      const { color, text } = EgmGpLpCode(el.status);
      const isDisconnect = egmIsDisconnect(el.signalConnectionTime);
      return (
        <Dropdown
          key={el.id}
          arrow
          overlay={<AllMenu item={el} isDisconnect={isDisconnect} />}
        >
          <div
            role="presentation"
            className={`${classes['drum-pad']}`}
            color={isDisconnect ? 'danger' : color}
            onClick={() => (true
              ? onClickHandler(el.ip)
              : toast.error(`${el.ip} : ${text}`))}
          >
            {el.number === 0 ? '未設定' : el.number || '未知'}
          </div>
        </Dropdown>
      );
    });

  return (
    <>
      {/* 開分操作 */}
      <CashInAndOut visible={showCashInAndOut} setVisible={setShowCashInAndOut} />

      <EgmStatisticCard category={category} />

      <Space size={[32, 24]} wrap>
        {allDropdownEl}
      </Space>
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
  }).isRequired,
  isDisconnect: PropTypes.bool.isRequired,
};

export default MachineList;
