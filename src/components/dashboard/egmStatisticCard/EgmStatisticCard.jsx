import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Antd
import ProCard, { StatisticCard } from '@ant-design/pro-card';

import PropTypes from 'prop-types';

// Styles
import variable from '../../../sass/variable.module.scss';

const { Statistic } = StatisticCard;

const EgmStatisticCard = ({ onFilterHandler }) => {
  const { sections } = useSelector((state) => state.egmStatus);
  return (
    <ProCard
      ghost
      style={{
        backgroundColor: `${variable['color-secondary']}`,
      }}
      size="small"
      tabs={{
        onChange: (key) => {
          onFilterHandler(key);
        },
      }}
    >
      {sections
        && Object.values(sections).map((item) => {
          const statisticStyle = {
            width: 120,
            borderRight: item.total ? `1px solid ${variable['grey-dark']}`
              : undefined,
          };

          return (
            <ProCard.TabPane
              key={item.key}
              tab={(
                <Statistic
                  layout="vertical"
                  title={(
                    <span style={{ color: `${variable['grey-dark']}` }}>
                      {item.title}
                    </span>
                  )}
                  value={item.value}
                  status={item.key}
                  valueStyle={{ color: `${variable['grey-light']}` }}
                  style={statisticStyle}
                />
              )}
            />
          );
        })}
    </ProCard>
  );
};

EgmStatisticCard.propTypes = {
  // category: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  onFilterHandler: PropTypes.func.isRequired,
};

export default EgmStatisticCard;
