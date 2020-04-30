import React, { memo } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { isMobile } from "react-device-detect";

let styled = {};
if(isMobile){
  styled = {
  card: {
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
    "&:hover": {
      boxShadow: "0px 0px 5px 3px #bbb"
    }
  },
  card_disabled: {
    width: 48,
    height: 70,
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  selected: {
    boxShadow: "0px 0px 0px 4px #f00 ! important",
  },
  active: {
    cursor: "pointer",
    boxShadow: "0px 0px 12px 0px rgba(84,31,125,1)"
  },
  smallCard: {
    width: 54,
    height: 74,
    margin: 3,
    height:"100%",

    "&:hover": {
      boxShadow: "0px 0px 2px 1px #bbb"
    }
  },
  symbol: {
    margin: 3
  },
  smallSymbol: {
    margin: 1
  }
};
}else{
 styled = {
  card: {
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
    "&:hover": {
      boxShadow: "0px 0px 5px 3px #bbb"
    }
  },
  card_disabled: {
    width: 75,
    height: 102,
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  selected: {
    boxShadow: "0px 0px 0px 4px #f00 ! important",
  },
  active: {
    cursor: "pointer",
    boxShadow: "0px 0px 12px 0px rgba(84,31,125,1)"
  },
  smallCard: {
    width: 54,
    height: 74,
    margin: 3,

    "&:hover": {
      boxShadow: "0px 0px 2px 1px #bbb"
    }
  },
  symbol: {
    margin: 3
  },
  smallSymbol: {
    margin: 1
  }
}
}
const useStyles = makeStyles(styled);


function JassCard(props) {
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
    <div onClick={click} className={smallCard === "" && className}>
      <img alt="" className={smallCard} src={cardSource}/>
    </div>
  );
}

export default memo(JassCard);
