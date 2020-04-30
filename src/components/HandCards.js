import React, {memo} from "react";

import { makeStyles } from "@material-ui/core/styles";
import { isMobile } from "react-device-detect";
//import { animated, useTransition } from "react-spring";
import Box from "@material-ui/core/Box";
import JassCard from "../components/JassCard";
const useStyles = makeStyles({
  selfCards: {
    flexDirection: "row",
    borderTop: "1px solid lightgray",
    /*marginRight: "auto",*/
    flexWrap:"nowrap",
    justifyContent:"left",
  },
});

//@041 memo usage
const HandCards = ({myhandObj, activeCard, setJokerModal, handleCard, handleSetTwoModal}) => {
  //console.log("rendering HAND");
	const classes = useStyles();
  const handCards = Object.keys(myhandObj);
	return (
        <Box className={isMobile? " selfCards_mobile" : classes.selfCards + " selfCards"}>  {/*  + " " + "xxy" + myPos */}
      {handCards.map((card, idx) => {
        switch(myhandObj[card].charAt(0)){
          case 'Z':
            return(
              <JassCard
                key={idx}
                value={myhandObj[card]}
                disabled={false}
                /*color={(card[1]==='S'||card[1]==='C')?'black':'red'}*/
                active={activeCard.substring(0,2)===myhandObj[card].substring(0,2)}
                selected={activeCard.substring(0,2)===myhandObj[card].substring(0,2)}
                onClick={(e) => {setJokerModal(myhandObj[card].substring(0,2))}}
              />
            );
          case '2':
            console.log("twooo");
            return(
              <JassCard
                key={idx}
                value={myhandObj[card]}
                disabled={false}
                /*color={(card[1]==='S'||card[1]==='C')?'black':'red'}*/
                active={activeCard.substring(0,2)===myhandObj[card]}
                selected={activeCard.substring(0,2)===myhandObj[card]}
                onClick={(e) => {handleSetTwoModal(1,myhandObj[card])}}
              />
            );
          default:
            return(
              <JassCard
                key={idx}
                value={myhandObj[card]}
                disabled={false}
                /*color={(card[1]==='S'||card[1]==='C')?'black':'red'}*/
                active={activeCard.substring(0,2)===myhandObj[card]}
                selected={activeCard.substring(0,2)===myhandObj[card]}
                onClick={(e) => {handleCard(myhandObj[card])}}
              />
            );
        }
      })}
      </Box>
      );
};
export default HandCards;