import React, { useEffect } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import "./Chat.css";
import { SOCKET } from "../constants";

const userId = localStorage.getItem("userId");
const socket = io.connect(SOCKET);

function Room() {
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("userOnline", userId); // replace with actual user ID
      console.log("online");
    });

    socket.on("disconnect", () => {
      socket.emit("userOffline", userId); // replace with actual user ID
    });

    return () => {
      socket.emit("userOffline", userId); // replace with actual user ID
    };
  }, []);
  return (
    <div className="chatContainer">
      <Chat socket={socket} />
    </div>
  );
}

export default Room;
