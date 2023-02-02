import styles from "./Sidebar.module.css";
import star from "../images/star.svg";

export default function Sidebar() {
  return (
    <nav>
      <ul>
        <li>
          <img src={star} alt="star icon"></img>
          <span>중요</span>
          <span>1</span>
        </li>
        <li>Today</li>
      </ul>
    </nav>
  );
}
