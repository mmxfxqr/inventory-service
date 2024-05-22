import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import UserStore from "./mobx/userStore.ts";
import DepartmentsStore from "./mobx/departmentsStore.ts";
import "bootstrap/dist/css/bootstrap.min.css";
import ThemeProvider from "./services/ThemeProvider/UI/ThemeProvider.tsx";
import WorkplacesStore from "./mobx/workplacesStore.ts";
import EmployeeStore from "./mobx/employeesStore.ts";

interface IStores {
  userStore: UserStore;
  departmentsStore: DepartmentsStore;
  workplacesStore: WorkplacesStore;
  employeesStore: EmployeeStore;
}

const userStore = new UserStore();
const departmentsStore = new DepartmentsStore();
const workplacesStore = new WorkplacesStore();
const employeesStore = new EmployeeStore();
export const Context = createContext<IStores>({
  userStore,
  departmentsStore,
  workplacesStore,
  employeesStore,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Context.Provider
    value={{ userStore, departmentsStore, workplacesStore, employeesStore }}
  >
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Context.Provider>
);
