import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Layout from '../../../components/layout';
import getUser from '../../../lib/getUser';
import styles from './user.module.css';

const UserProfile:React.FunctionComponent = ({userID, username}: any) => {
  return (
    <Layout userID = {userID} username={username}>
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

export const getServerSideProps: GetServerSideProps = async ctx => {

  const user = getUser(ctx);
  return { props: { 
    userID: user.id,
    username: user.username
  }};
}

export default UserProfile;
