// import React, { useState } from "react";
// import "./Addproject.css";

// const Addproject = () => {
//   const [formData, setFormData] = useState({
//     projectTitle: "",
//     category: "",
//     problemStatement: "",
//     techStack: "",
//     referenceLink: "",
//     maxGroups: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Project added successfully!");
//     // Clear form fields
//     setFormData({
//       projectTitle: "",
//       category: "",
//       problemStatement: "",
//       techStack: "",
//       referenceLink: "",
//       maxGroups: "",
//     });
//   };

//   return (
//     <div className="form-container">
//       <form className="project-form" onSubmit={handleSubmit}>
//         <h1 className="form-heading">Add Project</h1>

//         <div className="form-row">
//           <label htmlFor="projectTitle">Project Title</label>
//           <input
//             type="text"
//             id="projectTitle"
//             name="projectTitle"
//             value={formData.projectTitle}
//             onChange={handleChange}
//             placeholder="Enter project title"
//             required
//           />
//         </div>

//         <div className="form-row">
//           <label htmlFor="category">Mentor</label>
//           <input
//             type="text"
//             id="category"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             placeholder="Enter mentor name"
//             required
//           />
//         </div>

//         <div className="form-row">
//           <label htmlFor="problemStatement">Problem Statement</label>
//           <textarea
//             id="problemStatement"
//             name="problemStatement"
//             value={formData.problemStatement}
//             onChange={handleChange}
//             placeholder="Explain the project's problem statement in detail..."
//             required
//           />
//         </div>

//         <div className="form-row">
//           <label htmlFor="techStack">Tech Stack</label>
//           <input
//             type="text"
//             id="techStack"
//             name="techStack"
//             value={formData.techStack}
//             onChange={handleChange}
//             placeholder="e.g., MERN, GenAI, ML"
//             required
//           />
//         </div>

//         <div className="form-row">
//           <label htmlFor="referenceLink">Reference Link</label>
//           <input
//             type="url"
//             id="referenceLink"
//             name="referenceLink"
//             value={formData.referenceLink}
//             onChange={handleChange}
//             placeholder="https://example.com/..."
//             required
//           />
//         </div>

//         <div className="form-row">
//           <label htmlFor="maxGroups">Maximum Teams</label>
//           <input
//             type="number"
//             id="maxGroups"
//             name="maxGroups"
//             value={formData.maxGroups}
//             onChange={handleChange}
//             placeholder="Enter maximum teams"
//             min="1"
//             required
//           />
//         </div>

//         <div className="form-row button-row">
//           <button type="submit" className="submit-btn">
//             Add Project
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Addproject;












import React, { useState } from "react";
import "./Addproject.css";

const Addproject = () => {
  const [formData, setFormData] = useState({
    projectTitle: "",
    category: "",
    problemStatement: "",
    techStack: "",
    referenceLink: "",
    maxGroups: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store the project details in localStorage
    localStorage.setItem("projectDetails", JSON.stringify(formData));

    alert("Project added successfully!");

    // Clear form fields
    setFormData({
      projectTitle: "",
      category: "",
      problemStatement: "",
      techStack: "",
      referenceLink: "",
      maxGroups: "",
    });
  };

  return (
    <div className="form-container">
      <form className="project-form" onSubmit={handleSubmit}>
        <h1 className="form-heading">Add Project</h1>

        <div className="form-row">
          <label htmlFor="projectTitle">Project Title</label>
          <input
            type="text"
            id="projectTitle"
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleChange}
            placeholder="Enter project title"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="problemStatement">Problem Statement</label>
          <textarea
            id="problemStatement"
            name="problemStatement"
            value={formData.problemStatement}
            onChange={handleChange}
            placeholder="Explain the project's problem statement in detail..."
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="techStack">Tech Stack</label>
          <input
            type="text"
            id="techStack"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            placeholder="e.g., MERN, GenAI, ML"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="referenceLink">Reference Link</label>
          <input
            type="url"
            id="referenceLink"
            name="referenceLink"
            value={formData.referenceLink}
            onChange={handleChange}
            placeholder="https://example.com/..."
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="maxGroups">Maximum Groups</label>
          <input
            type="number"
            id="maxGroups"
            name="maxGroups"
            value={formData.maxGroups}
            onChange={handleChange}
            placeholder="Enter maximum teams"
            min="1"
            required
          />
        </div>

        <div className="form-row button-row">
          <button type="submit" className="submit-btn">
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addproject;
