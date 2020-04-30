import React, ***REMOVED*** useState, useEffect, useCallback ***REMOVED*** from "react";

import ***REMOVED*** makeStyles ***REMOVED*** from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Dialog from "@material-ui/core/Dialog";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import ***REMOVED*** Redirect ***REMOVED*** from "react-router-dom";

import Stepper from '@material-ui/core/Stepper';
import MobileStepper from '@material-ui/core/MobileStepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import ***REMOVED*** computeRandomState, makeHands ***REMOVED*** from "../util";
// import ***REMOVED*** computeStateTwo ***REMOVED*** from "../lib";
import firebase from "../firebase";
import DogGame from "../components/DogGame";
import NotFoundPage from "./NotFoundPage";
import LoadingPage from "./LoadingPage";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import GameEnd from "../components/GameEnd";
import Stats from "../components/Stats";



import ***REMOVED*** useTranslation ***REMOVED*** from 'react-i18next';


import MoveAudio from "../assets/move.mp3";
import SendAudio from "../assets/send.mp3";
import ThrowCardsAudio from "../assets/throw.mp3";
import ThiefAudio from "../assets/thief.mp3";

import Help1 from "../assets/help_1.jpg";
import Help2 from "../assets/help_2.jpg";
import Help3 from "../assets/help_3.jpg";
import Help4 from "../assets/help_4.jpg";
import Help5 from "../assets/help_5.jpg";
import Help6 from "../assets/help_6.jpg";

import ***REMOVED*** isMobile ***REMOVED*** from "react-device-detect";


const useStyles = makeStyles(theme => (***REMOVED***
  container: ***REMOVED***
    height: "100%"
***REMOVED***,
  sidePanel: ***REMOVED***
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: theme.palette.background.paper,
    borderLeft: "1px solid lightgray"
***REMOVED***,
  gamePanel: ***REMOVED***
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    maxHeight: "100vh"

***REMOVED***,
  /*opponentLeft: ***REMOVED***
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: theme.palette.background.paper,
    borderRight: "1px solid lightgray"
***REMOVED***,*/
  modal: ***REMOVED***
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
***REMOVED***,
  modalBox: ***REMOVED***
    outline: 0,
    padding: 28,
    textAlign: "center",
***REMOVED***,
    modalBoxMobile: ***REMOVED***
    outline: 0,
    padding: 5,
    margin: 5,
    maxWidth:"95%",
    textAlign: "center",
***REMOVED***,
  modalPadding: ***REMOVED***
    outline: 0,
    padding: 48,
    textAlign: "center",
***REMOVED***,
  statsModal: ***REMOVED***
    outline: 0,
    padding: 28,
    margin: 28,
    textAlign: "center",
***REMOVED***,
  play: ***REMOVED***
    marginTop: 14,
    marginRight: 4,
***REMOVED***,
  buttonSpac: ***REMOVED***
    marginRight: theme.spacing(1),
***REMOVED***,
  helpImage: ***REMOVED***
    border: "1px solid #aaa",
    maxWidth: "100%"
***REMOVED***,
  helpText: ***REMOVED***
    marginBottom: theme.spacing(1),
***REMOVED***

***REMOVED***));

function GamePage(***REMOVED*** user, gameId ***REMOVED***) ***REMOVED***
  const classes = useStyles();
  const [game, setGame] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const ***REMOVED*** t, i18n ***REMOVED*** = useTranslation();
  const homeFields = [64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79];
  const [audioDisabled, setAudioState] = useState();
  const [helpDisabled, setHelpState] = useState(***REMOVED***seven:true,home:true***REMOVED***);
  const [activeStep, setActiveStep] = useState(0);
  const [statsModalOpen, setStatsModal] = useState(false);
  const steps = getSteps();

  const handleNext = () => ***REMOVED***
    if(activeStep === 4)***REMOVED***
      setHelpState(***REMOVED***home:false***REMOVED***);
      setActiveStep(() => 0);
***REMOVED*** else ***REMOVED***
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
***REMOVED***
***REMOVED***;

  const handleBack = () => ***REMOVED***
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
***REMOVED***;

  function getSteps() ***REMOVED***
    return [t("stepCard"),t("stepBall"),t("stepDest"),t("stepMDest"),t("stepSubmit")];
