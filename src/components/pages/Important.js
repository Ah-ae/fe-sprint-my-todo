import styles from "./Important.module.css";
import Input from "../Input";
import Todo from "../Todo";

export default function Important({ todos, setTodos }) {
  const importantTodos = todos.filter((todo) => todo.important === true);

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
        <span>중요</span>
      </div>
      <div className={styles.contentContainer}>
        <Input todos={todos} setTodos={setTodos} important="true" />
        <div className={styles.todosContainer}>
          {importantTodos.map((todo) => {
            return (
              <Todo
                key={todo.id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
