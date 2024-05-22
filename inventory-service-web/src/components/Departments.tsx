import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect } from "react";
import NavBar from "./NavBar";
import NavigateBlock from "./NavigateBlock";
import { Context } from "../main";
import {
  ThemeContext,
  Theme,
} from "../services/ThemeProvider/lib/ThemeContext";
import { Table } from "react-bootstrap";
import s from "../styles/Departments.module.css"; // Правильный путь импорта

const Departments: FC = () => {
  const { departmentsStore } = useContext(Context);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    departmentsStore.fetchDepartments();
  }, [departmentsStore]);

  const tableVariant = theme === Theme.DARK ? "dark" : "light";

  return (
    <div>
      <NavBar />
      <div className={` ${s.content}`}> {/* Убедимся, что применен правильный класс */}
        <NavigateBlock />
        <div className="container">
          <h2>Departments</h2>
          <Table striped bordered hover variant={tableVariant} className={s.table}>
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
    </div>
  );
};

export default observer(Departments);
