

// import React, { useEffect, useState } from 'react';
// import { QRCodeSVG } from 'qrcode.react';
// import { doc, onSnapshot, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
// import { firestore } from './firebase';
// import { useLocation } from 'react-router-dom';

// const QRDisplay = () => {
//   const [qrData, setQRData] = useState('');
//   const [isExpired, setIsExpired] = useState(false);
//   const [scanned, setScanned] = useState(false);
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const userId = queryParams.get('userId') || localStorage.getItem('currentUserId');

//   useEffect(() => {
//     const qrDocRef = doc(firestore, 'qr', 'currentQR');

//     const unsubscribe = onSnapshot(qrDocRef, (docSnap) => {
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         const createdAt = data.createdAt?.seconds * 1000;

//         if (data.qrData && createdAt) {
//           const now = Date.now();
//           const diff = now - createdAt;

//           if (diff <= 180000) {
//             setQRData(data.qrData);
//             setIsExpired(false);

//             // Check if this user already scanned this QR
//             if (data.scannedBy && data.scannedBy.includes(userId)) {
//               setScanned(true);
//             } else {
//               setScanned(false);
//             }

//           } else {
//             setQRData('');
//             setIsExpired(true);
//             setScanned(false);
//           }
//         } else {
//           setQRData('');
//           setIsExpired(true);
//           setScanned(false);
//         }
//       } else {
//         setQRData('');
//         setIsExpired(true);
//         setScanned(false);
//       }
//     });

//     return () => unsubscribe();
//   }, [userId]);

//   const handleScanQR = async () => {
//     if (!scanned && userId) {
//       try {
//         console.log("Attempting to scan with userId:", userId);
        
//         // We'll update the current QR document with this student's ID
//         const qrDocRef = doc(firestore, 'qr', 'currentQR');
        
//         // First check if the document exists
//         const docSnap = await getDoc(qrDocRef);
//         if (docSnap.exists()) {
//           // Update the document with the student ID
//           await updateDoc(qrDocRef, {
//             scannedBy: arrayUnion(userId)
//           });
          
//           console.log("QR Scanned Successfully with ID:", userId);
//           alert("QR Scanned Successfully!");
//           setScanned(true);
//         } else {
//           alert("QR code is no longer active.");
//         }
//       } catch (error) {
//         console.error("Error updating scanned status:", error);
//         alert("Failed to record attendance. Please try again.");
//       }
//     }
//   };

//   return (
//     <div style={{ textAlign: 'center', marginTop: '40px' }}>
//       <h2>Scan Attendance QR</h2>
//       {qrData && !isExpired ? (
//         <>
//           <QRCodeSVG value={qrData} size={200} />
//           <p style={{ marginTop: '10px' }}>Please scan the QR using your app.</p>
//           <p>Student ID: {userId}</p>
//           <button 
//             style={{ 
//               marginTop: '15px', 
//               padding: '10px 20px',
//               backgroundColor: scanned ? '#ccc' : '#4CAF50',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: scanned ? 'not-allowed' : 'pointer'
//             }} 
//             onClick={handleScanQR}
//             disabled={scanned}
//           >
//             {scanned ? 'Already Scanned' : 'Scan QR'}
//           </button>
//         </>
//       ) : (
//         <p style={{ color: 'red' }}>QR code is not available or has expired.</p>
//       )}
//     </div>
//   );
// };

// export default QRDisplay;







