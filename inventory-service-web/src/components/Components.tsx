import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect } from "react";
import NavBar from "./NavBar";
import NavigateBlock from "./NavigateBlock";
import { Context } from "../main";
import {
  Theme,
  ThemeContext,
} from "../services/ThemeProvider/lib/ThemeContext";
import s from "../styles/Components.module.css";
import { Button, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import ToastAlert from "./ToastAlert";
const Components: FC = () => {
  const { componentsStore } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const { userStore } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      userStore.checkAuth();
    }
  }, [userStore]);
  useEffect(() => {
    componentsStore.fetchComponents();
  }, [componentsStore]);
  
  if (userStore.isLoading) {
    return <div className={s.spinerCon}>
      <Spinner animation="border" />
    </div>
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
        <NavigateBlock />
        <div className="container">
          <h2>Components</h2>
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
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {componentsStore.components.map((component) => (
                <tr key={component._id}>
                  <td>{component._id}</td>
                  <td>{component.name}</td>
                  <td>{component.type}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <ToastAlert/>
    </div>
  );
};

export default observer(Components);
