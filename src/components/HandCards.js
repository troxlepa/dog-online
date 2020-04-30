import React, ***REMOVED***memo***REMOVED*** from "react";

import ***REMOVED*** makeStyles ***REMOVED*** from "@material-ui/core/styles";
import ***REMOVED*** isMobile ***REMOVED*** from "react-device-detect";
//import ***REMOVED*** animated, useTransition ***REMOVED*** from "react-spring";
import Box from "@material-ui/core/Box";
import JassCard from "../components/JassCard";
const useStyles = makeStyles(***REMOVED***
  selfCards: ***REMOVED***
    flexDirection: "row",
    borderTop: "1px solid lightgray",
    /*marginRight: "auto",*/
    flexWrap:"nowrap",
    justifyContent:"left",
***REMOVED***,
***REMOVED***);

//@041 memo usage
const HandCards = (***REMOVED***myhandObj, activeCard, setJokerModal, handleCard, handleSetTwoModal***REMOVED***) => ***REMOVED***
  //console.log("rendering HAND");
	const classes = useStyles();
  const handCards = Object.keys(myhandObj);
	return (
        <Box className=***REMOVED***isMobile? " selfCards_mobile" : classes.selfCards + " selfCards"***REMOVED***>  ***REMOVED***/*  + " " + "xxy" + myPos */***REMOVED***
      ***REMOVED***handCards.map((card, idx) => ***REMOVED***
        switch(myhandObj[card].charAt(0))***REMOVED***
          case 'Z':
            return(
              <JassCard
                key=***REMOVED***idx***REMOVED***
                value=***REMOVED***myhandObj[card]***REMOVED***
                disabled=***REMOVED***false***REMOVED***
                /*color=***REMOVED***(card[1]==='S'||card[1]==='C')?'black':'red'***REMOVED****/
                active=***REMOVED***activeCard.substring(0,2)===myhandObj[card].substring(0,2)***REMOVED***
                selected=***REMOVED***activeCard.substring(0,2)===myhandObj[card].substring(0,2)***REMOVED***
                onClick=***REMOVED***(e) => ***REMOVED***setJokerModal(myhandObj[card].substring(0,2))***REMOVED******REMOVED***
              />
            );
          case '2':
            console.log("twooo");
            return(
              <JassCard
                key=***REMOVED***idx***REMOVED***
                value=***REMOVED***myhandObj[card]***REMOVED***
                disabled=***REMOVED***false***REMOVED***
                /*color=***REMOVED***(card[1]==='S'||card[1]==='C')?'black':'red'***REMOVED****/
                active=***REMOVED***activeCard.substring(0,2)===myhandObj[card]***REMOVED***
                selected=***REMOVED***activeCard.substring(0,2)===myhandObj[card]***REMOVED***
                onClick=***REMOVED***(e) => ***REMOVED***handleSetTwoModal(1,myhandObj[card])***REMOVED******REMOVED***
              />
            );
          default:
            return(
              <JassCard
                key=***REMOVED***idx***REMOVED***
                value=***REMOVED***myhandObj[card]***REMOVED***
                disabled=***REMOVED***false***REMOVED***
                /*color=***REMOVED***(card[1]==='S'||card[1]==='C')?'black':'red'***REMOVED****/
                active=***REMOVED***activeCard.substring(0,2)===myhandObj[card]***REMOVED***
                selected=***REMOVED***activeCard.substring(0,2)===myhandObj[card]***REMOVED***
                onClick=***REMOVED***(e) => ***REMOVED***handleCard(myhandObj[card])***REMOVED******REMOVED***
              />
            );
***REMOVED***
***REMOVED***)***REMOVED***
      </Box>
      );
***REMOVED***;
export default HandCards;