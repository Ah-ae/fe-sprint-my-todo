import { useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import circle from "../images/circle.svg";
import checkHover from "../images/check-circle.svg";
import checked from "../images/check-circle-fill.svg";
import emptyStar from "../images/star.svg";
import filledStar from "../images/star-fill.svg";
import edit from "../images/edit.svg";
import trash from "../images/delete.svg";

const Container = styled.li`
  position: relative;
  margin-top: 8px;
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
  &:first-child {
    margin-top: 16px;
  }
`;

const TaskWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: tomato;
`;
const CheckBoxGroup = styled.div`
  position: relative;
  cursor: pointer;

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
  padding: 0 16px;
  font-family: var(--main-font);
  display: flex;
  width: 100%;
  background-color: lemonchiffon;
`;
const StyledP = styled.p`
  color: var(--font-color-primary);
  display: ${(props) => (props.isEditing ? "none" : "inline-block")};
  text-decoration: ${(props) => props.done && "line-through"};
  flex: 1;
`;
const StyledInput = styled.input`
  padding: 0;
  /* display: block; */
  width: 300px;
  font-size: 14px;
  color: var(--font-color-primary);
  background-color: inherit;
  text-decoration: ${(props) => props.done && "line-through"};
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
  const inputEl = useRef(null);
  const { REACT_APP_SERVER_URL: URL } = process.env;

  const taskDone = () => {
    const target = todos.find((todo) => todo.id === id);
    axios.patch(`${URL}/${id}`, {
      done: !target.done,
      updatedAt: new Date().toISOString(),
    });
    const updatedTodos = todos.map((todo) => {
      if (todo.id === target.id) {
        target.done = !target.done;
        target.updatedAt = new Date().toISOString();
        return target;
      } else return todo;
    });
    setTodos(updatedTodos);
  };

  const handleImportant = () => {
    const target = todos.find((todo) => todo.id === id);
    const updated = {
      important: !target.important,
      updatedAt: new Date().toISOString(),
    };
    axios.patch(`${URL}/${id}`, updated);
    const updatedTodos = todos.map((todo) => {
      if (todo.id === target.id) {
        target.important = !target.important;
        target.updatedAt = new Date().toISOString();
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
    setInputValue(text);
  };

  const handleInputKeyUp = (e) => {
    setIsEditing(false);
    axios.patch(`${URL}/${id}`, {
      text: inputValue,
      updatedAt: new Date().toISOString(),
    });
    const target = todos.find((todo) => todo.id === id);
    const updatedTodos = todos.map((todo) => {
      if (todo.id === target.id) {
        target.text = inputValue;
        target.updatedAt = new Date().toISOString();
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
            <StyledInput
              type="text"
              value={text}
              onChange={handleInput}
              onKeyUp={(e) => {
                if (e.key === "Enter") handleInputKeyUp(e);
              }}
              isEditing={isEditing}
              done={done}
              autoFocus
              disabled
            />
          </TextGroup>
        </TaskWrapper>
        <ButtonWrapper>
          <img
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
