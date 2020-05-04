import { Container, CssBaseline } from "@material-ui/core";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import Header from "./components/layout/Header";
import PrivateRoute from "./components/PrivateRoute";
import Todolist from "./components/Todolist";
import store from "./store";
import { loadUser } from "./actions/auth";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <CssBaseline />
          <Header />
          <Container maxWidth="sm">
            <Switch>
              <PrivateRoute exact path="/" component={Todolist} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Container>
        </Router>
      </Provider>
    );
  }
}
export default App;
