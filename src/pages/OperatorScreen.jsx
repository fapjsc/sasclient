import React from 'react';

// Antd
import { Tabs } from 'antd';

// Components
import OperatorHistory from '../components/operator/OperatorHistory';

const { TabPane } = Tabs;

const OperatorScreen = () => {
  const callback = (key) => {
    // eslint-disable-next-line
    console.log(key);
  };

  return (
    <Tabs
      defaultActiveKey="1"
      onChange={callback}
      tabBarGutter={60}
      size="lg"
      style={{ padding: '12px' }}
    >
      <TabPane tab="櫃檯金額" key="1">
        <ul>
          <li>開班週轉金</li>
          <li>櫃檯抽屜現金補入或提取</li>
        </ul>
      </TabPane>

      <TabPane tab="票務" key="2">
        <p>開票</p>
        <ul>
          <li>一般</li>
          <li>Po</li>
        </ul>
        <p>兑票</p>
        <ul>
          <li>可設定兌換到百位或是千位，剩餘分數自動開票</li>
        </ul>
        <p>分票</p>
        <ul>
          <li>可設定單位及張數，最多分10張</li>
          <li>票卷合併？</li>
        </ul>

        <p>印票</p>
        <ul>
          <li>票號失效</li>
          <li>票號有效，但原票卷無法使用</li>
        </ul>

        <p>票據查詢</p>
      </TabPane>

      <TabPane tab="清箱" key="3">
        機台清鈔
      </TabPane>

      <TabPane tab="操作記錄" key="4">
        <OperatorHistory />
      </TabPane>
    </Tabs>
  );
};

export default OperatorScreen;
