import React, {useCallback, useState} from "react";

import { isMobile } from "react-device-detect";
import { useTranslation } from 'react-i18next';

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

import firebase from "../firebase";


function Header({game, orderMyPosition, selected, submitSelection, onSubmit, setSelected, gameId, setActiveCard, activeCard}){
  
  const [confirmThrow,setConfirmThrow] = useState(false);
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
      <Box sx={{
        display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around', alignItems: isMobile ? 'flex-start' : 'center', flex: '0 0 auto', height: isMobile ? '4rem' : '4rem', p: '10px'
      }}>
        <Paper sx={{
          display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around', alignItems: 'center', flex: '1 1 auto', height: isMobile ? '3.5rem' : '3.5rem'
        }} style={{backgroundColor:game.meta.users[game.order[turn]].color,transition:"2s"}}>
          <Typography variant={isMobile ? "body1" : "h6"} component={isMobile ? "h6" : "h6"} sx={{ color: 'rgba(255,255,255,.9)', textTransform: 'uppercase' }} className={"loading"}>{game.meta.users[game.order[turn]].name} {t("headerPlaying")}</Typography>
        </Paper>
      </Box>
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
      <Box sx={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around', alignItems: isMobile ? 'flex-start' : 'center', flex: '0 0 auto', height: isMobile ? '15rem' : '4rem', p: '10px' }}>
        <Paper sx={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around', alignItems: 'center', flex: '1 1 auto', height: isMobile ? '14rem' : '3.5rem', transition: '2s linear' }} style={isMobile ? {} : {backgroundColor:game.meta.users[game.order[turn]].color,transition:"2s"}}>
          <Box p={2} className={isMobile ? "header_mobile" : undefined} sx={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around', alignItems: 'center', flex: '0 0 auto', height: '3.5rem' }}>
            <Box className={isMobile ? "controlButtons_mobile": undefined} sx={{ display: 'flex', position: 'fixed', '& > *': { m: '3px' } }}>
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
            </Box>
          </Box>
        </Paper>
      </Box>
    </React.Fragment>
  );
}

export default Header;
