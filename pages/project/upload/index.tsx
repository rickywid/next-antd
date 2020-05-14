import React, { useEffect } from 'react';
import Head from 'next/head';
import Layout from '../../../components/layout';
import styles from './upload-project.module.css';

const UploadProject:React.FunctionComponent = () => {
  useEffect(() => {
    console.log('upload mounted');
  });

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Upload Project</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          Upload Project
        </main>
      </div>
    </Layout>
  );
};

export default UploadProject;
