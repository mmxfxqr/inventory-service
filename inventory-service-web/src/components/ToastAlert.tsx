import React, { FC, useContext } from "react";
import { Context } from "../main";
import { ToastContainer, Toast } from "react-bootstrap";
import {
  Theme,
  ThemeContext,
} from "../services/ThemeProvider/lib/ThemeContext";
import { observer } from "mobx-react-lite";

const ToastAlert = () => {
  const { userStore } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      {userStore.user.isActivated ? (
        ""
      ) : (
        <ToastContainer
          position="bottom-end"
          className="p-3"
          style={{ zIndex: 1 }}
        >
          <Toast bg={theme === Theme.DARK ? "dark" : "light"}>
            <Toast.Header closeButton={false}>
              <strong className="rounded ">Inventory-Service</strong>
            </Toast.Header>
            <Toast.Body
              style={{ color: theme === Theme.DARK ? "white" : "black" }}
            >
              Подтвердите вашу электронную почту.
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </div>
  );
};

export default observer(ToastAlert);
