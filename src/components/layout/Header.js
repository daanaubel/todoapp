import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      isAuthenticated && (
        <header style={headerStyle}>
          <h1>Todolist</h1>
          <Button style={headerStyle} onClick={this.props.logout}>
            Logout
          </Button>
        </header>
      )
    );
  }
}
const headerStyle = {
  background: "#333",
  color: "#fff",
  textAlign: "center",
  padding: "10px",
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Header);
