import React from "react";
import { Button } from "@material-ui/core";

function Header(props) {
  return (
    <header style={headerStyle}>
      <h1>Todolist</h1>
      <Button style={headerStyle} onClick={props.onClick}>
        Logout
      </Button>
    </header>
  );
}
const headerStyle = {
  background: "#333",
  color: "#fff",
  textAlign: "center",
  padding: "10px",
};
export default Header;
