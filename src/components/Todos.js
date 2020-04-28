import React, { Component } from "react";
import Todoitem from "./TodoItem";
import PropTypes from "prop-types";
class Todos extends Component {
  render() {
    return this.props.todos.map((todo) => (
      <Todoitem
        key={todo.id}
        todo={todo}
        markComplete={() => this.props.markComplete(todo)}
        delTodo={this.props.delTodo}
        openEditTodoDialog={() => this.props.openEditTodoDialog(todo)}
        handleClose={() => this.props.handleClose()}
        isEdit={this.props.isEdit}
        editTodo={this.props.editTodo}
      />
    ));
  }
}
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default Todos;
