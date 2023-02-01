import { useState, useRef } from "react";
import styles from "./Todo.module.css";
import checkBox from "../images/circle.svg";
import unchecked from "../images/check-circle.svg";
import checked from "../images/check-circle-fill.svg";
import star from "../images/star.svg";
import edit from "../images/edit.svg";
import trash from "../images/delete.svg";

export default function Todo({ todo, todos, setTodos }) {
  const { id, text, done, importance } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const pEl = useRef(null);
  const inputEl = useRef(null);

  const deleteTodo = () => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const taskDone = () => {
    const target = todos.find((todo) => todo.id === id);
    const updatedTodos = todos.map((todo) => {
      if (todo.id === target.id) {
        target.done = !target.done;
        return target;
      } else return todo;
    });
    setTodos(updatedTodos);
  };

  const editTodo = () => {
    setIsEditing(true);
    pEl.current.style.display = "none";
    inputEl.current.style.display = "inline-block";
    setInputValue(text);
    // ! input foucs 안 먹히고 있음
    inputEl.current.focus();
  };
  const handleInputKeyUp = (e) => {
    const target = todos.find((todo) => todo.id === id);
    const updatedTodos = todos.map((todo) => {
      if (todo.id === target.id) {
        target.text = inputValue;
        return target;
      } else return todo;
    });
    setTodos(updatedTodos);
    setIsEditing(false);
    pEl.current.style.display = "block";
    inputEl.current.style.display = "none";
  };
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <li className={styles.container}>
        <div className={styles.taskGroup}>
          <div className={styles.checkBoxGroup} onClick={taskDone}>
            <img
              className={styles.circle}
              src={done ? checked : checkBox}
            ></img>
            <img className={styles.unchecked} src={unchecked}></img>
          </div>
          <div className={styles.textGroup}>
            <p
              className={done ? `${styles.taskDone}` : `${styles.task}`}
              ref={pEl}
            >
              {text}
            </p>
            <input
              className={
                isEditing ? `${styles.inputActive}` : `${styles.inputInactive}`
              }
              value={inputValue}
              onChange={handleInput}
              onKeyUp={(e) => {
                if (e.key === "Enter") handleInputKeyUp(e);
              }}
              ref={inputEl}
              type="text"
            />
          </div>
        </div>
        <div className={styles.btnGroup}>
          <img src={star}></img>
          <img src={edit} onClick={editTodo}></img>
          <img src={trash} onClick={deleteTodo}></img>
        </div>
      </li>
      {/* 더미 html */}
      {/* <li className={styles.container}>
        <img className={styles.checkBox} src={checkBox}></img>
        <p className={styles.task}>할 일</p>
        <div className={styles.btnGroup}>
          <img src={star}></img>
          <img className={styles.edit} src={edit}></img>
          <img className={styles.delete} src={trash}></img>
        </div>
      </li> */}
    </>
  );
}
