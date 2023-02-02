import Todo from "./Todo";
import styles from "./Todos.module.css";

export default function Todos({ todos, setTodos }) {
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
