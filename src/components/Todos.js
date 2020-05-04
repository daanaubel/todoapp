import PropTypes from "prop-types";
import React, { Component } from "react";
import Todoitem from "./TodoItem";

export class Todos extends Component {
  render() {
    return this.props.todos.map((todo) => (
      <Todoitem
        key={todo.id}
        todo={todo}
        handleClose={() => this.props.handleClose()}
        isEdit={this.props.isEdit}
        openEditTodoDialog={this.props.openEditTodoDialog}
      />
    ));
  }
}
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default Todos;
