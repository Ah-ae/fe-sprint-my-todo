import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Modal from "./Modal";
import circle from "../images/circle.svg";
import checkHover from "../images/check-circle.svg";
import checked from "../images/check-circle-fill.svg";
import emptyStar from "../images/star.svg";
import filledStar from "../images/star-fill.svg";
import edit from "../images/edit.svg";
import trash from "../images/delete.svg";

const Container = styled.li`
  position: relative;
  margin: 12px 0;
  padding: 16px 24px;
  display: flex;
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

const StyledInput = styled.input`
  margin: 0 16px;
  flex: 1;
  font-size: inherit;
  font-family: var(--main-font);
  color: var(--font-color-primary);
  background-color: inherit;
  text-decoration: ${(props) => props.done && "line-through"};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 72px;
  & > img {
    cursor: pointer;
  }
`;

export default function Todo({ todo, todos, setTodos }) {
  const { id, text, done, important } = todo;
  const [notEditable, setNotEditable] = useState(true);
  const [inputValue, setInputValue] = useState(text);
  const [showModal, setShowModal] = useState(false);
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
    setNotEditable(false);
  };

  const handleInputKeyUp = (e) => {
    setNotEditable(true);
    console.log(inputValue);
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

  const handleModal = () => {
    setShowModal((cur) => !cur);
  };

  return (
    <>
      <Container>
        <CheckBoxGroup onClick={taskDone}>
          <img src={done ? checked : circle} alt="checkbox icon"></img>
          <img className="hover" src={checkHover} alt="checkbox icon"></img>
        </CheckBoxGroup>
        <StyledInput
          type="text"
          maxLength="80"
          value={inputValue}
          onChange={handleInput}
          onKeyUp={(e) => {
            if (e.key === "Enter") handleInputKeyUp(e);
          }}
          done={done}
          ref={(input) => {
            if (input !== null) input.focus();
          }}
          disabled={notEditable}
        />
        <ButtonGroup>
          <img
            src={important ? `${filledStar}` : `${emptyStar}`}
            onClick={handleImportant}
          ></img>
          <img src={edit} onClick={editTodo} alt="edit icon"></img>
          <img src={trash} onClick={handleModal} alt="delete icon"></img>
        </ButtonGroup>
        <Modal
          todo={todo}
          todos={todos}
          setTodos={setTodos}
          handleModal={handleModal}
          showModal={showModal}
        />
      </Container>
    </>
  );
}
