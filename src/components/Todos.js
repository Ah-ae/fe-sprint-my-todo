import React from "react";
import Todo from "./Todo";
import styles from "./Todos.module.css";

export default function Todos({ todos, setTodos }) {
  //   console.log("Todos 컴포넌트");
  //   console.log(todos);
  return (
    <div className={styles.container}>
      {todos.map((todo) => {
        return (
          <Todo key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
        );
      })}
    </div>
  );
}
