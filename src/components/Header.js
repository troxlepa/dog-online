import React, ***REMOVED***useCallback***REMOVED*** from "react";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from "@material-ui/core/Typography";
import firebase from "../firebase";
import Paper from "@material-ui/core/Paper";

import ***REMOVED*** makeHands ***REMOVED*** from "../util";

import ***REMOVED*** makeStyles ***REMOVED*** from "@material-ui/core/styles";

import ***REMOVED*** useTranslation ***REMOVED*** from 'react-i18next';

import ***REMOVED*** isMobile ***REMOVED*** from "react-device-detect";

const useStyles = makeStyles(***REMOVED***
  header: ***REMOVED***
  	display: "flex",
	flexFlow: "row wrap",
	justifyContent: "space-around",
	justifyItems: "center",
	alignItems: "center",
	flex: "0 0 auto",
	height: "4rem",
***REMOVED***,
    headerPaper: ***REMOVED***
    display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-around",
  justifyItems: "center",
  alignItems: "center",
  flex: "1 1 auto",
  height: "3rem",
***REMOVED***,
  headerDiv: ***REMOVED***
    display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-around",
  justifyItems: "center",
  alignItems: "center",
  flex: "0 0 auto",
  height: "4rem",
  padding: 10
***REMOVED***,
  controlButtons: ***REMOVED***
    display: "flex",
    position: "fixed",
    "& > *": ***REMOVED***
      margin: "3px"
***REMOVED***
***REMOVED***, 
  turnBanner: ***REMOVED***
    position: "fixed",
    zIndex: 2,
***REMOVED***,
  turnTypo: ***REMOVED***
  	color: "rgba(255,255,255,.9)",
  	textTransform: "uppercase"
***REMOVED***
***REMOVED***);


function Header(***REMOVED***game, orderMyPosition, selected, submitSelection, onSubmit, setSelected, gameId, undo, setActiveCard, activeCard, /*sevenFlag*/***REMOVED***)***REMOVED***
	const classes = useStyles();
  const ***REMOVED*** t, i18n ***REMOVED*** = useTranslation();
	const turn = game.round % 4;
	  // const myQQPos = ((orderMyPosition+3)%4).toString();
    const myPos = orderMyPosition.toString();
	  var myhandObj = ***REMOVED******REMOVED***;
	  if(game.hands)***REMOVED***
	  	 myhandObj = Object.keys(game.hands).includes(myPos) ? game.hands[myPos] : ***REMOVED******REMOVED***;
	***REMOVED***
	  function pickRandomProperty(obj) ***REMOVED***
	    var result;
	    var count = 0;
	    for (var prop in obj)
	        if (Math.random() < 1/++count)
	           result = prop;
	    return result;
	***REMOVED***

    function comparer( a, b ) ***REMOVED***
      return a.time < b.time ? -1 : 1;
***REMOVED***
    function computePosition(oldballs,oldhands,lastTurn)***REMOVED***
        //console.log(***REMOVED***oldballs,oldhands,roundPlayed,card,selection***REMOVED***);
        //var myXPos = (myPos+3)%4;
        //console.log(oldhands);
        const card = lastTurn.card;
        const selection = lastTurn.selection;
        const round = game.order.indexOf(lastTurn.user);
        if(round === -1)***REMOVED***
          //alert('no good');
          //console.error("ooof");
          return;
***REMOVED***

        var hands = oldhands;
        console.log(hands);
        //console.log(myPos);
        if(!!hands[round])***REMOVED***
          for(var i=0;i<6;i++)***REMOVED***
            if(!!hands[round][i])***REMOVED***
              //console.log('spot'+i);
***REMOVED***else***REMOVED***
              hands[round][i] = card;
              break;
***REMOVED***
***REMOVED***
          //hands  = hands.filter(function (a) ***REMOVED***return a != null; ***REMOVED***);
***REMOVED*** else ***REMOVED***
          // empty hand, was last card
          //console.log(hands);
          //console.log(***REMOVED***'0':card***REMOVED***);
          hands[round] = [];
          hands[round].push(card);
***REMOVED***
        //console.log(hands);

        var starts = selection.filter(function(element, index, array) ***REMOVED***
          return (index % 2 === 0);
***REMOVED***);
        var dests = selection.filter(function(element, index, array) ***REMOVED***
          return (index % 2 === 1);
***REMOVED***);
        //console.warn("firest",oldballs);
        var balls = [...oldballs];

          if(card.substring(0,1) === 'J' || (card.length === 3 && card.substring(2,3) === 'J'))***REMOVED***
            var sId = starts.map(x => balls.indexOf(x));
            var dId = dests.map(x => balls.indexOf(x));
            //console.log(sId,dId);
            [ balls[sId], balls[dId] ] = [ balls[dId], balls[sId] ];
