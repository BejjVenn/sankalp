import React, { useState, useEffect } from 'react';
import './Enroll.css';

const Enroll = () => {
  const [students, setStudents] = useState(Array(5).fill({ userId: '', section: '', name: '' }));
  const [projectTitle, setProjectTitle] = useState('');
  const [groupId, setGroupId] = useState('');

  useEffect(() => {
    const storedProject = localStorage.getItem('selectedProjectTitle');
    if (storedProject) {
      setProjectTitle(storedProject);
    }

    const allEnrollments = JSON.parse(localStorage.getItem('allEnrollments')) || [];
    const newGroupId = (allEnrollments.length + 1).toString().padStart(3, '0');
    setGroupId(`G${newGroupId}`);
  }, []);

  const handleChange = (index, field, value) => {
    const updatedStudents = [...students];
    updatedStudents[index] = { ...updatedStudents[index], [field]: value };
    setStudents(updatedStudents);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEnrollment = { groupId, projectTitle, students };
    const allEnrollments = JSON.parse(localStorage.getItem('allEnrollments')) || [];
    allEnrollments.push(newEnrollment);
    localStorage.setItem('allEnrollments', JSON.stringify(allEnrollments));

    let projectData = JSON.parse(localStorage.getItem('projectDetails'));
    if (projectData.projectTitle === projectTitle) {
      projectData.enrolledGroups = (projectData.enrolledGroups || 0) + 1;
      localStorage.setItem('projectDetails', JSON.stringify(projectData));
    }

    localStorage.setItem('enrolledGroup', JSON.stringify(newEnrollment));
    alert('Enrollment submitted successfully!');
  };

  return (
    <div className="enroll-container">
      <h1 className="enroll-heading">Project Enrollment</h1>
      <form onSubmit={handleSubmit} className="enroll-form">
        {students.map((student, index) => (
          <div className="student-row" key={index}>
            <h3 className="student-label">Student {index + 1}</h3>
            <input
              type="text"
              placeholder="Enter User ID"
              value={student.userId}
              onChange={(e) => handleChange(index, 'userId', e.target.value)}
              className="input-box"
              required
            />
            <input
              type="text"
              placeholder="Enter Section"
              value={student.section}
              onChange={(e) => handleChange(index, 'section', e.target.value)}
              className="input-box"
              required
            />
            <input
              type="text"
              placeholder="Enter Name"
              value={student.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              className="input-box"
              required
            />
          </div>
        ))}
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Enroll;
