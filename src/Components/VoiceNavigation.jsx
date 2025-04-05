


// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaMicrophone } from "react-icons/fa";

// const VoiceNavigation = ({ onClose }) => {
//   const [listening, setListening] = useState(false);
//   const recognitionRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!recognitionRef.current && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
//       recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//       const recognition = recognitionRef.current;

//       recognition.continuous = false; // Set to false to avoid conflicts
//       recognition.interimResults = false;
//       recognition.lang = "en-US";

//       recognition.onstart = () => {
//         setListening(true);
//         console.log("🎤 Listening for command...");
//       };

//       recognition.onend = () => {
//         console.log("Speech recognition ended.");
//         setListening(false);
//       };

//       recognition.onresult = (event) => {
//         let command = event.results[0][0].transcript.trim().toLowerCase();
//         command = command.replace(/[.,!?]/g, ""); // Remove punctuation
//         console.log("Recognized command:", command);

      
// const path = routes[command];  
//         // 🎯 Available Routes
//         const routes = {

//            // Admin Module Routes
//   "admin banker": "/admin/banker",
//   "admin sales module": "/admin/sales-module",

//  // CRM Module Routes
//  "agreement": "/crm/agreement",
//  " architect": "/crm/architect",
//  " dashboard": "/crm",
//  " daily collection": "/crm/daily-collection",
//  "demand": "/crm/demand",
//  " flat allotment report": "/crm/flat-allotment-report",
//  " home loan": "/crm/home-loan",
//  "mis report": "/crm/mis-report",
//  " ocr": "/crm/ocr",
//  " parking report": "/crm/parking-report",
//  "registration": "/crm/registration",
//  "Share space":"/crm/sharespacecrm",
// //  "crm share space": "/crm/sharespacecrm",

//  "Share Space": "/developer/sharespace",
//  "Basic Information" : "/developer/basicinfo", 
//  "Project Inventory":  "/developer/projectinventory",
// "Cost Sheet Details" : "/developer/costsheet",
//  "Sales MIS" : "/developer/salesmis", 
//  "Marketing" : "/developer/marketing",  


        

//    "Sales": "/sales",
//     "Dashboard": "/sales/salesdashboard" ,
//      "Calendar" :"/sales/salescalander" ,
//     // "Share Space":  "/sales/sharespace" ,
//     "Shared By Developer": "/sales/sharedbydeveloper" ,
//     "Leads": "/sales/leads",
//  "Leads Follow Up": "/sales/leadsfollowup" ,
//    "Lost Leads": "/sales/lostleads" ,
//    "First Visit": "/sales/firstvisits" ,
//   "First Visit Follow Up": "/sales/firstvisitfollowup" ,
//  "First Visit Steps": "/sales/firstvisitsteps" ,
//     "Lost Visits": "/sales/saleslostvisits" ,
//      "Templates": "/sales/salestemplates" ,
//     "Booking Form" : "/sales/bookingform" ,
//    "Channel Partner": "/sales/channelpartner" ,


//           "dashboard": "/dashboard",
//           "profile": "/profile",
//           "settings": "/settings",
//           "reports": "/reports"
//         };

//         if (routes[command]) {
//           speak(`Okay, opening ${command}.`);
//           console.log(`✅ Redirecting to: ${routes[command]}`);
//           setTimeout(() => {
//             navigate(routes[command]);
//             onClose(); // Close UI after navigation
//           }, 1500);
//         } else {
//           speak("Sorry, I didn't understand.");
//           console.warn(`⚠️ Unrecognized command: "${command}"`);
//         }


//       };

//       recognition.onerror = (event) => {
//         console.error("Speech recognition error:", event.error);
//         speak("There was an error with voice recognition.");
//       };
//     }
//   }, [navigate, onClose]);

//   // 🎤 Speak Function (Prevents Speech From Interrupting Recognition)
//   const speak = (message) => {
//     const speech = new SpeechSynthesisUtterance(message);
//     speech.lang = "en-US";
//     speech.rate = 1;

//     speech.onstart = () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop(); // Stop recognition while speaking
//       }
//     };

//     speech.onend = () => {
//       if (!listening) {
//         setTimeout(() => startListening(), 500); // Restart recognition after speaking
//       }
//     };

//     window.speechSynthesis.speak(speech);
//   };

//   // 🎤 Start Listening (Prevents Multiple Calls)
//   const startListening = () => {
//     if (recognitionRef.current && !listening) {
//       console.log("🎤 Starting recognition...");
//       recognitionRef.current.start();
//     }
//   };

