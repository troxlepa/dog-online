import React, {useCallback} from "react";

import { isMobile } from "react-device-detect";
import { useTranslation } from 'react-i18next';

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import DeleteIcon from '@material-ui/icons/Delete';

import firebase from "../firebase";

const useStyles = makeStyles({
  header: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-around",
    justifyItems: "center",
    alignItems: "center",
    flex: "0 0 auto",
    height: "4rem",
  },
  headerPaper: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-around",
    justifyItems: "center",
    alignItems: "center",
    flex: "1 1 auto",
    height: "3rem",
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
      <div className={classes.headerDiv}>
        <Paper className={classes.headerPaper} style={{backgroundColor:game.meta.users[game.order[turn]].color,transition:"2s"}}>
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
    setSelected([]);
    setActiveCard('');
  };

  return(
    <Box  p={2} className={isMobile ? "header_mobile" : classes.header}>
      <div className={isMobile ? "controlButtons_mobile": classes.controlButtons}>
        <Button
          className="pulsingButton controlButtonSingle_mobile"
          variant="contained"
          color="secondary"
          size="small"
          disabled={turn !== orderMyPosition || !activeCard || selected.length < 2 || selected.length % 2 !== 0}
          onClick={submitSelection}
        >
          <Typography>{turnMsg()}</Typography>
        </Button>
        <Button
          variant="contained"
          className="controlButtonSingle_mobile"
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
          className="controlButtonSingle_mobile"
          color="primary"
          size="small"
          disabled={(Object.keys(myhandObj).length === 0 ? true : false) || (turn !== orderMyPosition)}
          onClick={throwHand}
        >
          <Typography>{t('cardThrowButton')}</Typography>
        </Button>
        <Button
          variant="outlined"
          className="controlButtonSingle_mobile"
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
  );
}

export default Header;
