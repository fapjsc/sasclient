import { useState, useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { setEgmCashInOut } from '../../store/actions/egmActions';

// Components
import CashInAndOut from '../cashInAndOut/CashInAndOut';

// Hooks
import useHttp from '../../hooks/useHttp';

// Apis
import { getEgmList } from '../../lib/api';

// Helpers
import { _getToken } from '../../lib/helper';

// Toast
import { toast } from 'react-toastify';

// Icons
import { DesktopOutlined } from '@ant-design/icons';

// Antd
import { Tabs, Badge, Dropdown, Button, Menu, Space, Result, Spin } from 'antd';

const { TabPane } = Tabs;

//** All Menu */
const AllMenu = ({ item }) => {
  return (
    <Menu key={item.uiNo}>
      <Menu.Item key="machineNo">機台編號：{item.EGMnum}</Menu.Item>
      <Menu.Item key="memberNo">會員編號：{null}</Menu.Item>
      <Menu.Item key="credit">積分：{item.creditInCent}</Menu.Item>
      <Menu.Item key="machineStatus">狀態：{item.excCode}</Menu.Item>
    </Menu>
  );
};

//** Machine List */
const MachineList = () => {
  // Init State
  const [tabPosition] = useState('top');
  const [showCashInAndOut, setShowCashInAndOut] = useState(false);

  // Redux
  const dispatch = useDispatch();
  const { statusData } = useSelector(state => state.egmStatus);

  // Http hook
  const {
    status: getEgmListStatus,
    error: getEgmListError,
    data: egmListData,
    sendRequest: getEgmListReq,
  } = useHttp(getEgmList);

  const onChangeHandler = e => {
    console.log(e);
  };

  //** 發送get egm list 請求 */
  useEffect(() => {
    if (!_getToken('token')) return;
    const { token } = _getToken('token');
    getEgmListReq(token);
  }, [getEgmListReq]);

  //** 監聽 get egm list錯誤 */
  useEffect(() => {
    if (getEgmListError) {
      toast.error(getEgmListError);
      return;
    }
    console.log(egmListData);
  }, [getEgmListError, egmListData]);

  const onClickHandler = machineNumber => {
    setShowCashInAndOut(true);
    dispatch(setEgmCashInOut({ machineNumber }));
  };

  //** ALL */
  // const allDropdownEl =
  //   egmListData &&
  //   egmListData.map(el => (
  //     <Dropdown key={el.uiNo} overlay={<AllMenu item={el} />} placement="bottomCenter" arrow>
  //       <Button
  //         onClick={() => onClickHandler(el.uiNo)}
  //         type="ghost"
  //         shape="circle"
  //         size="large"
  //         style={{ backgroundColor: 'green' }}
  //       >
  //         {el.uiNo}
  //       </Button>
  //     </Dropdown>
  //   ));

  const allDropdownEl =
    statusData &&
    statusData.map(el => (
      <Dropdown key={el.EGMnum} overlay={<AllMenu item={el} />} placement="bottomCenter" arrow>
        <Button
          onClick={() => onClickHandler(el.EGMnum)}
          type="ghost"
          shape="circle"
          size="large"
          style={{ backgroundColor: el.excCode === '0x00' ? 'green' : 'red' }}
        >
          {el.EGMnum}
        </Button>
      </Dropdown>
    ));

  return (
    <>
      {/* 開分操作 */}
      <CashInAndOut visible={showCashInAndOut} setVisible={setShowCashInAndOut} />

      <Tabs
        onChange={onChangeHandler}
        tabBarGutter={80}
        tabPosition={tabPosition}
        size="lg"
        tabBarExtraContent="數量: 23"
      >
        {/* ALL */}
        <TabPane tab={<div>所有機台</div>} key="all">
          {/* ALL - Loading */}
          {getEgmListStatus === 'pending' && (
            <div style={loadingBox}>
              <Spin size="large" />
            </div>
          )}

          {/* ALL - Success */}
          <Space size={[32, 24]} wrap>
            {!getEgmListError && getEgmListStatus === 'completed' && allDropdownEl}
          </Space>

          {/* ALL - Error */}
          {getEgmListError && getEgmListStatus === 'completed' && (
            <Result title="無法獲取EGM清單" status="warning" />
          )}
        </TabPane>

        <TabPane tab={<div>連線正常</div>} key="connection">
          連線正常
        </TabPane>

        <TabPane tab={<div>遊戲中</div>} key="isPlaying">
          遊戲中
        </TabPane>

        {/* 連線異常 */}
        <TabPane
          tab={
            <div>
              連線異常
              <span style={{ position: 'absolute', top: -2 }}>
                <Badge count={5} style={{ backgroundColor: 'red' }} />
              </span>
            </div>
          }
          key="connError"
        >
          連線異常
        </TabPane>
      </Tabs>
    </>
  );
};

const loadingBox = {
  margin: '8rem 0',
  marginBottom: '20px',
  padding: '30px 50px',
  textAlign: 'center',
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: '4px',
};

export default MachineList;
