import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import UserStore from "./mobx/userStore.ts";
import "bootstrap/dist/css/bootstrap.min.css";
import ThemeProvider from "./services/ThemeProvider/UI/ThemeProvider.tsx";

interface IUserStore {
  userStore: UserStore;
}

const userStore = new UserStore();
export const Context = createContext<IUserStore>({ userStore });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Context.Provider value={{ userStore }}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Context.Provider>
);
