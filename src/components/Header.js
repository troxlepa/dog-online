import React, {useCallback, useState} from "react";

import { isMobile } from "react-device-detect";
import { useTranslation } from 'react-i18next';

import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles({
  header: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-around",
    justifyItems: "center",
    alignItems: "center",
    flex: "0 0 auto",
    height: "3.5rem",
  },
  headerPaper: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-around",
    justifyItems: "center",
    alignItems: "center",
    flex: "1 1 auto",
    height: "3.5rem",
  },
  headerPaperMobile: {
    display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-around",
  justifyItems: "center",
  alignItems: "center",
  flex: "1 1 auto",
  height: "14rem",
  transition:"2s linear"
  },
  lowHeaderPaperMobile: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-around",
    justifyItems: "center",
    alignItems: "center",
    flex: "1 1 auto",
    height: "3.5rem",
  },
  headerDiv: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-around",
    justifyItems: "center",
    alignItems: "center",
    flex: "0 0 auto",
    height: "4rem",
    padding: 10
  },
  headerDivMobile: {
    display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-around",
  justifyItems: "center",
  alignItems: "start",
  flex: "0 0 auto",
  height: "15rem",
  padding: 10
  },
  lowHeaderDivMobile: {
    display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-around",
  justifyItems: "center",
  alignItems: "start",
  flex: "0 0 auto",
  height: "4rem",
  padding: 10
  },
  controlButtons: {
    display: "flex",
    position: "fixed",
    "& > *": {
      margin: "3px"
    }
  }, 
  turnBanner: {
    position: "fixed",
    zIndex: 2,
  },
  turnTypo: {
    color: "rgba(255,255,255,.9)",
    textTransform: "uppercase"
  }
});


