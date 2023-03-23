import React from "react";

import { isMobile } from "react-device-detect";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import JassCard from "../components/JassCard";

const useStyles = makeStyles({
  selfCards: {
    flexDirection: "row",
    borderTop: "1px solid lightgray",
    flexWrap:"nowrap",
    justifyContent:"left",
  },
});

const HandCards = ({myhandObj, activeCard, setJokerModal, handleCard, handleSetTwoModal}) => {
  const classes = useStyles();
  const handCards = Object.keys(myhandObj);
  function handleClick(card_type,card){
    switch(card_type){
    case 'Z':
      setJokerModal(card.substring(0,2));
      return;
    case '2':
      handleSetTwoModal(1,card);
      return;
    default:
      handleCard(card);
    }
  }
  return (
    <Box className={isMobile? " selfCards_mobile" : classes.selfCards + " selfCards"}>
      {handCards.map((card, idx) => {
        return(
          <JassCard
            key={idx}
            value={myhandObj[card]}
            disabled={false}
            active={activeCard.substring(0,2)===myhandObj[card].substring(0,2)}
            selected={activeCard.substring(0,2)===myhandObj[card].substring(0,2)}
            onClick={() => {handleClick(myhandObj[card].charAt(0),myhandObj[card].substring(0,2));}}
          />
        );
      })}
    </Box>
  );
};
export default HandCards;