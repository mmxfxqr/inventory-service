import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import UserStore from "./mobx/userStore.ts";
import DepartmentsStore from "./mobx/departmentsStore.ts"; 
import "bootstrap/dist/css/bootstrap.min.css";
import ThemeProvider from "./services/ThemeProvider/UI/ThemeProvider.tsx";

interface IStores {
  userStore: UserStore;
  departmentsStore: DepartmentsStore;
}

const userStore = new UserStore();
const departmentsStore = new DepartmentsStore(); 

export const Context = createContext<IStores>({ userStore, departmentsStore });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Context.Provider value={{ userStore, departmentsStore }}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Context.Provider>
);
