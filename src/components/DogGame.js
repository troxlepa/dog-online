import React, { useEffect, useState, useCallback} from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// import Snackbar from "@material-ui/core/Snackbar";
// import SnackContent from "./SnackContent";
import { makeStyles } from "@material-ui/core/styles";
import Board from "../assets/board.svg";
import { SvgLoader, SvgProxy} from 'react-svgmt';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import Dialog from "@material-ui/core/Dialog";
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from "@material-ui/core/Snackbar";
import SnackContent from "./SnackContent";

import Header from "../components/Header";
import JassCard from "../components/JassCard";
import HandCards from "../components/HandCards";
import Balls from "../components/Balls";

import {iHaveFinished} from "../util";

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import { useTranslation } from 'react-i18next';

import { isMobile } from "react-device-detect";


let styled = {};
if(isMobile){
  styled = {
    gameContainer: {
      position: "relative",
      width: "100%",
    },  
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modalBox: {
      outline: 0,
      padding: 28,
      margin:3,
      textAlign: "center",
    },
    jokerBox:{
      margin:5,
      padding:10
    },
    modalBoxExchange: {
      outline: 0,
      padding: 28,
      textAlign: "center",
      transition:"0.6s",
    },
    boardWrapper: {
    	display: "flex",
    	justifyContent: "center"
    },
    playerCards: {
      borderMyPositionTop: "1px solid lightgray",
    },
    exCards: {
      flexDirection: "row",
      borderTop: "1px solid lightgray",
      flexWrap:"nowrap",
      justifyContent:"left",
    },
    jokerModalCard:{
      position:"relative",
      display:"inline-block",
      margin:6
    }
  };
} else {
  styled = {
    gameContainer: {
      position: "relative",
      width: "100%",
      height: "100%",
    },  
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modalBox: {
      outline: 0,
      padding: 28,
      textAlign: "center",
    },
    jokerBox:{
      margin:20,
      padding:20
    },
    modalBoxExchange: {
      outline: 0,
      padding: 28,
      textAlign: "center",
      transition:"0.6s",
      "&:not(:hover)": {
          opacity: ".15",
      }
    },
    boardWrapper: {
      height: "100%",
      display: "flex",
      justifyContent: "center"
    },
    playerCards: {
      borderMyPositionTop: "1px solid lightgray",
    },
    exCards: {
      flexDirection: "row",
      borderTop: "1px solid lightgray",
      flexWrap:"nowrap",
      justifyContent:"left",
    },
    jokerModalCard:{
      position:"relative",
      display:"inline-block",
      margin:3
    }
  };
}

const useStyles = makeStyles(styled);

