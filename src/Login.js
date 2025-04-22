
import React, { useState } from "react";
import "./App.css";
import { FaUser, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { firestore } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    let collectionName = "users"; 

    if (username.includes("BD")) {
      collectionName = "users";
    } else if (username.includes("LE")) {
      collectionName = "teachers";
    } else if (username.includes("admin")) {
      collectionName = "admin";
    }

    const usersRef = collection(firestore, collectionName);
    const q = query(usersRef, where("userId", "==", username), where("password", "==", password));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // Store user data for later use
        const userData = querySnapshot.docs[0].data();
        // Store userId in localStorage for persistence across app
        localStorage.setItem('currentUserId', username);
        
        if (username.toUpperCase().includes("BD")) {
          // For students - redirect to dashboard with userId
          navigate(`/dashboard?userId=${username}`);
        }
        else if (username.toUpperCase().includes("LE")) {
          // For teachers - redirect to home with userId
          navigate(`/home?userId=${username}`);
        } else if (username.includes("admin")) {
          navigate("/admin");
        }
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <FaUser className="icon" />
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="eye-btn">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button className="login-btn" type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;