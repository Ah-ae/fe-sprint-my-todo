import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { BsStar } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Sidebar({ todos }) {
  const count = todos.filter((todo) => todo.important === true);
  return (
    <nav>
      <Link to="/important" className={styles.item}>
        <BsStar />
        <span className={styles.title}>중요</span>
        <span className={styles.count}>{count.length}</span>
      </Link>
      <Link to="/" className={styles.item}>
        <RxHamburgerMenu />
        <span className={styles.title}>Today</span>
      </Link>
    </nav>
  );
}
