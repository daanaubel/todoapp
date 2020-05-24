import PropTypes from "prop-types";
import React, { Component } from "react";
import Todoitem from "./TodoItem";

export class Todos extends Component {
  render() {
    const withoutSubtask = this.props.todos.filter((todo) => !todo.parentTodo);
    const sortedTodos = withoutSubtask.sort((a, b) => {
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
      <React.Fragment>
        <Todoitem
          key={todo.id}
          todo={todo}
          handleClose={() => this.props.handleClose()}
          subtasks={this.props.todos.filter(
            (subtask) => subtask.parentTodo === todo.id
          )}
        />
      </React.Fragment>
    ));
  }
}
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default Todos;
