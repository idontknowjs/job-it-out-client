import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import PostScream from "../scream/PostScream";
import Notifications from "./Notifications";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IOSSwitch from "./IOSSwitch";
import Tooltip from "@material-ui/core/Tooltip";

// Icons
import HomeIcon from "@material-ui/icons/Home";

const styles = (theme) => ({
  ...theme.pallete
});

class Navbar extends Component {
  render() {
    const { authenticated, darkMode, darkModeFunc } = this.props;
    return (
      <div>
        {darkMode ? (
          <AppBar style={{ backgroundColor: "#424242", color: "white" }}>
            <Toolbar className="nav-container">
              {authenticated ? (
                <Fragment>
                  <div class="logo-font">Scream it Out</div>
                  <div className="flex-home">
                    <PostScream />
                    <Link to="/">
                      <MyButton tip="Home">
                        <HomeIcon />
                      </MyButton>
                    </Link>
                    <Notifications />
                  </div>
                  <Tooltip placement="top" title="Toggle light/dark theme">
                    <IOSSwitch checked={darkMode} onChange={darkModeFunc} />
                  </Tooltip>
                </Fragment>
              ) : (
                <Fragment>
                  <div className="logo-font">Scream it Out</div>
                  <div className="flex-home">
                    <Button color="inherit" component={Link} to="/">
                      Home
                    </Button>
                    <Button color="inherit" component={Link} to="/login">
                      Login
                    </Button>
                    <Button color="inherit" component={Link} to="/signup">
                      Signup
                    </Button>
                  </div>
                  <Tooltip placement="top" title="Toggle light/dark theme">
                    <IOSSwitch checked={darkMode} onChange={darkModeFunc} />
                  </Tooltip>
                </Fragment>
              )}
            </Toolbar>
          </AppBar>
        ) : (
          <AppBar style={{ backgroundColor: "", color: "#fafafa" }}>
            <Toolbar className="nav-container">
              {authenticated ? (
                <Fragment>
                  <div class="logo-font">Scream it Out</div>
                  <div className="flex-home">
                    <PostScream />
                    <Link to="/">
                      <MyButton tip="Home">
                        <HomeIcon />
                      </MyButton>
                    </Link>
                    <Notifications />
                  </div>
                  <Tooltip placement="top" title="Toggle light/dark theme">
                    <IOSSwitch checked={darkMode} onChange={darkModeFunc} />
                  </Tooltip>
                </Fragment>
              ) : (
                <Fragment>
                  <div class="logo-font">Scream it Out</div>
                  <div className="flex-home">
                    <Button color="inherit" component={Link} to="/">
                      Home
                    </Button>
                    <Button color="inherit" component={Link} to="/login">
                      Login
                    </Button>
                    <Button color="inherit" component={Link} to="/signup">
                      Signup
                    </Button>
                  </div>
                  <Tooltip placement="top" title="Toggle light/dark theme">
                    <IOSSwitch checked={darkMode} onChange={darkModeFunc} />
                  </Tooltip>
                </Fragment>
              )}
            </Toolbar>
          </AppBar>
        )}
      </div>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
