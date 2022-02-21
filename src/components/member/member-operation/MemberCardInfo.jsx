// eslint-disable-next-line
import React, { useEffect, useState } from 'react';

// Redux
// eslint-disable-next-line
import { useSelector, useDispatch } from 'react-redux';

// Antd
import {
  Descriptions,
  //   Image,
  Space,
  Collapse,
  Tag,
  //   Button,
  //   Select,
} from 'antd';

// Moment
import moment from 'moment';

// Helper
import { thousandsFormat } from '../../../lib/helper';

// Actions
// import {
//   clearMemberData,
//   setCurrentMemberCard,
// } from '../../../store/actions/memberActions';

const { Panel } = Collapse;
// const { Option } = Select;

const MemberInfo = () => {
  // Redux
  //   const dispatch = useDispatch();
  const { memberData, currentCard } = useSelector((state) => state.member);

  const { cards } = memberData || {};

  const card = cards.find((item) => item.card_id === currentCard);

  return (
    <Collapse defaultActiveKey={['1']} bordered={false}>
      <Panel header={<Tag color="green">會員卡資訊</Tag>} key="1">
        <Space size="large" style={{}} align="">
          <Descriptions
            style={{ backgroundColor: '', paddingTop: 0 }}
            labelStyle={{}}
          >
            <Descriptions.Item label="卡號">{card.card_id}</Descriptions.Item>
            <Descriptions.Item label="Point">{thousandsFormat(card.point)}</Descriptions.Item>

            <Descriptions.Item label="free_point">
              {thousandsFormat(card.free_point)}
            </Descriptions.Item>

            <Descriptions.Item label="Holder">{thousandsFormat(card.holder)}</Descriptions.Item>

            <Descriptions.Item label="Level">{card.level}</Descriptions.Item>
            <Descriptions.Item label="type">{card.type}</Descriptions.Item>

            <Descriptions.Item label="Status">{card.status}</Descriptions.Item>
            <Descriptions.Item label="Created">
              {moment(card.created).format('YYYY-MM-DD')}
            </Descriptions.Item>
          </Descriptions>
        </Space>
      </Panel>
    </Collapse>
  );
};

export default MemberInfo;
