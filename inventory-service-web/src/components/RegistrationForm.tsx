import React, { FC, useContext, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";

const RegistrationForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { userStore } = useContext(Context);
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
      <button onClick={() => userStore.registration(email, password)}>
        Sign-Up
      </button>
    </div>
  );
};

export default observer(RegistrationForm);
