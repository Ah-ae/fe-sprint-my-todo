import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/pages/Main';
import Important from './components/pages/Important';

function App() {
  const { REACT_APP_SERVER_URL: URL } = process.env;
  const [todos, setTodos] = useState([
    {
      text: 'json 서버 적용',
      done: true,
      important: true,
      createdAt: '2023-02-09T01:19:29.559Z',
      updatedAt: '2023-02-09T06:13:32.785Z',
      id: 1,
    },
    {
      text: '수정/삭제 버튼 더 나은 UI 방안 찾기',
      done: false,
      important: false,
      createdAt: '2023-02-09T01:20:04.221Z',
      updatedAt: '2023-02-09T07:03:18.933Z',
      id: 4,
    },
  ]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(URL);
        setTodos([...todos, res.data]);
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
