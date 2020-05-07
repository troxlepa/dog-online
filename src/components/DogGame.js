import React, ***REMOVED*** useEffect, useState, useCallback***REMOVED*** from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ***REMOVED*** makeStyles ***REMOVED*** from "@material-ui/core/styles";
import Board from "../assets/board.svg";
import ***REMOVED*** SvgLoader, SvgProxy***REMOVED*** from 'react-svgmt';
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

import ***REMOVED***iHaveFinished***REMOVED*** from "../util";

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import ***REMOVED*** useTranslation ***REMOVED*** from 'react-i18next';

import ***REMOVED*** isMobile ***REMOVED*** from "react-device-detect";


let styled = ***REMOVED******REMOVED***;
if(isMobile)***REMOVED***
  styled = ***REMOVED***
    gameContainer: ***REMOVED***
      position: "relative",
      width: "100%",
***REMOVED***  
    modal: ***REMOVED***
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
***REMOVED***
    modalBox: ***REMOVED***
      outline: 0,
      padding: 28,
      margin:3,
      textAlign: "center",
***REMOVED***
    jokerBox:***REMOVED***
      margin:5,
      padding:10
***REMOVED***
    modalBoxExchange: ***REMOVED***
      outline: 0,
      padding: 28,
      textAlign: "center",
      transition:"0.6s",
***REMOVED***
    boardWrapper: ***REMOVED***
      display: "flex",
      justifyContent: "center"
***REMOVED***
    playerCards: ***REMOVED***
      borderMyPositionTop: "1px solid lightgray",
***REMOVED***
    exCards: ***REMOVED***
      flexDirection: "row",
      borderTop: "1px solid lightgray",
      flexWrap:"nowrap",
      justifyContent:"left",
***REMOVED***
    jokerModalCard:***REMOVED***
      position:"relative",
      display:"inline-block",
      margin:6
***REMOVED***
***REMOVED***;
***REMOVED*** else ***REMOVED***
  styled = ***REMOVED***
    gameContainer: ***REMOVED***
      position: "relative",
      width: "100%",
      height: "100%",
***REMOVED***  
    modal: ***REMOVED***
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
***REMOVED***
    modalBox: ***REMOVED***
      outline: 0,
      padding: 28,
      textAlign: "center",
***REMOVED***
    jokerBox:***REMOVED***
      margin:20,
      padding:20
***REMOVED***
    modalBoxExchange: ***REMOVED***
      outline: 0,
      padding: 28,
      textAlign: "center",
      transition:"0.6s",
      "&:not(:hover)": ***REMOVED***
        opacity: ".15",
***REMOVED***
***REMOVED***
    boardWrapper: ***REMOVED***
      height: "100%",
      display: "flex",
      justifyContent: "center"
***REMOVED***
    playerCards: ***REMOVED***
      borderMyPositionTop: "1px solid lightgray",
***REMOVED***
    exCards: ***REMOVED***
      flexDirection: "row",
      borderTop: "1px solid lightgray",
      flexWrap:"nowrap",
      justifyContent:"left",
***REMOVED***
    jokerModalCard:***REMOVED***
      position:"relative",
      display:"inline-block",
      margin:3
***REMOVED***
***REMOVED***;
***REMOVED***

const useStyles = makeStyles(styled);

function DogGame(***REMOVED*** game, spectating, onSubmit, user, doExchange, gameId, helpDisabled***REMOVED***) ***REMOVED***
  const classes = useStyles();
  const ***REMOVED*** t ***REMOVED*** = useTranslation();
  const [activeCard, setCardState] = useState('');
  const [jokerModal, setJokerModal] = useState('');
  const [twoModal, setTwoModal] = useState(0);
  const [selected, setSelected] = useState([]);
  const [snack, setSnack] = useState(***REMOVED*** open: false ***REMOVED***);
  const [recv,setRecv] = useState(false);

  const userId = user.id;
  const orderMyPosition = game.order.indexOf(userId);
  const turn = game.round % 4;
  const playingCards = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];
  const ttEnabled = game.rules && game.rules.charAt(2)==='1';

  const teamMate = game.meta.users[game.order[(orderMyPosition+2)%4]];

  var myhandObj = ***REMOVED******REMOVED***;
  if(game.hands)***REMOVED***
    myhandObj = game.hands[orderMyPosition] ? game.hands[orderMyPosition] : ***REMOVED******REMOVED***;
