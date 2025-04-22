
import React, { useState, useEffect } from "react";
import "./App.css";

const Tattendance = ({ setQrData, scannedUserId }) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [qrCode, setQrCode] = useState(localStorage.getItem("qrCode") || null);
  const [timer, setTimer] = useState(
    localStorage.getItem("qrExpiryTime")
      ? Math.max(0, Math.floor((localStorage.getItem("qrExpiryTime") - Date.now()) / 1000))
      : 0
  );

  useEffect(() => {
    let countdown;
    if (qrCode && timer > 0) {
      setButtonDisabled(true);
      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setQrCode(null);
            setQrData(null);
            localStorage.removeItem("qrCode");
            localStorage.removeItem("qrExpiryTime");
            localStorage.removeItem("scannedUserId");
            setButtonDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [qrCode, timer]);

  const generateQR = () => {
    const username = localStorage.getItem("username") || "UnknownUser";
    const sessionId = `${username}-${Date.now()}`;
    const expiryTime = Date.now() + 2 * 60 * 1000;

    setQrCode(sessionId);
    setQrData(sessionId);
    setButtonDisabled(true);

    localStorage.setItem("qrCode", sessionId);
    localStorage.setItem("qrExpiryTime", expiryTime);
  };

  return (
    <div className="container">
      <h1>Teacher Attendance</h1>
      <button onClick={generateQR} disabled={buttonDisabled} className="generate-btn">
        Generate QR
      </button>
      {qrCode && <p className="timer-text">QR Expires in: {timer} sec</p>}
      {scannedUserId && <p className="scanned-user">Scanned by: {scannedUserId}</p>}
    </div>
  );
};

export default Tattendance;










