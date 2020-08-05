import React, { useState } from "react";
// import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
// import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
// import themeObject from "../../util/theme";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI stuff
import Tooltip from "@material-ui/core/Tooltip";
// import withStyles from "@material-ui/core/styles/withStyles";

// Icons
import Brightness4Icon from "@material-ui/icons/Brightness4";

// const styles = (theme) => ({
//   ...theme.pallete,
//   type: darkMode ? "dark" : "light"
// });

const styles = (theme) => ({
  ...theme.pallete,
  type: "dark"
});

function DarkMode() {
  const [darkMode, setDarkMode] = useState(false);
  //   type: darkMode ? "dark" : "light"
  return (
    <div>
      <Tooltip placement="top" title="Toggle light/dark theme">
        {/* if dark mode, then symbol will also change */}
        <Brightness4Icon onClick={() => setDarkMode(!darkMode)} />
      </Tooltip>
    </div>
  );
}
// export default DarkMode;

export default withStyles(styles)(DarkMode);
