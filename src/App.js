import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/pages/Main";
import Important from "./components/pages/Important";

function App() {
  const { REACT_APP_SERVER_URL: URL } = process.env;
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(URL);
        setTodos(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

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
