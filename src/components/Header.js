import React, ***REMOVED***useCallback, useState***REMOVED*** from "react";

import ***REMOVED*** isMobile ***REMOVED*** from "react-device-detect";
import ***REMOVED*** useTranslation ***REMOVED*** from 'react-i18next';

import ***REMOVED*** makeStyles ***REMOVED*** from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

import firebase from "../firebase";

const useStyles = makeStyles(***REMOVED***
  header: ***REMOVED***
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-around",
    justifyItems: "center",
    alignItems: "center",
    flex: "0 0 auto",
    height: "3.5rem",
***REMOVED***,
  headerPaper: ***REMOVED***
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-around",
    justifyItems: "center",
    alignItems: "center",
    flex: "1 1 auto",
    height: "3.5rem",
***REMOVED***,
  headerPaperMobile: ***REMOVED***
    display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-around",
  justifyItems: "center",
  alignItems: "center",
  flex: "1 1 auto",
  height: "14rem",
  transition:"2s linear"
***REMOVED***,
  lowHeaderPaperMobile: ***REMOVED***
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-around",
    justifyItems: "center",
    alignItems: "center",
    flex: "1 1 auto",
    height: "3.5rem",
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
  headerDivMobile: ***REMOVED***
    display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-around",
  justifyItems: "center",
  alignItems: "start",
  flex: "0 0 auto",
  height: "15rem",
  padding: 10
***REMOVED***,
  lowHeaderDivMobile: ***REMOVED***
    display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-around",
  justifyItems: "center",
  alignItems: "start",
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


function Header(***REMOVED***game, orderMyPosition, selected, submitSelection, onSubmit, setSelected, gameId, setActiveCard, activeCard***REMOVED***)***REMOVED***
  
  const [confirmThrow,setConfirmThrow] = useState(false);
  const classes = useStyles();
  const ***REMOVED*** t ***REMOVED*** = useTranslation();
  const turn = game.round % 4;

  const myPos = orderMyPosition.toString();
  var myhandObj = ***REMOVED******REMOVED***;
  if(game.hands)***REMOVED***
    myhandObj = Object.keys(game.hands).includes(myPos) ? game.hands[myPos] : ***REMOVED******REMOVED***;
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
    if(hands[round])***REMOVED***
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

    var starts = selection.filter(function(element, index) ***REMOVED***
      return (index % 2 === 0);
***REMOVED***);
    var dests = selection.filter(function(element, index) ***REMOVED***
      return (index % 2 === 1);
***REMOVED***);
    var balls = [...oldballs];
    var dId = dests.map(x => balls.indexOf(x));
    if(card.substring(0,1) === 'J' || (card.length === 3 && card.substring(2,3) === 'J'))***REMOVED***
      var sId = starts.map(x => balls.indexOf(x));
      [ balls[sId], balls[dId] ] = [ balls[dId], balls[sId] ];
***REMOVED***else***REMOVED***
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
      const lastTurn = [...game.lastFour].reduce((a, b) => (a.time > b.time) ? a : b);

      // cannot undo thrown cards
      if(lastTurn.card === "YY")***REMOVED***
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
        <div className=***REMOVED***isMobile ? classes.lowHeaderDivMobile : classes.headerDiv***REMOVED***>
        <Paper className=***REMOVED***isMobile ? classes.lowHeaderPaperMobile : classes.headerPaper***REMOVED*** style=***REMOVED******REMOVED***backgroundColor:game.meta.users[game.order[turn]].color,transition:"2s"***REMOVED******REMOVED***>
          <Typography  variant=***REMOVED***isMobile ? "body1" : "h6"***REMOVED*** component=***REMOVED***isMobile ? "h6" : "h6"***REMOVED*** className=***REMOVED***classes.turnTypo + " loading"***REMOVED***>***REMOVED***game.meta.users[game.order[turn]].name***REMOVED*** ***REMOVED***t("headerPlaying")***REMOVED***</Typography>
        </Paper>
      </div>
    );
***REMOVED***
		
  const turnMsg = () => ***REMOVED***
    if(activeCard)***REMOVED***
      if(selected.length > 0)***REMOVED***
        if(selected.length % 2 === 0)***REMOVED***
          return t('submitTurnButton');
