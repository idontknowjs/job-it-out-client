import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.png";
import { Link } from "react-router-dom";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";

// Redux stuff
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThis
});

class login extends Component {
  constructor() {
    // Controlled Components
    super();
    this.state = {
      email: "",
      password: "",
      // loading: false,
      errors: {}
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    // this.setState({
    //   loading: true,
    // });
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
      //This means if the handleChange is called by name of email then
    });
  };

  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;

    return (
      <Paper>
        <Grid style={{ paddingBottom: "30px" }} container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <img src={AppIcon} alt="monkey" className={classes.image} />
            <Typography variant="h2" className={classes.pageTitle}>
              Login
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
                className={classes.textField}
                helperText={errors.email} //errors.email was defined in firebase
                error={errors.email ? true : false}
                value={this.state.email}
                onChange={this.handleChange}
                autoComplete="off"
                fullWidth
              />
              <TextField
                id="password"
                name="password"
                type="password"
                label="Password"
                className={classes.textField}
                helperText={errors.password}
                error={errors.password ? true : false}
                value={this.state.password}
                onChange={this.handleChange}
                fullWidth
              />
              {errors.general && ( //from firebase (general)
                <Typography variant="body2" className={classes.customError}>
                  {errors.general}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={loading}
              >
                Login
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <br />
              <small className="small">
                Don't have an account ? Sign up <Link to="/signup">here</Link>
              </small>
            </form>
          </Grid>
          <Grid item sm />
        </Grid>
      </Paper>
    );
  }
}

// To confirm that the type we are getting is object
login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));

// handleChange = (event) => {
//   this.setState({
//     email: event.target.value,
//     //This means if the handleChange is called by name of email then
//   });
// };

// handleChange1 = (event) => {
//   this.setState({
//     password: event.target.value,
//     //This means if the handleChange is called by name of email then
//   });
// };
