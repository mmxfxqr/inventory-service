import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import comp from "../assets/navigIcons/comp.svg";
import depart from "../assets/navigIcons/depart.svg";
import employee from "../assets/navigIcons/employee.svg";
import mouse from "../assets/navigIcons/mouse.svg";
import component from "../assets/navigIcons/component.svg";
import workplace from "../assets/navigIcons/workplace.svg";
import "../styles/NavBlock.css";

const NavigateBlock = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Nav className={"flex-column navBlock"}>
      <Nav.Link
        as={Link}
        to={"/departments"}
        className={currentPath === "/departments" ? "active" : ""}
      >
        <img src={depart} className="svg" />
        Departments
      </Nav.Link>
      <Nav.Link
        as={Link}
        to={"/workplaces"}
        className={currentPath === "/workplaces" ? "active" : ""}
      >
        <img src={workplace} className="svg" />
        Workplaces
      </Nav.Link>
      <Nav.Link
        as={Link}
        to={"/employees"}
        className={currentPath === "/employees" ? "active" : ""}
      >
        <img src={employee} className="svg" />
        Employees
      </Nav.Link>
      <Nav.Link
        as={Link}
        to={"/computers"}
        className={currentPath === "/computers" ? "active" : ""}
      >
        <img src={comp} className="svg" />
        Computers
      </Nav.Link>
      <Nav.Link
        as={Link}
        to={"/components"}
        className={currentPath === "/components" ? "active" : ""}
      >
        <img src={component} className="svg" />
        Components
      </Nav.Link>
      <Nav.Link
        as={Link}
        to={"/peripheral"}
        className={currentPath === "/peripheral" ? "active" : ""}
      >
        {" "}
        <img src={mouse} className="svg" />
        Peripheral
      </Nav.Link>
    </Nav>
  );
};

export default NavigateBlock;
