import React, { FC, useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import LoginForm from "./LoginForm";
import Spinner from "react-bootstrap/esm/Spinner";
import { Alert, Button, Toast, ToastContainer } from "react-bootstrap";
import { IUser } from "../services/Auth/User";
import AuthService from "../services/Auth/AuthService";
import NavBar from "./NavBar";
import s from "../styles/MainPage.module.css";
import {
  Theme,
  ThemeContext,
} from "../services/ThemeProvider/lib/ThemeContext";
import NavigateBlock from "./NavigateBlock";
import ToastAlert from "./ToastAlert";

const MainPage: FC = () => {
  const { userStore } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      userStore.checkAuth();
    }
  }, []);

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
      <div className={s.contentBlock}>
        <NavigateBlock />
        {/* <div className={s.btnBlock}>
          <Button onClick={getUsers}>Получить Пользователей</Button>
          {users.map((user) => (
            <div key={user.email}>{user.email}</div>
          ))}
        </div> */}
        <h1>Выберите раздел из навигационного меню</h1>
      </div>
      <ToastAlert/>
    </div>
  );
};

export default observer(MainPage);
