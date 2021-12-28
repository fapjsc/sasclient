import React, { useEffect, useState, useRef } from 'react';

import { gsap } from 'gsap';

import crypto from 'crypto';

// Router props
import { useHistory } from 'react-router-dom';

// // Redux
import { useDispatch } from 'react-redux';

// Antd
import {
  // eslint-disable-next-line
  Form,
  Input,
  Button,
  message,
} from 'antd';

import { CloseCircleOutlined } from '@ant-design/icons';

// Actions
import { setUserInfo } from '../store/actions/userActions';

// Hooks
import useHttp from '../hooks/useHttp';

// Apis
import { userLogin, getCryptKey } from '../lib/api-store';

// Helpers
import { _setToken, _removeLocalStorageExLocale } from '../lib/helper';

// Config
import { authorizedRoutes } from '../config/routerRole';

// Styles
import styles from './Login.module.scss';

const tl = gsap.timeline();

const Login = () => {
  // Init State
  const [key, setKey] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formValue, setFormValue] = useState(null);

  // Ref
  const formRef = useRef();
  const landingRef = useRef();

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
    // eslint-disable-next-line
    sendRequest: getCryptKeyReq,
    status: getCryptKeyStatus,
    data: cryptKey,
    error: getCryptKeyError,
  } = useHttp(getCryptKey);

  const onFinish = (values) => {
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

      _setToken('token', loginData);
      history.push(authorizedRoutes[0].path);
    }
  }, [loginError, loginData, loginStatus, dispatch, history]);

  useEffect(() => {
    _removeLocalStorageExLocale();
  }, []);

  useEffect(() => {
    if (showForm) {
      // const from = { opacity: 0, scale: 0, ease: 'ease.out' };
      tl.to(formRef.current, { duration: 0.3, opacity: 1, scale: 1.1 })
        .to(formRef.current, { duration: 0.2, opacity: 1, scale: 1 });
    }
  }, [showForm]);

  return (
    <div className={styles['login-page']}>
      {!showForm ? (
        <div
          ref={landingRef}
          role="presentation"
          className={styles['login-button']}
          onClick={() => setShowForm(true)}
        />
      ) : (
        <div className={styles.container} ref={formRef}>
          <h1>Log In</h1>
          <div
            role="presentation"
            className={styles['close-btn']}
            onClick={() => setShowForm(false)}
          >
            <CloseCircleOutlined />
          </div>
          <Form
            name="login"
            // labelCol={{ span: 6 }}
            // wrapperCol={{ span: 18 }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="account"
              rules={[{ required: true, message: '*請輸入帳號!' }]}
            >
              <Input
                placeholder="帳號"
                className={styles.input}
                autoFocus
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '*請輸入密碼!' }]}
            >
              <Input.Password placeholder="密碼" className={styles.input} />
            </Form.Item>

            <Form.Item>
              <Button
                className={styles.button}
                type="primary"
                htmlType="submit"
                loading={
                  loginStatus === 'pending' || getCryptKeyStatus === 'pending'
                }
              >
                {loginStatus === 'pending' || getCryptKeyStatus === 'pending'
                  ? 'loading'
                  : '確定'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Login;
