
// GroupInfo.js
import React, { useEffect, useState } from 'react';
import './GroupInfo.css';
import { FaUserGraduate } from 'react-icons/fa';

const GroupInfo = () => {
  const [groupData, setGroupData] = useState(null);
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('enrolledGroup'));
    const project = JSON.parse(localStorage.getItem('projectDetails'));
    if (data) setGroupData(data);
    if (project && data && project.projectTitle === data.projectTitle) setProjectData(project);
  }, []);

  if (!groupData || !projectData) return <p>Loading...</p>;

  return (
    <div className="group-info-container">
      <div className="group-left">
        <h2>Group & Project Details</h2>
        <p><strong>Group ID:</strong> {groupData.groupId}</p>
        {groupData.students.map((student, index) => (
          <div key={index} className="student-entry">
            <FaUserGraduate className="student-icon" />
            <p><strong>{student.userId}</strong> - {student.name}</p>
          </div>
        ))}
      </div>
      <div className="project-right">
        <h2>{projectData.projectTitle}</h2>
        <p><strong>Mentor:</strong> {projectData.category}</p>
        <p><strong>Description:</strong> {projectData.problemStatement}</p>
        <p ><strong>Reference link : </strong>
            <a className='link' href={projectData.referenceLink} target="_blank" rel="noopener noreferrer">
              {projectData.referenceLink}
            </a></p>
        <p><strong>Max Groups Allowed:</strong> {projectData.maxGroups}</p>
      </div>
    </div>
  );
};

export default GroupInfo;
