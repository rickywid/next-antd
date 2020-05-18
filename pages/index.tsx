import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import BaseLayout from '../components/layout';
import ProjectsMain from '../components/projects-main';
import SearchBar from '../components/search-bar';
import data, { IProject } from '../mocks/data';
import './index.module.less';

import {
  Form,
  Select
} from 'antd';

const Home: NextPage = ({projects}:{children?: React.ReactNode, projects: IProject[]}) => {
  const onFormLayoutChange = ({ filter }) => {
    console.log(filter);

    // DB Query to filter results based on selected option
  };

  return (
      <BaseLayout>
      <div className="root">
        <Head>
          <title>My awesome app</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <SearchBar />
        <Form
          labelCol={{ span: 6, offset: 18 }}
          wrapperCol={{ span: 6, offset: 18 }}
          layout="vertical"
          initialValues={{ filter: "recent" }}
          onValuesChange={onFormLayoutChange}
        >
          <Form.Item name="filter" label="" initialValue="recent">
            <Select>
              <Select.Option value="recent">Recent</Select.Option>
              <Select.Option value="popular">Popular</Select.Option>
            </Select>
          </Form.Item>
        </Form>

        <ProjectsMain projects={projects} />
      </div>
        <style global jsx>{`
          
        `}</style>
    </BaseLayout>
  )
};

export const getServerSideProps: GetServerSideProps<{projects: IProject[]}> = async context => {

  // db queries
  return {
    props: { projects: data.projects }
  }
}

export default Home;

