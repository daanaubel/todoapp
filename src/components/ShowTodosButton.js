import React, { Component } from "react";
import Button from "@material-ui/core/Button";

export class ShowTodosButton extends Component {
  render() {
    return (
      <Button onClick={this.props.onClick} color="primary">
        {this.props.show ? "verberg afgeronden taken" : "Toon afgeronden taken"}
      </Button>
    );
  }
}
// const buttonStyle = {
//   borderRadius: "16px",
//   background: "white",
//   borderColor: "black",
// };

export default ShowTodosButton;
