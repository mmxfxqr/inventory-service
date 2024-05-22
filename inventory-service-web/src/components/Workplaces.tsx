import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect } from "react";
import NavBar from "./NavBar";
import NavigateBlock from "./NavigateBlock";
import s from "../styles/Workplaces.module.css";
import { Context } from "../main";
import {
  Theme,
  ThemeContext,
} from "../services/ThemeProvider/lib/ThemeContext";
import { Table } from "react-bootstrap";

const Workplaces: FC = () => {
  const { workplacesStore } = useContext(Context);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    workplacesStore.fetchWorkplaces();
  }, [workplacesStore]);

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
              </tr>
            </thead>
            <tbody>
              {workplacesStore.workplaces.map((workplace) => (
                <tr key={workplace._id}>
                  <td>{workplace._id}</td>
                  <td>{workplace.name}</td>
                  <td>{workplace.department.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default observer(Workplaces);
