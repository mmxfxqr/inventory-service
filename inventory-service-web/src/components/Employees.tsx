import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import NavigateBlock from "./NavigateBlock";
import s from "../styles/Employees.module.css";
import { Button, Spinner, Table, FormControl, Modal, Form } from "react-bootstrap";
import { Context } from "../main";
import { Theme, ThemeContext } from "../services/ThemeProvider/lib/ThemeContext";
import LoginForm from "./LoginForm";
import ToastAlert from "./ToastAlert";
import add from "../assets/add.svg";
import edit from "../assets/edit.svg";
import deleteBtn from "../assets/delete.svg";

interface FormState {
  _id: string;
  name: string;
  department: string;
  workplace: string;
}

const Employees: FC = () => {
  const { employeesStore, departmentsStore, workplacesStore, userStore } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [formState, setFormState] = useState<FormState>({ _id: "", name: "", department: "", workplace: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      userStore.checkAuth();
    }
  }, [userStore]);

  useEffect(() => {
    employeesStore.fetchEmployees();
    departmentsStore.fetchDepartments();
    workplacesStore.fetchWorkplaces();
  }, [employeesStore, departmentsStore, workplacesStore]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFormChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      await employeesStore.updateEmployee(formState._id, formState.name, formState.department, formState.workplace);
    } else {
      await employeesStore.createEmployee(formState.name, formState.department, formState.workplace);
    }
    setFormState({ _id: "", name: "", department: "", workplace: "" });
    setIsEditing(false);
    setShowModal(false);
    employeesStore.fetchEmployees();
  };

  const handleEdit = (employee: any) => {
    setFormState(employee);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    await employeesStore.deleteEmployee(id);
    employeesStore.fetchEmployees();
  };

  const handleAdd = () => {
    setFormState({ _id: "", name: "", department: "", workplace: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const filteredEmployees = employeesStore.employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredWorkplaces = workplacesStore.workplaces.filter(
    (workplace) => workplace.department._id === formState.department
  );

  if (userStore.isLoading) {
    return (
      <div className={s.spinerCon}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (!userStore.isAuth) {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }

  const tableVariant = theme === Theme.DARK ? "dark" : "light";
  const searchClass = theme === Theme.DARK ? s.searchDark : s.searchLight;

  return (
    <div>
      <NavBar />
      <div className={` ${s.content}`}>
        <NavigateBlock />
        <div className="container">
          <div className={s.headerCon}>
            <h2 className={s.tittleHead}>Employees</h2>
            <div className={s.searchContainer}>
              <FormControl
                type="search"
                className={`mr-2 ${searchClass}`}
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ maxWidth: "200px" }}
              />
              <Button variant="success" onClick={handleAdd} style={{ marginLeft: "5px" }}>
                <img src={add} alt="Add" className={s.addImg} />
              </Button>
            </div>
          </div>
          <Table striped bordered hover variant={tableVariant} className={s.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department Name</th>
                <th>Workplace Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee._id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.department.name}</td>
                  <td>{employee.workplace.name}</td>
                  <td className={s.actionsColumn}>
                    <Button variant="warning" onClick={() => handleEdit(employee)} className={s.btnEdit}>
                      <img src={edit} alt="Edit" className={s.editBtn} />
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(employee._id)}>
                      <img src={deleteBtn} alt="Delete" className={s.deleteBtn} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Employee" : "Add Employee"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={theme === Theme.DARK ? s.modalDark : s.modalLight}>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="employeeName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formState.name}
                onChange={handleFormChange}
                className={theme === Theme.DARK ? s.inputDark : ""}
                required
              />
            </Form.Group>
            <Form.Group controlId="employeeDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control
                as="select"
                name="department"
                value={formState.department}
                onChange={handleFormChange}
                className={theme === Theme.DARK ? s.inputDark : ""}
                required
              >
                <option value="">Select Department</option>
                {departmentsStore.departments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="employeeWorkplace">
              <Form.Label>Workplace</Form.Label>
              <Form.Control
                as="select"
                name="workplace"
                value={formState.workplace}
                onChange={handleFormChange}
                className={theme === Theme.DARK ? s.inputDark : ""}
                required
              >
                <option value="">Select Workplace</option>
                {filteredWorkplaces.map((workplace) => (
                  <option key={workplace._id} value={workplace._id}>
                    {workplace.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="success" type="submit" className="mt-2">
              {isEditing ? "Update" : "Add"} Employee
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastAlert />
    </div>
  );
};

export default observer(Employees);
