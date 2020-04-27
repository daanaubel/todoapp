import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Paper, Box, Button, TextField, Container } from "@material-ui/core";
import axios from "axios";
import config from "../../config";
export default class login extends Component {
  state = {
    username: "",
    password: "",
  };
  BASE_URL = config.BASE_URL;

  onSubmit = (e) => {
    e.preventDefault();
    const newLogin = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post(`${this.BASE_URL}auth/Login`, newLogin)
      .then((res) => {
        this.props.login(res.data.user, res.data.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, password } = this.state;
    return (
      <Container maxWidth="xs">
        <Paper elevation={3} style={{ marginTop: "80px" }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <h2 className="text-enter">Login</h2>
            <form autoComplete="off" onSubmit={this.onSubmit}>
              <Box mb={1}>
                <TextField
                  label="Gebruikersnaam"
                  type="username"
                  value={username}
                  name="username"
                  onChange={this.onChange}
                />
              </Box>
              <Box mb={3}>
                <TextField
                  label="Wachtwoord"
                  type="password"
                  value={password}
                  name="password"
                  onChange={this.onChange}
                />
              </Box>
              <Box display="flex" justifyContent="center">
                <Button type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </Box>
              <p style={{ padding: "3px" }}>
                nog geen account? <Link to="/register">Registreer</Link>
              </p>
            </form>
          </Box>
        </Paper>
      </Container>
    );
  }
}
