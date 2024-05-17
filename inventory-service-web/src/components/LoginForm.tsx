import React, { FC, useContext, useState } from "react";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Form, Button, Alert } from "react-bootstrap";
import s from "../styles/Login.module.css";
const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { userStore } = useContext(Context);
  let navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await userStore.login(email, password);
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
        {userStore.error && ( 
          <Alert className={s.customAlert} variant="danger">
            {userStore.error}
          </Alert>
        )}

        <div className={`${s.formFooter}`}>
          <div className="mt-3">
            <Link to="/registration" className={`${s.linkLogin} `}>
              Don't you have an account yet?
            </Link>
          </div>
          <Button variant="success" type="submit" className={s.submitBtn}>
            Sign-In
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default observer(LoginForm);
