
// import React, { useEffect, useState } from 'react';
// import './MarkAttendance.css';
// import { firestore } from './firebase';
// import { doc, setDoc, serverTimestamp, onSnapshot, collection, query, where, getDocs } from "firebase/firestore";

// const MarkAttendance = () => {
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const [scannedUserIds, setScannedUserIds] = useState([]);
//   const [scannedStudents, setScannedStudents] = useState([]);
//   const [selectedYear, setSelectedYear] = useState('');
//   const [selectedBranch, setSelectedBranch] = useState('');
//   const [selectedPeriod, setSelectedPeriod] = useState('');
//   const [selectedSection, setSelectedSection] = useState('');

//   useEffect(() => {
//     const lastGenerated = localStorage.getItem('qrGeneratedAt');
//     if (lastGenerated) {
//       const diff = Date.now() - parseInt(lastGenerated);
//       if (diff < 180000) {
//         setIsButtonDisabled(true);
//         const remaining = 180000 - diff;
//         setTimeout(() => setIsButtonDisabled(false), remaining);
//       }
//     }
//   }, []);  
  
//   useEffect(() => {
//     // Listen for changes to the currentQR document to get scanned users
//     const qrDocRef = doc(firestore, "qr", "currentQR");
    
//     const unsubscribe = onSnapshot(qrDocRef, (docSnap) => {
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         console.log("QR data received:", data);
        
//         // Check if scannedBy array exists and set it to our state
//         if (data.scannedBy && Array.isArray(data.scannedBy)) {
//           console.log("Scanned users:", data.scannedBy);
//           setScannedUserIds(data.scannedBy);
          
//           // Fetch student details for each scanned ID
//           fetchStudentDetails(data.scannedBy);
//         } else {
//           setScannedUserIds([]);
//           setScannedStudents([]);
//         }
//       } else {
//         setScannedUserIds([]);
//         setScannedStudents([]);
//       }
//     });
    
//     return () => unsubscribe();
//   }, []);

//   // Function to fetch student details from their IDs
//   const fetchStudentDetails = async (userIds) => {
//     if (!userIds.length) return;
    
//     try {
//       const studentsData = [];
      
//       // For each user ID, fetch their details from Firestore
//       for (const userId of userIds) {
//         const usersRef = collection(firestore, "users");
//         const q = query(usersRef, where("userId", "==", userId));
        
//         const querySnapshot = await getDocs(q);
//         if (querySnapshot.empty) {
//           // If no match found, just add the ID
//           studentsData.push({
//             id: userId,
//             fullName: "Unknown",
//             section: "Unknown"
//           });
//         } else {
//           querySnapshot.forEach((doc) => {
//             studentsData.push({
//               id: userId,
//               fullName: doc.data().fullName || "Unknown",
//               section: doc.data().section || "Unknown"
//             });
//           });
//         }
//       }
      
//       console.log("Fetched student details:", studentsData);
//       setScannedStudents(studentsData);
//     } catch (error) {
//       console.error("Error fetching student details:", error);
//     }
//   };

//   const handleGenerateQR = async () => {
//     if (isButtonDisabled) return;
    
//     if (!selectedYear || !selectedBranch || !selectedPeriod || !selectedSection) {
//       alert("Please select all fields (Year, Branch, Period, and Section) before generating QR");
//       return;
//     }

//     try {
//       const qrData = `attendance-${Date.now()}`;
//       await setDoc(doc(firestore, "qr", "currentQR"), {
//         qrData: qrData,
//         createdAt: serverTimestamp(),
//         scannedBy: [], // Initialize empty array for scanned students
//         year: selectedYear,
//         branch: selectedBranch,
//         period: selectedPeriod,
//         section: selectedSection
//       });

//       console.log("QR code generated successfully");
//       localStorage.setItem('qrGeneratedAt', Date.now().toString());
//       setIsButtonDisabled(true);
//       setScannedUserIds([]);
//       setScannedStudents([]);

//       setTimeout(() => {
//         setIsButtonDisabled(false);
//         setDoc(doc(firestore, "qr", "currentQR"), { 
//           qrData: "", 
//           createdAt: null,
//           scannedBy: []
//         });
//         localStorage.removeItem('qrGeneratedAt');
//         console.log("QR code expired");
//       }, 180000); // 3 mins
//     } catch (error) {
//       console.error("Error generating QR:", error);
//       alert("Failed to generate QR code. Please try again.");
//     }
//   };

//   return (
//     <div className="attendance-container">
//       <h1 className="main-heading">Mark Attendance</h1>

