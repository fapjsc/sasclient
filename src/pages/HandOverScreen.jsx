import React, { useState } from 'react';

// Antd
import { Tabs } from 'antd';
// import { CoffeeOutlined } from '@ant-design/icons';

// Components
import HandOverDetail from '../components/handOver/handOverDetail/HandOverDetail';
import HandOverEgmDetail from '../components/handOver/handEgmOverDetail/HandOverEgmDetail';
import HandOverRecord from '../components/handOver/handOverRecord/HandOverRecord';
// import ModalConfirm from '../components/ModalConfirm';
import ModalUerLogin from '../components/modal/ModalUserLogin';

const { TabPane } = Tabs;

const CashierScreen = () => {
  // Init State
  const [showModal, setShowModal] = useState(false);
  // const callback = (key) => {
  //   console.log(key);
  // };

  const onShow = () => {
    setShowModal(true);
  };

  const onHide = () => {
    setShowModal(false);
  };

  // const OperationsSlot = {
  //   right: (
  //     <Button onClick={onShow} type="danger" icon={<CoffeeOutlined />}>
  //       交班
  //     </Button>
  //   ),
  // };

  return (
    <>
      <ModalUerLogin onVisible={showModal} onCancel={onHide} />
      <Tabs
        defaultActiveKey="handover-egm-detail"
        // onChange={callback}
        tabBarGutter={60}
        size="lg"
        // tabBarExtraContent={OperationsSlot}
      >
        <TabPane tab="EGM明細" key="handover-egm-detail">
          <HandOverEgmDetail />
        </TabPane>

        <TabPane tab="統計明細" key="handover-detail">
          <HandOverDetail onShow={onShow} />
        </TabPane>

        <TabPane tab="交班記錄" key="handover-history">
          <HandOverRecord />
        </TabPane>
      </Tabs>
    </>
  );
};

export default CashierScreen;
