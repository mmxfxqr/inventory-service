import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import NavBar from "./NavBar";
import NavigateBlock from "./NavigateBlock";

const Peripheral: FC = () => {
  return <div>
    <NavBar/>
    <NavigateBlock/>
  </div>;
};

export default observer(Peripheral);