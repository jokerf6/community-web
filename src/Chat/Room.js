import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import "./Chat.css";
import Cookies from "universal-cookie";

import { ROOM } from "../constants";
const cookies = new Cookies();

const username = localStorage.getItem("number");
const URL = username ? ROOM : undefined;
const socket = io.connect(URL);

function Room() {
  return (
    <div className="chatContainer">
      <Chat socket={socket} username={username} />
    </div>
  );
}

export default Room;
