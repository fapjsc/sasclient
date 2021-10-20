import { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Actions
import { setUserInfo } from '../store/actions/userActions';

// Hooks
import useHttp from '../hooks/useHttp';

// Apis
import { userLogin } from '../lib/api';

// Helpers
import { _setToken } from '../lib/helper';

// Components
import CenterCard from '../components/ui/CenterCard';

// Config
import { authorizedRoutes } from '../config/routerRole';

// Style
import { Form, Input, Button } from 'antd';

// Toastify
import { toast } from 'react-toastify';

const Login = ({ history }) => {
  // Redux
  const dispatch = useDispatch();

  // Http
  const {
    status: loginStatus,
    data: loginData,
    error: loginError,
    sendRequest: loginRequest,
  } = useHttp(userLogin);

  const onFinish = values => {
    console.log('Success:', values);

    const { username, password } = values;

    const reqData = {
      account: username,
      pwd: password,
    };

    loginRequest(reqData);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  // 發送登入後請求後監聽
  useEffect(() => {
    if (loginError) {
      toast.error(loginError);
      return;
    }

    if (loginStatus === 'completed' && loginData) {
      const loginInfo = { ...loginData };
      delete loginInfo.jwt;

      dispatch(
        setUserInfo({
          token: loginData.jwt,
          loginInfo,
        })
      );

      _setToken('token', loginData.jwt, loginInfo);
      history.push(authorizedRoutes[0].path);
    }
  }, [loginError, loginData, loginStatus, dispatch, history]);

  return (
    <CenterCard title="Login" style={{ marginTop: '10rem' }}>
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <br />
          <Button type="primary" htmlType="submit" loading={loginStatus === 'pending'}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </CenterCard>
  );
};

export default Login;
