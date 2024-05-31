import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import NavigateBlock from "./NavigateBlock";
import { Context } from "../main";
import {
  Theme,
  ThemeContext,
} from "../services/ThemeProvider/lib/ThemeContext";
import s from "../styles/Computers.module.css";
import {
  Button,
  Spinner,
  Table,
  FormControl,
  Modal,
  Form,
} from "react-bootstrap";
import LoginForm from "./LoginForm";
import ToastAlert from "./ToastAlert";
import add from "../assets/add.svg";
import edit from "../assets/edit.svg";
import deleteBtn from "../assets/delete.svg";

const Computers: FC = () => {
  const {
    computersStore,
    componentsStore,
    peripheralsStore,
    workplacesStore,
    userStore,
  } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [formState, setFormState] = useState({
    _id: "",
    name: "",
    processor: "",
    graphicsCard: "",
    hardDisk: "",
    mouse: "",
    keyboard: "",
    headphones: "",
    workplace: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      userStore.checkAuth();
    }
  }, [userStore]);

  useEffect(() => {
    computersStore.fetchComputers();
    componentsStore.fetchComponents();
    peripheralsStore.fetchPeripherals();
    workplacesStore.fetchWorkplaces();
  }, [computersStore, componentsStore, peripheralsStore, workplacesStore]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFormChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const components = [
      { _id: formState.processor },
      { _id: formState.graphicsCard },
      { _id: formState.hardDisk },
    ];
    const peripherals = [
      { _id: formState.mouse },
      { _id: formState.keyboard },
      { _id: formState.headphones },
    ];
    const computerData = {
      name: formState.name,
      components,
      peripherals,
      workplace: formState.workplace,
    };

    if (isEditing) {
      await computersStore.updateComputer(formState._id, computerData);
    } else {
      await computersStore.createComputer(computerData);
    }
    setFormState({
      _id: "",
      name: "",
      processor: "",
      graphicsCard: "",
      hardDisk: "",
      mouse: "",
      keyboard: "",
      headphones: "",
      workplace: "",
    });
    setIsEditing(false);
    setShowModal(false);
    computersStore.fetchComputers();
  };

  const handleEdit = (computer: any) => {
    const [processor, graphicsCard, hardDisk] = computer.components.filter(
      (comp: any) =>
        ["Processor", "Graphics Card", "Hard Disk"].includes(comp.type)
    );
    const [mouse, keyboard, headphones] = computer.peripherals.filter(
      (peripheral: any) =>
        ["Mouse", "Keyboard", "Headphones"].includes(peripheral.type)
    );

    setFormState({
      _id: computer._id,
      name: computer.name,
      processor: processor ? processor._id : "",
      graphicsCard: graphicsCard ? graphicsCard._id : "",
      hardDisk: hardDisk ? hardDisk._id : "",
      mouse: mouse ? mouse._id : "",
      keyboard: keyboard ? keyboard._id : "",
      headphones: headphones ? headphones._id : "",
      workplace: computer.workplace._id,
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    await computersStore.deleteComputer(id);
  };

  const handleAdd = () => {
    setFormState({
      _id: "",
      name: "",
      processor: "",
      graphicsCard: "",
      hardDisk: "",
      mouse: "",
      keyboard: "",
      headphones: "",
      workplace: "",
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const filteredComputers = computersStore.computers.filter((computer) =>
    computer.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h2 className={s.tittleHead}>Computers</h2>
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
                <img src={add} alt="Add" className={s.addImg} />
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
                <th>Processor</th>
                <th>Graphics Card</th>
                <th>Hard Disk</th>
                <th>Mouse</th>
                <th>Keyboard</th>
                <th>Headphones</th>
                <th>Workplace</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComputers.map((computer) => {
                const processor =
                  computer.components.find((comp) => comp.type === "Processor")
                    ?.name || "N/A";
                const graphicsCard =
                  computer.components.find(
                    (comp) => comp.type === "Graphics Card"
                  )?.name || "N/A";
                const hardDisk =
                  computer.components.find((comp) => comp.type === "Hard Disk")
                    ?.name || "N/A";
                const mouse =
                  computer.peripherals.find(
                    (peripheral) => peripheral.type === "Mouse"
                  )?.name || "N/A";
                const keyboard =
                  computer.peripherals.find(
                    (peripheral) => peripheral.type === "Keyboard"
                  )?.name || "N/A";
                const headphones =
                  computer.peripherals.find(
                    (peripheral) => peripheral.type === "Headphones"
                  )?.name || "N/A";

                return (
                  <tr key={computer._id}>
                    <td>{computer._id}</td>
                    <td>{computer.name}</td>
                    <td>{processor}</td>
                    <td>{graphicsCard}</td>
                    <td>{hardDisk}</td>
                    <td>{mouse}</td>
                    <td>{keyboard}</td>
                    <td>{headphones}</td>
                    <td>{computer.workplace.name}</td>
                    <td className={s.actionsColumn}>
                      <Button
                        variant="warning"
                        onClick={() => handleEdit(computer)}
                        className={s.btnEdit}
                      >
                        <img src={edit} alt="Edit" className={s.editBtn} />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(computer._id)}
                      >
                        <img
                          src={deleteBtn}
                          alt="Delete"
                          className={s.deleteBtn}
                        />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton className={modalContentClass}>
          <Modal.Title>
            {isEditing ? "Edit Computer" : "Add Computer"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={modalContentClass}>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="computerName">
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
            <Form.Group controlId="computerProcessor">
              <Form.Label>Processor</Form.Label>
              <Form.Control
                as="select"
                name="processor"
                value={formState.processor}
                onChange={handleFormChange}
                className={theme === Theme.DARK ? s.inputDark : ""}
                required
              >
                <option value="">Select Processor</option>
                {componentsStore.components
                  .filter((comp) => comp.type === "Processor")
                  .map((comp) => (
                    <option key={comp._id} value={comp._id}>
                      {comp.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="computerGraphicsCard">
              <Form.Label>Graphics Card</Form.Label>
              <Form.Control
                as="select"
                name="graphicsCard"
                value={formState.graphicsCard}
                onChange={handleFormChange}
                className={theme === Theme.DARK ? s.inputDark : ""}
                required
              >
                <option value="">Select Graphics Card</option>
                {componentsStore.components
                  .filter((comp) => comp.type === "Graphics Card")
                  .map((comp) => (
                    <option key={comp._id} value={comp._id}>
                      {comp.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="computerHardDisk">
              <Form.Label>Hard Disk</Form.Label>
              <Form.Control
                as="select"
                name="hardDisk"
                value={formState.hardDisk}
                onChange={handleFormChange}
                className={theme === Theme.DARK ? s.inputDark : ""}
                required
              >
                <option value="">Select Hard Disk</option>
                {componentsStore.components
                  .filter((comp) => comp.type === "Hard Disk")

                  .map((comp) => (
                    <option key={comp._id} value={comp._id}>
                      {comp.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="computerMouse">
              <Form.Label>Mouse</Form.Label>
              <Form.Control
                as="select"
                name="mouse"
                value={formState.mouse}
                onChange={handleFormChange}
                className={theme === Theme.DARK ? s.inputDark : ""}
                required
              >
                <option value="">Select Mouse</option>
                {peripheralsStore.peripherals
                  .filter((peripheral) => peripheral.type === "Mouse")
                  .map((peripheral) => (
                    <option key={peripheral._id} value={peripheral._id}>
                      {peripheral.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="computerKeyboard">
              <Form.Label>Keyboard</Form.Label>
              <Form.Control
                as="select"
                name="keyboard"
                value={formState.keyboard}
                onChange={handleFormChange}
                className={theme === Theme.DARK ? s.inputDark : ""}
                required
              >
                <option value="">Select Keyboard</option>
                {peripheralsStore.peripherals
                  .filter((peripheral) => peripheral.type === "Keyboard")
                  .map((peripheral) => (
                    <option key={peripheral._id} value={peripheral._id}>
                      {peripheral.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="computerHeadphones">
              <Form.Label>Headphones</Form.Label>
              <Form.Control
                as="select"
                name="headphones"
                value={formState.headphones}
                onChange={handleFormChange}
                className={theme === Theme.DARK ? s.inputDark : ""}
                required
              >
                <option value="">Select Headphones</option>
                {peripheralsStore.peripherals
                  .filter((peripheral) => peripheral.type === "Headphones")
                  .map((peripheral) => (
                    <option key={peripheral._id} value={peripheral._id}>
                      {peripheral.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="computerWorkplace">
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
                {workplacesStore.workplaces.map((workplace) => (
                  <option key={workplace._id} value={workplace._id}>
                    {workplace.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="success" type="submit" className="mt-2">
              {isEditing ? "Update" : "Add"} Computer
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastAlert />
    </div>
  );
};

export default observer(Computers);
