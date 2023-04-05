import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Authentication/Login";
import Settings from "./Settings/Settings";

import NotAuth from "./notAuth";
import Room from "./Chat/Room";

function App() {
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
