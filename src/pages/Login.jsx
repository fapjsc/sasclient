import React, { useEffect, useState } from 'react';

// import { JSEncrypt } from 'jsencrypt';

import crypto from 'crypto';

// Router props
import { useHistory } from 'react-router-dom';

// // Redux
import { useDispatch } from 'react-redux';

// Antd
import {
  Form, Input, Button, message,
} from 'antd';

// Toast
// import { toast } from 'react-toastify';

// Actions
import { setUserInfo } from '../store/actions/userActions';

// Hooks
import useHttp from '../hooks/useHttp';

// Apis
import { userLogin, getCryptKey } from '../lib/api-store';

// Helpers
import { _setToken } from '../lib/helper';

// Components
import CenterCard from '../components/ui/CenterCard';

// Config
import { authorizedRoutes } from '../config/routerRole';

const Login = () => {
  // Init State
  const [key, setKey] = useState(null);
  const [formValue, setFormValue] = useState(null);

  // Router Props
  const history = useHistory();

  // Redux
  const dispatch = useDispatch();

  // Http
  const {
    status: loginStatus,
    data: loginData,
    error: loginError,
    sendRequest: loginRequest,
  } = useHttp(userLogin);

  const {
    sendRequest: getCryptKeyReq,
    status: getCryptKeyStatus,
    data: cryptKey,
    error: getCryptKeyError,
  } = useHttp(getCryptKey);

  const onFinish = async (values) => {
    setFormValue(values);
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
    if (!key || !formValue) return;
    // const encrypt = new JSEncrypt();
    // encrypt.setPublicKey(key);
    // const password = encrypt.encrypt(formValue.password);

    const password = crypto.publicEncrypt(key, Buffer.from(formValue.password));

    const formatValue = {
      account: formValue.account,
      password,
    };

    loginRequest(formatValue);
  }, [key, formValue, loginRequest]);

  // 發送登入請求後監聽
  useEffect(() => {
    if (loginStatus === 'pending') return;

    if (loginError) {
      message.error(loginError);
      return;
    }

    if (loginStatus === 'completed' && loginData) {
      dispatch(setUserInfo(loginData));

      _setToken('token',
        loginData);
      history.push(authorizedRoutes[0].path);
    }
  }, [loginError, loginData, loginStatus, dispatch, history]);

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <CenterCard title="Login" style={{ paddingTop: '10rem' }}>
      <Form
        name="login"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        autoComplete="off"
        // initialValues={{ remember: true }}
        // onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="帳號"
          name="account"
          rules={[{ required: true, message: '請輸入帳號!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密碼"
          name="password"
          rules={[{ required: true, message: '請輸入密碼!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" htmlType="submit" loading={loginStatus === 'pending'}>
            {
              loginStatus === 'pending' ? 'loading' : '確定'
            }

          </Button>

        </Form.Item>
      </Form>
    </CenterCard>
  );
};

export default Login;
