import React, { useEffect } from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import styles from './login.module.css';

const Login:React.FunctionComponent = () => {
  useEffect(() => {
    console.log('Login mounted');
  });

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Login</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          Login Page
        </main>
      </div>
    </Layout>
  );
};

export default Login;
