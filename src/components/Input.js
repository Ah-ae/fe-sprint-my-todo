import { useState } from "react";
import { v4 as uuid } from "uuid";
import styles from "./Input.module.css";
import plus from "../images/plus.svg";

export default function Input({ todos, setTodos }) {
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const addTodo = () => {
    if (input === "") return;

    const newTodo = {
      id: uuid(),
      text: input,
      done: false,
      importance: false,
    };
    console.log(newTodo.id);
    setTodos([...todos, newTodo]);
    setInput("");
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
