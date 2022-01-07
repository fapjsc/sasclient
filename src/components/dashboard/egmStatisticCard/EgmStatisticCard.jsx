import React from 'react';
import ProCard, { StatisticCard } from '@ant-design/pro-card';

// Styles
import variable from '../../../sass/variable.module.scss';

const { Statistic } = StatisticCard;

const items = [
  {
    key: '1', title: '全部', value: 10, total: true,
  },
  {
    key: '2', status: 'success', title: '正常', value: 5,
  },
  {
    key: '3', status: 'processing', title: '遊戲中', value: 3,
  },
  {
    key: '4', status: 'warning', title: '異常處理', value: 1,
  },
  {
    key: '5', status: 'error', title: '無法連線', value: 1,
  },
];

export default (category) => {
  console.log(category);
  return (
    <ProCard
      ghost
      style={{
        backgroundColor: `${variable['color-secondary']}`,
      }}
      size="small"
      tabs={{
        onChange: (key) => {
          console.log('key', key);
        },
      }}
    >
      {items.map((item) => {
        const statisticStyle = {
          width: 120,
          borderRight: item.total ? `1px solid ${variable['grey-dark']}` : undefined,
        };

        return (
          <ProCard.TabPane
        // style={{ width: '100%', backgroundColor: 'red' }}
            key={item.key}
            className="1234"
            tab={
          (
            <Statistic
              layout="vertical"
              title={<span style={{ color: `${variable['grey-dark']}` }}>{item.title}</span>}
              value={item.value}
              status={item.status}
              valueStyle={{ color: `${variable['grey-light']}` }}
              style={statisticStyle}
            />
          )
        }
          />
        );
      })}
    </ProCard>
  );
};