***REMOVED***

  function getStepContent(stepIndex) ***REMOVED***
    switch (stepIndex) ***REMOVED***
      case 0:
        return <><img className=***REMOVED***classes.helpImage***REMOVED*** alt="" src=***REMOVED***Help1***REMOVED*** /><Typography component=***REMOVED***'span'***REMOVED*** className=***REMOVED***classes.helpText***REMOVED***>***REMOVED***(t("step0"))***REMOVED***</Typography></>;
      case 1:
        return <><img className=***REMOVED***classes.helpImage***REMOVED*** alt="" src=***REMOVED***Help2***REMOVED*** /><Typography component=***REMOVED***'span'***REMOVED*** className=***REMOVED***classes.helpText***REMOVED***>***REMOVED***(t("step1"))***REMOVED***</Typography></>;
      case 2:
        return  <><img className=***REMOVED***classes.helpImage***REMOVED*** alt="" src=***REMOVED***Help3***REMOVED*** /><Typography component=***REMOVED***'span'***REMOVED*** className=***REMOVED***classes.helpText***REMOVED***>***REMOVED***(t("step2"))***REMOVED***</Typography></>;
      case 3:
        return  <><img className=***REMOVED***classes.helpImage***REMOVED*** alt="" src=***REMOVED***Help4***REMOVED*** /><Typography component=***REMOVED***'span'***REMOVED*** className=***REMOVED***classes.helpText***REMOVED***>***REMOVED***(t("step3"))***REMOVED***</Typography></>;
      case 4:
        return  <><img className=***REMOVED***classes.helpImage***REMOVED*** alt="" src=***REMOVED***Help6***REMOVED*** /><Typography component=***REMOVED***'span'***REMOVED*** className=***REMOVED***classes.helpText***REMOVED***>***REMOVED***(t("step5"))***REMOVED***</Typography></>;
      case 5:
        return <>'Bug alert: undefined step!'</>
      default:
        return  'Bug alert: undefined step!';
***REMOVED***
***REMOVED***


  let audio = new Audio(MoveAudio);
  let sendHomeAudio = new Audio(SendAudio);
  let throwAudio = new Audio(ThrowCardsAudio);
  let thiefAudio = new Audio(ThiefAudio);


  let flag = true;

  useEffect(() => ***REMOVED***
    function update(snapshot) ***REMOVED***
      if(!audioDisabled)***REMOVED***
        if(snapshot.exists() && !audioDisabled)***REMOVED***
          flag= true;
          const sn = snapshot.val();
          //console.log(sn.exchange && Object.keys(sn.exchange).length === 4);

          if ((sn.exchange && (Object.keys(sn.exchange).length === 4)) && sn.lastFour)***REMOVED***
            //console.log("sn",sn);
            const entry = Object.values(sn.lastFour).sort((a,b) => ***REMOVED***return a.time < b.time ? -1 : 1;***REMOVED***)[Object.values(sn.lastFour).length-1];
            //console.log(entry);
            if(((entry.card.length === 3 && entry.card.charAt(2) === '2') || entry.card.charAt(0) === '2') && entry.selection === undefined)***REMOVED***
              thiefAudio.play();
***REMOVED*** 
            else if(entry.card === "YY")***REMOVED***
              throwAudio.play();
***REMOVED*** else ***REMOVED***
              const selection = entry.selection;
              //console.log("yumm",selection);
              for(var i=1;i<Object.keys(selection).length;i+=2)***REMOVED***
                if(homeFields.includes(selection[i]))***REMOVED***
                  //console.log("luck",selection[i]);
                  flag = false;
                  sendHomeAudio.play();
                  break;
    ***REMOVED***
  ***REMOVED***
              //console.log("flag",flag);
              if(flag)***REMOVED***
                audio.play();
  ***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***


      if (!snapshot.exists())***REMOVED***
        setGame(undefined);
***REMOVED*** else ***REMOVED***
        setGame(snapshot.val());
***REMOVED*** 
***REMOVED***
    const gameRef = firebase.database().ref(`games/$***REMOVED***gameId***REMOVED***`);
    gameRef.on("value", update);
    return () => ***REMOVED***
      gameRef.off("value", update); //
***REMOVED***;
***REMOVED***, [gameId, audioDisabled]);

  const toggleAudio = () => ***REMOVED***
    setAudioState(!audioDisabled);
