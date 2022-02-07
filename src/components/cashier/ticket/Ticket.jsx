import React, { useState } from 'react';
// import Barcode from 'react-barcode';
// import BarcodeScannerComponent from 'react-qr-barcode-scanner';

// import BarcodeReader from 'react-barcode-reader';

// Antd
import ProCard, { StatisticCard } from '@ant-design/pro-card';

// Components
import CashCheque from './CashCheque';
import PrintTicket from './PrintTicket';

// Styles
import variable from '../../../sass/variable.module.scss';

const { Statistic } = StatisticCard;

const statisticStyle = {
  width: 120,
  borderRight: `1px solid ${variable['grey-dark']}`,
};

const Ticket = () => {
  const [tab, setTab] = useState('print');
  //   const [data, setData] = useState('Not Found');

  // eslint-disable-next-line
  const handleScan = (e) => {
    // setData(e);s
  };

  const onChange = (key) => {
    setTab(key);
  };
  return (
    <ProCard
      ghost
      style={{
        backgroundColor: `${variable['color-secondary']}`,
      }}
      tabs={{
        activeKey: tab,
        onChange: (key) => {
          onChange(key);
        },
      }}
    >
      <ProCard.TabPane
        key="print"
        tab={(
          <Statistic
            layout="vertical"
            value="印票"
            valueStyle={{ color: `${variable['grey-light']}` }}
            style={statisticStyle}
          />
        )}
      >
        <PrintTicket />
      </ProCard.TabPane>

      <ProCard.TabPane
        key="pay"
        tab={(
          <Statistic
            layout="vertical"
            value="兑票"
            valueStyle={{ color: `${variable['grey-light']}` }}
            style={statisticStyle}
          />
        )}
      >
        <CashCheque />
      </ProCard.TabPane>
    </ProCard>
  );
};

export default Ticket;
