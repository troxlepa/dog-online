import React, {useCallback} from "react";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from "@material-ui/core/Typography";
import firebase from "../firebase";
import Paper from "@material-ui/core/Paper";

import { makeHands } from "../util";

import { makeStyles } from "@material-ui/core/styles";

import { useTranslation } from 'react-i18next';

import { isMobile } from "react-device-detect";

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


function Header({game, orderMyPosition, selected, submitSelection, onSubmit, setSelected, gameId, undo, setActiveCard, activeCard, /*sevenFlag*/}){
	const classes = useStyles();
  const { t, i18n } = useTranslation();
	const turn = game.round % 4;
	  // const myQQPos = ((orderMyPosition+3)%4).toString();
    const myPos = orderMyPosition.toString();
	  var myhandObj = {};
	  if(game.hands){
	  	 myhandObj = Object.keys(game.hands).includes(myPos) ? game.hands[myPos] : {};
	  }
	  function pickRandomProperty(obj) {
	    var result;
	    var count = 0;
	    for (var prop in obj)
	        if (Math.random() < 1/++count)
	           result = prop;
	    return result;
	  }

    function comparer( a, b ) {
      return a.time < b.time ? -1 : 1;
    }
    function computePosition(oldballs,oldhands,lastTurn){
        //console.log({oldballs,oldhands,roundPlayed,card,selection});
        //var myXPos = (myPos+3)%4;
        //console.log(oldhands);
        const card = lastTurn.card;
        const selection = lastTurn.selection;
        const round = game.order.indexOf(lastTurn.user);
        if(round === -1){
          //alert('no good');
          //console.error("ooof");
          return;
        }

        var hands = oldhands;
        console.log(hands);
        //console.log(myPos);
        if(!!hands[round]){
          for(var i=0;i<6;i++){
            if(!!hands[round][i]){
              //console.log('spot'+i);
            }else{
              hands[round][i] = card;
              break;
            }
          }
          //hands  = hands.filter(function (a) {return a != null; });
        } else {
          // empty hand, was last card
          //console.log(hands);
          //console.log({'0':card});
          hands[round] = [];
          hands[round].push(card);
        }
        //console.log(hands);

        var starts = selection.filter(function(element, index, array) {
          return (index % 2 === 0);
        });
        var dests = selection.filter(function(element, index, array) {
          return (index % 2 === 1);
        });
        //console.warn("firest",oldballs);
        var balls = [...oldballs];

          if(card.substring(0,1) === 'J' || (card.length === 3 && card.substring(2,3) === 'J')){
            var sId = starts.map(x => balls.indexOf(x));
            var dId = dests.map(x => balls.indexOf(x));
            //console.log(sId,dId);
            [ balls[sId], balls[dId] ] = [ balls[dId], balls[sId] ];
        }else{
          //var sId = starts.map(x => balls.indexOf(x));
          var dId = dests.map(x => balls.indexOf(x));
          for(var j=dests.length-1;j>=0;j--){
            balls[dId[j]] = starts[j];
          }

          //console.warn("secc",balls);
        }

        const lastFourIndex = game.lastFour.findIndex(x => x.time === lastTurn.time);
        const lastFour = [...game.lastFour];
        lastFour.splice(lastFourIndex,1);
        //console.log(lastFour);
        
        
        
        
        //console.log("uppd", {balls,hands});
        return({balls,hands,round,lastFour});
    }

    const undoMove = 
      useCallback(() => {
          //console.log("undo Move invoked");
          if(!game.lastFour || Object.keys(game.lastFour).length === 0){
            alert(t("undoAlert"));
            return;
          } 
           const entry = [...game.lastFour].sort(comparer).slice(1);
           const lastTurn = [...game.lastFour].reduce((a, b) => (a.time > b.time) ? a : b);
           if(lastTurn.card == "YY"){
              alert(t("undoAlertThrow"));
              return;
           }
           if(((lastTurn.card.length === 3 && lastTurn.card.charAt(2) === '2') || lastTurn.card.charAt(0) === '2') && lastTurn.selection === undefined){ // @TODO
              alert(t("undoAlertThief"));
              return;
           }
           //console.log(entry, lastTurn);
           // undo history
           const hands = game.hands;
           const balls = game.balls;
           const round = game.round;
           var updates;
           firebase.database().ref(`games/${gameId}`).child(`history`).orderByChild('time').limitToLast(1).once('child_added', function(snapshot){
              //console.log(snapshot);
              /*card = game.history[snapshot.key].card;
              selection = game.history[snapshot.key].selection;*/
              snapshot.ref.remove();  
            });
           updates = computePosition(balls,hands,lastTurn);
           /*setSelected([]);*/
           firebase
            .database()
            .ref(`games/${gameId}`)
            .update(updates);
            
      });

	  if(turn !== orderMyPosition){
			return(
        <div className={classes.headerDiv}>
        <Paper className={classes.headerPaper} style={{backgroundColor:game.meta.users[game.order[turn]].color,transition:"2s"}}>
        
        <Typography  variant={isMobile ? "body1" : "h6"} component={isMobile ? "h6" : "h6"} className={classes.turnTypo + " loading"}>{game.meta.users[game.order[turn]].name} {t("headerPlaying")}</Typography>
                    {/*<Button
                variant="outlined"
                color="default"
                size="small"
                startIcon={<DeveloperModeIcon />}
                disabled={false}
                onClick={() => {
                    const newHandss = makeHands(6);
                    firebase
                    .database()
                    .ref(`games/${gameId}`)
                    .update({hands:newHandss});
                  }
                }
              >
                <Typography>Make new Hands</Typography>
              </Button>
              <Button
                variant="outlined"
                color="default"
                size="small"
                disabled={false}
                startIcon={<DeveloperModeIcon />}
                onClick={() => {
                    const theHand = game.hands;
                    const newRound = (game.round+1)%4;
                    const rP = pickRandomProperty(theHand[game.round % 4]);
                    theHand[game.round % 4][rP] = null;
                    firebase
                    .database()
                    .ref(`games/${gameId}`)
                    .update({hands:theHand,round:newRound});
                  }
                }
              >
                <Typography>Make move</Typography>
              </Button>
        <Button
                variant="outlined"
                color="default"
                size="small"
                disabled={false}
                startIcon={<DeveloperModeIcon />}
                onClick={() => {
	                	const theHand = game.hands;
	                	const newRound = (game.round+1)%4;
	                	const rP = pickRandomProperty(theHand[game.round % 4]);
	                	theHand[game.round % 4][rP] = null;
	                	firebase
	                	.database()
	                	.ref(`games/${gameId}`)
	                	.update({hands:theHand,round:newRound});
                	}
                }
              >
                <Typography>Make move</Typography>
              </Button>*/}
              </Paper>
              </div>
             );
		}
		
    const turnMsg = () => {
      if(activeCard){
        if(selected.length > 0){
          if(selected.length % 2 == 0){
            return t('submitTurnButton');
          } 
          return t('selectDest');
        }
        return t('selectBall');
      }
      return t("chooseCard");
    }

	return(
		<Box  p={2} className={isMobile ? "header_mobile" : classes.header}>
    
      {/*<div className={classes.turnBanner} style={{backgroundColor: game.meta.users[game.order[turn]].color}}>
      <Typography>
      {game.meta.users[game.order[turn]].name} playing...
      </Typography>
      </div>*/}
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
                onClick={() => {setSelected(selected => {return [];});setActiveCard(activeCard => {return '';})}}
              >
                <Typography>{t('clearSelectionButton')}</Typography>
              </Button>
              <Button
                variant="contained"
                className="controlButtonSingle_mobile"
                color="primary"
                size="small"
                disabled={(Object.keys(myhandObj).length === 0 ? true : false) || (turn !== orderMyPosition)}
                onClick={() => {
	                	const throwedHand = game.hands;
	                	const numThrow = throwedHand[orderMyPosition].length
	                	throwedHand[orderMyPosition] = [];
                    setSelected([]);
	                	onSubmit(game.balls, [game.balls[0],game.balls[0]], "YY",throwedHand,game.round%4,numThrow,orderMyPosition,game.rooted);
                	}
                }
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
              {/*<Button
                variant="outlined"
                color="default"
                size="small"
                startIcon={<DeveloperModeIcon />}
                disabled={false}
                onClick={() => {
                    const newHandss = makeHands(6);
                    firebase
                    .database()
                    .ref(`games/${gameId}`)
                    .update({hands:newHandss});
                  }
                }
              >
                <Typography>Make new Hands</Typography>
              </Button>*/}
             </div>
        
    </Box>
    );
}

export default Header;
