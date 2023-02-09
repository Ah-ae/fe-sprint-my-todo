import { useState } from "react";
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
  width: 100%;
  padding: 0 16px;
  font-family: var(--main-font);

  /* &:hover > input {
    background-color: inherit;
  } */
`;
const StyledP = styled.p`
  color: var(--font-color-primary);
  display: ${(props) => (props.isEditing ? "none" : "inline-block")};
  text-decoration: ${(props) => props.done && "line-through"};
`;
const StyledInput = styled.input`
  padding: 0;
  position: ${(props) => !props.isEditing && "absolute"};
  top: 0;
  color: var(--font-color-primary);
  font-size: 14px;
  display: ${(props) => (props.isEditing ? "inline-block" : "none")};

  &:focus {
    /* input 가로 값도 손봐야함 */
    width: 860%;
    background-color: inherit;
  }
  &:focus:hover {
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
  // const inputEl = useRef(null);
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

  console.log(isEditing);

  return (
    <>
      <Container>
        <TaskWrapper>
          <CheckBoxGroup onClick={taskDone}>
            <img src={done ? checked : circle} alt="checkbox icon"></img>
            <img className="hover" src={checkHover} alt="checkbox icon"></img>
          </CheckBoxGroup>
          <TextGroup>
            <StyledP done={done} isEditing={isEditing}>
              {text}
            </StyledP>
            <StyledInput
              type="text"
              value={inputValue}
              onChange={handleInput}
              onKeyUp={(e) => {
                if (e.key === "Enter") handleInputKeyUp(e);
              }}
              isEditing={isEditing}
              ref={function (input) {
                if (input !== null) {
                  input.focus();
                }
              }}
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
