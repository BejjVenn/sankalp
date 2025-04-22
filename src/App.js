
// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard"; // New dashboard component
import Home from "./Home";
import AdminPage from "./AdminPage";
import Addproject from "./Addproject"
import Projectinfo from "./Projectinfo"
import ProjectDetails from "./ProjectDetails"
import Enroll from "./Enroll"
import GroupInfo from "./GroupInfo"
import MarkAttendance from "./MarkAttendance"
import QRDisplay from './QRDisplay';

function App () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/addproject" element={<Addproject />} />
        <Route path="/projectinfo" element={<Projectinfo />} />
        <Route path="/projectdetails" element={<ProjectDetails />} />
        <Route path="/enroll" element={<Enroll />} />
        <Route path="/groupinfo" element={<GroupInfo />} />
        <Route path="/markattendance" element={<MarkAttendance />} />
        <Route path="/qr-display" element={<QRDisplay />} />

      </Routes>
    </Router>
  );
};

export default App;





// function App() {
//   const [qrData, setQrData] = useState(null);
//   const [scannedUserId, setScannedUserId] = useState(null);

//   return (
//     <Router>
      

//         <Routes>
//         <Route path="/loign" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/admin" element={<AdminPage />} />
//           <Route path="/homepage" element={<Homepage />} />
//           <Route path="/tattendance" element={<Tattendance setQrData={setQrData} scannedUserId={scannedUserId} />} />
//           <Route path="/mattendance" element={<Mattendance qrData={qrData} setScannedUserId={setScannedUserId} />} />
//         </Routes>
      
//     </Router>
//   );
// }

// export default App;



