import React, { Component } from "react";
import { Box, Button } from "@material-ui/core";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import AddTodoDialog from "./AddTodoDialog";

export class AddTodo extends Component {
  state = {
    title: "",
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({ title: "" });
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
        <Box my={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={this.props.onClick}
            startIcon={<AddSharpIcon />}
          >
            Add todo
          </Button>
        </Box>
        <AddTodoDialog
          open={this.props.isAdd}
          handleClose={this.props.handleClose}
          addTodo={this.props.addTodo}
        />
      </form>
    );
  }
}

export default AddTodo;
