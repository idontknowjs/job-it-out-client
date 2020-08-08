import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

//MUI
import CssBaseline from "@material-ui/core/CssBaseline";

// Components
import Navbar from "./components/layout/Navbar";
import AuthRoute from "./util/AuthRoute";

// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";
import axios from "axios";

//If token is deleted while user is logged in (i.e. in state) app will 'break'
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

//TODO:Everything is working but in short template toggle is'nt working but manually it is
//In dark mode clicked links should be white in colors than being blue

class App extends Component {
  state = {
    darkMode: true
  };
  darkModeFunc = () => {
    this.setState({ darkMode: !this.state.darkMode });
  };

  darkTheme = createMuiTheme({
    palette: {
      // type: this.state.darkMode ? "dark" : "light",
      type: "dark",
      primary: {
        light: "#33c9dc",
        main: "#00bcd4", //F5DEB3 (wheat)
        dark: "#008394",
        contrastText: "#fff"
        //On blue contrast text
      },
      secondary: {
        light: "#ff6333",
        main: "#ff3d00",
        dark: "#b22a00",
        contrastText: "#fff"
      },
      // Making the background extra darker than the default
      background: {
        default: "#212121"
      }
    },

    // The object to be spreaded
    spreadThis: {
      typography: {
        useNextVariants: true
      },
      form: {
        textAlign: "center"
      },
      image: {
        margin: "20px auto 20px auto"
      },
      pageTitle: {
        margin: "10px auto 10px auto"
      },
      textField: {
        margin: "10px auto 10px auto"
      },
      button: {
        marginTop: 20,
        position: "relative"
      },
      customError: {
        color: "red",
        fontSize: "0.8rem",
        marginTop: 10
      },
      progress: {
        position: "absolute"
      },
      invisibleSeparator: {
        border: "none",
        margin: 4
      },
      visibleSeparator: {
        marginTop: 10,
        width: "100%",
        borderBottom: "0.3px solid rgba(0,0,0,0.1)",
        marginBottom: 10
      },

      //Side own profile
      paper: {
        padding: 20
      },
      profile: {
        "& .image-wrapper": {
          textAlign: "center",
          position: "relative",
          "& button": {
            position: "absolute",
            top: "80%",
            left: "70%"
          }
        },
        "& .profile-image": {
          width: 200,
          height: 200,
          objectFit: "cover",
          maxWidth: "100%",
          borderRadius: "50%"
        },
        "& .profile-details": {
          textAlign: "center",
          "& span, svg": {
            verticalAlign: "middle"
          },
          "& a": {
            color: "#00bcd4"
          }
        },
        "& hr": {
          border: "none",
          margin: "0 0 10px 0"
        },
        "& svg.button": {
          "&:hover": {
            cursor: "pointer"
          }
        }
      },
      buttons: {
        textAlign: "center",
        "& a": {
          margin: "20px 10px"
        }
      }
    }
  });
  lightTheme = createMuiTheme({
    palette: {
      type: "light",
      primary: {
        light: "#33c9dc",
        main: "#00bcd4", //F5DEB3 (wheat)
        dark: "#008394",
        contrastText: "#fff"
        //On blue contrast text
      },
      secondary: {
        light: "#ff6333",
        main: "#ff3d00",
        dark: "#b22a00",
        contrastText: "#fff"
      }

      //TODO: When dark mode then only otherwise ""
      // background: {
      //   default: "#fafafa" //#fafafa #212121
      // }
    },

    // The object to be spreaded
    spreadThis: {
      typography: {
        useNextVariants: true
      },
      form: {
        textAlign: "center"
      },
      image: {
        margin: "20px auto 20px auto"
      },
      pageTitle: {
        margin: "10px auto 10px auto"
      },
      textField: {
        margin: "10px auto 10px auto"
      },
      button: {
        marginTop: 20,
        position: "relative"
      },
      customError: {
        color: "red",
        fontSize: "0.8rem",
        marginTop: 10
      },
      progress: {
        position: "absolute"
      },
      invisibleSeparator: {
        border: "none",
        margin: 4
      },
      visibleSeparator: {
        marginTop: 10,
        width: "100%",
        borderBottom: "0.3px solid rgba(0,0,0,0.1)",
        marginBottom: 10
      },

      //Side own profile
      paper: {
        padding: 20
      },
      profile: {
        "& .image-wrapper": {
          textAlign: "center",
          position: "relative",
          "& button": {
            position: "absolute",
            top: "80%",
            left: "70%"
          }
        },
        "& .profile-image": {
          width: 200,
          height: 200,
          objectFit: "cover",
          maxWidth: "100%",
          borderRadius: "50%"
        },
        "& .profile-details": {
          textAlign: "center",
          "& span, svg": {
            verticalAlign: "middle"
          },
          "& a": {
            color: "#00bcd4"
          }
        },
        "& hr": {
          border: "none",
          margin: "0 0 10px 0"
        },
        "& svg.button": {
          "&:hover": {
            cursor: "pointer"
          }
        }
      },
      buttons: {
        textAlign: "center",
        "& a": {
          margin: "20px 10px"
        }
      }
    }
  });

  render() {
    return (
      //Css Baseline was for changing the background depending on the theme
      <MuiThemeProvider
        theme={this.state.darkMode ? this.darkTheme : this.lightTheme}
      >
        <CssBaseline />
        <Provider store={store}>
          <div className="App">
            <Router>
              <div className="container">
                <Navbar
                  darkMode={this.state.darkMode}
                  darkModeFunc={this.darkModeFunc}
                />
                <Switch>
                  <Route exact path="/" component={home} />
                  <AuthRoute exact path="/login" component={login} />
                  <AuthRoute exact path="/signup" component={signup} />
                  <Route exact path="/users/:handle" component={user} />
                  <Route
                    exact
                    path="/users/:handle/scream/:screamId"
                    component={user}
                  />
                </Switch>
              </div>
            </Router>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
