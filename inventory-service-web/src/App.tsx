import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";

import MainPage from "./components/MainPage";
import { observer } from "mobx-react-lite";
import Components from "./components/Components";
import Computers from "./components/Computers";
import Departments from "./components/Departments";
import Employees from "./components/Employees";
import Peripheral from "./components/Peripheral";
import Workplaces from "./components/Workplaces";

function App() {
  return (
    <div className={"main-container"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/components" element={<Components />} />
          <Route path="/computers" element={<Computers />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/peripheral" element={<Peripheral />} />
          <Route path="/workplaces" element={<Workplaces />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default observer(App);