***REMOVED***else***REMOVED***
          //var sId = starts.map(x => balls.indexOf(x));
          var dId = dests.map(x => balls.indexOf(x));
          for(var j=dests.length-1;j>=0;j--)***REMOVED***
            balls[dId[j]] = starts[j];
***REMOVED***

          //console.warn("secc",balls);
***REMOVED***

        const lastFourIndex = game.lastFour.findIndex(x => x.time === lastTurn.time);
        const lastFour = [...game.lastFour];
        lastFour.splice(lastFourIndex,1);
        //console.log(lastFour);
        
        
        
        
        //console.log("uppd", ***REMOVED***balls,hands***REMOVED***);
        return(***REMOVED***balls,hands,round,lastFour***REMOVED***);
***REMOVED***

    const undoMove = 
      useCallback(() => ***REMOVED***
          //console.log("undo Move invoked");
          if(!game.lastFour || Object.keys(game.lastFour).length === 0)***REMOVED***
            alert(t("undoAlert"));
            return;
***REMOVED*** 
           const entry = [...game.lastFour].sort(comparer).slice(1);
           const lastTurn = [...game.lastFour].reduce((a, b) => (a.time > b.time) ? a : b);
           if(lastTurn.card == "YY")***REMOVED***
              alert(t("undoAlertThrow"));
              return;
 ***REMOVED***
           if(((lastTurn.card.length === 3 && lastTurn.card.charAt(2) === '2') || lastTurn.card.charAt(0) === '2') && lastTurn.selection === undefined)***REMOVED*** // @TODO
              alert(t("undoAlertThief"));
              return;
 ***REMOVED***
           //console.log(entry, lastTurn);
           // undo history
           const hands = game.hands;
           const balls = game.balls;
           const round = game.round;
           var updates;
           firebase.database().ref(`games/$***REMOVED***gameId***REMOVED***`).child(`history`).orderByChild('time').limitToLast(1).once('child_added', function(snapshot)***REMOVED***
              //console.log(snapshot);
              /*card = game.history[snapshot.key].card;
              selection = game.history[snapshot.key].selection;*/
              snapshot.ref.remove();  
***REMOVED***);
           updates = computePosition(balls,hands,lastTurn);
           /*setSelected([]);*/
           firebase
            .database()
            .ref(`games/$***REMOVED***gameId***REMOVED***`)
            .update(updates);
            
***REMOVED***);

	  if(turn !== orderMyPosition)***REMOVED***
			return(
        <div className=***REMOVED***classes.headerDiv***REMOVED***>
        <Paper className=***REMOVED***classes.headerPaper***REMOVED*** style=***REMOVED******REMOVED***backgroundColor:game.meta.users[game.order[turn]].color,transition:"2s"***REMOVED******REMOVED***>
        
        <Typography  variant=***REMOVED***isMobile ? "body1" : "h6"***REMOVED*** component=***REMOVED***isMobile ? "h6" : "h6"***REMOVED*** className=***REMOVED***classes.turnTypo + " loading"***REMOVED***>***REMOVED***game.meta.users[game.order[turn]].name***REMOVED*** ***REMOVED***t("headerPlaying")***REMOVED***</Typography>
                    ***REMOVED***/*<Button
                variant="outlined"
                color="default"
                size="small"
                startIcon=***REMOVED***<DeveloperModeIcon />***REMOVED***
                disabled=***REMOVED***false***REMOVED***
                onClick=***REMOVED***() => ***REMOVED***
                    const newHandss = makeHands(6);
                    firebase
                    .database()
                    .ref(`games/$***REMOVED***gameId***REMOVED***`)
                    .update(***REMOVED***hands:newHandss***REMOVED***);
      ***REMOVED***
    ***REMOVED***
              >
                <Typography>Make new Hands</Typography>
              </Button>
              <Button
                variant="outlined"
                color="default"
                size="small"
                disabled=***REMOVED***false***REMOVED***
                startIcon=***REMOVED***<DeveloperModeIcon />***REMOVED***
                onClick=***REMOVED***() => ***REMOVED***
                    const theHand = game.hands;
                    const newRound = (game.round+1)%4;
                    const rP = pickRandomProperty(theHand[game.round % 4]);
                    theHand[game.round % 4][rP] = null;
                    firebase
                    .database()
                    .ref(`games/$***REMOVED***gameId***REMOVED***`)
                    .update(***REMOVED***hands:theHand,round:newRound***REMOVED***);
      ***REMOVED***
    ***REMOVED***
              >
                <Typography>Make move</Typography>
              </Button>
        <Button
                variant="outlined"
                color="default"
                size="small"
                disabled=***REMOVED***false***REMOVED***
                startIcon=***REMOVED***<DeveloperModeIcon />***REMOVED***
                onClick=***REMOVED***() => ***REMOVED***
	                	const theHand = game.hands;
	                	const newRound = (game.round+1)%4;
	                	const rP = pickRandomProperty(theHand[game.round % 4]);
	                	theHand[game.round % 4][rP] = null;
	                	firebase
	                	.database()
	                	.ref(`games/$***REMOVED***gameId***REMOVED***`)
	                	.update(***REMOVED***hands:theHand,round:newRound***REMOVED***);
                	***REMOVED***
    ***REMOVED***
              >
                <Typography>Make move</Typography>
              </Button>*/***REMOVED***
              </Paper>
              </div>
             );
		***REMOVED***
		
    const turnMsg = () => ***REMOVED***
      if(activeCard)***REMOVED***
        if(selected.length > 0)***REMOVED***
          if(selected.length % 2 == 0)***REMOVED***
            return t('submitTurnButton');