***REMOVED***
  
  useEffect(() => ***REMOVED***
    setSelected([]);
***REMOVED***, [activeCard]);

  useEffect(() => ***REMOVED***
    if(selected !== []) checkSelection();
***REMOVED***, [game]);

  const checkSelection = () => ***REMOVED***
    const gameBalls = game.balls;
    const myBalls = gameBalls.slice(orderMyPosition*4,(orderMyPosition*4)+4);
    const partnerPos = (orderMyPosition+2)%4;
    const partnerBalls = gameBalls.slice(partnerPos*4,(partnerPos*4)+4);
    for(var i=0;i<selected.length;i+=2)***REMOVED***
      if(!partnerBalls.includes(selected) && iHaveFinished(gameBalls))***REMOVED***
        setCardState('');
***REMOVED***
      else if(!myBalls.includes(selected[i]))***REMOVED***
        setCardState('');
***REMOVED***
***REMOVED***
***REMOVED***;

  const handleCard = useCallback(
    card => ***REMOVED***
      if (spectating) return;
      if(activeCard.substring(0,2) === card) return '';
      setCardState(card);
***REMOVED***
  );

  const handleOpenRecv = useCallback(
    () => ***REMOVED***
      setRecv(!recv);
***REMOVED***
  );


  function checkTurnValidity()***REMOVED***
    return selected.length % 2 === 0;
***REMOVED***

  const handleStealSubmit = 
    (hand_idx,card_idx) => ***REMOVED***
      if(turn !== orderMyPosition)***REMOVED***
        handleSetSnack(t("notYourTurn")+game.meta.users[game.order[turn]].name);
        return;
***REMOVED***
      let newHands = game.hands;
      let newRoot = game.rooted ? game.rooted : "";
      let stolenCard = newHands[hand_idx].splice(card_idx,1);  // remove stolen card
      let stolenIndex = newHands[orderMyPosition].indexOf(activeCard.substring(0,2));
      newHands[orderMyPosition][stolenIndex] = stolenCard[0]; // replace two by stolen card
      onSubmit(game.balls,[],activeCard,newHands,(game.round%4),null,orderMyPosition,newRoot);
      setTwoModal(0);
***REMOVED***;

  function isAK(aC)***REMOVED*** return (aC==='A' || aC==='K');***REMOVED***

  const submitSelection = 
    () => ***REMOVED***
      if(activeCard === '') return; //no card selected
      if(turn !== orderMyPosition)***REMOVED***
        handleSetSnack(t("notYourTurn")+game.meta.users[game.order[turn]].name);
        return;
***REMOVED***
      let newBallz = [...game.balls];
      let newHands = game.hands;
      let newRoot = game.rooted ? game.rooted : "";
      if(checkTurnValidity())***REMOVED***    
        const homeFields = [0,16,32,48];
        const key = orderMyPosition;
        const aC = activeCard.length === 3 ? activeCard.substring(2,3) : activeCard.substring(0,1);

        if(aC === '7' && !calcIsSevenSum(selected))***REMOVED***
          setCardState('');
          return;
***REMOVED***
        if(aC === '7')***REMOVED***
          for(var i=0;i<selected.length;i+=2)***REMOVED***
            // seven moved rooted home field -> unroot
            if(homeFields.includes(selected[i]))***REMOVED***
              newRoot = replaceChar(newRoot,homeFields.indexOf(selected[i]),'0');
***REMOVED***
            newBallz[game.balls.indexOf(selected[i])] = selected[i+1];
***REMOVED***
***REMOVED***else***REMOVED***
          if(aC==='J')***REMOVED***
            const c1 = game.balls.indexOf(selected[0]);
            const c2 = game.balls.indexOf(selected[1]);
            [newBallz[c1],newBallz[c2]] = [game.balls[c2],game.balls[c1]];
***REMOVED***else***REMOVED***
            for(var j=0;j<selected.length;j+=2)***REMOVED***
              if(isAK(aC) && selected[j] >= 64 && selected[j] < 80)***REMOVED***
                newRoot = replaceChar(game.rooted,getBallColor(selected[j]),"1");
                console.log(newRoot);
  ***REMOVED***
              else if(homeFields.includes(selected[j]) && newRoot.charAt(homeFields.indexOf(selected[j])) === "1")***REMOVED***
                newRoot = replaceChar(game.rooted,getBallColor(selected[j]),"0");
  ***REMOVED***
              newBallz[game.balls.indexOf(selected[j])] = selected[j+1];
