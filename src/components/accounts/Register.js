import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Paper, Box, Button, TextField } from "@material-ui/core";
import axios from "axios";
import config from "../../config";
export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  BASE_URL = config.BASE_URL;

  onSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post(`${this.BASE_URL}auth/register`, newPerson)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  render() {
    const { username, email, password, confirmPassword } = this.state;
    return (
      <Box mt={10}>
        <Paper>
          <Box display="flex" flexDirection="column" alignItems="center">
            <h2>Registreer</h2>
            <form onSubmit={this.onSubmit}>
              <Box mb={1}>
                <TextField
                  label="Gebruikersnaam"
                  value={username}
                  type="text"
                  onChange={this.onChange}
                  name="username"
                />
              </Box>
              <Box mb={1}>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  name="email"
                  onChange={this.onChange}
                />
              </Box>
              <Box mb={1}>
                <TextField
                  label="Wachtwoord"
                  type="password"
                  value={password}
                  name="password"
                  onChange={this.onChange}
                />
              </Box>
              <Box mb={3}>
                <TextField
                  label="Bevestig Wachtwoord"
                  type="password"
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={this.onChange}
                />
              </Box>
              <div className="form-group">
                <Button type="submit" variant="contained" color="primary">
                  Registreer
                </Button>
              </div>
              <p style={{ padding: "2px" }}>
                Heb je al een account? <Link to="/login">login</Link>
              </p>
            </form>
          </Box>
        </Paper>
      </Box>
    );
  }
}

export default Register;
