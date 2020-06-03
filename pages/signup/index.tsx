import React, { useState} from 'react';
import Router from 'next/router';
import Head from 'next/head';
import './signup.less';
import {
  Form,
  Input,
  Tooltip,
  Checkbox,
  Button,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Layout from '../../components/layout';
import AuthService from '../../lib/authService';

const SignUp:React.FunctionComponent = () => {
  const api = new AuthService();
  const [form] = Form.useForm();
  const [displayError, setDisplayError] = useState(false);

  const onFinish = async (values) => {
    const { username, email, password } = values;
    const form= new FormData()
    form.append('username', username);
    form.append('email', email);
    form.append('password', password);

    const res = await api.signup(form);
    const user = await res.json();

    if(user.isAuthenticated) {
      Router.replace('/');
    } else {
      setDisplayError(!displayError)
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="content">
          <Head>
            <title>Sign up</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <strong className="signup-title">Sign up</strong>
          {displayError ? 'Username/Email is already taken' : ''}
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            scrollToFirstError
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item
              name="username"
              label={
                (
                  <span>
                    Username&nbsp;
                    <Tooltip title="What do you want others to call you?">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                  )
              }
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))),
                },
              ]}
            >
              <Checkbox>
                I have read and understand the
                <a href="/terms"> rules</a>
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="form-signup-button">
                Sign up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
