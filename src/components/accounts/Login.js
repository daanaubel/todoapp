import { Box, Button, Container, Paper, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };
  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
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
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
