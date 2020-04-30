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
    const card = lastTurn.card;
    const selection = lastTurn.selection;
    const round = game.order.indexOf(lastTurn.user);
    if(round === -1)***REMOVED***
      return;
***REMOVED***

    var hands = oldhands;
    console.log(hands);
    if(!!hands[round])***REMOVED***
      for(var i=0;i<6;i++)***REMOVED***
        if(!hands[round][i])***REMOVED***
          hands[round][i] = card;
          break;
***REMOVED***
***REMOVED***
***REMOVED*** else ***REMOVED***
      // empty hand, was last card
      hands[round] = [];
      hands[round].push(card);
***REMOVED***

    var starts = selection.filter(function(element, index, array) ***REMOVED***
      return (index % 2 === 0);
***REMOVED***);
    var dests = selection.filter(function(element, index, array) ***REMOVED***
      return (index % 2 === 1);
***REMOVED***);
    var balls = [...oldballs];

    if(card.substring(0,1) === 'J' || (card.length === 3 && card.substring(2,3) === 'J'))***REMOVED***
      var sId = starts.map(x => balls.indexOf(x));
      var dId = dests.map(x => balls.indexOf(x));

      [ balls[sId], balls[dId] ] = [ balls[dId], balls[sId] ];
***REMOVED***else***REMOVED***
      var dId = dests.map(x => balls.indexOf(x));
      for(var j=dests.length-1;j>=0;j--)***REMOVED***
        balls[dId[j]] = starts[j];
***REMOVED***
***REMOVED***
    const lastFourIndex = game.lastFour.findIndex(x => x.time === lastTurn.time);
    const lastFour = [...game.lastFour];
    lastFour.splice(lastFourIndex,1);

    return(***REMOVED***balls,hands,round,lastFour***REMOVED***);
***REMOVED***

  const undoMove = useCallback(
    () => ***REMOVED***
      // first move of the game
      if(!game.lastFour || Object.keys(game.lastFour).length === 0)***REMOVED***
        alert(t("undoAlert"));
        return;
***REMOVED*** 
       const entry = [...game.lastFour].sort(comparer).slice(1);
       const lastTurn = [...game.lastFour].reduce((a, b) => (a.time > b.time) ? a : b);

       // cannot undo thrown cards
       if(lastTurn.card == "YY")***REMOVED***
          alert(t("undoAlertThrow"));
          return;
 ***REMOVED***

       // cannot undo stolen card
       if(((lastTurn.card.length === 3 && lastTurn.card.charAt(2) === '2') || lastTurn.card.charAt(0) === '2') && lastTurn.selection === undefined)***REMOVED***
          alert(t("undoAlertThief"));
          return;
 ***REMOVED***

       // undo history
       const hands = game.hands;
       const balls = game.balls;
       const round = game.round;
       var updates;
       firebase.database().ref(`games/$***REMOVED***gameId***REMOVED***`).child(`history`).orderByChild('time').limitToLast(1).once('child_added', function(snapshot)***REMOVED***
          snapshot.ref.remove();  
***REMOVED***);
       updates = computePosition(balls,hands,lastTurn);
       firebase
        .database()
        .ref(`games/$***REMOVED***gameId***REMOVED***`)
        .update(updates);       
***REMOVED***
  );

  if(turn !== orderMyPosition)***REMOVED***
		return(
      <div className=***REMOVED***classes.headerDiv***REMOVED***>
        <Paper className=***REMOVED***classes.headerPaper***REMOVED*** style=***REMOVED******REMOVED***backgroundColor:game.meta.users[game.order[turn]].color,transition:"2s"***REMOVED******REMOVED***>
          <Typography  variant=***REMOVED***isMobile ? "body1" : "h6"***REMOVED*** component=***REMOVED***isMobile ? "h6" : "h6"***REMOVED*** className=***REMOVED***classes.turnTypo + " loading"***REMOVED***>***REMOVED***game.meta.users[game.order[turn]].name***REMOVED*** ***REMOVED***t("headerPlaying")***REMOVED***</Typography>
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

  const throwHand = () => ***REMOVED***
    const throwedHand = game.hands;
    const numThrow = throwedHand[orderMyPosition].length;
    throwedHand[orderMyPosition] = [];
    setSelected([]);
    onSubmit(game.balls, [game.balls[0],game.balls[0]], "YY",throwedHand,game.round%4,numThrow,orderMyPosition,game.rooted);
***REMOVED***

  const clearSelection = () => ***REMOVED***
    setSelected(selected => ***REMOVED***return [];***REMOVED***);
    setActiveCard(activeCard => ***REMOVED***return '';***REMOVED***)
***REMOVED***

	return(
		<Box  p=***REMOVED***2***REMOVED*** className=***REMOVED***isMobile ? "header_mobile" : classes.header***REMOVED***>
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
          onClick=***REMOVED***clearSelection***REMOVED***
        >
          <Typography>***REMOVED***t('clearSelectionButton')***REMOVED***</Typography>
        </Button>
        <Button
          variant="contained"
          className="controlButtonSingle_mobile"
          color="primary"
          size="small"
          disabled=***REMOVED***(Object.keys(myhandObj).length === 0 ? true : false) || (turn !== orderMyPosition)***REMOVED***
          onClick=***REMOVED***throwHand***REMOVED***
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
      </div>
    </Box>
    );
***REMOVED***

export default Header;
