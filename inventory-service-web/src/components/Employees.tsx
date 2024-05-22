import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect } from "react";
import NavBar from "./NavBar";
import NavigateBlock from "./NavigateBlock";
import s from "../styles/Employees.module.css";
import { Table } from "react-bootstrap";
import { Context } from "../main";
import { Theme, ThemeContext } from "../services/ThemeProvider/lib/ThemeContext";
const Employees: FC = () => {
  const { employeesStore } = useContext(Context);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    employeesStore.fetchWorkplaces();
  }, [employeesStore]);

  const tableVariant = theme === Theme.DARK ? "dark" : "light";
  return (
    <div>
      <NavBar />
      <div className={` ${s.content}`}>
        <NavigateBlock />
        <div className="container">
          <h2>Workplaces</h2>
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
              {employeesStore.employees.map((employee) => (
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
    </div>
  );
};

export default observer(Employees);
