import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
// import styles from "./Sidebar.module.css";
import { BsStar } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";

const Nav = styled.nav`
  /* 반응형 f.basis 값 200으로 조정 + 가로선 width 160px로 */
  height: calc(100vh - 48px);
  flex-basis: 280px;
  text-align: center;

  & > .divider {
    margin: 12px 0;
    width: 86%;
    height: 1px;
    border-bottom: 1px solid #e1dfdd;
    display: inline-block;
  }
`;

const StyledLink = styled(Link)`
  position: relative;
  padding: 24px;
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.path === props.to ? "var(--bg-hover)" : "#fff"};
  cursor: pointer;

  & > span:first-of-type {
    margin-left: 16px;
  }
  & > span:nth-of-type(2) {
    margin-left: auto;
  }
  /* &:first-child {
    margin-bottom: 12px;
  }
  &:nth-child(2) {
    margin-top: 12px;
  } */
`;

export default function Sidebar({ todos }) {
  const { pathname: path } = useLocation();

  const count = todos.filter((todo) => todo.important === true);
  return (
    <Nav>
      <StyledLink to="/important" path={path}>
        <BsStar />
        <span>중요</span>
        <span>{count.length}</span>
      </StyledLink>
      <div className="divider"></div>
      <StyledLink to="/" path={path}>
        <RxHamburgerMenu />
        <span>Today</span>
      </StyledLink>
    </Nav>
  );
}
