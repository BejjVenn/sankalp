

import React, { useEffect, useState } from "react";
import "./Projectinfo.css";

const Projectinfo = () => {
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    const storedDetails = localStorage.getItem("projectDetails");
    if (storedDetails) {
      setProjectDetails(JSON.parse(storedDetails));
    }
  }, []);

  return (
    <div className="project-info-container">
      <h1 className="project-title">Project Information</h1>

      {projectDetails ? (
        <div className="project-content">
          <p><strong>Project Title:</strong> {projectDetails.projectTitle}</p>
          <p><strong>Mentor:</strong> {projectDetails.category}</p>
          <p><strong>Problem Statement:</strong> {projectDetails.problemStatement}</p>
          <p><strong>Tech Stack:</strong> {projectDetails.techStack}</p>
          <p>
            <strong>Reference Link: </strong>
            <a href={projectDetails.referenceLink} target="_blank" rel="noopener noreferrer">
              {projectDetails.referenceLink}
            </a>
          </p>
          <p><strong>Maximum Teams:</strong> {projectDetails.maxGroups}</p>
        </div>
      ) : (
        <p>No project details available.</p>
      )}
    </div>
  );
};

export default Projectinfo;
