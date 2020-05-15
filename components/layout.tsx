import React from 'react';
import { Layout } from 'antd';
import NavBar from './navbar';
import Footer from './footer';

const BaseLayout: React.FC = ({ children }: {children: React.ReactNode}) => (
  <Layout style={{ minHeight: '100vh' }}>
    <NavBar
      root="/"
      username="ricky"
      signup="signup"
      login="login"
      upload="upload"
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
