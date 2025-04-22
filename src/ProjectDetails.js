
import React, { useState, useEffect } from 'react';
import './ProjectDetails.css';
import ProjectInfo from './Projectinfo';
import { useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProject = localStorage.getItem('projectDetails');
    if (storedProject) {
      const projectData = JSON.parse(storedProject);
      projectData.enrolledGroups = projectData.enrolledGroups || 0;
      setProjects([projectData]);
    }
  }, []);

  const openProjectInfo = (project) => {
    setSelectedProject(project);
  };

  const closeProjectInfo = () => {
    setSelectedProject(null);
  };

  const handleEnroll = (project) => {
    localStorage.setItem('selectedProjectTitle', project.projectTitle);
    navigate('/enroll');
  };

  return (
    <div className="project-details-container">
      <h1 className="project-heading">Project Details</h1>

      {projects.length > 0 ? (
        <table className="project-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Mentor</th>
              <th>Groups Enroll</th>
              <th>Groups Enrolled</th>
              <th>Max Groups</th>
              <th>Project Details</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td>{project.projectTitle}</td>
                <td>{project.category}</td>
                <td>
                  <button
                    className="enroll-button"
                    onClick={() => handleEnroll(project)}
                    disabled={project.enrolledGroups >= project.maxGroups}
                  >
                    Enroll
                  </button>
                </td>
                <td className='green'>{project.enrolledGroups || 0}</td>
                <td className="red">{project.maxGroups}</td>
                <td>
                  <span
                    className="file-icon"
                    onClick={() => openProjectInfo(project)}
                  >
                    📂
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-project-message">No project has been added yet.</p>
      )}

      {selectedProject && (
        <div className="inline-project-info">
          <ProjectInfo project={selectedProject} />
          <button className="close-button" onClick={closeProjectInfo}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;