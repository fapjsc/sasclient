import React, { useState, useEffect } from 'react';

import crypto from 'crypto';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Antd
import ProForm, { ModalForm, ProFormText, ProFormMoney } from '@ant-design/pro-form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { message, Button } from 'antd';

// Prop-types
import PropTypes from 'prop-types';

// Hooks
import useHttp from '../../hooks/useHttp';

// Apis
import { getCryptKey } from '../../lib/api-store';

// Actions
import { handoverLogin, handoverLoginStatusClear } from '../../store/actions/handoverLoginActions';
import { setUserInfo } from '../../store/actions/userActions';

// Helpers
import { _removeLocalStorageExLocale, _setToken } from '../../lib/helper';

const ModalUserLogin = ({ onVisible, onCancel }) => {
  // Init State
  const [key, setKey] = useState('');
  const [formData, setFormData] = useState(null);

  // Redux
  const dispatch = useDispatch();

  const {
    data: loginData,
    loading: loginLading,
    error: loginError,
  } = useSelector((state) => state.handoverLogin);

  const {
    sendRequest: getCryptKeyReq,
    status: getCryptKeyStatus,
    data: cryptKey,
    error: getCryptKeyError,
  } = useHttp(getCryptKey);

  const onFinishHandler = (values) => {
    if (!values?.declaredCash) values.declaredCash = 0;
    if (!values?.otherMoneyOutput) values.otherMoneyOutput = 0;

    getCryptKeyReq();
    setFormData(values);
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
    if (!key || !formData) return;

    const password = crypto.publicEncrypt(key, Buffer.from(formData.password));
    const reqData = {
      ...formData,
      password,
    };
    dispatch(handoverLogin(reqData));
  }, [key, formData, dispatch]);

  // 登入後重新設定redux & localStorage
  useEffect(() => {
    if (!loginData || loginError || loginLading) return;

    dispatch(setUserInfo(loginData));
    dispatch(handoverLoginStatusClear());
    _removeLocalStorageExLocale();
    _setToken('token', loginData);
    onCancel();
    message.success({
      content: '交班登入成功',
      key: 'handover-login-success',
    });
    // eslint-disable-next-line
  }, [loginData, loginError, loginLading, dispatch]);

  // Error handler
  useEffect(() => {
    if (loginError || getCryptKeyError) {
      const errorMessage = loginError || getCryptKeyError;
      message.error(errorMessage);
    }
  }, [getCryptKeyError, loginError]);

  return (
    <ModalForm
      width="40%"
      title="交班登入"
      visible={onVisible}
      onFinish={onFinishHandler}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel(),
      }}
      submitter={{
        render: (props, doms) => [
          <Button
            loading={loginLading || getCryptKeyStatus === 'pending'}
            type="primary"
            key="submit"
          // eslint-disable-next-line
            onClick={() => props.form?.submit?.()}
          >
            確認
          </Button>,
          doms[0],
        ],
      }}
    >
      <ProFormText
        name="account"
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

      <ProForm.Group>
        <ProFormMoney
          label="交班餘額"
          name="declaredCash"
        />
        <ProFormMoney
          label="其他收入"
          name="otherMoneyOutput"
        />
      </ProForm.Group>
    </ModalForm>
  );
};

ModalUserLogin.propTypes = {
  onVisible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ModalUserLogin;
