import React from "react";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

export default ({ children, onClick, tip, btnClassName, tipClassName }) => (
  <Tooltip title={tip} className={tipClassName} placement="top">
    {/* If there is no space above it will move position to "bottom" */}
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </Tooltip>
);
