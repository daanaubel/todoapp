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
    isEdit: false,
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
    if (this.state.showCompletedTodos === true) {
      this.setState({
        showCompletedTodos: false,
      });
    } else {
      this.setState({
        showCompletedTodos: true,
      });
    }
  };

  delAllCompletedTodos = () => {
    axios.delete(`${this.BASE_URL}todos/completed/`, this.tokenConfig);
    this.setState({
      todos: [...this.state.todos.filter((todo) => !todo.completed)],
    });
  };
  openAddTodoDialog = (title) => {
    this.setState({ isAdd: true });
  };
  handleCloseAddTodo = () => {
    this.setState({ isAdd: false });
  };
  openEditTodoDialog = () => {
    this.setState({ isEdit: true });
  };
  handleCloseEditTodo = () => {
    this.setState({ isEdit: false });
  };

  render() {
    if (!this.props.todos) return null;
    const openTodos = this.props.todos.filter((todo) => !todo.completed);
    const completedTodos = this.props.todos.filter((todo) => todo.completed);
    const existCompletedTodos = this.props.todos.some((todo) => todo.completed);
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Todos
          todos={openTodos}
          showCompletedTodos={this.state.showCompletedTodos}
          openEditTodoDialog={this.openEditTodoDialog}
          isEdit={this.state.isEdit}
          handleClose={this.handleCloseEditTodo}
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