//       <div className="form-row">
//         <label>Select Year:</label>
//         <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
//           <option value="">Select Year</option>
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//         </select>
//       </div>

//       <div className="form-row">
//         <label>Select Branch:</label>
//         <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
//           <option value="">Select Branch</option>
//           <option value="cse">cse</option>
//           <option value="it">it</option>
//           <option value="csm">csm</option>
//           <option value="csd">csd</option>
//         </select>
//       </div>

//       <div className="form-row">
//         <label>Select Period:</label>
//         <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
//           <option value="">Select Period</option>
//           <option value="acd">acd</option>
//           <option value="coa">coa</option>
//           <option value="ai">ai</option>
//           <option value="ds">ds</option>
//         </select>
//       </div>

//       <div className="form-row">
//         <label>Select Section:</label>
//         <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
//           <option value="">Select Section</option>
//           <option value="A">A</option>
//           <option value="B">B</option>
//           <option value="C">C</option>
//           <option value="D">D</option>
//         </select>
//       </div>

//       <div className="qr-section">
//         <button 
//           className="qr-button" 
//           onClick={handleGenerateQR}
//           disabled={isButtonDisabled}
//         >
//           {isButtonDisabled ? 'QR Generated (Wait...)' : 'Generate QR'}
//         </button>

//         <p className="note">
//           <strong>Note:</strong> This QR will be valid for 3 minutes and visible in the student's login.
//         </p>
        
//         {/* Display scanned student IDs and names */}
//         {scannedUserIds.length > 0 ? (
//           <div className="scanned-users">
//             <h3>Students who scanned ({scannedUserIds.length}):</h3>
//             <table className="attendance-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Section</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {scannedStudents.map((student, index) => (
//                   <tr key={index}>
//                     <td>{student.id}</td>
//                     <td>{student.fullName}</td>
//                     <td>{student.section}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : isButtonDisabled ? (
//           <p>Waiting for students to scan...</p>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default MarkAttendance;








import React, { useEffect, useState } from 'react';
import './MarkAttendance.css';
import { firestore } from './firebase';
import { doc, setDoc, serverTimestamp, onSnapshot, collection, query, where, getDocs } from "firebase/firestore";

