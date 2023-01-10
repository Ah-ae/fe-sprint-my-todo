import "./App.css";
import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
  return (
    <>
      <Header />
      <div className="main-container">
        <Sidebar />
        <Main />
      </div>
    </>
  );
}

export default App;
