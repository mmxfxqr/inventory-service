import React, { FC, useContext, useState } from "react";
import { Context } from "../main";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {userStore} = useContext(Context)
  return (
    <div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="text"
        placeholder="Password"
      />
      <button onClick={() => userStore.login(email, password)}>Sign-In</button>
      <Link to={"/registration"}>Sign-Up</Link>
      <Link to={"/"}>Main</Link>
    </div>
  );
};

export default observer(LoginForm);
