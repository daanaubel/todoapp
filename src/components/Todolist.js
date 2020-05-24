import React, { Component } from "react";
import Todos from "./Todos";
import AddTodo from "./AddTodo";
import axios from "axios";
import config from "../config";
import ShowTodosButton from "./ShowTodosButton";
import DelAllTodo from "./DelAllTodo";
import { Box } from "@material-ui/core";
import { connect } from "react-redux";
import { getTodos } from "../actions/todos";

export class Todolist extends Component {
  state = {
    showCompletedTodos: false,
    isAdd: false,
  };
  tokenConfig = {
    headers: {
      Authorization: `Token ${this.props.token}`,
    },
  };
  BASE_URL = config.BASE_URL;

  componentDidMount() {
    this.props.getTodos();
  }

  toggleCompletedTodos = () => {
    this.setState({
      showCompletedTodos: !this.state.showCompletedTodos,
    });
  };

  openAddTodoDialog = (title) => {
    this.setState({ isAdd: true });
  };
  handleCloseAddTodo = () => {
    this.setState({ isAdd: false });
  };

  delAllCompletedTodos = () => {
    axios.delete(`${this.BASE_URL}todos/completed/`, this.tokenConfig);
    this.setState({
      todos: [...this.props.todos.filter((todo) => !todo.completed)],
    });
  };

  render() {
    if (!this.props.todos) return null;
    const parentTodos = this.props.todos.filter((todo) => !todo.parentTodo);
    let openTodos = parentTodos.filter((todo) => !todo.completed);
    const openTodoChildren = this.props.todos.filter((todo) =>
      openTodos.some((parentTodo) => parentTodo.id === todo.parentTodo)
    );
    openTodos = openTodos.concat(openTodoChildren);
    let completedTodos = parentTodos.filter((todo) => todo.completed);
    const completedTodosChildren = this.props.todos.filter((todo) =>
      completedTodos.some((parentTodo) => parentTodo.id === todo.parentTodo)
    );
    completedTodos = completedTodos.concat(completedTodosChildren);
    const existCompletedTodos = this.props.todos.some(
      (todo) => todo.completed && !todo.parentTodo
    );

    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Todos
          todos={openTodos}
          showCompletedTodos={this.state.showCompletedTodos}
        />
        <AddTodo
          onClick={this.openAddTodoDialog}
          isAdd={this.state.isAdd}
          handleClose={this.handleCloseAddTodo}
        />
        {existCompletedTodos && (
          <ShowTodosButton
            show={this.state.showCompletedTodos}
            onClick={this.toggleCompletedTodos}
          />
        )}
        {this.state.showCompletedTodos && (
          <React.Fragment>
            <Todos
              todos={completedTodos}
              showCompletedTodos={this.state.showCompletedTodos}
            />
            {existCompletedTodos && (
              <DelAllTodo onClick={this.delAllCompletedTodos} />
            )}
          </React.Fragment>
        )}
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos.todos,
});

export default connect(mapStateToProps, { getTodos })(Todolist);
