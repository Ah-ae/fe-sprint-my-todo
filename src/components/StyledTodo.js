import { useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import styles from "./Todo.module.css";
import circle from "../images/circle.svg";
import checkHover from "../images/check-circle.svg";
import checked from "../images/check-circle-fill.svg";
import emptyStar from "../images/star.svg";
import filledStar from "../images/star-fill.svg";
import edit from "../images/edit.svg";
import trash from "../images/delete.svg";

const Container = styled.li`
  position: relative;
  margin-top: 12px;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 1.6px 3.6px 0px var(--bg-shadow);

  &:hover {
    background-color: var(--bg-highlight);
  }
`;

const TaskWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const CheckBoxGroup = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;

  & > .hover {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
  }
  &:hover .hover {
    display: block;
  }
`;
const TextGroup = styled.div`
  width: 100%;
  padding: 0 16px;

  & > p {
    color: var(--font-color-primary);
    text-decoration: ${(props) => props.done && "line-through"};
  }

  & > input {
    position: absolute;
    top: 0;
    left: 0;
    line-height: 1.4;
    color: var(--font-color-primary);
    display: ${(props) => (props.edit ? "inline-block" : "none")};
  }
  & > input:focus {
    /* input 가로 값도 손봐야함 */
    width: 360%;
    background-color: inherit;
  }
  & > input:focus:hover {
    background-color: inherit;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 72px;
  & > img {
    cursor: pointer;
  }
`;

export default function Todo({ todo, todos, setTodos }) {
  const { id, text, done, important } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const pEl = useRef(null);
  const inputEl = useRef(null);
  const { REACT_APP_SERVER_URL: URL } = process.env;

  const taskDone = () => {
    const target = todos.find((todo) => todo.id === id);
    axios.patch(`${URL}/${id}`, { done: !target.done });
    const updatedTodos = todos.map((todo) => {
      if (todo.id === target.id) {
        target.done = !target.done;
        return target;
      } else return todo;
    });
    setTodos(updatedTodos);
  };
  const handleImportant = () => {
    const target = todos.find((todo) => todo.id === id);
    const updated = { important: !target.important };
    axios.patch(`${URL}/${id}`, updated);
    const updatedTodos = todos.map((todo) => {
      if (todo.id === target.id) {
        target.important = !target.important;
        return target;
      } else return todo;
    });
    setTodos(updatedTodos);
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  const editTodo = () => {
    setIsEditing(true);
    pEl.current.style.display = "none";
    inputEl.current.style.display = "inline-block";
    setInputValue(text);
    inputEl.current.focus();
  };
  const handleInputKeyUp = (e) => {
    setIsEditing(false);
    pEl.current.style.display = "block";
    inputEl.current.style.display = "none";
    axios.patch(`${URL}/${id}`, { text: inputValue });
    const target = todos.find((todo) => todo.id === id);
    const updatedTodos = todos.map((todo) => {
      if (todo.id === target.id) {
        target.text = inputValue;
        return target;
      } else return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = () => {
    axios.delete(`${URL}/${id}`);
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <>
      <Container>
        <TaskWrapper>
          <CheckBoxGroup onClick={taskDone}>
            <img src={done ? checked : circle} alt="checkbox icon"></img>
            <img className="hover" src={checkHover} alt="checkbox icon"></img>
          </CheckBoxGroup>
          <TextGroup>
            <p done={done} ref={pEl}>
              {text}
            </p>
            <input
              value={inputValue}
              onChange={handleInput}
              onKeyUp={(e) => {
                if (e.key === "Enter") handleInputKeyUp(e);
              }}
              edit={isEditing}
              ref={inputEl}
              type="text"
            />
          </TextGroup>
        </TaskWrapper>
        <ButtonWrapper>
          <img
            className={styles.starIcon}
            src={important ? `${filledStar}` : `${emptyStar}`}
            onClick={handleImportant}
          ></img>
          <img src={edit} onClick={editTodo} alt="edit icon"></img>
          <img src={trash} onClick={deleteTodo} alt="delete icon"></img>
        </ButtonWrapper>
      </Container>
    </>
  );
}
