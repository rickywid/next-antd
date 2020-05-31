import React, { ReactNode } from 'react';
import { NextPage } from 'next'
import './styles/projects-main.less';
import { Tag } from 'antd';
import { CommentOutlined, DesktopOutlined } from '@ant-design/icons';

interface IProps {
  children?: ReactNode,
  projects?: any
}

const ProjectsMain:NextPage<IProps> = ({ projects }) => {
  const renderTechnologies =  (technology: string) => {
    return <li><Tag color="magenta">{technology}</Tag></li>
  };

  const renderTags =  (tag: string) => {
    return <li><Tag color="blue">{tag}</Tag></li>
  };

  const renderProjects = () => {
    return projects.map((project: any) => (
      <div className="project-card" key={project.id}>
        <div className="project-card-left">
          <img className="img" src={project.images[0]} alt=""/>
          <div className="project-detail">
            <strong>{project.name}</strong>
            <p>{project.tagline}</p>
            <ul className="ul-left">
              <li className="comments"><a href={project.url}><CommentOutlined /> 20</a></li>
              <li><a href={project.url}><DesktopOutlined /></a></li>
            </ul>
            
            <ul className="ul-right">
              {project.technologies ? project.technologies.map(renderTechnologies): <div></div>}
              {project.tags ? project.tags.map(renderTags) : <div></div>}
            </ul>
            
            
            

          </div>
        </div>
        <div className="project-card-right">
         <p>20</p>
        </div>
      </div>
    ))
  }

  return (
    <div>
      {renderProjects()}
    </div>
  );
};

export default ProjectsMain;


