import React, { FC, useContext, useEffect } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import LoginForm from "./LoginForm";

const MainPage: FC = () => {
  const { userStore } = useContext(Context);

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log(token)
    if (token) {
      userStore.checkAuth();
    }
  }, []);
  if (!userStore.isAuth) {
    return <LoginForm />;
  }
  return (
    <div>
      <h1>
        {userStore.isAuth
          ? `Пользователь авторизован ${userStore.user.email}`
          : "Авторизируйтесь!"}
      </h1>
      <button onClick={() => userStore.logout()}>Log Out</button>
    </div>
  );
};

export default observer(MainPage);
