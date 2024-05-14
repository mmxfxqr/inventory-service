import React, { FC, useContext, useState } from "react";
import { Context } from "../main";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Form, Button } from "react-bootstrap";
import s from "../styles/Login.module.css"
const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { userStore } = useContext(Context);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await userStore.login(email, password);
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
          Sign-In
        </Button>
      <div className="mt-3">
        <Link to="/registration">Sign-Up</Link>
      </div>
      </Form>
    </div>
  );
};

export default observer(LoginForm);
