import React, { useEffect, useState } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Antd
import {
  Descriptions, Image, Space, Collapse, Tag, Button,
} from 'antd';

// Moment
import moment from 'moment';

// Helper
import { convertBlobToBase64 } from '../../../lib/helper';

// Actions
import { clearMemberData } from '../../../store/actions/memberActions';

const { Panel } = Collapse;

const MemberInfo = () => {
  // Redux
  const dispatch = useDispatch();
  const { memberData } = useSelector((state) => state.member);

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

  return (
    <Collapse defaultActiveKey={['1']} bordered={false}>
      <Panel header={<Tag color="magenta">會員資訊</Tag>} key="1">
        <Space size="large" style={{}} align="">
          <Image width={200} src={imgSrc} />
          <Descriptions
            title="MEMBER INFO"
            style={{ backgroundColor: '', paddingTop: 0 }}
            extra={(
              <Button
                key="primary"
                type="primary"
                onClick={() => {
                  dispatch(clearMemberData());
                }}
              >
                離開
              </Button>
            )}
          >
            <Descriptions.Item label="ID">{id}</Descriptions.Item>
            <Descriptions.Item label="Account">{account}</Descriptions.Item>
            <Descriptions.Item label="Identity-type">
              {identifyType}
            </Descriptions.Item>
            <Descriptions.Item label="Identity-Number">
              {identifyCard}
            </Descriptions.Item>
            <Descriptions.Item label="Level">{level}</Descriptions.Item>
            <Descriptions.Item label="Name">{name}</Descriptions.Item>
            <Descriptions.Item label="Birthday">
              {moment(birthday).format('YYYY-MM-DD')}
            </Descriptions.Item>
            <Descriptions.Item label="gender">{gender}</Descriptions.Item>
            <Descriptions.Item label="phone">{phone}</Descriptions.Item>
            <Descriptions.Item label="mail">{email}</Descriptions.Item>
            <Descriptions.Item label="Address">{address}</Descriptions.Item>
            <Descriptions.Item label="Note">{note}</Descriptions.Item>
            <Descriptions.Item label="Created">
              {moment(created).format('YYYY-MM-DD')}
            </Descriptions.Item>
          </Descriptions>
        </Space>
      </Panel>
    </Collapse>
  );
};

export default MemberInfo;
