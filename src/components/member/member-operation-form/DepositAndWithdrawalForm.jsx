import React from 'react';

import PropTypes from 'prop-types';

// Antd
import { message } from 'antd';
import { ModalForm, ProFormText, ProFormDigit } from '@ant-design/pro-form';

// Apis
import { memberDepositAndWithdrawal } from '../../../lib/api-store';

const MemberDepositForm = ({
  isShow,
  setShowForm,
  currentCard,
  getMemberHandler,
  type,
}) => {
  const text = type === 'deposit' ? '儲值' : '提領';
  return (
    <ModalForm
      visible={isShow}
      title={`會員${text}`}
      onFinish={async (values) => {
        let result;

        if (type === 'withdrawal') {
          result = await memberDepositAndWithdrawal({
            ...values,
            type: 'withdrawal',
          });
        }

        if (type === 'deposit') {
          result = await memberDepositAndWithdrawal({
            ...values,
            type: 'deposit',
          });
        }

        if (result.status === 200) {
          message.success(`${text}成功`);
          getMemberHandler();
        } else {
          message.error(`${text}失敗`);
        }
        return result.status === 200;
      }}
      modalProps={{
        centered: true,
        width: 400,
        onCancel: () => setShowForm({ isShow: false, type: '' }),
      }}
    >
      <ProFormText
        name="cardId"
        width="80%"
        label="卡號"
        initialValue={currentCard}
        disabled
      />
      <ProFormDigit
        name="cashAmount"
        width="80%"
        label={`${text}金額`}
        fieldProps={{
          formatter: (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        }}
        rules={[
          {
            required: true,
            pattern: new RegExp(/^[1-9]\d*$/),
            message: '请输入正整數',
          },
        ]}
      />
    </ModalForm>
  );
};

MemberDepositForm.propTypes = {
  type: PropTypes.string.isRequired,
  isShow: PropTypes.bool.isRequired,
  setShowForm: PropTypes.func.isRequired,
  currentCard: PropTypes.string.isRequired,
  getMemberHandler: PropTypes.func.isRequired,
};

export default MemberDepositForm;
