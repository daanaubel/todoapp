import React from "react";
import { Route, Redirect } from "react-router-dom";
import login from "./accounts/Login";

const PrivateRoute = ({
  component: Component,
  token,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return <Redirect to="/login" component={login} />;
        } else {
          return <Component {...props} token={token} />;
        }
      }}
    />
  );
};
export default PrivateRoute;
