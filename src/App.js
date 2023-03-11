import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./Authentication/Login";
import Room from "./Chat/Room";
import Cookies from "universal-cookie";

function App() {
  const cookies = new Cookies();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={cookies.get("username") ? <Room /> : <Login />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/room" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
