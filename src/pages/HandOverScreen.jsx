import React, { useState } from 'react';

// Antd
import { Tabs, Button } from 'antd';
import { CoffeeOutlined } from '@ant-design/icons';

// Components
import HandOverDetail from '../components/handOver/handOverDetail/HandOverDetail';
import HandOverEgmDetail from '../components/handOver/handEgmOverDetail/HandOverEgmDetail';
import ModalConfirm from '../components/ModalConfirm';

const { TabPane } = Tabs;

const CashierScreen = () => {
  // Init State
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const callback = (key) => {
    console.log(key);
  };

  const handoverClickHandler = () => {
    console.log('click');
    setShowModalConfirm(true);
  };

  const OperationsSlot = {
    right: <Button onClick={handoverClickHandler} type="danger" icon={<CoffeeOutlined />}>交班</Button>,
  };

  return (
    <>
      <ModalConfirm visible={showModalConfirm} setVisible={setShowModalConfirm} />
      <Tabs
        defaultActiveKey="handover-egm-detail"
        onChange={callback}
        tabBarGutter={60}
        size="lg"
        tabBarExtraContent={OperationsSlot}
      >
        <TabPane tab="EGM明細" key="handover-egm-detail">
          <HandOverEgmDetail />
        </TabPane>

        <TabPane tab="統計明細" key="handover-detail">
          <HandOverDetail />
        </TabPane>

        <TabPane tab="交班記錄" key="handover-history">
          交班記錄
        </TabPane>
      </Tabs>
    </>
  );
};

export default CashierScreen;
