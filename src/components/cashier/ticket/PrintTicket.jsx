import React from 'react';
import ProCard from '@ant-design/pro-card';

const PrintTicket = () => (
  <div>
    <h1>Print Ticket</h1>
    <ProCard direction="column" ghost gutter={[0, 8]}>
      <ProCard colSpan={8} layout="center" bordered>
        colSpan - 12
      </ProCard>
    </ProCard>
  </div>
);

export default PrintTicket;
