import { useState } from "react";
import axios from "axios";
import styles from "./Input.module.css";
import plus from "../images/plus.svg";

export default function Input({ todos, setTodos, important }) {
  const [input, setInput] = useState("");
  const { REACT_APP_SERVER_URL: SERVER_URL } = process.env;

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const addTodo = () => {
    if (input === "") return;

    const newTodo = {
      text: input,
      done: false,
      important,
    };
    axios.post(SERVER_URL, newTodo);
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <img src={plus}></img>
      <input
        type="text"
        placeholder="작업 추가"
        value={input}
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
