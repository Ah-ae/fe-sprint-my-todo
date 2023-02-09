import { useState } from "react";
import axios from "axios";
import styles from "./Input.module.css";
import plus from "../images/plus.svg";

export default function Input({ todos, setTodos, important }) {
  const [inputValue, setInputValue] = useState("");
  const { REACT_APP_SERVER_URL: URL } = process.env;

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const addTodo = () => {
    if (inputValue === "") return;
    const newTodo = {
      text: inputValue,
      done: false,
      important,
      createdAt: new Date().toISOString(),
      updatedAt: "",
    };
    axios.post(URL, newTodo);
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <img src={plus}></img>
      <input
        type="text"
        placeholder="작업 추가"
        value={inputValue}
        onChange={handleInput}
        onKeyUp={(e) => {
          if (e.key === "Enter") addTodo();
        }}
      ></input>
      <button className={styles.addBtn} onClick={addTodo}>
        추가
      </button>
    </div>
  );
}
