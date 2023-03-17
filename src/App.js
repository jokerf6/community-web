import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Authentication/Login";
import Room from "./Chat/Room";
import Settings from "./Settings/Settings";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/room" element={<Room />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
  );
}

export default App;
