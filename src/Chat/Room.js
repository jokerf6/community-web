import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import "./Chat.css";

import { ROOM } from "../constants";

const username = localStorage.getItem("number");
const userId = localStorage.getItem("userId");
const role = localStorage.getItem("role");
const URL = username ? ROOM : undefined;
const socket = io.connect("http://127.0.0.1:8080");

function Room() {
  return (
    <div className="chatContainer">
      <Chat socket={socket} username={username} role={role} />
    </div>
  );
}

export default Room;
