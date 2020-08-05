import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//If the user is already logged in and wanted to login again, will prevent them form going to home page
// As in userReducer, in setAuthenticated I ve (authenticated = "true")
const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

AuthRoute.propTypes = {
  user: PropTypes.object
  //Changed from isRemoved to above.
};

export default connect(mapStateToProps)(AuthRoute);
