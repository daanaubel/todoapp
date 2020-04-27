import React, { Component } from "react";
import Todos from "./Todos";
import AddTodo from "./AddTodo";
import axios from "axios";
import config from "../config";
import ShowTodosButton from "./ShowTodosButton";
import DelAllTodo from "./DelAllTodo";
import { Box } from "@material-ui/core";

export class Todolist extends Component {
  state = {
    todos: [],
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
    axios.get(`${this.BASE_URL}todos/`, this.tokenConfig).then((res) => {
      this.setState({
        todos: res.data,
      });
    });
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
  // Toggle Complete
  markComplete = (todo) => {
    axios
      .patch(
        `${this.BASE_URL}todos/${todo.id}/`,
        {
          completed: !todo.completed,
        },
        this.tokenConfig
      )
      .then((res) => {
        this.setState({
          todos: this.state.todos.map((todo) => {
            if (todo.id === res.data.id) {
              todo.completed = !todo.completed;
            }
            return todo;
          }),
        });
      });
  };
  delAllCompletedTodos = () => {
    axios.delete(`${this.BASE_URL}todos/completed/`, this.tokenConfig);
    this.setState({
      todos: [...this.state.todos.filter((todo) => !todo.completed)],
    });
  };
  delTodo = (id) => {
    axios.delete(`${this.BASE_URL}todos/${id}/`, this.tokenConfig);
    this.setState({
      todos: [...this.state.todos.filter((todo) => todo.id !== id)],
    });
  };
  openAddTodoDialog = (title) => {
    this.setState({ isAdd: true });
  };
  handleClose = () => {
    this.setState({ isAdd: false });
  };
  addTodo = (title) => {
    const newTodo = {
      title,
    };

    axios
      .post(`${this.BASE_URL}todos/`, newTodo, this.tokenConfig)
      .then((res) => {
        this.setState({ todos: [...this.state.todos, res.data] });
      });
  };
  render() {
    const openTodos = this.state.todos.filter((todo) => !todo.completed);
    const completedTodos = this.state.todos.filter((todo) => todo.completed);
    const existCompletedTodos = this.state.todos.some((todo) => todo.completed);
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Todos
          todos={openTodos}
          markComplete={this.markComplete}
          delTodo={this.delTodo}
          showCompletedTodos={this.state.showCompletedTodos}
        />
        <AddTodo
          onClick={this.openAddTodoDialog}
          isAdd={this.state.isAdd}
          handleClose={this.handleClose}
          addTodo={this.addTodo}
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
              markComplete={this.markComplete}
              delTodo={this.delTodo}
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

export default Todolist;
