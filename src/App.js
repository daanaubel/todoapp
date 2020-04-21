import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Todos from "./components/Todos";
import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
import axios from "axios";
import config from "./config";
import ShowTodosButton from "./components/ShowTodosButton";
import DelAllTodo from "./DelAllTodo";
class App extends Component {
  state = {
    todos: [],
    showCompletedTodos: true,
  };

  BASE_URL = config.BASE_URL;
  componentDidMount() {
    axios.get(`${this.BASE_URL}todos/`).then((res) => {
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
      .patch(`${this.BASE_URL}todos/${todo.id}/`, {
        completed: !todo.completed,
      })
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
    axios.delete(`${this.BASE_URL}todos/}`);
    this.setState({
      todos: [...this.state.todos.filter((todo) => !todo.completed)],
    });
  };
  delTodo = (id) => {
    axios.delete(`${this.BASE_URL}todos/${id}/`);
    this.setState({
      todos: [...this.state.todos.filter((todo) => todo.id !== id)],
    });
  };
  addTodo = (title) => {
    const newTodo = {
      title,
    };
    axios.post(`${this.BASE_URL}todos/`, newTodo).then((res) => {
      this.setState({ todos: [...this.state.todos, res.data] });
    });
  };
  render() {
    const openTodos = this.state.todos.filter((todo) => !todo.completed);
    const completedTodos = this.state.todos.filter((todo) => todo.completed);
    const existCompletedTodos = this.state.todos.some((todo) => todo.completed);
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={openTodos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                    showCompletedTodos={this.state.showCompletedTodos}
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
                </React.Fragment>
              )}
            />
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
