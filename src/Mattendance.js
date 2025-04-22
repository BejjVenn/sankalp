
import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./App.css";

const Mattendance = ({ qrData, setScannedUserId }) => {
  const [scanResult, setScanResult] = useState(null);
  const [scanDisabled, setScanDisabled] = useState(false);

  useEffect(() => {
    const expiryTime = localStorage.getItem("qrExpiryTime");

    if (!qrData || !expiryTime || Date.now() > expiryTime) {
      localStorage.removeItem("qrCode");
      localStorage.removeItem("qrExpiryTime");
      localStorage.removeItem("scannedUserId");
      setScanResult(null);
      setScanDisabled(false);
    }
  }, [qrData]);

  const scanQR = () => {
    if (!qrData) {
      alert("QR not generated or has expired!");
      return;
    }
  
    const studentId = localStorage.getItem("username") || "UnknownStudent";
  
    setScanResult(`Scanned by: ${studentId}`);
  
    if (setScannedUserId) {
      setScannedUserId(studentId);
    }
  
    localStorage.setItem("scannedUserId", studentId);
    setScanDisabled(true);
  };
  
  return (
    <div className="container">
      <h1>Student Attendance</h1>
      {qrData ? (
        <QRCodeCanvas value={qrData} size={200} />
      ) : (
        <p className="no-qr-text">No QR Code Available</p>
      )}
      <button onClick={scanQR} className="scan-btn" disabled={scanDisabled}>
        Scan QR
      </button>
      {scanResult && <p className="scan-result">{scanResult}</p>}
    </div>
  );
};

export default Mattendance;






