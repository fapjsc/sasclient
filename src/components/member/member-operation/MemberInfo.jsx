import React, { useEffect, useState } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Antd
import {
  Descriptions,
  Image,
  Space,
  Collapse,
  Tag,
  Button,
  Select,
} from 'antd';

// Moment
import moment from 'moment';

// Helper
import { convertBlobToBase64 } from '../../../lib/helper';

// Actions
import {
  clearMemberData,
  setCurrentMemberCard,
} from '../../../store/actions/memberActions';

const { Panel } = Collapse;
const { Option } = Select;

// eslint-disable-next-line
const MemberInfo = ({setShowForm}) => {
  // Redux
  const dispatch = useDispatch();
  const { memberData } = useSelector((state) => state.member);

  const { cards } = memberData || {};

  const [imgSrc, setImgSrc] = useState('');
  const {
    id,
    address,
    member_account: account,
    identity_card: identifyCard,
    identity_type: identifyType,
    level,
    name,
    birthday,
    phone_number: phone,
    gender,
    mail_address: email,
    note,
    picture,
    created,
  } = memberData || {};

  useEffect(() => {
    if (!picture) return;
    const imgBase64 = convertBlobToBase64(picture?.data);
    setImgSrc(imgBase64);
  }, [picture]);

  const onChange = (value) => {
    dispatch(setCurrentMemberCard(value));
  };

  return (
    <Collapse defaultActiveKey={['1']} bordered={false}>
      <Panel header={<Tag color="magenta">會員資訊</Tag>} key="1">
        <Space size="large" style={{}} align="">
          <Image width={200} src={imgSrc} />
          <Descriptions
            title={(
              <Select
                style={{ width: 180 }}
                placeholder="選擇虛擬卡"
                onChange={onChange}
              >
                {cards.map((card) => (
                  <Option value={card.card_id}>{card.card_id}</Option>
                ))}
              </Select>
            )}
            style={{ backgroundColor: '', paddingTop: 0 }}
            labelStyle={{}}
            extra={(
              <Space>
                <Button
                  key="primary"
                  type="primary"
                  onClick={() => {
                    console.log('update');
                    setShowForm({
                      isShow: true,
                      type: 'update-member',
                    });
                  }}
                >
                  更新會員資料
                </Button>
                <Button
                  key="danger"
                  type="danger"
                  onClick={() => {
                    dispatch(clearMemberData());
                  }}
                >
                  離開
                </Button>
              </Space>

            )}
          >
            <Descriptions.Item label="ID">{id}</Descriptions.Item>
            <Descriptions.Item label="帳號">{account}</Descriptions.Item>
            <Descriptions.Item label="證件類別">
              {identifyType}
            </Descriptions.Item>
            <Descriptions.Item label="證件號碼">
              {identifyCard}
            </Descriptions.Item>
            <Descriptions.Item label="會員等級">
              {level || '無卡'}
            </Descriptions.Item>
            <Descriptions.Item label="會員姓名">{name}</Descriptions.Item>
            <Descriptions.Item label="生日">
              {moment(birthday).format('YYYY-MM-DD')}
            </Descriptions.Item>
            <Descriptions.Item label="性別">{gender}</Descriptions.Item>
            <Descriptions.Item label="手機號碼">{phone}</Descriptions.Item>
            <Descriptions.Item label="Email">{email}</Descriptions.Item>
            <Descriptions.Item label="加入入期">
              {moment(created).format('YYYY-MM-DD')}
            </Descriptions.Item>
            <Descriptions.Item style={{}} span={3} label="地址">
              {address}
            </Descriptions.Item>
            <Descriptions.Item style={{}} span={3} label="備註">
              {note}
            </Descriptions.Item>
          </Descriptions>
        </Space>
      </Panel>
    </Collapse>
  );
};

export default MemberInfo;
