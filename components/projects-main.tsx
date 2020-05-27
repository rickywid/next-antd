import React, { useEffect } from 'react';
import { NextPage } from 'next'
import './styles/projects-main.less';
import { Tag } from 'antd';
import { CommentOutlined, DesktopOutlined } from '@ant-design/icons';

interface IProject {
  id: number;
  name: string;
  description: string;
  tagline: string;
  url: string;
  technologies: string[] | [];
  tags: string[] | [];
  collaboration: boolean;
  created_on: string;
  user_id: number;
  images: string[];

}

interface IProps {
  children?: React.ReactNode,
  projects: IProject[]
}

const ProjectsMain:NextPage<IProps> = ({ projects }) => {
  console.log(projects)
  const renderTechnologies =  (technology) => {
    return <li><Tag color="magenta">{technology}</Tag></li>
  };

  const renderTags =  (tag) => {
    return <li><Tag color="blue">{tag}</Tag></li>
  };

  const renderProjects = () => {
    return projects.map(project => (
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