***REMOVED***
  const toggleHelp = () => ***REMOVED***
    if(!helpDisabled.home)***REMOVED***
      setHelpState(***REMOVED***seven:true,home:true***REMOVED***);
***REMOVED*** else ***REMOVED***
      setHelpState(***REMOVED***seven:false,home:false***REMOVED***);
***REMOVED***
***REMOVED***

  const disableHelpHome = () => ***REMOVED***
    setHelpState(***REMOVED***home:false***REMOVED***);
***REMOVED***

  const toggleStatsModal = () => ***REMOVED***
    if(isMobile)***REMOVED***
      alert('Stats not available on mobile');
***REMOVED*** else ***REMOVED***
      setStatsModal(!statsModalOpen);
***REMOVED***
***REMOVED***

  const makeTurn = useCallback(
    (balls,selected,activeCard,hands,rnd,thrown,orderMyPosition,root) => ***REMOVED***

      var numCards = game.numCards;
      var nextPlayer = game.nextPlayer;
      var oldNextPlayer = undefined;
      let newRoot = root;
      var round = rnd;
      var updates = ***REMOVED******REMOVED***;
      const gameRef = firebase.database().ref(`games/$***REMOVED***gameId***REMOVED***`);
      const myPos = ""+orderMyPosition;

      /*
       * if game.hands empty, initialize new round with [numCards,whoNext]
       * if next player has empty hand, increase round by two,three,four
       */

      if(thrown)***REMOVED***
        if(hands[(round+1)%4])***REMOVED***
          // next player has hand
          round++;
          updates["round"] = round%4;
***REMOVED*** else if(hands[(round+2)%4])***REMOVED***
          round+=2;
          updates["round"] = round%4;
***REMOVED*** else if(hands[(round+3)%4])***REMOVED***
          round+=3;
          updates["round"] = round%4;
***REMOVED*** else ***REMOVED***
          oldNextPlayer = game.nextPlayer;
          // console.error("round complete: ",round);
          // round = game.nextPlayer;
          hands = makeHands(numCards);
          numCards = numCards === 2 ? 6 : numCards-1;
          console.log(nextPlayer);
          updates["round"] = game.nextPlayer;
          updates["numCards"] = numCards;
          updates["nextPlayer"] =(game.nextPlayer+1) % 4;
          // console.log("wrrr1");
          gameRef.child("exchange").set(***REMOVED******REMOVED***);
***REMOVED***
        

        updates["balls"] = balls;
        updates["hands"] = hands;
        updates["rooted"] = newRoot;
        
        // console.warn("opm",myPos);
        updates["lastFour"] = game.lastFour ? game.lastFour : [];
        updates.lastFour[orderMyPosition] = ***REMOVED***user:user.id,card:"YY",selection:[game.balls[0],game.balls[0]],time:firebase.database.ServerValue.TIMESTAMP***REMOVED***;
        // console.log(updates);
        gameRef.update(updates);
        gameRef.child("history").push(***REMOVED***
            user: user.id,
            card: "YY", // card played
            selection: [thrown,0],
            roundPlayed: rnd,
            time: firebase.database.ServerValue.TIMESTAMP
***REMOVED***);
***REMOVED***else***REMOVED***

        if(hands[(round+1)%4] && hands[(round+1)%4].length > 0)***REMOVED***
          // next player has hand
          //console.error("next player has hand!!");
          round++;
          updates["round"] = (round%4);
***REMOVED*** else if(hands[(round+2)%4] && hands[(round+2)%4].length > 0)***REMOVED***
          round+=2;
          updates["round"] = (round%4);
***REMOVED*** else if(hands[(round+3)%4] && hands[(round+3)%4].length > 0)***REMOVED***
          round+=3;
          updates["round"] = (round%4);
***REMOVED*** else ***REMOVED***
          //round += 4
          if(Object.keys(hands[round%4]).length === 0)***REMOVED***

            // console.error("round complete: ",round);
            // round = game.nextPlayer;
            hands = makeHands(numCards);
            numCards = numCards === 2 ? 6 : numCards-1;
            updates["round"] = game.nextPlayer;
            updates["numCards"] = numCards;
            updates["nextPlayer"] = (game.nextPlayer+1) % 4;
            // console.log("wrrr2");
            gameRef.child("exchange").set(***REMOVED******REMOVED***);
***REMOVED***
          // console.log("same player has more cards", hands[""+(round%4)]);
***REMOVED***
        // console.log(myPos);
        
        updates.lastFour = game.lastFour ? game.lastFour : [];
        updates.lastFour[orderMyPosition] = ***REMOVED***card:activeCard,selection:selected,time:firebase.database.ServerValue.TIMESTAMP, user:user.id***REMOVED***;
        
        updates["balls"] = balls;
        updates["hands"] = hands;
        updates["rooted"] = newRoot;
        gameRef.update(updates);
        /*console.log(   ***REMOVED*** user: user.id,
            card: activeCard,
            selection: selected,
            roundPlayed: rnd***REMOVED***);*/
        gameRef.child("history").push(***REMOVED***
            user: user.id,
            card: activeCard, // card played
            selection: selected,
            roundPlayed: rnd,
            time: firebase.database.ServerValue.TIMESTAMP
***REMOVED***);
        //Team 1: blue-green won
        if([80,81,82,83,88,89,90,91].every(v => (balls).includes(v))) gameRef.child("meta/status").set("done");
        //Team 2: red-yellow won
        if([84,85,86,87,92,93,94,95].every(v => (balls).includes(v))) gameRef.child("meta/status").set("done"); 
***REMOVED***

      //console.log("make Turn complete!")

***REMOVED***
    [game, gameId, user.id]
  );

  const makeExchange = useCallback(
    (activeCard, userOrder) => ***REMOVED***
        var allExchanged = false;
        if(game.exchange)***REMOVED***
          if(Object.keys(game.exchange).length === 3) allExchanged = true;
***REMOVED***
        // console.log("check 1");
        if(allExchanged)***REMOVED***
          // console.log("check 2");
          // execute exchange
          // calculate new hands
          var oldHands = game.hands;
          var oldExchange = game.exchange;
          oldExchange[userOrder] = activeCard;

          var indexOfExchange = []
          // console.log("game hands: ", oldHands);
          // console.log("old exchange: ", oldExchange);
          for(var i=0;i<4;i++)***REMOVED*** // for all players get element of hand to replace
            indexOfExchange.push(game.hands[i].indexOf(oldExchange[i]));
            if(game.hands[i].indexOf(oldExchange[i])===-1)***REMOVED***
              alert('bug alert: invalid card supplied');
              // TODO handle error
***REMOVED***
***REMOVED***
          for(var k=0;k<4;k++)***REMOVED*** 
            oldHands[k][indexOfExchange[k]] = oldExchange[(k+2)%4]; 
***REMOVED***
          // console.log(oldHands);
          const gameRef = firebase.database().ref(`games/$***REMOVED***gameId***REMOVED***/`);
          gameRef.update(***REMOVED***hands:oldHands***REMOVED***);
***REMOVED***
          // add to exchange
        if(!game.exchange)***REMOVED***
          const gameExchangeRef = firebase.database().ref(`games/$***REMOVED***gameId***REMOVED***/exchange`);
          gameExchangeRef.update(***REMOVED***[userOrder]:activeCard***REMOVED***);
***REMOVED***else***REMOVED***
          const newExchange = game.exchange;
          newExchange[userOrder] = activeCard;
          const gameExchangeRef = firebase.database().ref(`games/$***REMOVED***gameId***REMOVED***/exchange`);
          gameExchangeRef.set(newExchange);
***REMOVED***
      // console.log("callback card");
***REMOVED***
  );

  if (redirect) return <Redirect push to=***REMOVED***redirect***REMOVED*** />;

  if (game === undefined) ***REMOVED***
    return <NotFoundPage />;
