import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Todos from "./components/Todos";
import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/about";
import axios from "axios";
import config from "./config";
class App extends Component {
  state = {
    todos: [],
  };

  BASE_URL = config.BASE_URL;
  componentDidMount() {
    axios.get(`${this.BASE_URL}todos/`).then((res) => {
      this.setState({
        todos: res.data,
      });
    });
  }
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
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
