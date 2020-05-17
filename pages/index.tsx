import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import BaseLayout from '../components/layout';
import ProjectsMain from '../components/projects-main';
import styles from './index.module.less';
import data, { IProject } from '../mocks/data';

const Home: NextPage = ({projects}:{children?: React.ReactNode, projects: IProject[]}) => (
  <BaseLayout>
    <div className={styles.container}>
      <Head>
        <title>My awesome app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProjectsMain projects={projects} />
    </div>
      <style global jsx>{`
        body {
          border: 5px solid black;
        }
      `}</style>
  </BaseLayout>
);

export const getServerSideProps: GetServerSideProps<{projects: IProject[]}> = async context => {

  // db queries
  return {
    props: { projects: data.projects }
  }
}

export default Home;

