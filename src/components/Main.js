import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Todos from "./Todos";
import styles from "./Main.module.css";
import plus from "../images/plus.svg";

export default function Main() {
  const [todos, setTodos] = useState([
    {
      id: "04bc002e-6411-4dfb-8f4f-2965501d5b0e",
      text: "Styled Components로 전반적인 리팩토링",
      done: false,
      importance: false,
    },
    {
      id: "7ca2ce65-e746-4d07-abfc-1c2adf8e90a5",
      text: "수정/삭제 버튼 더 나은 UI 방안 찾기: 1)hover시 더 굵게 처리 2) edit 버튼을 없애고 task 텍스트 클릭시 input 창으로 바뀔 수 있게",
      done: false,
      importance: false,
    },
  ]);
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
    setTodos([...todos, newTodo]);
    setInput("");
  };

  return (
    <main>
      <div className={styles.titleContainer}>
        <svg
          className={styles.hamburgerBtn}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
        <span>Today</span>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.inputContainer}>
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
        <Todos todos={todos} setTodos={setTodos} />
      </div>
    </main>
  );
}
