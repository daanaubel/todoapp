import React, { Component } from "react";

export class ShowTodosButton extends Component {
  render() {
    return (
      <button onClick={this.props.onClick} style={buttonStyle}>
        {this.props.show ? "verberg afgeronden taken" : "Toon afgeronden taken"}
      </button>
    );
  }
}
const buttonStyle = {
  borderRadius: "16px",
  background: "white",
  borderColor: "black",
};

export default ShowTodosButton;