***REMOVED*** 
        return t('selectDest');
***REMOVED***
      return t('selectBall');
***REMOVED***
    return t("chooseCard");
***REMOVED***;

  const throwHand = () => ***REMOVED***
    const throwedHand = game.hands;
    const numThrow = throwedHand[orderMyPosition].length;
    throwedHand[orderMyPosition] = [];
    setSelected([]);
    onSubmit(game.balls, [game.balls[0],game.balls[0]], "YY",throwedHand,game.round%4,numThrow,orderMyPosition,game.rooted);
***REMOVED***;

  const clearSelection = () => ***REMOVED***
    setSelected([]); // guess we can remove that (DogGame.js contains hook effect on activeCard)
    setActiveCard('');
***REMOVED***;

  return(
    <React.Fragment>
      <Dialog open=***REMOVED***confirmThrow***REMOVED*** onClose=***REMOVED***() => setConfirmThrow(false)***REMOVED***>
        <DialogTitle>***REMOVED***t("confirmThrowTitle")***REMOVED***</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ***REMOVED***t("confirmThrow")***REMOVED***
          </DialogContentText>
          <DialogActions>
            <Button
              onClick=***REMOVED***() => ***REMOVED***
                const throwedHand = game.hands;
                const numThrow = throwedHand[orderMyPosition].length
                throwedHand[orderMyPosition] = [];
                setSelected([]);
                onSubmit(game.balls, [game.balls[0],game.balls[0]], "YY",throwedHand,game.round%4,numThrow,orderMyPosition,game.rooted);
                setConfirmThrow(false);
  ***REMOVED******REMOVED***
              variant="contained"
              color="primary"
            >
              ***REMOVED***t("yes")***REMOVED***
            </Button>
            <Button
              onClick=***REMOVED***() => ***REMOVED***
                setConfirmThrow(false);
  ***REMOVED******REMOVED***
              variant="contained"
              color="primary"
            >
              ***REMOVED***t("no")***REMOVED***
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <div className=***REMOVED***isMobile ? classes.headerDivMobile : classes.headerDiv***REMOVED***>
        <Paper className=***REMOVED***isMobile ? classes.headerPaperMobile : classes.headerPaper***REMOVED*** style=***REMOVED***isMobile ? ***REMOVED******REMOVED*** : ***REMOVED***backgroundColor:game.meta.users[game.order[turn]].color,transition:"2s"***REMOVED******REMOVED***>
          <Box  p=***REMOVED***2***REMOVED*** className=***REMOVED***isMobile ? "header_mobile" : classes.header***REMOVED***>
            <div className=***REMOVED***isMobile ? "controlButtons_mobile": classes.controlButtons***REMOVED***>
              <Button
                className=***REMOVED***isMobile ? "controlButtonSingle_mobile" : "controlButtonSingle"***REMOVED***
                variant="contained"
                color="secondary"
                size="small"
                disabled=***REMOVED***turn !== orderMyPosition || !activeCard || selected.length < 2 || selected.length % 2 !== 0***REMOVED***
                onClick=***REMOVED***submitSelection***REMOVED***
              >
                <Typography>***REMOVED***t('submitTurnButton')***REMOVED***</Typography>
              </Button>
              <Button
                variant="contained"
                className=***REMOVED***isMobile ? "controlButtonSingle_mobile" : "controlButtonSingle"***REMOVED***
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
                className=***REMOVED***isMobile ? "controlButtonSingle_mobile" : "controlButtonSingle"***REMOVED***
                color="primary"
                size="small"
                disabled=***REMOVED***(Object.keys(myhandObj).length === 0 ? true : false) || (turn !== orderMyPosition)***REMOVED***
                onClick=***REMOVED***() => ***REMOVED***setConfirmThrow(true)***REMOVED******REMOVED***
              >
                <Typography>***REMOVED***t('cardThrowButton')***REMOVED***</Typography>
              </Button>
              <Button
                variant="outlined"
                className=***REMOVED***isMobile ? "controlButtonSingle_mobile" : "controlButtonSingle"***REMOVED***
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
        </Paper>
      </div>
    </React.Fragment>
  );
***REMOVED***

export default Header;
