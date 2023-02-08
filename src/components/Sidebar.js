import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { BsStar } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";

const Nav = styled.nav`
  height: calc(100vh - 48px);
  flex-basis: 280px;
  text-align: center;
  @media screen and (max-width: 720px) {
    flex-basis: 200px;
  }

  & > .divider {
    margin: 8px 0;
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
  background-color: ${(props) =>
    props.path === props.to && "var(--bg-highlight)"};
  font-weight: ${(props) => props.path === props.to && "600"};
  cursor: pointer;

  & > span:first-of-type {
    margin-left: 16px;
  }
  & > span:last-of-type {
    margin-left: auto;
  }
  &:first-child {
    margin-top: 8px;
  }
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
        <span>{todos.length}</span>
      </StyledLink>
    </Nav>
  );
}
