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
import { signupUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThis
});

class signup extends Component {
  constructor() {
    // Controlled Components
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
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
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signupUser(newUserData, this.props.history);
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
              SignUp
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
              <TextField
                id="confirPassword"
                name="confirPassword"
                type="confirPassword"
                label="Password"
                className={classes.textField}
                helperText={errors.confirPassword}
                error={errors.confirPassword ? true : false}
                value={this.state.confirPassword}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="handle"
                name="handle"
                type="text"
                label="User Handle"
                className={classes.textField}
                helperText={errors.handle}
                error={errors.handle ? true : false}
                value={this.state.handle}
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
                SignUp
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <br />
              <small className="small">
                Already have an account ? Login{" "}
                <u>
                  <Link to="/login">here</Link>
                </u>
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
signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

// There was only single action so neglected creating mapAction to props & directly use it
export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));

// Earlier was doing this with axios not redux actions
// axios
// .post("/signup", newUserData)
// .then((res) => {
//   console.log(res.data);
//   this.setState({
//     loading: false,
//   });
//   this.props.history.push("/"); //FIXME:
//   //This just pushes the state and Url , go to it
// })
// .catch((err) => {
//   this.setState({
//     errors: err.response.data,
//     loading: false,
//   });
// });

// const styles = (theme) => ({
//   form: {
//     ...theme.spreadThis,
//   },
// });
