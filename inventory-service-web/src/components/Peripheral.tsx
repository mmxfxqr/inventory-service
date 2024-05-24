import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect } from "react";
import NavBar from "./NavBar";
import NavigateBlock from "./NavigateBlock";
import { Context } from "../main";
import {
  Theme,
  ThemeContext,
} from "../services/ThemeProvider/lib/ThemeContext";
import { Spinner, Table } from "react-bootstrap";
import s from "../styles/Peripheral.module.css";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import ToastAlert from "./ToastAlert";
const Peripheral: FC = () => {
  const { peripheralsStore } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const { userStore } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      userStore.checkAuth();
    }
  }, [userStore]);
  useEffect(() => {
    peripheralsStore.fetchPeripherals();
  }, [peripheralsStore]);

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
        <NavigateBlock />
        <div className="container">
          <h2>Peripherals</h2>
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
              {peripheralsStore.peripherals.map((peripheral) => (
                <tr key={peripheral._id}>
                  <td>{peripheral._id}</td>
                  <td>{peripheral.name}</td>
                  <td>{peripheral.type}</td>
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

export default observer(Peripheral);
