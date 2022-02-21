import React from 'react';

import { useSelector } from 'react-redux';

import { message } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';

// eslint-disable-next-line
const MemberUpdateForm = ({ isShow, setShowForm }) => {
  const { memberData } = useSelector((state) => state.member);
  const {
    member_account: account,
    phone_number: phone,
    address,
    mail_address: email,
    note,
  } = memberData || {};
  return (
    <ModalForm
      title="會員資料更新"
      visible={isShow}
      autoFocusFirstInput
      modalProps={{
        onCancel: () => setShowForm({
          isShow: false,
          type: '',
        }),
      }}
      onFinish={async (values) => {
        console.log(values.name);
        message.success('提交成功');
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="member_account"
          label="會員帳號"
          initialValue={account}
        />
        <ProFormText
          width="md"
          name="phone_number"
          label="會員手機"
          initialValue={phone}
        />
        <ProFormText
          width="lg"
          name="mail_address"
          label="Email"
          initialValue={email}
        />
      </ProForm.Group>

      <ProFormText
        width="80%"
        name="address"
        label="地址"
        initialValue={address}
      />

      <ProFormTextArea
        width="80%"
        name="note"
        label="備註"
        initialValue={note}
      />
    </ModalForm>
  );
};

export default MemberUpdateForm;
