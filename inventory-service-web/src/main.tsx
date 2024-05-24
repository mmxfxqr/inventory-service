// main.tsx или index.tsx (в зависимости от вашего проекта)

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
import ComponentsStore from "./mobx/componentsStore.ts";
import PeripheralStore from "./mobx/peripheralStore.ts";
import ComputersStore from "./mobx/computersStore.ts";

interface IStores {
  userStore: UserStore;
  departmentsStore: DepartmentsStore;
  workplacesStore: WorkplacesStore;
  employeesStore: EmployeeStore;
  componentsStore: ComponentsStore;
  peripheralsStore: PeripheralStore;
  computersStore: ComputersStore;
}

const userStore = new UserStore();
const departmentsStore = new DepartmentsStore();
const workplacesStore = new WorkplacesStore();
const employeesStore = new EmployeeStore();
const componentsStore = new ComponentsStore();
const peripheralsStore = new PeripheralStore();
const computersStore = new ComputersStore(); 

export const Context = createContext<IStores>({
  userStore,
  departmentsStore,
  workplacesStore,
  employeesStore,
  componentsStore,
  peripheralsStore,
  computersStore, 
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Context.Provider
    value={{
      userStore,
      departmentsStore,
      workplacesStore,
      employeesStore,
      componentsStore,
      peripheralsStore,
      computersStore,
    }}
  >
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Context.Provider>
);
