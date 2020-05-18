import React, { useEffect } from 'react';
import { NextPage } from 'next'
import { IProject } from '../mocks/data';
import './styles/projects-main.less';

interface IProps {
  children?: React.ReactNode,
  projects: IProject[]
}

const ProjectsMain:NextPage<IProps> = ({ projects }) => {
  useEffect(() => {
    console.log('projects main mounted');
    
  });
  const renderProjects = () => {
    return projects.map(project => (
      <div className="project-card" key={project.id}>
        <div className="project-card-left">
          <img className="img" src={project.thumbnail} alt=""/>
          <div className="project-detail">
            <strong>{project.name}</strong>
            <p>{project.descriptionShort}</p>
            <small>Comments: {project.commentCount}</small>
            {project.tags.map(tag => <small>{tag}</small>)}
            <a href={project.url}>website</a>
          </div>
        </div>
        <div className="project-card-right">
         <p>{project.upvoteCount}</p>
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


