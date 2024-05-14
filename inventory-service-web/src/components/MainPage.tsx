import React, { FC, useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import LoginForm from "./LoginForm";
import Spinner from "react-bootstrap/esm/Spinner";
import { Button } from "react-bootstrap";
import { IUser } from "../services/Auth/User";
import AuthService from "../services/Auth/AuthService";
import NavBar from "./NavBar";
import ThemeToggle from "./ThemeTogler";

const MainPage: FC = () => {
  const { userStore } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const token = localStorage.getItem("token");
  //     console.log("Token found:", token);
  //     if (token) {
  //       await userStore.checkAuth();
  //     }
  //   };
  //   const timer = setTimeout(checkAuth, 0);
  //   return () => clearTimeout(timer);
  // }, [userStore]);
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
        <LoginForm />;
      </div>
    );
  }
  return (
    <div>
      <NavBar />
      <h1>
        {userStore.isAuth
          ? `Пользователь авторизован ${userStore.user.email}`
          : "Авторизируйтесь!"}
      </h1>
      <h1>
        {userStore.user.isActivated
          ? "Аккаунт подтвежден по почте"
          : "Подтвердите адрес электронной почты"}
      </h1>
      <button onClick={() => userStore.logout()}>Log Out</button>
      <Button onClick={getUsers}>Получить Пользователей</Button>
      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  );
};

export default observer(MainPage);
