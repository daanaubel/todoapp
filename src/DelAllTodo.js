import React, { Component } from "react";

export class DelAllTodo extends Component {
  render() {
    return (
      <button onClick={this.props.onClick} style={buttonStyle}>
        verwijder alle afgeronden taken
      </button>
    );
  }
}
const buttonStyle = {
  borderRadius: "5px",
  background: "red",
  color: "black",
};

export default DelAllTodo;
