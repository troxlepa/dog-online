import React, ***REMOVED*** memo ***REMOVED*** from "react";

import ***REMOVED*** makeStyles ***REMOVED*** from "@material-ui/core/styles";
import ***REMOVED*** isMobile ***REMOVED*** from "react-device-detect";

let styled = ***REMOVED******REMOVED***;
if(isMobile)***REMOVED***
  styled = ***REMOVED***
  card: ***REMOVED***
    width: 48,
    height: 70,
    background: "#fff",
    borderRadius: 5,
    display: "inline-flex",
    flexDirection: "row",
    justifyContent: "center",
    flexShrink: 0,
    margin: 6,
    cursor: "pointer",
    transition: "background-color 0.2s, box-shadow 0.2s",
    "&:hover": ***REMOVED***
      boxShadow: "0px 0px 5px 3px #bbb"
***REMOVED***
***REMOVED***,
  card_disabled: ***REMOVED***
    width: 48,
    height: 70,
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
***REMOVED***,
  selected: ***REMOVED***
    boxShadow: "0px 0px 0px 4px #f00 ! important",
***REMOVED***,
  active: ***REMOVED***
    cursor: "pointer",
    boxShadow: "0px 0px 12px 0px rgba(84,31,125,1)"
***REMOVED***,
  smallCard: ***REMOVED***
    width: 54,
    height: 74,
    margin: 3,
    height:"100%",

    "&:hover": ***REMOVED***
      boxShadow: "0px 0px 2px 1px #bbb"
***REMOVED***
***REMOVED***,
  symbol: ***REMOVED***
    margin: 3
***REMOVED***,
  smallSymbol: ***REMOVED***
    margin: 1
***REMOVED***
***REMOVED***;
***REMOVED***else***REMOVED***
 styled = ***REMOVED***
  card: ***REMOVED***
    width: 98,
    height: 136,
    background: "#fff",
    borderRadius: 5,
    display: "inline-flex",
    flexDirection: "row",
    justifyContent: "center",
    flexShrink: 0,
    margin: 6,
    cursor: "pointer",
    transition: "background-color 0.2s, box-shadow 0.2s",
    "&:hover": ***REMOVED***
      boxShadow: "0px 0px 5px 3px #bbb"
***REMOVED***
***REMOVED***,
  card_disabled: ***REMOVED***
    width: 75,
    height: 102,
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
***REMOVED***,
  selected: ***REMOVED***
    boxShadow: "0px 0px 0px 4px #f00 ! important",
***REMOVED***,
  active: ***REMOVED***
    cursor: "pointer",
    boxShadow: "0px 0px 12px 0px rgba(84,31,125,1)"
***REMOVED***,
  smallCard: ***REMOVED***
    width: 54,
    height: 74,
    margin: 3,

    "&:hover": ***REMOVED***
      boxShadow: "0px 0px 2px 1px #bbb"
***REMOVED***
***REMOVED***,
  symbol: ***REMOVED***
    margin: 3
***REMOVED***,
  smallSymbol: ***REMOVED***
    margin: 1
***REMOVED***
***REMOVED***
***REMOVED***
const useStyles = makeStyles(styled);


function JassCard(props) ***REMOVED***
  const classes = useStyles();

  const value = props.value.substring(0,2);
  var click = props.onClick;

  let className = classes.card;
  let smallCard = "";
  if (props.disabled === true) className = classes.card_disabled;
  if (props.active) className += " " + classes.active;
  if (props.selected) className += " " + classes.selected;

  if (props.size === "sm") smallCard += " " + classes.smallCard;
  const cardSource = require("../assets/cards/"+value+".svg");

  return (
    <div onClick=***REMOVED***click***REMOVED*** className=***REMOVED***smallCard === "" && className***REMOVED***>
      <img alt="" className=***REMOVED***smallCard***REMOVED*** src=***REMOVED***cardSource***REMOVED***/>
    </div>
  );
***REMOVED***

export default memo(JassCard);