function DogGame({ game, gameState, spectating, onSubmit, user, doExchange, gameId, helpDisabled}) {
  const classes = useStyles();
  //console.log("rendering DOGGAME");
  const { t, i18n } = useTranslation();
  const [activeCard, setCardState] = useState('');
  const [jokerModal, setJokerModal] = useState('');
  const [twoModal, setTwoModal] = useState(0);
  const [selected, setSelected] = useState([]);
  const [sevenFlag, setSevenFlag] = useState(0);
  const [snack, setSnack] = useState({ open: false });
  const [recv,setRecv] = useState(false);

  const userId = user.id;
  const orderMyPosition = game.order.indexOf(userId);
  const turn = game.round % 4;
  const playingCards = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];
  const ttEnabled = game.rules && game.rules.charAt(2)==='1';

  const teamMate = game.meta.users[game.order[(orderMyPosition+2)%4]];

  var myhandObj = {};
  if(game.hands){
  	 myhandObj = game.hands.hasOwnProperty(orderMyPosition) ? game.hands[orderMyPosition] : {};
  }
  //console.log(game);
  //console.log(game.hands.hasOwnProperty(orderMyPosition), game.hands[orderMyPosition]);
  //const handCards = Object.keys(myhandObj);
  // console.log(handCards);

  // TODO: if myBalls does not include selected%2 -> reset
  
  useEffect(() => {
    setSelected([]);
  }, [activeCard]);

  useEffect(() => {
    if(selected !== []) checkSelection();
  }, [game]);

  const checkSelection = () => {
    const gameBalls = game.balls;
    const myBalls = gameBalls.slice(orderMyPosition*4,(orderMyPosition*4)+4);
    const partnerPos = (orderMyPosition+2)%4;
    const partnerBalls = gameBalls.slice(partnerPos*4,(partnerPos*4)+4);
    for(var i=0;i<selected.length;i+=2){
      if(!partnerBalls.includes(selected) && iHaveFinished(gameBalls)){
        setCardState('');
      }
      else if(!myBalls.includes(selected[i])){
        setCardState('');
      }
    }
  };

 const handleCard = useCallback(
  card => {
    if (spectating) return;
    if(activeCard.substring(0,2) === card) return '';
    setCardState(activeCard => {
    	return card;
    });
  });

 const handleOpenRecv = useCallback(
    () => {
      setRecv(!recv);
    }
  );


  function checkTurnValidity(){
    return selected.length % 2 === 0;
  }

  const handleStealSubmit = 
    (hand_idx,card_idx) => {
      let newHands = game.hands;
      let newRoot = game.rooted ? game.rooted : "";
      let stolenCard = newHands[hand_idx].splice(card_idx,1);  // remove stolen card
      let stolenIndex = newHands[orderMyPosition].indexOf(activeCard.substring(0,2));
      newHands[orderMyPosition][stolenIndex] = stolenCard[0]; // replace two by stolen card
      onSubmit(game.balls,[],activeCard,newHands,(game.round%4),null,orderMyPosition,newRoot);
      setTwoModal(0);
    }

    function isAK(aC){ return (aC==='A' || aC==='K');}

  const submitSelection = 
    () => {
      if(activeCard === '') return; //no card selected
      if(turn !== orderMyPosition) return;
      let newBallz = [...game.balls];
      let newHands = game.hands;
      let newRoot = game.rooted ? game.rooted : "";
      if(checkTurnValidity()){    
        const homeFields = [0,16,32,48];



		    const key = orderMyPosition;
        const aC = activeCard.length === 3 ? activeCard.substring(2,3) : activeCard.substring(0,1);
        if(aC === '7' && !calcIsSevenSum(selected)){
          setCardState('');
          return;
        }
      	
      	
        if(aC === '7'){
          for(var i=0;i<selected.length;i+=2){
            // seven moved rooted home field -> unroot
            if(homeFields.includes(selected[i])){
              newRoot = replaceChar(newRoot,homeFields.indexOf(selected[i]),'0');
            }
            newBallz[game.balls.indexOf(selected[i])] = selected[i+1];
          }
        }else{
          if(aC==='J'){
          	const c1 = game.balls.indexOf(selected[0]);
          	const c2 = game.balls.indexOf(selected[1]);
          	[newBallz[c1],newBallz[c2]] = [game.balls[c2],game.balls[c1]];
          }else{

            for(var i=0;i<selected.length;i+=2){
              if(isAK(aC) && selected[i] >= 64 && selected[i] < 80){
                newRoot = replaceChar(game.rooted,getBallColor(selected[i]),"1");
                console.log(newRoot);
              }
              else if(homeFields.includes(selected[i]) && newRoot.charAt(homeFields.indexOf(selected[i])) === "1"){
                newRoot = replaceChar(game.rooted,getBallColor(selected[i]),"0");
              }
            	newBallz[game.balls.indexOf(selected[i])] = selected[i+1];
            }

          }
        }

        if(game.rules){
          const ljEnabled = game.rules.charAt(4) === "1";
          const partnerPos = (orderMyPosition+2)%4;
          if(ljEnabled && activeCard.charAt(0) === 'Z' && newBallz.slice(orderMyPosition*4,(orderMyPosition*4)+4).every(x => x >= 80) && newBallz.slice(partnerPos*4,(partnerPos*4)+4).every(x => x >= 80)){
            setCardState('');
            handleSetSnack(t("ljEnabled"));
            return;
          }
        }
        console.log(newBallz);
        if(newBallz.length !== new Set(newBallz).size){ // check if two ball on same spot
            setCardState('');
            handleSetSnack(t("invalidTurn"));
            return;
        }

        newHands[key].splice(newHands[key].indexOf(activeCard.substring(0,2)),1); // remove card from hand
      }else{
        setCardState('');
      	return;
      }

      // idea: if selected[even] includes rooted field -> remove
      //console.log("calling submit",newBallz,selected,activeCard.substring(0,2),newHands,(game.round%4),null,orderMyPosition)
      //@bugfix+1.3.0
      onSubmit(newBallz,selected,activeCard,newHands,(game.round%4),null,orderMyPosition,newRoot);
      
      //setSelected([]);
    };

  function calcIsSevenSum(selected){
    let sum = 0;
    for(var i=1;i<selected.length;i+=2){
      const dest = selected[i];
      if(!(dest > 63 && dest < 80)){  //sendHome
        const start = selected[i-1];
        // goFinish
        if(dest >= 80){
          if(start >= 80){
            sum += dest-start;
          }
          else if(start === 0){
            sum += dest-79; //noZeroToFinish
          }
          else if(start > 57){
            sum += (64-start)+(dest-79);
          }
          else if(dest >= 92){
            sum += (48-start)+(dest-91);
          }
          else if(dest >= 88){
            sum += (32-start)+(dest-87);
          }
          else if(dest >= 84){
            sum += (16-start)+(dest-83);
          }
          else{
            alert("are you trying to move backwards? bug alert");
          }
        }
        else{
          if(start > 56 && dest < 7){
            sum += dest+64-start;
          }else{
            sum += dest-start;
          }
          if(sum <= 0) return false;
        }
      } // sendHome
    }
    if(sum <= 0) return false;
    return sum === 7;
  }

  function getBallColor(ball){

    return Math.floor(game.balls.indexOf(ball)/4);
  }

  function replaceChar(rooted,index,value){

    return rooted.substring(0,index) + value + rooted.substring(index+1);
  }

  const exchangeCard = useCallback(
    	() => {
    		doExchange(activeCard,orderMyPosition.toString());
        setCardState('');
    	}
  	);

  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      if(turn === orderMyPosition) submitSelection();
    }else if(e.keyCode === 27){
      if(!recv){
        handleOpenRecv();
      }else{
        setCardState('');
      }
    }
  };

  function comparer( a, b ) {

    return a.time < b.time ? -1 : 1;
  }
  function handleClose(event, reason) {
    if (reason === "clickaway") return;
    setSnack({ ...snack, open: false });
  }

  const handleSetTwoModal = (state,value) => {
    setTwoModal(state);
    setCardState(value);
  }
  const handleSetSnack = (msg) => {
    setSnack({
      open: true,
      variant: "error",
      message: msg
    });
  }

  return (
    <>
    {isMobile ? (
      <Dialog closetimeoutms={2000} className={classes.modal} open={(!game.exchange || !game.exchange[orderMyPosition]) && !spectating && game.meta.status !== "done" && !helpDisabled.home}>
        <Paper className={classes.modalBoxExchange}>
          <Typography variant="h4" gutterBottom>
            {t("selectCard")} {" "} {spectating ? null : teamMate.name}
          </Typography>
          <Typography variant="body1">
            {t("exchangeCard")}
            </Typography>
        <Box className={classes.exCards  + " selfCards_mobile"}>
          {Object.keys(myhandObj).map((card, idx) => (
            <JassCard
              key={idx}
              value={myhandObj[card]}
              disabled={false}
              active={activeCard===myhandObj[card]}
              selected={activeCard===myhandObj[card]}
              onClick={(e) => {handleCard(myhandObj[card])}}
              isLastPlayed={false}
            />
            ))}
        </Box>
            <Button
              className={classes.play}
              variant="contained"
              color="primary"
              disabled={activeCard === ""}
              onClick={() => {handleOpenRecv();exchangeCard();}}
            >
              {t("giveCard")}
            </Button>
        </Paper>
      </Dialog>


      ):(
      <Modal closetimeoutms={2000} className={classes.modal} open={(!game.exchange || !game.exchange[orderMyPosition]) && !spectating && game.meta.status !== "done" && !helpDisabled.home}>
        <Paper className={classes.modalBoxExchange}>
          <Typography variant="h4" gutterBottom>
            {t("selectCard")} {" "} {spectating ? null : teamMate.name}
          </Typography>
          <Typography variant="body1">
            {t("exchangeCard")}
            </Typography>
		    <Box className={classes.exCards  + " selfCards"}>
		      {Object.keys(myhandObj).map((card, idx) => (
		        <JassCard
		          key={idx}
		          value={myhandObj[card]}
		          disabled={false}
		          active={activeCard===myhandObj[card]}
		          selected={activeCard===myhandObj[card]}
		          onClick={(e) => {handleCard(myhandObj[card])}}
              isLastPlayed={false}
		        />
		        ))}
		    </Box>
	          <Button
	            className={classes.play}
	            variant="contained"
	            color="primary"
	            disabled={activeCard === ""}
	            onClick={() => {handleOpenRecv();exchangeCard();}}
	          >
	            {t("giveCard")}
	          </Button>
        </Paper>
      </Modal>
    )}

    {/********************* BEGIN EXCHANGE RECV MODAL *************************/}
    <Modal onKeyDown={onKeyDownHandler} onBackdropClick={handleOpenRecv} className={classes.modal} open={!!game.exchange && Object.keys(game.exchange).length === 4 && !recv && !helpDisabled.home}>
      <Paper className={classes.modalBox}>
        <Typography variant="h4" gutterBottom>
          {t("receivedCard")}:
        </Typography>
        <JassCard
              value={game.exchange ? game.exchange[(orderMyPosition+2)%4] : "YY"}
              active={false}
              selected={false}
              disabled={false}
        /> 
        <br/>
        <Button
          className={classes.play}
          variant="contained"
          color="primary"
          disabled={false}
          onClick={handleOpenRecv}
        >
          {t("confirmButton")}
        </Button>
      </Paper>
    </Modal>
    {/********************* END EXCHANGE RECV MODAL *************************/}

      {<Modal className={classes.modal} open={!!game.exchange && game.exchange.hasOwnProperty(orderMyPosition) && Object.keys(game.exchange).length !== 4  && !spectating && !helpDisabled.home}>
        <Paper className={classes.modalBox}>
          <Typography variant="h4" gutterBottom>
            {t("waitingPlayers")}...
          </Typography>
        </Paper>
      </Modal>}

    {/********************* BEGIN 2 MODAL *************************/}

      <Modal className={classes.modal} open={twoModal===2 && ttEnabled} onBackdropClick={(e) => {setTwoModal(0)}}>
        <Paper className={classes.jokerBox}>

          <Typography variant="h4" gutterBottom>
            {t("twoFuncPlayer")}
            </Typography>
            <div>
                <div className={classes.jokerModalCard}>
              { /* all other players, display cards to steal */ }
                {[0,1,2,3].map((val,idx) => (idx!==orderMyPosition && game.hands[""+idx] && (
                  <React.Fragment key={idx}>
                  <div style={{backgroundColor:game.meta.users[game.order[idx]].color}} key={idx}>
                    {Object.values(game.hands[""+idx]).map((card,card_idx) => (
                      <JassCard
                        key={card_idx}
                        value={"YY"} //card.substring(0,2) to show cards
                        active={false}
                        selected={false}
                        disabled={false}
                        onClick={() => {handleStealSubmit(idx,card_idx)}}
                      />
                    ))}
                  </div>
                  <Typography style={{color:game.meta.users[game.order[idx]].color}}>{game.meta.users[game.order[idx]].name}{(orderMyPosition+2)%4===idx ? " ("+t('teammate')+")":""} </Typography>
                  </React.Fragment>
                )))}
                </div>
            </div>
        </Paper>
      </Modal>

      <Modal className={classes.modal} open={twoModal===1 && ttEnabled} onBackdropClick={(e) => {setTwoModal(0)}}>
        <Paper className={classes.jokerBox}>

          <Typography variant="h4" gutterBottom>
            {t("twoFunc")}
            </Typography>
            <div>
              <div className={classes.jokerModalCard}>
                <JassCard
                  value={"2"+activeCard.charAt(1)}
                  active={false}
                  selected={false}
                  disabled={false}
                  onClick={() => {handleCard(activeCard);setTwoModal(0);}}
                /> 
               <Typography>
              {t("moveTwo")}
              </Typography>
                </div>
                <div className={classes.jokerModalCard}>
                <JassCard
                  value={'YY'}
                  active={false}
                  selected={false}
                  disabled={false}
                  onClick={() => {handleCard(activeCard);setTwoModal(2);}}
                />
               <Typography>
              {t("stealCard")}
              </Typography> 
                </div>
            </div>
        </Paper>
      </Modal>

    {/********************* BEGIN JOKER MODAL *************************/}

      {<Modal className={classes.modal} open={!!jokerModal} onBackdropClick={(e) => {setJokerModal('')}}>
        <Paper className={classes.jokerBox}>

          <Typography variant="h4" gutterBottom>
            {t("jokerFunc")} {"  "}  <Tooltip placement={"top"} title={t("tooltipJoker")}>
            <HelpOutlineIcon style={{color:"#888"}}/>
            </Tooltip>
            </Typography>
            <div>
            {playingCards.map((card,key) =>(
              <div key={key} className={classes.jokerModalCard}>
                <JassCard
                  value={card+'H'}
                  active={false}
                  selected={false}
                  disabled={false}
                  onClick={card.charAt(0) === "2" ? (() => {handleSetTwoModal(1,jokerModal+'2');setJokerModal('');console.log("i wanna be thief");}) : (() => {handleCard(jokerModal+card);setJokerModal('');})}
                /> 
                </div>
              ))}
            </div>
        </Paper>
      </Modal>}
      <div style={{display:"none",position:"fixed","top":0,"right":0,height:60,width:120,backgroundColor:"#ddd",border:"1px solid red"}}>
      - Alpha Debug -
      Active Card: {" "}{activeCard}<br/>
      Selection: {" "}{selected.map((value) => {return value+","})}
      </div>
            <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={snack.open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <SnackContent
          variant={snack.variant || "info"}
          message={snack.message || ""}
          onClose={handleClose}
        />
      </Snackbar>
      <Header 
        game={game}
        orderMyPosition={orderMyPosition}
        selected={selected}
        submitSelection={submitSelection}
        onSubmit={onSubmit}
        setSelected={setSelected}
        gameId={gameId}
        setActiveCard={setCardState}
        activeCard={activeCard}
        /*sevenFlag={sevenFlag}*/
      />
    <Box  tabIndex="0" onKeyDown={onKeyDownHandler} p={2} display="flex" alignItems="center" justifyContent="center" className={classes.gameControl  + (isMobile?" gameControl_mobile" :" gameControl")}>
    <div className={classes.gameContainer}>
	    <div className={classes.boardWrapper}>
	      <SvgLoader style={{height: "100%", transform:'rotate(' + 90*(orderMyPosition-1) + 'deg)'}} path={Board}>
            <Balls
              gameBalls={game.balls}
              selected={selected}
              setSelected={setSelected}
              turn={turn}
              lastFour={game.lastFour}
              orderMyPosition={orderMyPosition}
              activeCard={activeCard}
              spectating={spectating}
              gameRooted={game.rooted}
              gameRules={game.rules}
              setSnack={handleSetSnack}
              /*increaseSevenFlag={increaseSevenFlag}*/
            />

              {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((val,idx) => (
                <SvgProxy key={idx} selector={"#lastcard"+Math.floor(val/4)+"x"+(val%4)} xlink_href={""}/>
              ))
              }

              {game.history ? Object.values(game.history).sort(comparer).slice(Math.max(Object.keys(game.history).length - 4, 0)).map((hist,idx) => (
                <SvgProxy key={idx} selector={"#lastcard"+(hist.roundPlayed+3)%4+"x"+(3-parseInt(idx))} xlink_href={require("../assets/cards/"+ hist.card.substring(0,2) +".svg")}/>
              )) : (console.log("no history"))}
	      </SvgLoader>
	      </div>
    </div>
    </Box>
  
    <HandCards 
      myhandObj={myhandObj}
      activeCard={activeCard}
      setJokerModal={setJokerModal}
      handleCard={handleCard}
      handleSetTwoModal={handleSetTwoModal}
    />

    </>
  );
}

export default DogGame;