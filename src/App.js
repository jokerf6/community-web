import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Authentication/Login";
import Settings from "./Settings/Settings";
import io from "socket.io-client";

import NotAuth from "./notAuth";
import Room from "./Chat/Room";

function App() {
  window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    e.returnValue = "";
  });
  return (
    <Routes>
      <Route path="/" element={<NotAuth />} />
      <Route path="/login" element={<Login />} />
      <Route path="/room" element={<Room />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
