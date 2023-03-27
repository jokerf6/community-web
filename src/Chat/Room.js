import React, { useEffect } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

import "./Chat.css";

const userId = localStorage.getItem("userId");

const socket = io.connect("http://127.0.0.1:8080");

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
  console.log("hjkhjkhjkhjk");
  console.log(localStorage.getItem("role"));
  return (
    <div className="chatContainer">
      <Chat socket={socket} />
    </div>
  );
}

export default Room;