function Header({game, orderMyPosition, selected, submitSelection, onSubmit, setSelected, gameId, setActiveCard, activeCard}){
  
  const [confirmThrow,setConfirmThrow] = useState(false);
  const classes = useStyles();
  const { t } = useTranslation();
  const turn = game.round % 4;

  const myPos = orderMyPosition.toString();
  var myhandObj = {};
  if(game.hands){
    myhandObj = Object.keys(game.hands).includes(myPos) ? game.hands[myPos] : {};
  }

  function computePosition(oldballs,oldhands,lastTurn){
    const card = lastTurn.card;
    const selection = lastTurn.selection;
    const round = game.order.indexOf(lastTurn.user);
    if(round === -1){
      return;
    }

    var hands = oldhands;
    console.log(hands);
    if(hands[round]){
      for(var i=0;i<6;i++){
        if(!hands[round][i]){
          hands[round][i] = card;
          break;
        }
      }
    } else {
      // empty hand, was last card
      hands[round] = [];
      hands[round].push(card);
    }

    var starts = selection.filter(function(element, index) {
      return (index % 2 === 0);
    });
    var dests = selection.filter(function(element, index) {
      return (index % 2 === 1);
    });
    var balls = [...oldballs];
    var dId = dests.map(x => balls.indexOf(x));
    if(card.substring(0,1) === 'J' || (card.length === 3 && card.substring(2,3) === 'J')){
      var sId = starts.map(x => balls.indexOf(x));
      [ balls[sId], balls[dId] ] = [ balls[dId], balls[sId] ];
    }else{
      for(var j=dests.length-1;j>=0;j--){
        balls[dId[j]] = starts[j];
      }
    }
    const lastFourIndex = game.lastFour.findIndex(x => x.time === lastTurn.time);
    const lastFour = [...game.lastFour];
    lastFour.splice(lastFourIndex,1);

    return({balls,hands,round,lastFour});
  }

  const undoMove = useCallback(
    () => {
      // first move of the game
      if(!game.lastFour || Object.keys(game.lastFour).length === 0){
        alert(t("undoAlert"));
        return;
      }
      const lastTurn = [...game.lastFour].reduce((a, b) => (a.time > b.time) ? a : b);

      // cannot undo thrown cards
      if(lastTurn.card === "YY"){
        alert(t("undoAlertThrow"));
        return;
      }

      // cannot undo stolen card
      if(((lastTurn.card.length === 3 && lastTurn.card.charAt(2) === '2') || lastTurn.card.charAt(0) === '2') && lastTurn.selection === undefined){
        alert(t("undoAlertThief"));
        return;
      }

      // undo history
      const hands = game.hands;
      const balls = game.balls;
      var updates;
      firebase.database().ref(`games/${gameId}`).child(`history`).orderByChild('time').limitToLast(1).once('child_added', function(snapshot){
        snapshot.ref.remove();  
      });
      updates = computePosition(balls,hands,lastTurn);
      firebase
        .database()
        .ref(`games/${gameId}`)
        .update(updates);       
    }
  );

  if(turn !== orderMyPosition){
    return(
        <div className={isMobile ? classes.lowHeaderDivMobile : classes.headerDiv}>
        <Paper className={isMobile ? classes.lowHeaderPaperMobile : classes.headerPaper} style={{backgroundColor:game.meta.users[game.order[turn]].color,transition:"2s"}}>
          <Typography  variant={isMobile ? "body1" : "h6"} component={isMobile ? "h6" : "h6"} className={classes.turnTypo + " loading"}>{game.meta.users[game.order[turn]].name} {t("headerPlaying")}</Typography>
        </Paper>
      </div>
    );
  }
		
  const turnMsg = () => {
    if(activeCard){
      if(selected.length > 0){
        if(selected.length % 2 === 0){
          return t('submitTurnButton');
        } 
        return t('selectDest');
      }
      return t('selectBall');
    }
    return t("chooseCard");
  };

  const throwHand = () => {
    const throwedHand = game.hands;
    const numThrow = throwedHand[orderMyPosition].length;
    throwedHand[orderMyPosition] = [];
    setSelected([]);
    onSubmit(game.balls, [game.balls[0],game.balls[0]], "YY",throwedHand,game.round%4,numThrow,orderMyPosition,game.rooted);
  };

  const clearSelection = () => {
    setSelected([]); // guess we can remove that (DogGame.js contains hook effect on activeCard)
    setActiveCard('');
  };

  return(
    <React.Fragment>
      <Dialog open={confirmThrow} onClose={() => setConfirmThrow(false)}>
        <DialogTitle>{t("confirmThrowTitle")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("confirmThrow")}
          </DialogContentText>
          <DialogActions>
            <Button
              onClick={() => {
                const throwedHand = game.hands;
                const numThrow = throwedHand[orderMyPosition].length
                throwedHand[orderMyPosition] = [];
                setSelected([]);
                onSubmit(game.balls, [game.balls[0],game.balls[0]], "YY",throwedHand,game.round%4,numThrow,orderMyPosition,game.rooted);
                setConfirmThrow(false);
              }}
              variant="contained"
              color="primary"
            >
              {t("yes")}
            </Button>
            <Button
              onClick={() => {
                setConfirmThrow(false);
              }}
              variant="contained"
              color="primary"
            >
              {t("no")}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <div className={isMobile ? classes.headerDivMobile : classes.headerDiv}>
        <Paper className={isMobile ? classes.headerPaperMobile : classes.headerPaper} style={isMobile ? {} : {backgroundColor:game.meta.users[game.order[turn]].color,transition:"2s"}}>
          <Box  p={2} className={isMobile ? "header_mobile" : classes.header}>
            <div className={isMobile ? "controlButtons_mobile": classes.controlButtons}>
              <Button
                className={isMobile ? "controlButtonSingle_mobile" : "controlButtonSingle"}
                variant="contained"
                color="secondary"
                size="small"
                disabled={turn !== orderMyPosition || !activeCard || selected.length < 2 || selected.length % 2 !== 0}
                onClick={submitSelection}
              >
                <Typography>{t('submitTurnButton')}</Typography>
              </Button>
              <Button
                variant="contained"
                className={isMobile ? "controlButtonSingle_mobile" : "controlButtonSingle"}
                startIcon={<DeleteIcon />}
                color="primary"
                size="small"
                disabled={(selected.length === 0 ? true : false) || (turn !== orderMyPosition)}
                onClick={clearSelection}
              >
                <Typography>{t('clearSelectionButton')}</Typography>
              </Button>
              <Button
                variant="contained"
                className={isMobile ? "controlButtonSingle_mobile" : "controlButtonSingle"}
                color="primary"
                size="small"
                disabled={(Object.keys(myhandObj).length === 0 ? true : false) || (turn !== orderMyPosition)}
                onClick={() => {setConfirmThrow(true)}}
              >
                <Typography>{t('cardThrowButton')}</Typography>
              </Button>
              <Button
                variant="outlined"
                className={isMobile ? "controlButtonSingle_mobile" : "controlButtonSingle"}
                color="default"
                size="small"
                disabled={(turn === (orderMyPosition+1)%4)}
                startIcon={<DeveloperModeIcon />}
                onClick={undoMove}
              >
                <Typography>{t('undoButton')}</Typography>
              </Button>
            </div>
          </Box>
        </Paper>
      </div>
    </React.Fragment>
  );
}

export default Header;
