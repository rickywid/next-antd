import React from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Link from 'next/link';
import AuthService from '../lib/authService';

const { Sider } = Layout;

interface Props {
  root: string;
  username?: string;
  signup: string;
  login: string;
  upload: string;
  userID?: string | null;
}

const NavBar: NextPage<Props> = ({
  root, username, signup, login, upload, userID
}) => {
  const api = new AuthService();

  const onSignout = async () => {
    const res = await api.signout();

    if(res.status === 200) {
      Router.push('/');
    }
  }

  const authMenu = () => (
    <Menu theme="light" mode="inline">
      
    <Menu.Item key="1">
      <VideoCameraOutlined />
      <Link as={`/user/${username}`} href="/user/[username]">
        <span>{username}</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="4">
      <UserOutlined />
      <Link href={`/project/${upload}`}>
        <span>{upload}</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="5">
      <UserOutlined />
      <Link href={`/users`}>
        <span>users</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="6">
      <UserOutlined />
      <button onClick={onSignout}>signout</button>
      <Link href={`/signout`}>
        <span>signout</span>
      </Link>
    </Menu.Item>
  </Menu>  
  )
  
  const unAuthMenu = () => (
    <Menu theme="light" mode="inline">
      <Menu.Item key="2">
        <UploadOutlined />
        <Link href={`/${signup}`}>
          <span>{signup}</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <UserOutlined />
        <Link href={`/${login}`}>
          <span>{login}</span>
        </Link>
      </Menu.Item>
    </Menu>  
  )

  return (
    <Sider
    breakpoint="lg"
    collapsedWidth="0"
    onBreakpoint={(broken) => {
      console.log(broken);
    }}
    onCollapse={(collapsed, type) => {
      console.log(collapsed, type);
    }}
    >
    <div className="logo">
      <Link href={root}>
        <span>Home</span>
      </Link>
    </div>
    {userID ? authMenu() : unAuthMenu()}
      <style jsx>
        {`
          .logo {
              width: 120px;
              height: 31px;
              background: rgba(255, 255, 255, 0.2);
              margin: 16px 28px 16px 0;
              float: left;
          }

          .site-layout-background {
              background: #fff;
          }
        `}
      </style>
  </Sider>
  )
};

export default NavBar;
