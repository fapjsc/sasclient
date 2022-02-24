import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { message } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';

import useHttp from '../../../hooks/useHttp';

// Apis
import { updateMember } from '../../../lib/api-store';

const MemberUpdateForm = ({ isShow, setShowForm }) => {
  const {
    sendRequest: updateMemberReq,
    data: updateMemberData,
    error: updateMemberError,
  } = useHttp(updateMember);

  const { memberData } = useSelector((state) => state.member);
  const {
    member_account: account,
    phone_number: phone,
    address,
    mail_address: email,
    note,
    member_id: memberID,
  } = memberData || {};

  useEffect(() => {
    if (updateMemberError) {
      message.error(updateMemberError);
      return;
    }

    if (updateMemberData === 200) {
      message.success('更新成功');
      setShowForm({
        isShow: false,
        type: '',
      });
    }
  }, [updateMemberData, updateMemberError, setShowForm]);

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
        const {
          member_id: memberId,
          member_account: memberAccount,
          mail_address: mailAddress,
          address: memberAddress,
          note: memberNote,
          phone_number: phoneNumber,
        } = values;

        const formData = {
          memberId,
          memberAccount,
          mailAddress,
          address: memberAddress,
          note: memberNote,
          phoneNumber,
        };

        await updateMemberReq(formData);
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="member_id"
          label="會員ID"
          initialValue={memberID}
          disabled
        />
        <ProFormText
          width="md"
          name="member_account"
          label="會員帳號"
          initialValue={account}
        />
      </ProForm.Group>

      <ProForm.Group>
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

MemberUpdateForm.propTypes = {
  isShow: PropTypes.bool.isRequired,
  setShowForm: PropTypes.func.isRequired,
};

export default MemberUpdateForm;
