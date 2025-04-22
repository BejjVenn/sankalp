
// import React, { useEffect, useState } from "react";
// import { firestore } from "./firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { useLocation } from "react-router-dom";

// const Dashboard = () => {
//   const [fullName, setFullName] = useState("");
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const userId = searchParams.get("userId");

//   useEffect(() => {
//     if (!userId) return;

//     const fetchUserData = async () => {
//       let collectionName = "users"; // Default collection

//       if (userId.toUpperCase().includes("BD")) {
//         collectionName = "users";
//       } else if (userId.toUpperCase().includes("LE")) {
//         collectionName = "teachers";
//       } else if (userId.toUpperCase().includes("ADMIN")) {
//         collectionName = "admin";
//       }

//       try {
//         const usersRef = collection(firestore, collectionName);
//         const q = query(usersRef, where("userId", "==", userId));
//         const querySnapshot = await getDocs(q);

//         if (!querySnapshot.empty) {
//           const userData = querySnapshot.docs[0].data();
//           setFullName(userData.fullName);
//         } else {
//           console.log("User not found in:", collectionName);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   return (
//     <div className="dashboard">
//       <h2>Welcome, {fullName ? fullName : "User"}!</h2>
//       <p>This is your dashboard.</p>
//     </div>
//   );
// };

// export default Dashboard;





import React, { useEffect, useState } from "react";
import { firestore } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Home.css"; // Import CSS file

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [userId, setUserId] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const loggedInUserId = searchParams.get("userId");

  useEffect(() => {
    if (!loggedInUserId) return;

    const fetchUserData = async () => {
      let collectionName = "users"; // Default collection

      if (loggedInUserId.toUpperCase().includes("BD")) {
        collectionName = "users";
      } else if (loggedInUserId.toUpperCase().includes("LE")) {
        collectionName = "teachers";
      } else if (loggedInUserId.toUpperCase().includes("ADMIN")) {
        collectionName = "admin";
      }

      try {
        const usersRef = collection(firestore, collectionName);
        const q = query(usersRef, where("userId", "==", loggedInUserId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setFullName(userData.fullName);
          setUserId(userData.userId);
        } else {
          console.log("User not found in:", collectionName);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [loggedInUserId]);

  // Function to close the menu when clicking anywhere outside
  const handleOutsideClick = (e) => {
    if (!e.target.closest(".sidebar") && !e.target.closest(".menu-btn")) {
      setMenuOpen(false);
    }
  };

  // Logout function
  const handleLogout = () => {
    navigate("/login"); // Navigates to Login.js
  };

  return (
    <div className="dashboard" onClick={handleOutsideClick}>
      {/* Top Section with Logo and Name */}
      <div className="top-bar">
        <div className="logo"></div> {/* Dummy Logo */}
        <h1 className="sankalp-title">SANKALP</h1>
      </div>

      {/* Header */}
      <div className="header">
        <div className="header-left">
          <button className="menu-btn" onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <h1 className="title">Dashboard</h1>
        </div>
        <div className="header-right">
          <div className="user-info">
            <p className="username">{fullName || "User"}</p>
            <p className="userid">( {userId || "N/A"}  )</p> {/* ✅ User ID below name */}
          </div>
          <div className="profile-icon"></div>
        </div>
      </div>

      {/* Sidebar Menu (Closes when clicking anywhere outside) */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>
        <ul>
          {/* {["Team Mates Info", "Project Info", "Reviews", "Milestones", "Certificates"].map((item, index) => (
            <li key={index} className="menu-item">{item}</li>
          ))} */}

          {[
            { label: "Team Mates Info" ,route: "/groupinfo"},
            // { label: "Project Info"},
            { label: "Reviews" },
            { label: "Milestones" },
            { label: "Certificates" },
          ].map((item, index) => (
            <li 
              key={index} 
              className="menu-item" 
              onClick={() => {
                if (item.route) navigate(item.route);
              }}
            >
              {item.label}
            </li>
          ))}


          <li className="menu-item logout" onClick={handleLogout}>Logout</li> {/* ✅ Redirects to Login.js */}
        </ul>
      </div>

      {/* Cards Section */}
      <div className="cards">
        {[
          { label: "Take Attendance", icon: "📋" ,route: "/qr-display"},
          { label: "Project Details", icon: "📝", route: "/projectdetails" },
          { label: "Attendance % ", icon: "🎓" },
        ].map((card, index) => (
          <div key={index} className="card">
            <div className="card-icon">{card.icon}</div>
            <button 
                  className="card-btn" 
            onClick={() => {
              if (card.route) navigate(card.route); // Navigates if a route is defined
            }}
           >
           {card.label}
           </button>
          </div>
        ))}
      </div>
    </div>
  );
}

