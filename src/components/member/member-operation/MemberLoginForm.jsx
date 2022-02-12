import React, { useState } from 'react';

import { LoginForm, ProFormText } from '@ant-design/pro-form';
import {
  UserOutlined,
  MobileOutlined,
  LockOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import { Tabs, Card } from 'antd';

// eslint-disable-next-line
const MemberLoginForm = ({ memberLoginReq }) => {
  const [loginType, setLoginType] = useState('account');

  return (
    <Card style={{ maxWidth: '550px', margin: 'auto' }}>
      <LoginForm
        onFinish={async (values) => {
          // await waitTime(2000);
          await memberLoginReq(values);
          //   message.success('提交成功');
        }}
      >
        <Tabs
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey)}
        >
          <Tabs.TabPane key="account" tab="帳號" />
          <Tabs.TabPane key="phone" tab="手機" />
          <Tabs.TabPane key="identity-card" tab="證件" />
          <Tabs.TabPane key="member-card" tab="會員卡" />
          <Tabs.TabPane key="virtual-card" tab="QR CODE" />
        </Tabs>
        {loginType === 'account' && (
          <>
            <ProFormText
              name="account"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className="prefixIcon" />,
              }}
              placeholder="帳號"
              rules={[
                {
                  required: true,
                  message: '请输入帳號!',
                },
              ]}
            />

            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className="prefixIcon" />,
              }}
              placeholder="密碼"
              rules={[
                {
                  required: true,
                  message: '請輸入密碼！',
                },
              ]}
            />
          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className="prefixIcon" />,
              }}
              name="phone"
              placeholder="手機號碼"
              rules={[
                {
                  required: true,
                  message: '請輸入手機號碼！',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className="prefixIcon" />,
              }}
              placeholder="密碼"
              rules={[
                {
                  required: true,
                  message: '請輸入密碼！',
                },
              ]}
            />
          </>
        )}

        {loginType === 'identity-card' && (
          <>
            <ProFormText
              name="identity_card"
              fieldProps={{
                size: 'large',
                prefix: <IdcardOutlined className="prefixIcon" />,
              }}
              placeholder="證件號碼"
              rules={[
                {
                  required: true,
                  message: '請輸入證件號碼！',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className="prefixIcon" />,
              }}
              placeholder="密碼"
              rules={[
                {
                  required: true,
                  message: '請輸入密碼！',
                },
              ]}
            />
          </>
        )}
      </LoginForm>
    </Card>
  );
};

export default MemberLoginForm;
