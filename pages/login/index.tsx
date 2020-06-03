import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import {
  Form,
  Input,
  Button,
  Checkbox, 
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Layout from '../../components/layout';
import './login.less';
import AuthService from '../../lib/authService';

interface IFormValues {
  username: string;
  password:string;
}
const Login:React.FunctionComponent = () => {

  const api = new AuthService();
  const [error, setError] = useState<boolean>(false)

  const onFinish = async (values:IFormValues) => {

    const { username, password }: IFormValues = values;
    const form= new FormData()
    form.append('username', username);
    form.append('password', password);

    const res = await api.login(form);
    const user = await res.json();
    
    if(user.isAuthenticated) {
      Router.replace('/');
    } else {
      setError(!error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="content">
          <Head>
            <title>Login</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <strong className="login-title">Log in</strong>
          <small>{error ? 'Username or password is incorrect': ''}</small>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish as any}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link href="/reset-password">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
                <a className="login-form-forgot">Forgot password</a>
              </Link>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or
              <Link href="/register">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
                <a> Register</a>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
