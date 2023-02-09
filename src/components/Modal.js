import axios from "axios";
import styled from "styled-components";

const ModalBackdrop = styled.div`
  // * 화면 전체 차지
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalBox = styled.div.attrs((props) => ({
  role: "dialog",
}))`
  padding: 2rem;
  width: 360px;
  border-radius: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    text-align: center;
  }
  p:last-of-type {
    margin-top: 0.2rem;
    color: darkgray;
    font-weight: 600;
  }
  span {
    font-weight: 700;
  }

  .selectBtnGroup {
    width: 100%;
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
  }
  button {
    padding: 0.5rem 0.6rem;
    background-color: lightgrey;
    border-radius: 0.2rem;
    font-weight: 600;
  }
  .deleteBtn {
    margin-left: 0.5rem;
    background-color: #db3a29;
    color: #fff;
  }
`;

export default function Modal({
  todo,
  todos,
  setTodos,
  showModal,
  handleModal,
}) {
  const { id, text } = todo;
  const { REACT_APP_SERVER_URL: URL } = process.env;

  const deleteTodo = () => {
    axios.delete(`${URL}/${id}`);
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <>
      {showModal && (
        <ModalBackdrop onClick={handleModal}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <p>
              "{text}"이/가 <span>영구적으로 삭제</span>됩니다.
            </p>
            <p>이 작업은 취소할 수 없습니다.</p>
            <div className="selectBtnGroup">
              <button onClick={handleModal}>취소</button>
              <button onClick={deleteTodo} className="deleteBtn">
                작업 삭제
              </button>
            </div>
          </ModalBox>
        </ModalBackdrop>
      )}
    </>
  );
}
