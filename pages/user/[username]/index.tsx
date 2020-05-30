import React from 'react';
import Head from 'next/head';
import Layout from '../../../components/layout';
import styles from './user.module.css';

const UserProfile:React.FunctionComponent = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>User Profile</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          Profile
        </main>
      </div>
    </Layout>
  );
};

export default UserProfile;
