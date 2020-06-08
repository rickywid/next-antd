import React, { useState, useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import BaseLayout from '../../../components/layout';
import { ApiService } from '../../../lib/apiService';
import { CodeOutlined, HeartFilled, DesktopOutlined, TagFilled, CalendarFilled, TeamOutlined } from '@ant-design/icons';
import { Form, Input, Button, Divider } from 'antd';
import moment from 'moment';
import { readCookie } from '../../../lib/cookieConf';

import './index.less';

const { TextArea } = Input;

interface IProjectPage {
    children?: React.ReactNode;
    project?: {
        id: string;
        name: string;
        owner: string;
        images: string;
        url: {
            id: number;
            user_id: number;
            comment: string;
            project_id: number;
            created_on: string;
        }[];
    };
    comments?: any[];
    userID?: string | null;
}

interface IFields {
    comment: string;
  }

const api = new ApiService();

const ProjectPage: NextPage = ({ project, comments, userID }: IProjectPage) => {
    const [c, setC] = useState(comments);

    useEffect(() => {
        
    }, [c]);    
    
    const onFinish = async (values: IFields) => {
        
        const { comment } = values;
        const form = new FormData()
        form.append('comment', comment);
        form.append('project_id', project.id);
        form.append('user_id', userID || readCookie('userID'));
    
        const res = await api.createComment(form);

        if(res.status === 200) {
          // do somethings
          setC([...c, {comment: comment, username: readCookie('login'), created_on: comment.created_on}])
        }
      }

    return (
        <BaseLayout>
            <div className="root">
                <Head>
                    <title>My awesome app</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className="project-view">
                    <div className="project-view-title">
                        <div className="project-view-title-info">
                            <h2>{project.name}</h2>
                            <p>by <Link href="/user/[username]" as={`/user/${project.username}`}><a>{project.username}</a></Link></p> 
                        </div>
                        <div className="button-wrap">
                            <Button icon={<HeartFilled />}>Like</Button>                
                            <Button>Save</Button>           
                        </div>

                    </div>
                    <img className="project-view-screenshot" src={project.images[0]} alt="screenshot" />
                    <Divider />
                    <div className="project-view-content">
                        <div className="project-view-left-col">
                            <p>{project.description}</p>

                            {userID ? 
                            <>
                            <Form
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item 
                                name="comment" 
                                rules={[{required: true, message:'Required'}]}
                            >
                            <TextArea rows={2} />
                            </Form.Item>
                            <Button type="primary" htmlType="submit">Send</Button>
                        </Form>
                        <Divider />
                        </>
                            : <p style={{ textAlign: 'center', fontWeight: 'bold'}}>Please <Link href={`/login`}>Log In</Link> to write a comment</p> }

                            <div className="project-view-comments">

                                {c?.map(c => (
                                <div className="project-view-comment">
                                    <div className="project-view-comment-top-wrapper">
                                        <img src="https://illlustrations.co/static/34b8b771e91097048a9494b382ec2fc2/118-macbook.png" alt={`${project.username}'s profile`}/>  
                                        <span className="project-view-comment-user">{c.username}</span>
                                    </div>
                                    <div className="project-view-comment-body">
                                        <p>{c.comment}</p>
                                        <small>{moment(c.created_on).fromNow()}</small>
                                    </div>
                                    <Divider />
                                </div>
                                ))}
                            </div>

                        </div>
                        <div className="project-view-right-col">
                            <a href={project.url}><Button className="website" icon={<DesktopOutlined />} type="primary">Website</Button></a>                     
                            <a href={project.url}><Button className="repo" icon={<CodeOutlined />} type="primary">Repository</Button></a>
                            <Divider />
                            <div className="project-view-tags">
                                <TagFilled />
                                <ul>{project.technologies.map(tag => <li style={{listStyle: 'none'}}>{tag}</li>)}</ul>
                            </div>
                            <Divider />
                            <div className="project-view-details">
                                <ul>
                                    <li><HeartFilled /> 100 likes</li>
                                    <li><TeamOutlined /> Interested in collaborating</li>
                                    <li><CalendarFilled /> Created June 4, 2020</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookie = ctx.req?.headers.cookie;
    let userID;

    const id = ctx.params?.id as string;
    const project = await api.getProject(id);
    const json = await project.json();

    if(ctx.req) {
        userID = cookie?.split(';')[1].split('userID=')[1];
    }
    return {
        props:
        {
            project: json.data,
            comments: json.comments,
            userID: userID || null
        }
    }
}

export default ProjectPage;
