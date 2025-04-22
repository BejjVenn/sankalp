// import React from "react";

// const Dashboard = () => {
//   return (
//     <div className="container">
//       <h2>Dashboard</h2>
//       <h1>Hello</h1>
//       <p>Welcome to your dashboard!</p>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from "react";
import { firestore } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const [fullName, setFullName] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      let collectionName = "users"; // Default collection

      if (userId.toUpperCase().includes("BD")) {
        collectionName = "users";
      } else if (userId.toUpperCase().includes("LE")) {
        collectionName = "teachers";
      } else if (userId.toUpperCase().includes("ADMIN")) {
        collectionName = "admin";
      }

      try {
        const usersRef = collection(firestore, collectionName);
        const q = query(usersRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setFullName(userData.fullName);
        } else {
          console.log("User not found in:", collectionName);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div className="dashboard">
      <h2>Welcome, {fullName ? fullName : "User"}!</h2>
      <p>This is your dashboard.</p>
    </div>
  );
};

export default Dashboard;
