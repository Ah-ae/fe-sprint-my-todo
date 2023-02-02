import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
  return (
    <BrowserRouter className="container">
      <Header />
      <div className="main-container">
        <Sidebar />
        <Main />
        <Routes>
          {/* <Route path="/" element={<Main />} /> */}
          {/* <Route path="/important" /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
