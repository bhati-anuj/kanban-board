import React from "react";
import "./App.css";
import MainCard from "./Components/MainCard/MainCard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Signin from "./Components/Signin/Signin";


function App() {
  return (
    <div className="appContainer">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainCard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
