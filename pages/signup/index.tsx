import React, { useEffect } from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import styles from './signup.module.css';

const SignUp:React.FunctionComponent = () => {
  useEffect(() => {
    console.log('signup mounted');
  });

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>SignUp</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          Signup Page
        </main>
      </div>
    </Layout>
  );
};

export default SignUp;
