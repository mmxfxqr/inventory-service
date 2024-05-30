import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import NavigateBlock from "./NavigateBlock";
import { Context } from "../main";
import { ThemeContext, Theme } from "../services/ThemeProvider/lib/ThemeContext";
import { Spinner, Table, FormControl, Button, Modal, Form } from "react-bootstrap";
import s from "../styles/Workplaces.module.css";
import LoginForm from "./LoginForm";
import ToastAlert from "./ToastAlert";
import deleteBtn from "../assets/delete.svg";
import add from "../assets/add.svg";
import edit from "../assets/edit.svg";

const Workplaces: FC = () => {
  const { workplacesStore, departmentsStore, userStore } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [formState, setFormState] = useState({ _id: "", name: "", department: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      userStore.checkAuth();
    }
  }, []);

  useEffect(() => {
    workplacesStore.fetchWorkplaces();
    departmentsStore.fetchDepartments();
  }, [workplacesStore, departmentsStore]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

 const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (isEditing) {
    await workplacesStore.updateWorkplace(formState._id, formState.name, formState.department);
  } else {
    await workplacesStore.createWorkplace(formState.name, formState.department);
  }
  await departmentsStore.fetchDepartments();
  setFormState({ _id: "", name: "", department: "" });
  setIsEditing(false);
  setShowModal(false);
};


  const handleEdit = (workplace) => {
    setFormState(workplace);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await workplacesStore.deleteWorkplace(id);
  };

  const handleAdd = () => {
    setFormState({ _id: "", name: "", department: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const filteredWorkplaces = workplacesStore.workplaces.filter(
    (workplace) => workplace.name.toLowerCase().includes(searchTerm.toLowerCase())
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
  const modalContentClass = theme === Theme.DARK ? s.modalDark : s.modalLight;

  return (
    <div>
      <NavBar />
      <div className={s.content}>
        <NavigateBlock />
        <div className="container">
          <div className={s.headerCon}>
            <h2 className={s.tittleHead}>Workplaces</h2>
            <div className={s.searchContainer}>
              <FormControl
                type="search"
                className={`mr-2 ${searchClass}`}
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ maxWidth: "200px" }}
              />
              <Button
                variant="success"
                onClick={handleAdd}
                style={{ marginLeft: "5px" }}
              >
                <img src={add} className={s.addImg} />
              </Button>
            </div>
          </div>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkplaces.map((workplace) => (
                <tr key={workplace._id}>
                  <td>{workplace._id}</td>
                  <td>{workplace.name}</td>
                  <td>{workplace.department.name}</td>
                  <td className={s.actionsColumn}>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(workplace)}
                      className={s.btnEdit}
                    >
                      <img src={edit} className={s.editBtn} />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(workplace._id)}
                    >
                      <img src={deleteBtn} className={s.deleteBtn} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton className={modalContentClass}>
          <Modal.Title>{isEditing ? "Edit Workplace" : "Add Workplace"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={modalContentClass}>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formState.name}
                onChange={handleFormChange}
                required
                className={theme === Theme.DARK ? s.inputDark : ""}
              />
            </Form.Group>
            <Form.Group controlId="formDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control
                as="select"
                name="department"
                value={formState.department}
                onChange={handleFormChange}
                required
                className={theme === Theme.DARK ? s.inputDark : ""}
              >
                <option value="">Select Department</option>
                {departmentsStore.departments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="success" type="submit" style={{ marginTop: "10px" }}>
              {isEditing ? "Update" : "Add"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastAlert />
    </div>
  );
};

export default observer(Workplaces);
