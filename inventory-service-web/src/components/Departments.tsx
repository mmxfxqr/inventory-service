import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import NavigateBlock from "./NavigateBlock";
import { Context } from "../main";
import { ThemeContext, Theme } from "../services/ThemeProvider/lib/ThemeContext";
import { Spinner, Table, FormControl } from "react-bootstrap";
import s from "../styles/Departments.module.css";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import ToastAlert from "./ToastAlert";

const Departments: FC = () => {
  const { departmentsStore } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const { userStore } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      userStore.checkAuth();
    }
  }, []);

  useEffect(() => {
    departmentsStore.fetchDepartments();
  }, [departmentsStore]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredDepartments = departmentsStore.departments.filter(
    (department) =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h2 className={s.tittleHead}>Departments</h2>
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
              </tr>
            </thead>
            <tbody>
              {filteredDepartments.map((department) => (
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
