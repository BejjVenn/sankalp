// import React, { useState } from "react";
// import Tattendence from "./Tattendence";
// import Markattendance from "./Mattendance";

// const Homepage = () => {
//   const [currentPage, setCurrentPage] = useState("home");

//   const handleNavigation = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div style={styles.container}>
//       {currentPage === "home" && (
//         <>
//           <h2>Attendance System</h2>
//           <div style={styles.boxContainer}>
//             <div
//               style={styles.box}
//               onClick={() => handleNavigation("take-attendance")}
//             >
//               Take Attendance
//             </div>
//             <div
//               style={styles.box}
//               onClick={() => handleNavigation("mark-attendance")}
//             >
//               Mark Attendance
//             </div>
//           </div>
//         </>
//       )}

//       {currentPage === "take-attendance" && <Tattendence />}
//       {currentPage === "mark-attendance" && <Markattendance />}
//     </div>
//   );
// };

// const styles = {
//   container: { textAlign: "center", padding: "20px" },
//   boxContainer: { display: "flex", justifyContent: "center", gap: "20px" },
//   box: {
//     width: "200px",
//     height: "80px",
//     backgroundColor: "purple",
//     color: "white",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: "18px",
//     fontWeight: "bold",
//     cursor: "pointer",
//     borderRadius: "10px",
//   },
// };

// export default Homepage;




import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome</h1>
      <p>Select an option:</p>
      
      <button onClick={() => navigate('/tattendance')} style={buttonStyle}>
        Take Attendance
      </button>
      
      <button onClick={() => navigate('/mattendance')} style={buttonStyle}>
        Mark Attendance
      </button>
    </div>
  );
};

// Simple button styling
const buttonStyle = {
  padding: '10px 20px',
  margin: '10px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '5px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
};

export default Homepage;