***REMOVED***
***REMOVED***
***REMOVED***

        if(game.rules)***REMOVED***
          const ljEnabled = game.rules.charAt(4) === "1";
          const partnerPos = (orderMyPosition+2)%4;
          if(ljEnabled && activeCard.charAt(0) === 'Z' && newBallz.slice(orderMyPosition*4,(orderMyPosition*4)+4).every(x => x >= 80) && newBallz.slice(partnerPos*4,(partnerPos*4)+4).every(x => x >= 80))***REMOVED***
            setCardState('');
            handleSetSnack(t("ljEnabled"));
            return;
***REMOVED***
***REMOVED***
        if(newBallz.length !== new Set(newBallz).size)***REMOVED*** // check if two ball on same spot
          setCardState('');
          handleSetSnack(t("invalidTurn"));
          return;
***REMOVED***
        newHands[key].splice(newHands[key].indexOf(activeCard.substring(0,2)),1); // remove card from hand
***REMOVED***else***REMOVED***
        setCardState('');
        handleSetSnack(t("invalidTurn"));
        return;
***REMOVED***

      onSubmit(newBallz,selected,activeCard,newHands,(game.round%4),null,orderMyPosition,newRoot);
***REMOVED***;

  function calcIsSevenSum(selected)***REMOVED***
    let sum = 0;
    for(var i=1;i<selected.length;i+=2)***REMOVED***
      const dest = selected[i];
      if(!(dest > 63 && dest < 80))***REMOVED***  //sendHome
        const start = selected[i-1];
        // goFinish
        if(dest >= 80)***REMOVED***
          if(start >= 80)***REMOVED***
            sum += dest-start;
***REMOVED***
          else if(start === 0)***REMOVED***
            sum += dest-79; //noZeroToFinish
***REMOVED***
          else if(start > 57)***REMOVED***
            sum += (64-start)+(dest-79);
***REMOVED***
          else if(dest >= 92)***REMOVED***
            sum += (48-start)+(dest-91);
***REMOVED***
          else if(dest >= 88)***REMOVED***
            sum += (32-start)+(dest-87);
***REMOVED***
          else if(dest >= 84)***REMOVED***
            sum += (16-start)+(dest-83);
***REMOVED***
          else***REMOVED***
            alert("are you trying to move backwards? bug alert");
***REMOVED***
***REMOVED***
        else***REMOVED***
          if(start > 56 && dest < 7)***REMOVED***
            sum += dest+64-start;
***REMOVED***else***REMOVED***
            sum += dest-start;
***REMOVED***
          if(sum <= 0) return false;
***REMOVED***
***REMOVED*** // sendHome
***REMOVED***
    if(sum <= 0) return false;
    return sum === 7;
***REMOVED***

  function getBallColor(ball)***REMOVED***

    return Math.floor(game.balls.indexOf(ball)/4);
***REMOVED***

  function replaceChar(rooted,index,value)***REMOVED***

    return rooted.substring(0,index) + value + rooted.substring(index+1);
***REMOVED***

  const exchangeCard = useCallback(
    () => ***REMOVED***
      doExchange(activeCard,orderMyPosition.toString());
      setCardState('');
***REMOVED***
  );

  const onKeyDownHandler = (e) => ***REMOVED***
    if (e.keyCode === 13) ***REMOVED***
      if(turn !== orderMyPosition)***REMOVED***
        handleSetSnack(t("notYourTurn")+game.meta.users[game.order[turn]].name);
        return;
***REMOVED***
      if(selected.length > 1 && selected.length % 2 === 0 && activeCard !== '') submitSelection();
***REMOVED***else if(e.keyCode === 27)***REMOVED***
      if(!recv)***REMOVED***
        handleOpenRecv();
***REMOVED***else***REMOVED***
        setCardState('');
***REMOVED***
***REMOVED***
***REMOVED***;

  function comparer( a, b ) ***REMOVED***

    return a.time < b.time ? -1 : 1;
***REMOVED***
  function handleClose(event, reason) ***REMOVED***
    if (reason === "clickaway") return;
    setSnack(***REMOVED*** ...snack, open: false ***REMOVED***);