***REMOVED*** 
          return t('selectDest');
***REMOVED***
        return t('selectBall');
***REMOVED***
      return t("chooseCard");
***REMOVED***

	return(
		<Box  p=***REMOVED***2***REMOVED*** className=***REMOVED***isMobile ? "header_mobile" : classes.header***REMOVED***>
    
      ***REMOVED***/*<div className=***REMOVED***classes.turnBanner***REMOVED*** style=***REMOVED******REMOVED***backgroundColor: game.meta.users[game.order[turn]].color***REMOVED******REMOVED***>
      <Typography>
      ***REMOVED***game.meta.users[game.order[turn]].name***REMOVED*** playing...
      </Typography>
      </div>*/***REMOVED***
    	<div className=***REMOVED***isMobile ? "controlButtons_mobile": classes.controlButtons***REMOVED***>
    	     <Button
                className="pulsingButton controlButtonSingle_mobile"
                variant="contained"
                color="secondary"
                size="small"
                disabled=***REMOVED***turn !== orderMyPosition || !activeCard || selected.length < 2 || selected.length % 2 !== 0***REMOVED***
                onClick=***REMOVED***submitSelection***REMOVED***
              >
                <Typography>***REMOVED***turnMsg()***REMOVED***</Typography>
              </Button>
              <Button
                variant="contained"
                className="controlButtonSingle_mobile"
                startIcon=***REMOVED***<DeleteIcon />***REMOVED***
                color="primary"
                size="small"
                disabled=***REMOVED***(selected.length === 0 ? true : false) || (turn !== orderMyPosition)***REMOVED***
                onClick=***REMOVED***() => ***REMOVED***setSelected(selected => ***REMOVED***return [];***REMOVED***);setActiveCard(activeCard => ***REMOVED***return '';***REMOVED***)***REMOVED******REMOVED***
              >
                <Typography>***REMOVED***t('clearSelectionButton')***REMOVED***</Typography>
              </Button>
              <Button
                variant="contained"
                className="controlButtonSingle_mobile"
                color="primary"
                size="small"
                disabled=***REMOVED***(Object.keys(myhandObj).length === 0 ? true : false) || (turn !== orderMyPosition)***REMOVED***
                onClick=***REMOVED***() => ***REMOVED***
	                	const throwedHand = game.hands;
	                	const numThrow = throwedHand[orderMyPosition].length
	                	throwedHand[orderMyPosition] = [];
                    setSelected([]);
	                	onSubmit(game.balls, [game.balls[0],game.balls[0]], "YY",throwedHand,game.round%4,numThrow,orderMyPosition,game.rooted);
                	***REMOVED***
    ***REMOVED***
              >
                <Typography>***REMOVED***t('cardThrowButton')***REMOVED***</Typography>
              </Button>
              <Button
                variant="outlined"
                className="controlButtonSingle_mobile"
                color="default"
                size="small"
                disabled=***REMOVED***(turn === (orderMyPosition+1)%4)***REMOVED***
                startIcon=***REMOVED***<DeveloperModeIcon />***REMOVED***
                onClick=***REMOVED***undoMove***REMOVED***
              >
                <Typography>***REMOVED***t('undoButton')***REMOVED***</Typography>
              </Button>
              ***REMOVED***/*<Button
                variant="outlined"
                color="default"
                size="small"
                startIcon=***REMOVED***<DeveloperModeIcon />***REMOVED***
                disabled=***REMOVED***false***REMOVED***
                onClick=***REMOVED***() => ***REMOVED***
                    const newHandss = makeHands(6);
                    firebase
                    .database()
                    .ref(`games/$***REMOVED***gameId***REMOVED***`)
                    .update(***REMOVED***hands:newHandss***REMOVED***);
      ***REMOVED***
    ***REMOVED***
              >
                <Typography>Make new Hands</Typography>
              </Button>*/***REMOVED***
             </div>
        
    </Box>
    );
***REMOVED***

export default Header;
