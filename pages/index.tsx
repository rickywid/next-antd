import React from 'react';
import Head from 'next/head';
import BaseLayout from '../components/layout';
import styles from './index.module.less';

const Home:React.FunctionComponent = () => (
  <BaseLayout>
    <div className={styles.container}>
      <Head>
        <title>My awesome app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        body
      </main>
    </div>
  </BaseLayout>
);

export default Home;