import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { doc, onSnapshot, updateDoc, arrayUnion, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from './firebase';
import { useLocation } from 'react-router-dom';

const QRDisplay = () => {
  const [qrData, setQRData] = useState('');
  const [isExpired, setIsExpired] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);
  const [qrInfo, setQrInfo] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId') || localStorage.getItem('currentUserId');

  // Fetch student information when component loads
  useEffect(() => {
    const fetchStudentInfo = async () => {
      if (!userId) return;
      
      try {
        const usersRef = collection(firestore, "users");
        const q = query(usersRef, where("userId", "==", userId));
        
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setStudentInfo(querySnapshot.docs[0].data());
        }
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };
    
    fetchStudentInfo();
  }, [userId]);

  useEffect(() => {
    const qrDocRef = doc(firestore, 'qr', 'currentQR');

    const unsubscribe = onSnapshot(qrDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const createdAt = data.createdAt?.seconds * 1000;
        setQrInfo(data);

        if (data.qrData && createdAt) {
          const now = Date.now();
          const diff = now - createdAt;

          if (diff <= 180000) {
            // Check if student branch and section match the QR requirements
            const isAuthorized = checkAuthorization(data, studentInfo);
            setAuthorized(isAuthorized);
            
            if (isAuthorized) {
              setQRData(data.qrData);
              setIsExpired(false);

              // Check if this user already scanned this QR
              if (data.scannedBy && data.scannedBy.includes(userId)) {
                setScanned(true);
              } else {
                setScanned(false);
              }
            } else {
              setQRData('');
            }
          } else {
            setQRData('');
            setIsExpired(true);
            setScanned(false);
          }
        } else {
          setQRData('');
          setIsExpired(true);
          setScanned(false);
        }
      } else {
        setQRData('');
        setIsExpired(true);
        setScanned(false);
      }
    });

    return () => unsubscribe();
  }, [userId, studentInfo]);

  // Function to check if student is authorized to see this QR code
  const checkAuthorization = (qrData, studentInfo) => {
    if (!studentInfo || !qrData) return false;
    
    // Check if the student's branch and section match what the teacher selected
    return (
      (!qrData.branch || qrData.branch === studentInfo.branch) && 
      (!qrData.section || qrData.section === studentInfo.section)
    );
  };

  const handleScanQR = async () => {
    if (!scanned && userId && authorized) {
      try {
        console.log("Attempting to scan with userId:", userId);
        
        // We'll update the current QR document with this student's ID
        const qrDocRef = doc(firestore, 'qr', 'currentQR');
        
        // First check if the document exists
        const docSnap = await getDoc(qrDocRef);
        if (docSnap.exists()) {
          // Update the document with the student ID
          await updateDoc(qrDocRef, {
            scannedBy: arrayUnion(userId)
          });
          
          console.log("QR Scanned Successfully with ID:", userId);
          alert("QR Scanned Successfully!");
          setScanned(true);
        } else {
          alert("QR code is no longer active.");
        }
      } catch (error) {
        console.error("Error updating scanned status:", error);
        alert("Failed to record attendance. Please try again.");
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>Scan Attendance QR</h2>
      
      {qrData && !isExpired && authorized ? (
        <>
          <QRCodeSVG value={qrData} size={200} />
          <p style={{ marginTop: '10px' }}>Please scan the QR using your app.</p>
          <p>Student ID: {userId}</p>
          {qrInfo && (
            <p>
              Class: {qrInfo.year} Year, {qrInfo.branch?.toUpperCase()}, 
              Section {qrInfo.section}, Period: {qrInfo.period?.toUpperCase()}
            </p>
          )}
          <button 
            style={{ 
              marginTop: '15px', 
              padding: '10px 20px',
              backgroundColor: scanned ? '#ccc' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: scanned ? 'not-allowed' : 'pointer'
            }} 
            onClick={handleScanQR}
            disabled={scanned}
          >
            {scanned ? 'Already Scanned' : 'Scan QR'}
          </button>
        </>
      ) : isExpired ? (
        <p style={{ color: 'red' }}>QR code is not available or has expired.</p>
      ) : qrInfo && qrInfo.qrData && !authorized ? (
        <p style={{ color: 'orange' }}>
          There is an active QR code, but it's not for your class/section. 
          {studentInfo && (
            <span> Your branch: {studentInfo.branch}, Section: {studentInfo.section}</span>
          )}
        </p>
      ) : (
        <p>No active QR code available.</p>
      )}
    </div>
  );
};

export default QRDisplay;