import React from 'react';

// Antd
import ProForm, {
  ProFormText,
  ProFormDatePicker,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-form';

// eslint-disable-next-line
const AddMemberStep1 = ({ data, hasCard, setHasCard }) => {
  const { identityTypeList, levelList } = data || {};

  return (
    <div style={{ marginTop: '0rem' }}>

      <ProForm.Group>
        <ProFormText
          label="會員姓名"
          name="name"
          width={200}
          rules={[
            {
              required: true,
            },
          ]}
        />
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          width={200}
          name="phone_number"
          label="電話"
        />
        <ProFormSelect
          label="選擇性別"
          name="gender"
          width={200}
          valueEnum={{
            male: '男',
            female: '女',
            other: '其他',
          }}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText
          label="帳號"
          name="member_account"
          width={200}
          rules={[
            {
              required: true,
            },
          ]}
        />

        <ProFormText.Password
          label="會員密碼"
          name="member_password"
          width={200}
          rules={[
            {
              required: true,
            },
          ]}
        />
        <ProFormText.Password
          label="確認密碼"
          name="confirm"
          width={200}
          dependencies={['member_password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '請確認密碼!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('member_password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                );
              },
            }),
          ]}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormSelect
          label="選擇證件"
          name="identity_type"
          width={300}
          options={identityTypeList}
          rules={[
            {
              required: true,
            },
          ]}
        />
        <ProFormText
          label="證件號碼"
          name="identity_card"
          width={300}
          rules={[
            {
              required: true,
            },
          ]}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText label="電子信箱" name="mail_address" width={300} />
        <ProFormText label="地址" name="address" width={300} />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormDatePicker label="會員生日" name="birthday" width={300} />

        {hasCard && (
          <ProFormSelect
            label="卡片等級"
            name="level"
            width={300}
            options={levelList}
          />
        )}
      </ProForm.Group>

      <ProForm.Group>
        <ProFormTextArea
          label="備註"
          name="note"
          width={430}
          fieldProps={{ rows: 6 }}
        />
      </ProForm.Group>
    </div>
  );
};

export default AddMemberStep1;
