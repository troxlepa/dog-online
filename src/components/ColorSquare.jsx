import React from "react";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  square: {
    display: "inline-block",
    height: "1rem",
    width: "1rem",
    minWidth: "1rem",
    marginRight: 12,
    borderRadius: 5
  }
});

function ColorSquare({ color }) {
  const classes = useStyles();
  return <span className={classes.square} style={{ background: color }}></span>;
}

export default ColorSquare;
