import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import "./Chat.css";
import { Const } from "../constant";

const socket = io.connect("http://localhost:3001");

function Room() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    setShowChat(true);
  };

  return (
    <div className="chatContainer">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} />
      )}
    </div>
  );
}

export default Room;