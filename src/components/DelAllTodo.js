import React, { Component } from "react";
import Button from "@material-ui/core/Button";
export class DelAllTodo extends Component {
  render() {
    return (
      <Button
        style={{ marginTop: "5px" }}
        onClick={this.props.onClick}
        variant="contained"
        color="secondary"
      >
        verwijder alle afgeronden taken
      </Button>
    );
  }
}
// const buttonStyle = {
//   borderRadius: "5px",
//   background: "red",
//   color: "black",
// };

export default DelAllTodo;
