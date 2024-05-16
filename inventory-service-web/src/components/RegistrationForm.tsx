import React, { FC, useContext, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import s from "../styles/Login.module.css";

const RegistrationForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { userStore } = useContext(Context);
  let navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await userStore.registration(email, password);
    navigate("/");
  };

  return (
    <div className={s.mainFormContainer}>
      <Form className={s.mainForm} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign-Up
        </Button>
        <div className="mt-3">
          <Link to="/login">Sign-In</Link>
        </div>
      </Form>
    </div>
  );
};

export default observer(RegistrationForm);
