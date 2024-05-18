import React, { useContext, useState } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import comp from "../assets/navigIcons/comp.svg";
import depart from "../assets/navigIcons/depart.svg";
import employee from "../assets/navigIcons/employee.svg";
import mouse from "../assets/navigIcons/mouse.svg";
import component from "../assets/navigIcons/component.svg";
import workplace from "../assets/navigIcons/workplace.svg";
import "../styles/NavBlock.css";

const NavigateBlock = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <Nav className={"flex-column navBlock"}>
      <Nav.Link
        as={Link}
        to={"#"}
        className={activeLink === "departments" ? "active" : ""}
        onClick={() => handleClick("departments")}
      >
        Departments
        <img src={depart} className="svg" />
      </Nav.Link>
      <Nav.Link
        as={Link}
        to={"#"}
        className={activeLink === "workplaces" ? "active" : ""}
        onClick={() => handleClick("workplaces")}
      >
        Workplaces
        <img src={workplace} className="svg" />
      </Nav.Link>
      <Nav.Link
        as={Link}
        to={"#"}
        className={activeLink === "employees" ? "active" : ""}
        onClick={() => handleClick("employees")}
      >
        Employees
        <img src={employee} className="svg" />
      </Nav.Link>
      <Nav.Link
        as={Link}
        to={"#"}
        className={activeLink === "computers" ? "active" : ""}
        onClick={() => handleClick("computers")}
      >
        Computers
        <img src={comp} className="svg" />
      </Nav.Link>
      <Nav.Link
        as={Link}
        to={"#"}
        className={activeLink === "components" ? "active" : ""}
        onClick={() => handleClick("components")}
      >
        Components
        <img src={component} className="svg" />
      </Nav.Link>
      <Nav.Link
        as={Link}
        to={"#"}
        className={activeLink === "peripheral-devices" ? "active" : ""}
        onClick={() => handleClick("peripheral-devices")}
      >
        Peripheral-Devices
        <img src={mouse} className="svg" />
      </Nav.Link>
    </Nav>
  );
};

export default NavigateBlock;
