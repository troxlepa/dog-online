import React, ***REMOVED***memo***REMOVED*** from "react";

import ***REMOVED*** makeStyles ***REMOVED*** from "@material-ui/core/styles";
import ***REMOVED*** isMobile ***REMOVED*** from "react-device-detect";
import Box from "@material-ui/core/Box";
import JassCard from "../components/JassCard";
const useStyles = makeStyles(***REMOVED***
  selfCards: ***REMOVED***
    flexDirection: "row",
    borderTop: "1px solid lightgray",
    flexWrap:"nowrap",
    justifyContent:"left",
***REMOVED***,
***REMOVED***);

const HandCards = (***REMOVED***myhandObj, activeCard, setJokerModal, handleCard, handleSetTwoModal***REMOVED***) => ***REMOVED***

	const classes = useStyles();
  const handCards = Object.keys(myhandObj);
  function handleClick(card_type,card)***REMOVED***
    switch(card_type)***REMOVED***
      case 'Z':
        setJokerModal(card.substring(0,2));
        return;
      case '2':
        handleSetTwoModal(1,card);
        return;
      default:
        handleCard(card);
***REMOVED***
***REMOVED***
	return (
    <Box className=***REMOVED***isMobile? " selfCards_mobile" : classes.selfCards + " selfCards"***REMOVED***>
      ***REMOVED***handCards.map((card, idx) => ***REMOVED***
        return(
          <JassCard
            key=***REMOVED***idx***REMOVED***
            value=***REMOVED***myhandObj[card]***REMOVED***
            disabled=***REMOVED***false***REMOVED***
            active=***REMOVED***activeCard.substring(0,2)===myhandObj[card].substring(0,2)***REMOVED***
            selected=***REMOVED***activeCard.substring(0,2)===myhandObj[card].substring(0,2)***REMOVED***
            onClick=***REMOVED***() => ***REMOVED***handleClick(myhandObj[card].charAt(0),myhandObj[card].substring(0,2))***REMOVED******REMOVED***
          />
        );
***REMOVED***)***REMOVED***
      </Box>
      );
***REMOVED***;
export default HandCards;