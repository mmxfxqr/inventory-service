import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import NavigateBlock from "./NavigateBlock";
import { Context } from "../main";
import { Theme, ThemeContext } from "../services/ThemeProvider/lib/ThemeContext";
import s from "../styles/Computers.module.css";
import { Button, Spinner, Table, FormControl } from "react-bootstrap";
import LoginForm from "./LoginForm";
import ToastAlert from "./ToastAlert";

const Computers: FC = () => {
  const { computersStore } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const { userStore } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      userStore.checkAuth();
    }
  }, []);

  useEffect(() => {
    computersStore.fetchComputers();
  }, [computersStore]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredComputers = computersStore.computers.filter((computer) =>
    computer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
  const searchClass = theme === Theme.DARK ? s.searchDark : s.searchLight;

  return (
    <div>
      <NavBar />
      <div className={s.content}>
        <NavigateBlock />
        <div className="container">
          <div className={s.headerCon}>
            <h2 className={s.titleHead}>Computers</h2>
            <div className={s.searchContainer}>
              <FormControl
                type="search"
                className={`mr-2 ${searchClass}`}
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ maxWidth: "200px" }}
              />
            </div>
          </div>
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
              {filteredComputers.map((computer) => {
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
