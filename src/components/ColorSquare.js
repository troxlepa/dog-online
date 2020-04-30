import React from "react";

import ***REMOVED*** makeStyles ***REMOVED*** from "@material-ui/core/styles";

const useStyles = makeStyles(***REMOVED***
  square: ***REMOVED***
    display: "inline-block",
    height: "1rem",
    width: "1rem",
    minWidth: "1rem",
    marginRight: 12,
    borderRadius: 5
***REMOVED***
***REMOVED***);

function ColorSquare(***REMOVED*** color ***REMOVED***) ***REMOVED***
  const classes = useStyles();
  return <span className=***REMOVED***classes.square***REMOVED*** style=***REMOVED******REMOVED*** background: color ***REMOVED******REMOVED***></span>;
***REMOVED***

export default ColorSquare;
