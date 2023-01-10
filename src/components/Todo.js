import React from "react";
import styles from "./Todo.module.css";
import checkBox from "../images/circle.svg";
import unchecked from "../images/check-circle.svg";
import checked from "../images/check-circle-fill.svg";
import star from "../images/star.svg";
import edit from "../images/edit.svg";
import trash from "../images/delete.svg";

export default function Todo({ todo, todos, setTodos }) {
  const { id, text, done, importance } = todo;

  const deleteTodo = () => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };
  const taskDone = () => {
    const target = todos.find((todo) => todo.id === id);

    const newTodos = todos.map((todo) => {
      if (todo.id === target.id) {
        target.done = !target.done;
        return target;
      } else return todo;
    });
    setTodos(newTodos);
  };

  return (
    <>
      <li className={styles.container}>
        <div className={styles.checkBoxGroup} onClick={taskDone}>
          <img className={styles.circle} src={done ? checked : checkBox}></img>
          <img className={styles.unchecked} src={unchecked}></img>
        </div>
        <p className={done ? `${styles.taskDone}` : `${styles.task}`}>{text}</p>
        <input className={styles.taskInputInactive}></input>
        <div className={styles.btnGroup}>
          <img src={star}></img>
          <img src={edit}></img>
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
