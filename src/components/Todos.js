import PropTypes from "prop-types";
import React, { Component } from "react";
import Todoitem from "./TodoItem";

export class Todos extends Component {
  render() {
    const sortedTodos = this.props.todos.sort((a, b) => {
      if (!b.dueDate) {
        return -1;
      }
      if (!a.dueDate) {
        return 1;
      }
      if (a.dueDate < b.dueDate) {
        return -1;
      }
      if (a.dueDate > b.dueDate) {
        return 1;
      }
      return 0;
    });
    return sortedTodos.map((todo) => (
      <Todoitem
        key={todo.id}
        todo={todo}
        handleClose={() => this.props.handleClose()}
      />
    ));
  }
}
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default Todos;