***REMOVED***

  if (!game) ***REMOVED***
    return <LoadingPage />;
***REMOVED***

  if (game.meta.status === "waiting") ***REMOVED***
    return (
      <Container>
        <Box p=***REMOVED***4***REMOVED***>
          <Typography variant="h4" align="center">
            ***REMOVED***t('waitStart')***REMOVED***
          </Typography>
        </Box>
      </Container>
    );
***REMOVED***

  const onKeyDownHandler = (e) => ***REMOVED***
    if (e.keyCode === 27) ***REMOVED***
      disableHelpHome();
***REMOVED***
***REMOVED***;

  const spectating = !game.meta.users || !game.meta.users[user.id];

  const gameState = computeRandomState(game);

  function handlePlayAgain() ***REMOVED***
    const idx = gameId.lastIndexOf("-");
    let id = gameId,
      num = 0;
    if (gameId.slice(idx + 1).match(/[0-9]+/)) ***REMOVED***
      id = gameId.slice(0, idx);
      num = parseInt(gameId.slice(idx + 1));
***REMOVED***
    setRedirect(`/room/$***REMOVED***id***REMOVED***-$***REMOVED***num + 1***REMOVED***`);
***REMOVED***

  return (
    <Grid container spacing=***REMOVED***0***REMOVED*** className=***REMOVED***classes.container***REMOVED***>
      ***REMOVED***/*<Chat user=***REMOVED***user***REMOVED*** chatId=***REMOVED***gameId***REMOVED*** />*/***REMOVED***
        
      ***REMOVED***isMobile ? (
        <Modal onBackdropClick=***REMOVED***disableHelpHome***REMOVED*** className=***REMOVED***classes.modal***REMOVED*** open=***REMOVED***!spectating && helpDisabled.home && game.meta.status === "ingame"***REMOVED***>
        <Paper className=***REMOVED***classes.modalBoxMobile***REMOVED***>
        <Typography variant="h5" style=***REMOVED******REMOVED***padding:"10px"***REMOVED******REMOVED***>
        ***REMOVED***t("howMove")***REMOVED***
        </Typography>
      ***REMOVED***getStepContent(activeStep)***REMOVED***
      <MobileStepper 
        steps=***REMOVED***steps.length***REMOVED*** 
        position="static" 
        variant="text" 
        activeStep=***REMOVED***activeStep***REMOVED*** 
        nextButton=***REMOVED***
          <Button variant="contained" color="primary" onClick=***REMOVED***handleNext***REMOVED*** className=***REMOVED***classes.buttonSpac***REMOVED***>
            ***REMOVED***activeStep === steps.length - 1 ? t("btnFinish") : t("btnNext")***REMOVED***
          </Button>
***REMOVED*** 
        backButton=***REMOVED***         
          <Button
            disabled=***REMOVED***activeStep === 0***REMOVED***
            onClick=***REMOVED***handleBack***REMOVED***
            className=***REMOVED***classes.buttonSpac***REMOVED***
          >Back</Button>***REMOVED***
        >
        </MobileStepper>
      
        </Paper> 
        </Modal>

        ): (

        <Dialog onKeyDown=***REMOVED***onKeyDownHandler***REMOVED*** onBackdropClick=***REMOVED***disableHelpHome***REMOVED*** className=***REMOVED***classes.modal***REMOVED*** open=***REMOVED***!spectating && helpDisabled.home && game.meta.status === "ingame"***REMOVED***>
        <Box className=***REMOVED***classes.modalBox***REMOVED***>
                <Typography variant="h5">
        ***REMOVED***t("howMove")***REMOVED***
        </Typography>
        <Stepper activeStep=***REMOVED***activeStep***REMOVED*** alternativeLabel>
        ***REMOVED***steps.map((label) => (
          <Step key=***REMOVED***label***REMOVED***>
            <StepLabel>***REMOVED***label***REMOVED***</StepLabel>
          </Step>
        ))***REMOVED***
      </Stepper>
      <Typography className=***REMOVED***classes.instructions***REMOVED***>***REMOVED***getStepContent(activeStep)***REMOVED***</Typography>
      <div>
         <Button
        disabled=***REMOVED***activeStep === 0***REMOVED***
        onClick=***REMOVED***handleBack***REMOVED***
        className=***REMOVED***classes.buttonSpac***REMOVED***
      >
        Back
      </Button>
        <Button variant="contained" color="primary" onClick=***REMOVED***handleNext***REMOVED*** className=***REMOVED***classes.buttonSpac***REMOVED***>
          ***REMOVED***activeStep === steps.length - 1 ? t("btnFinish") : t("btnNext")***REMOVED***
        </Button>

        <Button
          variant="contained"
          color="default"
          onClick=***REMOVED***disableHelpHome***REMOVED***
        >
        ***REMOVED***t("btnClose")***REMOVED***
        </Button>

        </div>
        </Box>
      </Dialog>)***REMOVED***





      <Modal className=***REMOVED***classes.modal***REMOVED*** open=***REMOVED***game.meta.status === "done" && statsModalOpen***REMOVED***>
        <Paper className=***REMOVED***classes.statsModal***REMOVED***>
            <Stats game=***REMOVED***game***REMOVED***/>
          <Button
            className=***REMOVED***classes.play***REMOVED***
            variant="contained"
            color="primary"
            onClick=***REMOVED***toggleStatsModal***REMOVED***
          >
            ***REMOVED***t("btnCloseStats")***REMOVED***
          </Button>
        </Paper>
      </Modal>
      <Modal className=***REMOVED***classes.modal***REMOVED*** open=***REMOVED***game.meta.status === "done" && !statsModalOpen***REMOVED***>
        <Paper className=***REMOVED***classes.modalPadding***REMOVED***>
            <GameEnd
              spectating=***REMOVED***spectating***REMOVED***
              userId=***REMOVED***user.id***REMOVED***
              gameOrder=***REMOVED***game.order***REMOVED***
              metaUsers=***REMOVED***game.meta.users***REMOVED***
              winnerTeam=***REMOVED***[80,81,82,83,88,89,90,91].every(v => (game.balls).includes(v)) ? 0 : 1***REMOVED***
              audioDisabled=***REMOVED***audioDisabled***REMOVED***
            />
            <Button
            className=***REMOVED***classes.play***REMOVED***
            variant="contained"
            color="primary"
            onClick=***REMOVED***handlePlayAgain***REMOVED***
          >
            ***REMOVED***t("btnPlayAgain")***REMOVED***
          </Button>
          <Button
            className=***REMOVED***classes.play***REMOVED***
            variant="contained"
            color="primary"
            onClick=***REMOVED***toggleStatsModal***REMOVED***
          >
            ***REMOVED***t("btnViewStats")***REMOVED***
          </Button>
        </Paper>
      </Modal>


      
        ***REMOVED***/* Game Area */***REMOVED***
      ***REMOVED***isMobile ? (

        <Grid direction=***REMOVED***"column"***REMOVED*** container item xs=***REMOVED***12***REMOVED*** className=***REMOVED***classes.gamePanel + " gamePanel"***REMOVED***>
        <DogGame
          game=***REMOVED***game***REMOVED***
          gameState=***REMOVED***gameState***REMOVED***
          spectating=***REMOVED***spectating***REMOVED***
          onSubmit=***REMOVED***makeTurn***REMOVED***
          user=***REMOVED***user ? user : undefined***REMOVED***
          doExchange=***REMOVED***makeExchange***REMOVED***
          gameId=***REMOVED***gameId***REMOVED***
          helpDisabled=***REMOVED***helpDisabled***REMOVED***
        />
        </Grid>



        ) :


      <>
      <Grid direction=***REMOVED***"column"***REMOVED*** container item xs=***REMOVED***12***REMOVED*** sm=***REMOVED***8***REMOVED*** md=***REMOVED***8***REMOVED*** lg=***REMOVED***9***REMOVED*** xl=***REMOVED***10***REMOVED*** className=***REMOVED***classes.gamePanel + " gamePanel"***REMOVED***>
        <DogGame
          game=***REMOVED***game***REMOVED***
          gameState=***REMOVED***gameState***REMOVED***
          spectating=***REMOVED***spectating***REMOVED***
          onSubmit=***REMOVED***makeTurn***REMOVED***
          user=***REMOVED***user ? user : undefined***REMOVED***
          doExchange=***REMOVED***makeExchange***REMOVED***
          gameId=***REMOVED***gameId***REMOVED***
          helpDisabled=***REMOVED***helpDisabled***REMOVED***
        />
            </Grid>
      
      <Grid item xs=***REMOVED***false***REMOVED*** sm=***REMOVED***4***REMOVED*** md=***REMOVED***4***REMOVED*** lg=***REMOVED***3***REMOVED*** xl=***REMOVED***2***REMOVED*** className=***REMOVED***classes.sidePanel***REMOVED***>
        ***REMOVED***/* Sidebar */***REMOVED***
        <Sidebar 
        game=***REMOVED***game***REMOVED***
        gameState=***REMOVED***gameState***REMOVED***
        toggleAudio=***REMOVED***toggleAudio***REMOVED***
        audioDisabled=***REMOVED***audioDisabled***REMOVED***
        toggleHelp=***REMOVED***toggleHelp***REMOVED***
        helpDisabled=***REMOVED***helpDisabled***REMOVED***
        />
      </Grid>
      </>
***REMOVED***
    </Grid>
  );
***REMOVED***

export default GamePage;