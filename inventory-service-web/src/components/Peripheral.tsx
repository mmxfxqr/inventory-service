import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import NavigateBlock from "./NavigateBlock";
import { Context } from "../main";
import {
  Theme,
  ThemeContext,
} from "../services/ThemeProvider/lib/ThemeContext";
import {
  Spinner,
  Table,
  FormControl,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import s from "../styles/Peripheral.module.css";
import LoginForm from "./LoginForm";
import ToastAlert from "./ToastAlert";
import add from "../assets/add.svg";
import edit from "../assets/edit.svg";
import deleteBtn from "../assets/delete.svg";
import { IPeripheral } from "../services/Peripheral/Peripheral";

const Peripheral: FC = () => {
  const { peripheralsStore } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const { userStore } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");
  const [formState, setFormState] = useState({ _id: "", name: "", type: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      userStore.checkAuth();
    }
  }, [userStore]);

  useEffect(() => {
    peripheralsStore.fetchPeripherals();
  }, [peripheralsStore]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFormChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      await peripheralsStore.updatePeripheral(
        formState._id,
        formState.name,
        formState.type
      );
    } else {
      await peripheralsStore.createPeripheral(formState.name, formState.type);
    }
    setFormState({ _id: "", name: "", type: "" });
    setIsEditing(false);
    setShowModal(false);
  };

  const handleEdit = (peripheral: IPeripheral) => {
    setFormState(peripheral);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    await peripheralsStore.deletePeripheral(id);
  };

  const handleAdd = () => {
    setFormState({ _id: "", name: "", type: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const filteredPeripherals = peripheralsStore.peripherals.filter(
    (peripheral) =>
      peripheral.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className={s.content}>
        <NavigateBlock />
        <div className="container">
          <div className={s.headerCon}>
            <h2 className={s.titleHead}>Peripherals</h2>
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
                <img src={add} className={s.addImg} alt="Add" />
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
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPeripherals.map((peripheral) => (
                <tr key={peripheral._id}>
                  <td>{peripheral._id}</td>
                  <td>{peripheral.name}</td>
                  <td>{peripheral.type}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(peripheral)}
                      className={s.btnEdit}
                    >
                      <img src={edit} className={s.editBtn} alt="Edit" />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(peripheral._id)}
                    >
                      <img
                        src={deleteBtn}
                        className={s.deleteBtn}
                        alt="Delete"
                      />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header
          className={theme === Theme.DARK ? s.modalDark : s.modalLight}
          closeButton
        >
          <Modal.Title>
            {isEditing ? "Edit Peripheral" : "Add Peripheral"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className={theme === Theme.DARK ? s.modalDark : s.modalLight}
        >
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formState.name}
                className={theme === Theme.DARK ? s.inputDark : ""}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={formState.type}
                className={theme === Theme.DARK ? s.inputDark : ""}
                onChange={handleFormChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Mouse">Mouse</option>
                <option value="Keyboard">Keyboard</option>
                <option value="Headphones">Headphones</option>{" "}
                {/* Заменяем "Monitor" на "Headphones" здесь */}
              </Form.Control>
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              style={{ marginTop: "10px" }}
            >
              {isEditing ? "Update" : "Add"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastAlert />
    </div>
  );
};

export default observer(Peripheral);