const MarkAttendance = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [scannedUserIds, setScannedUserIds] = useState([]);
  const [scannedStudents, setScannedStudents] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [eligibleStudents, setEligibleStudents] = useState([]);
  const [totalEligible, setTotalEligible] = useState(0);

  useEffect(() => {
    const lastGenerated = localStorage.getItem('qrGeneratedAt');
    if (lastGenerated) {
      const diff = Date.now() - parseInt(lastGenerated);
      if (diff < 180000) {
        setIsButtonDisabled(true);
        const remaining = 180000 - diff;
        setTimeout(() => setIsButtonDisabled(false), remaining);
      }
    }
  }, []);  
  
  useEffect(() => {
    // Listen for changes to the currentQR document to get scanned users
    const qrDocRef = doc(firestore, "qr", "currentQR");
    
    const unsubscribe = onSnapshot(qrDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("QR data received:", data);
        
        // Check if scannedBy array exists and set it to our state
        if (data.scannedBy && Array.isArray(data.scannedBy)) {
          console.log("Scanned users:", data.scannedBy);
          setScannedUserIds(data.scannedBy);
          
          // Fetch student details for each scanned ID
          fetchStudentDetails(data.scannedBy);
        } else {
          setScannedUserIds([]);
          setScannedStudents([]);
        }
      } else {
        setScannedUserIds([]);
        setScannedStudents([]);
      }
    });
    
    return () => unsubscribe();
  }, []);

  // Fetch eligible students based on selected branch and section
  useEffect(() => {
    const fetchEligibleStudents = async () => {
      if (!selectedBranch || !selectedSection) return;
      
      try {
        const usersRef = collection(firestore, "users");
        let q = query(
          usersRef, 
          where("branch", "==", selectedBranch),
          where("section", "==", selectedSection)
        );
        
        const querySnapshot = await getDocs(q);
        const students = [];
        querySnapshot.forEach((doc) => {
          students.push({
            id: doc.data().userId,
            fullName: doc.data().fullName || "Unknown",
            ...doc.data()
          });
        });
        
        setEligibleStudents(students);
        setTotalEligible(students.length);
      } catch (error) {
        console.error("Error fetching eligible students:", error);
      }
    };
    
    fetchEligibleStudents();
  }, [selectedBranch, selectedSection]);

  // Function to fetch student details from their IDs
  const fetchStudentDetails = async (userIds) => {
    if (!userIds.length) return;
    
    try {
      const studentsData = [];
      
      // For each user ID, fetch their details from Firestore
      for (const userId of userIds) {
        const usersRef = collection(firestore, "users");
        const q = query(usersRef, where("userId", "==", userId));
        
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          // If no match found, just add the ID
          studentsData.push({
            id: userId,
            fullName: "Unknown",
            section: "Unknown"
          });
        } else {
          querySnapshot.forEach((doc) => {
            studentsData.push({
              id: userId,
              fullName: doc.data().fullName || "Unknown",
              section: doc.data().section || "Unknown",
              branch: doc.data().branch || "Unknown"
            });
          });
        }
      }
      
      console.log("Fetched student details:", studentsData);
      setScannedStudents(studentsData);
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  const handleGenerateQR = async () => {
    if (isButtonDisabled) return;
    
    if (!selectedYear || !selectedBranch || !selectedPeriod || !selectedSection) {
      alert("Please select all fields (Year, Branch, Period, and Section) before generating QR");
      return;
    }

    try {
      const qrData = `attendance-${Date.now()}`;
      await setDoc(doc(firestore, "qr", "currentQR"), {
        qrData: qrData,
        createdAt: serverTimestamp(),
        scannedBy: [], // Initialize empty array for scanned students
        year: selectedYear,
        branch: selectedBranch,
        period: selectedPeriod,
        section: selectedSection
      });

      console.log("QR code generated successfully");
      localStorage.setItem('qrGeneratedAt', Date.now().toString());
      setIsButtonDisabled(true);
      setScannedUserIds([]);
      setScannedStudents([]);

      setTimeout(() => {
        setIsButtonDisabled(false);
        setDoc(doc(firestore, "qr", "currentQR"), { 
          qrData: "", 
          createdAt: null,
          scannedBy: []
        });
        localStorage.removeItem('qrGeneratedAt');
        console.log("QR code expired");
      }, 180000); // 3 mins
    } catch (error) {
      console.error("Error generating QR:", error);
      alert("Failed to generate QR code. Please try again.");
    }
  };

  return (
    <div className="attendance-container">
      <h1 className="main-heading">Mark Attendance</h1>

      <div className="form-row">
        <label>Select Year:</label>
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">Select Year</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      <div className="form-row">
        <label>Select Branch:</label>
        <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
          <option value="">Select Branch</option>
          <option value="cse">cse</option>
          <option value="it">it</option>
          <option value="csm">csm</option>
          <option value="csd">csd</option>
        </select>
      </div>

      <div className="form-row">
        <label>Select Period:</label>
        <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
          <option value="">Select Period</option>
          <option value="acd">acd</option>
          <option value="coa">coa</option>
          <option value="ai">ai</option>
          <option value="ds">ds</option>
        </select>
      </div>

      <div className="form-row">
        <label>Select Section:</label>
        <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
          <option value="">Select Section</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>

      {selectedBranch && selectedSection && (
        <div className="eligible-students">
          <p>Total Students in {selectedBranch.toUpperCase()} - Section {selectedSection}: {totalEligible}</p>
        </div>
      )}

      <div className="qr-section">
        <button 
          className="qr-button" 
          onClick={handleGenerateQR}
          disabled={isButtonDisabled}
        >
          {isButtonDisabled ? 'QR Generated (Wait...)' : 'Generate QR'}
        </button>

        <p className="note">
          <strong>Note:</strong> This QR will be valid for 3 minutes and visible ONLY to {selectedBranch?.toUpperCase()} Section {selectedSection} students.
        </p>
        
        {/* Display attendance stats */}
        {isButtonDisabled && (
          <div className="attendance-stats">
            <p>
              Attendance: {scannedUserIds.length} / {totalEligible} students 
              ({totalEligible > 0 ? Math.round((scannedUserIds.length / totalEligible) * 100) : 0}%)
            </p>
          </div>
        )}
        
        {/* Display scanned student IDs and names */}
        {scannedUserIds.length > 0 ? (
          <div className="scanned-users">
            <h3>Students who scanned ({scannedUserIds.length}):</h3>
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Branch</th>
                  <th>Section</th>
                </tr>
              </thead>
              <tbody>
                {scannedStudents.map((student, index) => (
                  <tr key={index}>
                    <td>{student.id}</td>
                    <td>{student.fullName}</td>
                    <td>{student.branch?.toUpperCase() || "Unknown"}</td>
                    <td>{student.section}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : isButtonDisabled ? (
          <p>Waiting for students to scan...</p>
        ) : null}
      </div>
    </div>
  );
};

export default MarkAttendance;