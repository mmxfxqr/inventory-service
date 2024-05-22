import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import NavBar from "./NavBar";
import NavigateBlock from "./NavigateBlock";

const Components: FC = () => {
  return <div>
    <NavBar/>
    <NavigateBlock/>
  </div>;
};

export default observer(Components);
