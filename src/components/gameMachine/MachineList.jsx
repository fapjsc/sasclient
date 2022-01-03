import React, { useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Prop types
import PropTypes from 'prop-types';

// Toastify
import { toast } from 'react-toastify';

// Antd
import {
  Tabs, Badge, Dropdown, Menu, Space,
} from 'antd';

// Actions
import { setEgmCashInOut } from '../../store/actions/egmActions';

// Components
import CashInAndOut from '../cashInAndOut/CashInAndOut';

// Config
import { EgmGpLpCode } from '../../config/egmStatus';

// Icons
import {} from '@ant-design/icons';

// Helpers
import { egmIsDisconnect } from '../../lib/helper';

// Style
import classes from './MachineList.module.scss';

const { TabPane } = Tabs;

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

//** Machine List */
const MachineList = () => {
  // Init State
  const [tabPosition] = useState('top');
  const [showCashInAndOut, setShowCashInAndOut] = useState(false);

  // Redux
  const dispatch = useDispatch();
  const { egmStatus } = useSelector((state) => state);

  const onChangeHandler = (e) => {
    // eslint-disable-next-line
    console.log(e);
  };

  const onClickHandler = (ip) => {
    setShowCashInAndOut(true);
    dispatch(setEgmCashInOut({ ip }));
  };

  // useEffect(() => {
  //   egmStatus.forEach((el) => {
  //     // console.log(el);

  //     if (el.status !== '0x00' && false) {
  //       const { number } = el;
  //       const { text } = EgmGpLpCode(el.status);

  //       toast.error(`${number} : ${text}`);
  //     }
  //   });
  // }, [egmStatus]);

  // const classNameHandler = () => {
  //   if (color === 'success') return classes.success;
  //   if (color === 'danger') return classes.danger;
  //   if (color === 'warning') return classes.warning;
  // };

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
            onClick={() => (true
              ? onClickHandler(el.ip)
              : toast.error(`${el.ip} : ${text}`))}
            className={`${classes['drum-pad']}`}
            color={isDisconnect ? 'danger' : color}
          >
            {el.number || '未知'}
          </div>
        </Dropdown>
      );
    });

  return (
    <>
      {/* 開分操作 */}
      <CashInAndOut visible={showCashInAndOut} setVisible={setShowCashInAndOut} />

      <Tabs
        onChange={onChangeHandler}
        tabBarGutter={80}
        tabPosition={tabPosition}
        size="lg"
        tabBarExtraContent={`數量: ${egmStatus.length}`}
        style={{ padding: '12px' }}
      >
        <TabPane tab={<div>所有機台</div>} key="all">
          <Space size={[32, 24]} wrap>
            {allDropdownEl}
          </Space>
        </TabPane>

        <TabPane tab={<div>連線正常</div>} key="connection">
          連線正常Screen
        </TabPane>

        <TabPane tab={<div>遊戲中</div>} key="isPlaying">
          遊戲中Screen
        </TabPane>

        <TabPane
          tab={(
            <div>
              連線異常
              <span style={{ position: 'absolute', top: -2 }}>
                <Badge count={5} style={{ backgroundColor: 'red' }} />
              </span>
            </div>
          )}
          key="connError"
        >
          連線異常Screen
        </TabPane>
      </Tabs>
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