***REMOVED***

  const handleSetTwoModal = (state,value) => ***REMOVED***
    setTwoModal(state);
    setCardState(value);
***REMOVED***;
  const handleSetSnack = (msg) => ***REMOVED***
    setSnack(***REMOVED***
      open: true,
      variant: "error",
      message: msg
***REMOVED***);
***REMOVED***;

  return (
    <React.Fragment>
      ***REMOVED***isMobile ? (
        <Dialog closetimeoutms=***REMOVED***2000***REMOVED*** className=***REMOVED***classes.modal***REMOVED*** open=***REMOVED***(!game.exchange || !game.exchange[orderMyPosition]) && !spectating && game.meta.status !== "done" && !helpDisabled.home***REMOVED***>
          <Paper className=***REMOVED***classes.modalBoxExchange***REMOVED***>
            <Typography variant="h4" gutterBottom>
              ***REMOVED***t("selectCard")***REMOVED*** ***REMOVED***" "***REMOVED*** ***REMOVED***spectating ? null : teamMate.name***REMOVED***
            </Typography>
            <Typography variant="body1">
              ***REMOVED***t("exchangeCard")***REMOVED***
            </Typography>
            <Box className=***REMOVED***classes.exCards  + " selfCards_mobile"***REMOVED***>
              ***REMOVED***Object.keys(myhandObj).map((card, idx) => (
                <JassCard
                  key=***REMOVED***idx***REMOVED***
                  value=***REMOVED***myhandObj[card]***REMOVED***
                  disabled=***REMOVED***false***REMOVED***
                  active=***REMOVED***activeCard===myhandObj[card]***REMOVED***
                  selected=***REMOVED***activeCard===myhandObj[card]***REMOVED***
                  onClick=***REMOVED***() => ***REMOVED***handleCard(myhandObj[card]);***REMOVED******REMOVED***
                  isLastPlayed=***REMOVED***false***REMOVED***
                />
              ))***REMOVED***
            </Box>
            <Button
              className=***REMOVED***classes.play***REMOVED***
              variant="contained"
              color="primary"
              disabled=***REMOVED***activeCard === ""***REMOVED***
              onClick=***REMOVED***() => ***REMOVED***handleOpenRecv();exchangeCard();***REMOVED******REMOVED***
            >
              ***REMOVED***t("giveCard")***REMOVED***
            </Button>
          </Paper>
        </Dialog>
      ):(
        <Modal closetimeoutms=***REMOVED***2000***REMOVED*** className=***REMOVED***classes.modal***REMOVED*** open=***REMOVED***(!game.exchange || !game.exchange[orderMyPosition]) && !spectating && game.meta.status !== "done" && !helpDisabled.home***REMOVED***>
          <Paper className=***REMOVED***classes.modalBoxExchange***REMOVED***>
            <Typography variant="h4" gutterBottom>
              ***REMOVED***t("selectCard")***REMOVED*** ***REMOVED***" "***REMOVED*** ***REMOVED***spectating ? null : teamMate.name***REMOVED***
            </Typography>
            <Typography variant="body1">
              ***REMOVED***t("exchangeCard")***REMOVED***
            </Typography>
            <Box className=***REMOVED***classes.exCards  + " selfCards"***REMOVED***>
              ***REMOVED***Object.keys(myhandObj).map((card, idx) => (
                <JassCard
                  key=***REMOVED***idx***REMOVED***
                  value=***REMOVED***myhandObj[card]***REMOVED***
                  disabled=***REMOVED***false***REMOVED***
                  active=***REMOVED***activeCard===myhandObj[card]***REMOVED***
                  selected=***REMOVED***activeCard===myhandObj[card]***REMOVED***
                  onClick=***REMOVED***() => ***REMOVED***handleCard(myhandObj[card]);***REMOVED******REMOVED***
                  isLastPlayed=***REMOVED***false***REMOVED***
                />
              ))***REMOVED***
            </Box>
            <Button
              className=***REMOVED***classes.play***REMOVED***
              variant="contained"
              color="primary"
              disabled=***REMOVED***activeCard === ""***REMOVED***
              onClick=***REMOVED***() => ***REMOVED***handleOpenRecv();exchangeCard();***REMOVED******REMOVED***
            >
              ***REMOVED***t("giveCard")***REMOVED***
            </Button>
          </Paper>
        </Modal>
      )***REMOVED***

      ***REMOVED***/********************* BEGIN EXCHANGE RECV MODAL *************************/***REMOVED***
      <Modal onKeyDown=***REMOVED***onKeyDownHandler***REMOVED*** onBackdropClick=***REMOVED***handleOpenRecv***REMOVED*** className=***REMOVED***classes.modal***REMOVED*** open=***REMOVED***!!game.exchange && Object.keys(game.exchange).length === 4 && !recv && !helpDisabled.home***REMOVED***>
        <Paper className=***REMOVED***classes.modalBox***REMOVED***>
          <Typography variant="h4" gutterBottom>
            ***REMOVED***t("receivedCard")***REMOVED***:
          </Typography>
          <JassCard
            value=***REMOVED***game.exchange ? game.exchange[(orderMyPosition+2)%4] : "YY"***REMOVED***
            active=***REMOVED***false***REMOVED***
            selected=***REMOVED***false***REMOVED***
            disabled=***REMOVED***false***REMOVED***
          /> 
          <br/>
          <Button
            className=***REMOVED***classes.play***REMOVED***
            variant="contained"
            color="primary"
            disabled=***REMOVED***false***REMOVED***
            onClick=***REMOVED***handleOpenRecv***REMOVED***
          >
            ***REMOVED***t("confirmButton")***REMOVED***
          </Button>
        </Paper>
      </Modal>
      ***REMOVED***/********************* END EXCHANGE RECV MODAL *************************/***REMOVED***

      <Modal className=***REMOVED***classes.modal***REMOVED*** open=***REMOVED***!!game.exchange && game.exchange[orderMyPosition] && Object.keys(game.exchange).length !== 4  && !spectating && !helpDisabled.home***REMOVED***>
        <Paper className=***REMOVED***classes.modalBox***REMOVED***>
          <Typography variant="h4" gutterBottom>
            ***REMOVED***t("waitingPlayers")***REMOVED***...
          </Typography>
        </Paper>
      </Modal>

      ***REMOVED***/********************* BEGIN 2 MODAL *************************/***REMOVED***

      <Modal className=***REMOVED***classes.modal***REMOVED*** open=***REMOVED***twoModal===2 && ttEnabled***REMOVED*** onBackdropClick=***REMOVED***() => ***REMOVED***setTwoModal(0);***REMOVED******REMOVED***>
        <Paper className=***REMOVED***classes.jokerBox***REMOVED***>
          <Typography variant="h4" gutterBottom>
            ***REMOVED***t("twoFuncPlayer")***REMOVED***
          </Typography>
          <div>
            <div className=***REMOVED***classes.jokerModalCard***REMOVED***>
              ***REMOVED*** /* all other players, display cards to steal */ ***REMOVED***
              ***REMOVED***[0,1,2,3].map((val,idx) => (idx!==orderMyPosition && game.hands[""+idx] && (
                <React.Fragment key=***REMOVED***idx***REMOVED***>
                  <div style=***REMOVED******REMOVED***backgroundColor:game.meta.users[game.order[idx]].color***REMOVED******REMOVED*** key=***REMOVED***idx***REMOVED***>
                    ***REMOVED***Object.values(game.hands[""+idx]).map((card,card_idx) => (
                      <JassCard
                        key=***REMOVED***card_idx***REMOVED***
                        value=***REMOVED***"YY"***REMOVED*** //card.substring(0,2) to show cards
                        active=***REMOVED***false***REMOVED***
                        selected=***REMOVED***false***REMOVED***
                        disabled=***REMOVED***false***REMOVED***
                        onClick=***REMOVED***() => ***REMOVED***handleStealSubmit(idx,card_idx);***REMOVED******REMOVED***
                      />
                    ))***REMOVED***
                  </div>
                  <Typography style=***REMOVED******REMOVED***color:game.meta.users[game.order[idx]].color***REMOVED******REMOVED***>***REMOVED***game.meta.users[game.order[idx]].name***REMOVED******REMOVED***(orderMyPosition+2)%4===idx ? " ("+t('teammate')+")":""***REMOVED*** </Typography>
                </React.Fragment>
              )))***REMOVED***
            </div>
          </div>
        </Paper>
      </Modal>

      <Modal className=***REMOVED***classes.modal***REMOVED*** open=***REMOVED***twoModal===1 && ttEnabled***REMOVED*** onBackdropClick=***REMOVED***() => ***REMOVED***setTwoModal(0);***REMOVED******REMOVED***>
        <Paper className=***REMOVED***classes.jokerBox***REMOVED***>
          <Typography variant="h4" gutterBottom>
            ***REMOVED***t("twoFunc")***REMOVED***
          </Typography>
          <div>
            <div className=***REMOVED***classes.jokerModalCard***REMOVED***>
              <JassCard
                value=***REMOVED***"2"+activeCard.charAt(1)***REMOVED***
                active=***REMOVED***false***REMOVED***
                selected=***REMOVED***false***REMOVED***
                disabled=***REMOVED***false***REMOVED***
                onClick=***REMOVED***() => ***REMOVED***handleCard(activeCard);setTwoModal(0);***REMOVED******REMOVED***
              /> 
              <Typography>
                ***REMOVED***t("moveTwo")***REMOVED***
              </Typography>
            </div>
            <div className=***REMOVED***classes.jokerModalCard***REMOVED***>
              <JassCard
                value=***REMOVED***'YY'***REMOVED***
                active=***REMOVED***false***REMOVED***
                selected=***REMOVED***false***REMOVED***
                disabled=***REMOVED***false***REMOVED***
                onClick=***REMOVED***() => ***REMOVED***handleCard(activeCard);setTwoModal(2);***REMOVED******REMOVED***
              />
              <Typography>
                ***REMOVED***t("stealCard")***REMOVED***
              </Typography> 
            </div>
          </div>
        </Paper>
      </Modal>

      ***REMOVED***/********************* BEGIN JOKER MODAL *************************/***REMOVED***

      <Modal className=***REMOVED***classes.modal***REMOVED*** open=***REMOVED***!!jokerModal***REMOVED*** onBackdropClick=***REMOVED***() => ***REMOVED***setJokerModal('');***REMOVED******REMOVED***>
        <Paper className=***REMOVED***classes.jokerBox***REMOVED***>
          <Typography variant="h4" gutterBottom>
            ***REMOVED***t("jokerFunc")***REMOVED*** ***REMOVED***"  "***REMOVED***
            <Tooltip placement=***REMOVED***"top"***REMOVED*** title=***REMOVED***t("tooltipJoker")***REMOVED***>
              <HelpOutlineIcon style=***REMOVED******REMOVED***color:"#888"***REMOVED******REMOVED***/>
            </Tooltip>
          </Typography>
          <div>
            ***REMOVED***playingCards.map((card,key) =>(
              <div key=***REMOVED***key***REMOVED*** className=***REMOVED***classes.jokerModalCard***REMOVED***>
                <JassCard
                  value=***REMOVED***card+'H'***REMOVED***
                  active=***REMOVED***false***REMOVED***
                  selected=***REMOVED***false***REMOVED***
                  disabled=***REMOVED***false***REMOVED***
                  onClick=***REMOVED***card.charAt(0) === "2" ? (() => ***REMOVED***handleSetTwoModal(1,jokerModal+'2');setJokerModal('');***REMOVED***) : (() => ***REMOVED***handleCard(jokerModal+card);setJokerModal('');***REMOVED***)***REMOVED***
                /> 
              </div>
            ))***REMOVED***
          </div>
        </Paper>
      </Modal>

      <div style=***REMOVED******REMOVED***display:"none",position:"fixed","top":0,"right":0,height:60,width:120,backgroundColor:"#ddd",border:"1px solid red"***REMOVED******REMOVED***>
        - Debug -
        Active Card: ***REMOVED***" "***REMOVED******REMOVED***activeCard***REMOVED***<br/>
        Selection: ***REMOVED***" "***REMOVED******REMOVED***selected.map((value) => ***REMOVED***return value+",";***REMOVED***)***REMOVED***
      </div>
      <Snackbar
        anchorOrigin=***REMOVED******REMOVED***
          vertical: "bottom",
          horizontal: "center"
***REMOVED******REMOVED***
        open=***REMOVED***snack.open***REMOVED***
        autoHideDuration=***REMOVED***2000***REMOVED***
        onClose=***REMOVED***handleClose***REMOVED***
      >
        <SnackContent
          variant=***REMOVED***snack.variant || "info"***REMOVED***
          message=***REMOVED***snack.message || ""***REMOVED***
          onClose=***REMOVED***handleClose***REMOVED***
        />
      </Snackbar>
      <Header 
        game=***REMOVED***game***REMOVED***
        orderMyPosition=***REMOVED***orderMyPosition***REMOVED***
        selected=***REMOVED***selected***REMOVED***
        submitSelection=***REMOVED***submitSelection***REMOVED***
        onSubmit=***REMOVED***onSubmit***REMOVED***
        setSelected=***REMOVED***setSelected***REMOVED***
        gameId=***REMOVED***gameId***REMOVED***
        setActiveCard=***REMOVED***setCardState***REMOVED***
        activeCard=***REMOVED***activeCard***REMOVED***
      />
      <Box  tabIndex="0" onKeyDown=***REMOVED***onKeyDownHandler***REMOVED*** p=***REMOVED***2***REMOVED*** display="flex" alignItems="center" justifyContent="center" className=***REMOVED***classes.gameControl  + (isMobile?" gameControl_mobile" :" gameControl")***REMOVED***>
        <div className=***REMOVED***classes.gameContainer***REMOVED***>
          <div className=***REMOVED***classes.boardWrapper***REMOVED***>
            <SvgLoader style=***REMOVED******REMOVED***height: "100%", transform:'rotate(' + 90*(orderMyPosition-1) + 'deg)'***REMOVED******REMOVED*** path=***REMOVED***Board***REMOVED***>
              <Balls
                gameBalls=***REMOVED***game.balls***REMOVED***
                selected=***REMOVED***selected***REMOVED***
                setSelected=***REMOVED***setSelected***REMOVED***
                turn=***REMOVED***turn***REMOVED***
                lastFour=***REMOVED***game.lastFour***REMOVED***
                orderMyPosition=***REMOVED***orderMyPosition***REMOVED***
                activeCard=***REMOVED***activeCard***REMOVED***
                spectating=***REMOVED***spectating***REMOVED***
                gameRooted=***REMOVED***game.rooted***REMOVED***
                gameRules=***REMOVED***game.rules***REMOVED***
                setSnack=***REMOVED***handleSetSnack***REMOVED***
              />

              ***REMOVED***[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((val,idx) => (
                <SvgProxy key=***REMOVED***idx***REMOVED*** selector=***REMOVED***"#lastcard"+Math.floor(val/4)+"x"+(val%4)***REMOVED*** xlink_href=***REMOVED***""***REMOVED***/>
              ))***REMOVED***

              ***REMOVED***game.history ? Object.values(game.history).sort(comparer).slice(Math.max(Object.keys(game.history).length - 4, 0)).map((hist,idx) => (
                <SvgProxy key=***REMOVED***idx***REMOVED*** selector=***REMOVED***"#lastcard"+(hist.roundPlayed+3)%4+"x"+(3-parseInt(idx))***REMOVED*** xlink_href=***REMOVED***require("../assets/cards/"+ hist.card.substring(0,2) +".svg")***REMOVED***/>
              )) : (console.log("no history"))***REMOVED***
            </SvgLoader>
            ***REMOVED***isMobile ? null : (<div style=***REMOVED******REMOVED***position:'absolute','top':'50%','opacity':(turn !== orderMyPosition || !activeCard || selected.length < 2 || selected.length % 2 !== 0) ? '0' : '1','transition':'.4s linear'***REMOVED******REMOVED***>
              <div style=***REMOVED******REMOVED***'transform':'translateY(-50%)'***REMOVED******REMOVED***>
                <Button
                  className="controlButtonSingle_mobile"
                  variant="contained"
                  color="secondary"
                  size="large"
                  disabled=***REMOVED***turn !== orderMyPosition || !activeCard || selected.length < 2 || selected.length % 2 !== 0***REMOVED***
                  onClick=***REMOVED***submitSelection***REMOVED***
                >
                  <Typography>***REMOVED***t('submitTurnButton')***REMOVED***</Typography>
                </Button>
              </div>
            </div>)***REMOVED***
          </div>
        </div>
      </Box>
      <HandCards 
        myhandObj=***REMOVED***myhandObj***REMOVED***
        activeCard=***REMOVED***activeCard***REMOVED***
        setJokerModal=***REMOVED***setJokerModal***REMOVED***
        handleCard=***REMOVED***handleCard***REMOVED***
        handleSetTwoModal=***REMOVED***handleSetTwoModal***REMOVED***
      />
    </React.Fragment>
  );
***REMOVED***

export default DogGame;