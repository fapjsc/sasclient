import React, { useState } from 'react';

// Antd
import { Tabs, Tag, Space } from 'antd';

// Components
import HandOverDetail from '../components/handOver/handOverDetail/HandOverDetail';
import HandOverEgmDetail from '../components/handOver/handEgmOverDetail/HandOverEgmDetail';
import HandOverRecord from '../components/handOver/handOverRecord/HandOverRecord';
import ModalUerLogin from '../components/modal/ModalUserLogin';

const { TabPane } = Tabs;

const CashierScreen = () => {
  // Init State
  const [showModal, setShowModal] = useState(false);
  const [showTag, setShowTag] = useState(true);

  const callback = (key) => {
    if (key === 'handover-detail') {
      setShowTag(false);
    } else {
      setShowTag(true);
    }
  };

  const onShow = () => {
    setShowModal(true);
  };

  const onHide = () => {
    setShowModal(false);
  };

  // const OperationsSlot = {
  //   right: (
  //     <Button onClick={onShow} type="danger">
  //       交班
  //     </Button>
  //   ),
  // };

  return (
    <>
      <ModalUerLogin onVisible={showModal} onCancel={onHide} />
      <Tabs
        defaultActiveKey="handover-egm-detail"
        onChange={callback}
        tabBarGutter={60}
        size="lg"
        // tabBarExtraContent={OperationsSlot}
      >
        <TabPane
          key="handover-egm-detail"
          tab="EGM明細"
        >
          <HandOverEgmDetail />
        </TabPane>

        <TabPane
          key="handover-detail"
          tab={(
            <Space>
              <span>統計明細</span>
              {
                showTag && <Tag color="lime">交班</Tag>
              }
            </Space>
        )}
        >
          <HandOverDetail onShow={onShow} />
        </TabPane>

        <TabPane
          key="handover-history"
          tab="交班記錄"
        >
          <HandOverRecord />
        </TabPane>
      </Tabs>
    </>
  );
};

export default CashierScreen;
