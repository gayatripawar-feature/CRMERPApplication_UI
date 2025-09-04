



import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrophone } from "react-icons/fa";
import RolePermissions from "./RolePermissions"; 

const VoiceNavigation = ({ role, onClose }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();
  const buildRoutes = () => {
  const roleModules = RolePermissions[role] || [];
  const roleRoutes = {};

  roleModules.forEach((module) => {
    module.subItems.forEach((item) => {
      const command = `dashboard ${item.label.toLowerCase()}`; 
      roleRoutes[command] = item.to.toLowerCase(); 
    });
  });

  return roleRoutes;
};

  const routes = buildRoutes();

  useEffect(() => {
    if (
      !recognitionRef.current &&
      ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      recognitionRef.current = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
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
          }, 1500);
        } else {
          speak("Sorry, I didn't understand or you don't have access.");
          console.warn(`⚠️ Unrecognized/unauthorized command: "${command}"`);
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        speak("There was an error with voice recognition.");
      };
    }
  }, [navigate, onClose, routes]);

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
