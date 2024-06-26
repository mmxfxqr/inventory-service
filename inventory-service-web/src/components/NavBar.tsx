import { FC, useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";
import {
  Theme,
  ThemeContext,
} from "../services/ThemeProvider/lib/ThemeContext";
import ThemeToggle from "./ThemeTogler";
import s from "../styles/NavBar.module.css";
import { Nav, NavDropdown } from "react-bootstrap";

const NavBar: FC = () => {
  const { userStore } = useContext(Context);
  const { theme } = useContext(ThemeContext);
const navigate = useNavigate()
  // Определение класса для темы
  const themeClass = theme === Theme.DARK ? "dark-theme" : "light-theme";

  return (
    <Navbar
      bg={theme === Theme.DARK ? "dark" : "light"}
      variant={theme === Theme.DARK ? "dark" : "light"}
      className={themeClass}
    >
      <Container>
        <Navbar.Brand>
          <Link to={"/"} className={s.brandLink}>
            Inventory-Service
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <ThemeToggle />
          <Navbar.Text className={s.signedText}>Signed in as:</Navbar.Text>
          <NavDropdown
            title={userStore.user.email}
            id="basic-nav-dropdown"
            align="end"
            menuVariant={theme === Theme.DARK ? "dark" : "light"}
          >
            <NavDropdown.Item onClick={() => userStore.logout(navigate)}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default observer(NavBar);
