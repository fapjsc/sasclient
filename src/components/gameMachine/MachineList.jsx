import React, { useState, useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Prop types
import PropTypes from 'prop-types';

// uuid
import { v4 as uuid } from 'uuid';

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
import { egmGpLpCode } from '../../config/egmStatus';

// Icons
import {} from '@ant-design/icons';

// Style
import classes from './MachineList.module.scss';

const { TabPane } = Tabs;

//** All Menu */
const AllMenu = ({ item }) => (
  <Menu key={item.EGMnum}>
    <Menu.Item key="machineNo">
      機台編號：
      {item.EGMnum}
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
      {egmGpLpCode(item.excCode).text}
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
    console.log(e);
  };

  const onClickHandler = (machineNumber) => {
    setShowCashInAndOut(true);
    dispatch(setEgmCashInOut({ machineNumber }));
  };

  useEffect(() => {
    egmStatus.forEach((el) => {
      if (el.excCode && el.excCode !== '0x00') {
        const { EGMnum } = el;
        const { text } = egmGpLpCode(el.excCode);

        toast.error(`${EGMnum} : ${text}`);
      }
    });
  }, [egmStatus]);

  // const classNameHandler = () => {
  //   if (color === 'success') return classes.success;
  //   if (color === 'danger') return classes.danger;
  //   if (color === 'warning') return classes.warning;
  // };

  //** ALL */
  const allDropdownEl = egmStatus
    && egmStatus.map((el) => {
      const { color, text } = egmGpLpCode(el.excCode);
      return (
        <Dropdown key={uuid()} arrow overlay={<AllMenu item={el} />}>
          <div
            role="presentation"
            onClick={() => (color === 'success'
              ? onClickHandler(el.EGMnum)
              : toast.error(`${el.EGMnum} : ${text}`))}
            className={`${classes['drum-pad']}`}
          >
            {(el.EGMnum && el.EGMnum.slice(0, 4)) || '未知'}
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
    EGMnum: PropTypes.number.isRequired,
    creditInCent: PropTypes.number.isRequired,
    excCode: PropTypes.string.isRequired,
  }).isRequired,
};

export default MachineList;
