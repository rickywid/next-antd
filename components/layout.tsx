import React from 'react';
import { Layout } from 'antd';
import NavBar from './navbar';
import Footer from './footer';

interface IBaseLayout {
  children?: React.ReactNode;
  userID?: string;
}
const BaseLayout: React.FC<IBaseLayout> = ({ children, userID }: IBaseLayout) => (
  <Layout style={{ minHeight: '100vh' }}>
    <NavBar
      root="/"
      username="ricky"
      signup="signup"
      login="login"
      upload="upload"
      userID={userID}
    />
    <Layout>
      <Layout.Content>
        {children}
      </Layout.Content>
      <Footer />
    </Layout>
    <style jsx>
      {`
      .content {
        background: white;
      }
    `}
    </style>
  </Layout>
);

export default BaseLayout;