//   return (
//     <div 
//       style={{ 
//         textAlign: "center", 
//         marginTop: "20px", 
//         width: "200px", 
//         padding: "10px",
//         borderRadius: "10px", 
//         background: "#f8f9fa",
//         boxShadow: "0 2px 10px rgba(0,0,0,0.2)", 
//         position: "fixed",
//         bottom: "20px",
//         right: "20px"
//       }}
//     >
//       <h4 style={{ fontSize: "14px", marginBottom: "10px" }}>🎤 Voice Command</h4>
//       <button 
//         onClick={startListening}
//         disabled={listening} // Prevents multiple clicks while listening
//         style={{
//           backgroundColor: listening ? "#ff4d4d" : "#4CAF50",
//           color: "white",
//           border: "none",
//           borderRadius: "50%",
//           padding: "10px",
//           fontSize: "16px",
//           cursor: listening ? "not-allowed" : "pointer",
//           outline: "none",
//         }}
//       >
//         <FaMicrophone />
//       </button>
//     </div>  
//   );
// };

// export default VoiceNavigation;



import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrophone } from "react-icons/fa";

const VoiceNavigation = ({ onClose }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const routes = {
    // Admin Module
    "admin banker": "/admin/banker",
    "admin sales module": "/admin/sales-module",

    // CRM Module
    "agreement": "/crm/agreement",
    "architect": "/crm/architect",
    "dashboard": "/crm",
    "daily collection": "/crm/daily-collection",
    "demand": "/crm/demand",
    "flat allotment report": "/crm/flat-allotment-report",
    "home loan": "/crm/home-loan",
    "mis report": "/crm/mis-report",
    "ocr": "/crm/ocr",
    "parking report": "/crm/parking-report",
    "registration": "/crm/registration",
    "share space": "/crm/sharespacecrm",

    // Developer Module
    "share space developer": "/developer/sharespace",
    "basic information": "/developer/basicinfo",
    "project inventory": "/developer/projectinventory",
    "cost sheet details": "/developer/costsheet",
    "sales mis": "/developer/salesmis",
    "marketing": "/developer/marketing",

    // Sales Module
    "sales": "/sales",
    "dashboard sales": "/sales/salesdashboard",
    "calendar": "/sales/salescalander",
    "shared by developer": "/sales/sharedbydeveloper",
    "leads": "/sales/leads",
    "leads follow up": "/sales/leadsfollowup",
    "lost leads": "/sales/lostleads",
    "first visit": "/sales/firstvisits",
    "first visit follow up": "/sales/firstvisitfollowup",
    "first visit steps": "/sales/firstvisitsteps",
    "lost visits": "/sales/saleslostvisits",
    "templates": "/sales/salestemplates",
    "booking form": "/sales/bookingform",
    "channel partner": "/sales/channelpartner",

    // Common Routes
    "dashboard": "/dashboard",
    "profile": "/profile",
    "settings": "/settings",
    "reports": "/reports",
  };

  useEffect(() => {
    if (!recognitionRef.current && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      const recognition = recognitionRef.current;

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setListening(true);
        console.log("🎤 Listening for command...");
      };

      recognition.onend = () => {
        console.log("Speech recognition ended.");
        setListening(false);
      };

      recognition.onresult = (event) => {
        let command = event.results[0][0].transcript.trim().toLowerCase();
        command = command.replace(/[.,!?]/g, "");
        console.log("Recognized command:", command);
       

        const path = routes[command];

        if (path) {
          speak(`Okay, opening ${command}`);
          console.log(`✅ Redirecting to: ${path}`);
          setTimeout(() => {
            navigate(path);
            console.log(`Navigating to: ${path}`);
console.log("Component unmounted");
            // onClose();
          }, 1500);
        } else {
          speak("Sorry, I didn't understand.");
          console.warn(`⚠️ Unrecognized command: "${command}"`);
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        speak("There was an error with voice recognition.");
      };
    }
  }, [navigate, onClose]);

  const speak = (message) => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US";
    speech.rate = 1;

    speech.onstart = () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };

    speech.onend = () => {
      if (!listening) {
        setTimeout(() => startListening(), 500);
      }
    };

    window.speechSynthesis.speak(speech);
  };

  const startListening = () => {
    if (recognitionRef.current && !listening) {
      console.log("🎤 Starting recognition...");
      recognitionRef.current.start();
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "20px",
        width: "200px",
        padding: "10px",
        borderRadius: "10px",
        background: "#f8f9fa",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        position: "fixed",
        bottom: "20px",
        right: "20px",
      }}
    >
      <h4 style={{ fontSize: "14px", marginBottom: "10px" }}>🎤 Voice Command</h4>
      <button
        onClick={startListening}
        style={{
          background: listening ? "red" : "green",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          cursor: "pointer",
        }}
      >
        <FaMicrophone />
      </button>
    </div>
  );
};

export default VoiceNavigation;

