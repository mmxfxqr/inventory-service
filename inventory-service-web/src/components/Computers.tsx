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

const Computers: FC = () => {
  const { computersStore } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const { userStore } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      userStore.checkAuth();
    }
  }, [userStore]);
  useEffect(() => {
    computersStore.fetchComputers();
  }, [computersStore]);

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
      <div className={s.content}>
        <NavigateBlock />
        <div className="container">
          <h2>Computers</h2>
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
                <th>Processor</th>
                <th>Graphics Card</th>
                <th>Hard Disk</th>
                <th>Mouse</th>
                <th>Keyboard</th>
                <th>Headphones</th>
                <th>Workplace</th>
              </tr>
            </thead>
            <tbody>
              {computersStore.computers.map((computer) => {
                const processor =
                  computer.components.find((comp) => comp.type === "Processor")
                    ?.name || "N/A";
                const graphicsCard =
                  computer.components.find(
                    (comp) => comp.type === "Graphics Card"
                  )?.name || "N/A";
                const hardDisk =
                  computer.components.find((comp) => comp.type === "Hard Disk")
                    ?.name || "N/A";
                const mouse =
                  computer.peripherals.find(
                    (peripheral) => peripheral.type === "Mouse"
                  )?.name || "N/A";
                const keyboard =
                  computer.peripherals.find(
                    (peripheral) => peripheral.type === "Keyboard"
                  )?.name || "N/A";
                const headphones =
                  computer.peripherals.find(
                    (peripheral) => peripheral.type === "Headphones"
                  )?.name || "N/A";

                return (
                  <tr key={computer._id}>
                    <td>{computer._id}</td>
                    <td>{computer.name}</td>
                    <td>{processor}</td>
                    <td>{graphicsCard}</td>
                    <td>{hardDisk}</td>
                    <td>{mouse}</td>
                    <td>{keyboard}</td>
                    <td>{headphones}</td>
                    <td>{computer.workplace.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
      <ToastAlert />
    </div>
  );
};

export default observer(Computers);
