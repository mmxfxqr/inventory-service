import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import NavigateBlock from "./NavigateBlock";
import s from "../styles/Employees.module.css";
import { Button, Spinner, Table, FormControl } from "react-bootstrap";
import { Context } from "../main";
import { Theme, ThemeContext } from "../services/ThemeProvider/lib/ThemeContext";
import LoginForm from "./LoginForm";
import ToastAlert from "./ToastAlert";

const Employees: FC = () => {
  const { employeesStore } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const { userStore } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      userStore.checkAuth();
    }
  }, []);

  useEffect(() => {
    employeesStore.fetchEmployees();
  }, [employeesStore]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employeesStore.employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className={` ${s.content}`}>
        <NavigateBlock />
        <div className="container">
          <div className={s.headerCon}>
            <h2 className={s.tittleHead}>Employees</h2>
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
                <th>Department Name</th>
                <th>Workplace Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee._id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.department.name}</td>
                  <td>{employee.workplace.name}</td>
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

export default observer(Employees);
