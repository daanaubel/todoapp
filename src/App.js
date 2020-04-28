import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import Header from "./components/layout/Header";
import PrivateRoute from "./components/PrivateRoute";
import Todolist from "./components/Todolist";
import { CssBaseline, Container } from "@material-ui/core";
import axios from "axios";
import BASE_URL from "./config";

class App extends Component {
  state = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null,
  };

  login = (user, token) => {
    this.setState({ user, token, isAuthenticated: true });
    localStorage.setItem("token", token);
  };
  logout = () => {
    this.setState({ isAuthenticated: false });
    axios.post(`${BASE_URL}/logout`);
  };
  render() {
    return (
      <Router>
        <CssBaseline />
        {this.state.isAuthenticated && <Header onClick={this.logout} />}
        <Container maxWidth="sm">
          <Switch>
            <PrivateRoute
              exact
              path="/"
              component={Todolist}
              token={this.state.token}
              isAuthenticated={this.state.isAuthenticated}
            />
            <Route exact path="/register" component={Register} />

            <Route
              exact
              path="/login"
              render={() => (
                <Login
                  login={this.login}
                  isAuthenticated={this.state.isAuthenticated}
                />
              )}
            />
          </Switch>
        </Container>
      </Router>
    );
  }
}
export default App;
