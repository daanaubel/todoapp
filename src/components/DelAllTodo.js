import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { delAllCompletedTodos } from "../actions/todos";

export class DelAllTodo extends Component {
  render() {
    return (
      <Button
        style={{ marginTop: "5px" }}
        onClick={() => this.props.delAllCompletedTodos()}
        variant="contained"
        color="secondary"
      >
        verwijder alle afgeronden taken
      </Button>
    );
  }
}

export default connect(null, { delAllCompletedTodos })(DelAllTodo);
