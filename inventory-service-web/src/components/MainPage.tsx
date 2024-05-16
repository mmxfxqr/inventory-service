import React, { FC, useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import LoginForm from "./LoginForm";
import Spinner from "react-bootstrap/esm/Spinner";
import { Alert, Button, Toast, ToastContainer } from "react-bootstrap";
import { IUser } from "../services/Auth/User";
import AuthService from "../services/Auth/AuthService";
import NavBar from "./NavBar";
import {
  Theme,
  ThemeContext,
} from "../services/ThemeProvider/lib/ThemeContext";

const MainPage: FC = () => {
  const { userStore } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      userStore.checkAuth();
    }
  }, [userStore]);

  async function getUsers() {
    try {
      const response = await AuthService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  if (userStore.isLoading) {
    return <Spinner animation="border" />;
  }

  if (!userStore.isAuth) {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      {userStore.user.isActivated ? (
        ""
      ) : (
        <ToastContainer
          position="bottom-end"
          className="p-3"
          style={{ zIndex: 1 }}
        >
          <Toast bg={theme === Theme.DARK ? "dark" : "light"}>
            <Toast.Header  closeButton={false}>
              <strong className="rounded ">Inventory-Service</strong>
            </Toast.Header>
            <Toast.Body
              style={{ color: theme === Theme.DARK ? "white" : "black" }}
            >
              Подтвердите вашу электронную почту.
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      <Button onClick={getUsers}>Получить Пользователей</Button>
      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  );
};

export default observer(MainPage);
