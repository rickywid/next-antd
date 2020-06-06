import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import BaseLayout from '../../../components/layout';

const ProjectPage: NextPage = () => {

  return (
      <BaseLayout>
      <div className="root">
        <Head>
          <title>My awesome app</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>view project</div>
    </div>
    </BaseLayout>
  )
};

export default ProjectPage;