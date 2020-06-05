import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import BaseLayout from '../components/layout';
import ProjectsMain from '../components/projects-main';
import SearchBar from '../components/search-bar';
import './index.module.less';
import { ApiService } from '../lib/apiService';
import {
  Form,
  Select
} from 'antd';

interface IHome {
  children?: React.ReactNode;
  projects?: [];
  userID?: string;
}

const Home: NextPage = ({projects, userID}: IHome) => {
  const onFormLayoutChange = ({ filter }: []) => {
    console.log(filter);
  };

  return (
      <BaseLayout userID={userID}>
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
          onValuesChange={onFormLayoutChange as any}
        >
          <Form.Item name="filter" label="" initialValue="recent">
            <Select>
              <Select.Option value="recent">Recent</Select.Option>
              <Select.Option value="popular">Popular</Select.Option>
            </Select>
          </Form.Item>
        </Form>
        <ProjectsMain projects={projects}/>
      </div>
        <style global jsx>{`
          
        `}</style>
    </BaseLayout>
  )
};

export const getServerSideProps: GetServerSideProps<{projects: []}> = async ctx => {
  const cookie = ctx.req?.headers.cookie;
  let userID;
  const api = new ApiService(cookie as string);
  const projects = await api.getProjects();
  const json = await projects.json();

  if(ctx.req) {
    userID = cookie?.split('userID=')[1];
  }

  return {
    props: 
      {
        projects:json.data,
        userID
      }
  }
}

export default Home;

