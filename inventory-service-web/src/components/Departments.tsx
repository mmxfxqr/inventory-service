import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect } from "react";
import NavBar from "./NavBar";
import NavigateBlock from "./NavigateBlock";
import { Context } from "../main";
import {
  ThemeContext,
  Theme,
} from "../services/ThemeProvider/lib/ThemeContext";
import { Button, Spinner, Table } from "react-bootstrap";
import s from "../styles/Departments.module.css"; // Правильный путь импорта
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import ToastAlert from "./ToastAlert";

const Departments: FC = () => {
  const { departmentsStore } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const { userStore } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      userStore.checkAuth();
    }
  }, [userStore]);

  useEffect(() => {
    departmentsStore.fetchDepartments();
  }, [departmentsStore]);

  if (userStore.isLoading) {
    return (
      <div className={s.spinerCon}>
        <Spinner animation="border" />
      </div>
    );
  }
  if (!userStore.isAuth) {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
  const tableVariant = theme === Theme.DARK ? "dark" : "light";

  return (
    <div>
      <NavBar />
      <div className={` ${s.content}`}>
        {" "}
        {/* Убедимся, что применен правильный класс */}
        <NavigateBlock />
        <div className="container">
          <h2>Departments</h2>
          <Table
            striped
            bordered
            hover
            variant={tableVariant}
            className={s.table}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {departmentsStore.departments.map((department) => (
                <tr key={department._id}>
                  <td>{department._id}</td>
                  <td>{department.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <ToastAlert />
    </div>
  );
};

export default observer(Departments);
