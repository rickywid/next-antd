import React, { ReactNode } from 'react';
import { NextPage } from 'next'
import './styles/projects-main.less';
import { Tag } from 'antd';
import { CommentOutlined, HeartOutlined } from '@ant-design/icons';
import Link from 'next/link';

interface IProps {
  children?: ReactNode,
  projects?: any
}

const ProjectsMain:NextPage<IProps> = ({ projects }) => {
  const renderProjects = () => {
    return projects.map((project: any, index: number) => (
      <li className="project-item">
        <Link href="/project/[id]" as={`/project/${project.id}`}>
          <div className="project-card" key={index} style={{ backgroundImage: `url(${project.images[0]}`}}>
            <div className="project-detail-wrapper">
              <div className="project-title-wrapper">
                <h2>{project.name}</h2>
              </div>
              <Tag style={{zIndex: 1000}} onClick={() => console.log('tag clicked')}color="magenta">{project.tags[0]}</Tag>
            </div>
          </div>
        </Link>
        <div className="project-icons">
          <Link href="/user/[username]" as={`/user/${project.username}`}><a>{project.username}</a></Link>
          <div>
            <span className="project-comments"><CommentOutlined /> 20</span><span><HeartOutlined /> 20    </span>     
          </div>
        </div>       
      </li>
    ));
  }

  return (
    <div>
      <ul className="list-wrapper">
        {renderProjects()}
      </ul>
      
    </div>
  );
};

export default ProjectsMain;


