import React from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Antd
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { message } from 'antd';

import PropTypes from 'prop-types';

// Helpers
// import { waitTime } from '../../lib/helper';

// Actions
import { userLoginAction } from '../../store/actions/userActions';

// Apis
import { userLogin } from '../../lib/api-store';

const ModalUserLogin = ({ onVisible, onCancel }) => {
  // Redux
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    const result = await userLogin(values);
    if (result.status === 200) {
      dispatch(userLoginAction(result.result));
      onCancel();
      message.success('登入成功');
      return true;
    }

    message.error('登入失敗');
    return false;
  };
  return (
    <ModalForm
      width="30%"
      title="登入"
      visible={onVisible}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel(),
      }}
      onFinish={onFinishHandler}
    >
      <ProFormText
        name="username"
        label="帳號"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined className="prefixIcon" />,
          autoFocus: true,

        }}
        rules={[
          {
            required: true,
            message: '请输入帳號!',
          },
        ]}
      />

      <ProFormText.Password
        name="password"
        label="密碼"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className="prefixIcon" />,
        }}
        rules={[
          {
            required: true,
            message: '请输入密碼!',
          },
        ]}
      />

    </ModalForm>
  );
};

ModalUserLogin.propTypes = {
  onVisible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ModalUserLogin;
