import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home";

export const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </Router>
    </div>
  );
};
export default App;
