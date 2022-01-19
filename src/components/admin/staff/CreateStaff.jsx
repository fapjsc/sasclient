import React, { useRef, useEffect, useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { message } from 'antd';
import crypto from 'crypto';

import { createStaff } from '../../../lib/api-store/admin/staff';

// Helpers
import { getCryptKey } from '../../../lib/api-store';

// Hooks
import useHttp from '../../../hooks/useHttp';

const CreateStaff = () => {
  const [key, setKey] = useState('');

  // Ref
  const formRef = useRef();

  const {
    sendRequest: getCryptKeyReq,
    status: getCryptKeyStatus,
    data: cryptKey,
    error: getCryptKeyError,
  } = useHttp(getCryptKey);

  const {
    sendRequest: createStaffReq,
    status: createStaffStatus,
    data: createStaffData,
    error: createStaffError,
  } = useHttp(createStaff);

  const onFinish = () => {
    getCryptKeyReq();
  };

  // Get CryptKey 監聽
  useEffect(() => {
    if (getCryptKeyStatus === 'pending') return;

    if (getCryptKeyError) {
      message.error(getCryptKeyError);
    }

    if (cryptKey) {
      setKey(cryptKey);
    }
  }, [getCryptKeyStatus, getCryptKeyError, cryptKey]);

  // 獲取crypt key後發送login 請求
  useEffect(() => {
    let formData = formRef.current?.getFieldValue() || null;
    if (!key || !formData) return;

    const password = crypto.publicEncrypt(key, Buffer.from(formData.password));

    formData = {
      ...formData,
      password,
    };

    createStaffReq(formData);
  }, [key, createStaffReq]);

  // 發送登入請求後監聽
  useEffect(() => {
    if (createStaffStatus === 'pending') return;

    if (createStaffError) {
      message.error(createStaffError);
      return;
    }

    if (createStaffStatus === 'completed' && createStaffData) {
      message.success('新增人員成功');
      formRef.current?.resetFields();
    }
  }, [createStaffStatus, createStaffData, createStaffError]);

  return (
    <ProForm
      formRef={formRef}
      onFinish={onFinish}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="account"
          label="帳號"
          rules={[{ required: true, message: '必填' }]}
        />

        <ProFormText
          width="md"
          name="name"
          label="名稱"
          rules={[{ required: true, message: '必填' }]}

        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText.Password
          label="Password"
          name="password"
          rules={[{ required: true, message: '必填' }]}
        />

        <ProFormText
          width="md"
          name="role"
          label="權限"
          initialValue={['test']}
          disabled
        />
      </ProForm.Group>

    </ProForm>
  );
};

export default CreateStaff;
