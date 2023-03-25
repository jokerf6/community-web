import React, { useEffect } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

import "./Chat.css";

const username = localStorage.getItem("number");
const userId = localStorage.getItem("userId");
const role = localStorage.getItem("role");
const socket = io("http://localhost:8080");
function Room() {
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("userOnline", userId); // replace with actual user ID
    });

    socket.on("disconnect", () => {
      socket.emit("userOffline", userId); // replace with actual user ID
    });

    return () => {
      socket.emit("userOffline", userId); // replace with actual user ID
    };
  }, []);
  console.log(window.closed);
  return (
    <div className="chatContainer">
      <Chat socket={socket} username={username} role={role} />
    </div>
  );
}

export default Room;
