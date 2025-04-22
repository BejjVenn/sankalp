import React, { useState } from "react";
import "./App.css";
import { FaUser, FaEye, FaEyeSlash, FaLock, FaIdCard, FaPhoneAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { firestore } from "./firebase";
import { addDoc, collection } from "firebase/firestore"; 

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    userId: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",

  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    let collectionName = "users"; // Default collection

    if (formData.userId.includes("BD")) {
      collectionName = "users";
    } else if (formData.userId.includes("LE")) {
      collectionName = "teachers";
    } else if (formData.userId.includes("admin")) {
      collectionName = "admin";
    }

    try {
      await addDoc(collection(firestore, collectionName), {
        fullName: formData.fullName,
        userId: formData.userId,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      });

      alert("Registration Successful!");
      navigate("/"); 
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <FaUser className="icon" />
            <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <FaIdCard className="icon" />
            <input type="text" name="userId" placeholder="User ID" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <FaPhoneAlt className="icon" />
            <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handleChange} required />
            <span className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
            <span className="eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button className="login-btn" type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
