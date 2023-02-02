import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/pages/Main";
import Important from "./components/pages/Important";
import { data } from "./data/data";

function App() {
  const [todos, setTodos] = useState(data.todos);

  return (
    <BrowserRouter className="container">
      <Header />
      <div className="main-container">
        <Sidebar todos={todos} />
        <Routes>
          <Route
            path="/"
            element={<Main todos={todos} setTodos={setTodos} />}
          />
          <Route
            path="/important"
            element={<Important todos={todos} setTodos={setTodos} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
