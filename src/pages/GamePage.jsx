import React, { useState, useEffect, useCallback } from "react";

import { isMobile } from "react-device-detect";
import { useTranslation } from 'react-i18next';

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Redirect } from "react-router-dom";
import Stepper from '@mui/material/Stepper';
import MobileStepper from '@mui/material/MobileStepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import { computeHistory, makeHands } from "../util";
import firebase from "../firebase";
import DogGame from "../components/DogGame";
import Sidebar from "../components/Sidebar";
import GameEnd from "../components/GameEnd";
import Stats from "../components/Stats";

import MoveAudio from "../assets/sounds/move.mp3";
import SendAudio from "../assets/sounds/send.mp3";
import ThrowCardsAudio from "../assets/sounds/throw.mp3";
import ThiefAudio from "../assets/sounds/thief.mp3";

import Help1 from "../assets/help_img/help_1.jpg";
import Help2 from "../assets/help_img/help_2.jpg";
import Help3 from "../assets/help_img/help_3.jpg";
import Help4 from "../assets/help_img/help_4.jpg";
import Help6 from "../assets/help_img/help_6.jpg";

import NotFoundPage from "./NotFoundPage";
import LoadingPage from "./LoadingPage";


const buttonSpac = (theme) => ({ mr: theme.spacing(1) });

function GamePage({ user, gameId }) {
  const [game, setGame] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const { t } = useTranslation();
  const homeFields = [64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79];
  const [audioDisabled, setAudioState] = useState();
  const [helpDisabled, setHelpState] = useState({seven:true,home:true});
  const [activeStep, setActiveStep] = useState(0);
  const [statsModalOpen, setStatsModal] = useState(false);
  const steps = getSteps();

  const handleNext = () => {
    if(activeStep === 4){
      setHelpState({home:false});
      setActiveStep(() => 0);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getSteps() {
    return [t("stepCard"),t("stepBall"),t("stepDest"),t("stepMDest"),t("stepSubmit")];
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
    case 0:
      return <React.Fragment><img style={{ border: '1px solid #aaa', maxWidth: '100%' }} alt="" src={Help1} /><Typography component={'span'} sx={{ mb: 1 }}>{(t("step0"))}</Typography></React.Fragment>;
    case 1:
      return <React.Fragment><img style={{ border: '1px solid #aaa', maxWidth: '100%' }} alt="" src={Help2} /><Typography component={'span'} sx={{ mb: 1 }}>{(t("step1"))}</Typography></React.Fragment>;
    case 2:
      return <React.Fragment><img style={{ border: '1px solid #aaa', maxWidth: '100%' }} alt="" src={Help3} /><Typography component={'span'} sx={{ mb: 1 }}>{(t("step2"))}</Typography></React.Fragment>;
    case 3:
      return <React.Fragment><img style={{ border: '1px solid #aaa', maxWidth: '100%' }} alt="" src={Help4} /><Typography component={'span'} sx={{ mb: 1 }}>{(t("step3"))}</Typography></React.Fragment>;
    case 4:
      return <React.Fragment><img style={{ border: '1px solid #aaa', maxWidth: '100%' }} alt="" src={Help6} /><Typography component={'span'} sx={{ mb: 1 }}>{(t("step5"))}</Typography></React.Fragment>;
    default:
      return <React.Fragment>Bug alert: undefined step!</React.Fragment>;
    }
  }


  let audio = new Audio(MoveAudio);
  let sendHomeAudio = new Audio(SendAudio);
  let throwAudio = new Audio(ThrowCardsAudio);
  let thiefAudio = new Audio(ThiefAudio);

  useEffect(() => {
    function update(snapshot) {
      if(!audioDisabled){
        if(snapshot.exists() && !audioDisabled){
          let flag = true;
          const sn = snapshot.val();
          if ((sn.exchange && (Object.keys(sn.exchange).length === 4)) && sn.lastFour){
            const entry = Object.values(sn.lastFour).sort((a,b) => {return a.time < b.time ? -1 : 1;})[Object.values(sn.lastFour).length-1];
            if(((entry.card.length === 3 && entry.card.charAt(2) === '2') || entry.card.charAt(0) === '2') && entry.selection === undefined){
              thiefAudio.play();
            } 
            else if(entry.card === "YY"){
              throwAudio.play();
            } else {
              const selection = entry.selection;
              for(var i=1;i<Object.keys(selection).length;i+=2){
                if(homeFields.includes(selection[i])){
                  flag = false;
                  sendHomeAudio.play();
                  break;
                }
              }
              if(flag){
                audio.play();
              }
            }
          }
        }
      }


      if (!snapshot.exists()){
        setGame(undefined);
      } else {
        setGame(snapshot.val());
      } 
    }
    const gameRef = firebase.database().ref(`games/${gameId}`);
    gameRef.on("value", update);
    return () => {
      gameRef.off("value", update); //
    };
  }, [gameId, audioDisabled]);

  const toggleAudio = () => {
    setAudioState(!audioDisabled);
  };
  const toggleHelp = () => {
    if(!helpDisabled.home){
      setHelpState({seven:true,home:true});
    } else {
      setHelpState({seven:false,home:false});
    }
  };

  const disableHelpHome = () => {
    setHelpState({home:false});
  };

  const toggleStatsModal = () => {
    if(isMobile){
      alert('Stats not available on mobile');
    } else {
      setStatsModal(!statsModalOpen);
    }
  };

  const makeTurn = useCallback(
    (balls,selected,activeCard,hands,rnd,thrown,orderMyPosition,root) => {

      var numCards = game.numCards;
      var nextPlayer = game.nextPlayer;
      let newRoot = root;
      var round = rnd;
      var updates = {};
      const gameRef = firebase.database().ref(`games/${gameId}`);

      /*
       * if game.hands empty, initialize new round with [numCards,whoNext]
       * if next player has empty hand, increase round by two,three,four
       */

      if(thrown){
        if(hands[(round+1)%4]){
          // next player has hand
          round++;
          updates["round"] = round%4;
        } else if(hands[(round+2)%4]){
          round+=2;
          updates["round"] = round%4;
        } else if(hands[(round+3)%4]){
          round+=3;
          updates["round"] = round%4;
        } else {
          hands = makeHands(numCards);
          numCards = numCards === 2 ? 6 : numCards-1;
          console.log(nextPlayer);
          updates["round"] = game.nextPlayer;
          updates["numCards"] = numCards;
          updates["nextPlayer"] =(game.nextPlayer+1) % 4;
          gameRef.child("exchange").set({});
        }
        

        updates["balls"] = balls;
        updates["hands"] = hands;
        updates["rooted"] = newRoot;
        
        updates["lastFour"] = game.lastFour ? game.lastFour : [];
        updates.lastFour[orderMyPosition] = {user:user.id,card:"YY",selection:[game.balls[0],game.balls[0]],time:firebase.database.ServerValue.TIMESTAMP};
        gameRef.update(updates);
        gameRef.child("history").push({
          user: user.id,
          card: "YY", // card played
          selection: [thrown,0],
          roundPlayed: rnd,
          time: firebase.database.ServerValue.TIMESTAMP
        });
      }else{

        if(hands[(round+1)%4] && hands[(round+1)%4].length > 0){
          // next player has hand
          round++;
          updates["round"] = (round%4);
        } else if(hands[(round+2)%4] && hands[(round+2)%4].length > 0){
          round+=2;
          updates["round"] = (round%4);
        } else if(hands[(round+3)%4] && hands[(round+3)%4].length > 0){
          round+=3;
          updates["round"] = (round%4);
        } else {
          //round += 4
          if(Object.keys(hands[round%4]).length === 0){


            hands = makeHands(numCards);
            numCards = numCards === 2 ? 6 : numCards-1;
            updates["round"] = game.nextPlayer;
            updates["numCards"] = numCards;
            updates["nextPlayer"] = (game.nextPlayer+1) % 4;
            gameRef.child("exchange").set({});
          }
          // same player has more cards
        }
        
        updates.lastFour = game.lastFour ? game.lastFour : [];
        updates.lastFour[orderMyPosition] = {card:activeCard,selection:selected,time:firebase.database.ServerValue.TIMESTAMP, user:user.id};
        
        updates["balls"] = balls;
        updates["hands"] = hands;
        updates["rooted"] = newRoot;
        gameRef.update(updates);

        gameRef.child("history").push({
          user: user.id,
          card: activeCard, // card played
          selection: selected,
          roundPlayed: rnd,
          time: firebase.database.ServerValue.TIMESTAMP
        });
        //Team 1: blue-green won
        if([80,81,82,83,88,89,90,91].every(v => (balls).includes(v))) gameRef.child("meta/status").set("done");
        //Team 2: red-yellow won
        if([84,85,86,87,92,93,94,95].every(v => (balls).includes(v))) gameRef.child("meta/status").set("done"); 
      }
    },
    [game, gameId, user.id]
  );

  const makeExchange = useCallback(
    (activeCard, userOrder) => {
      var allExchanged = false;
      if(game.exchange){
        if(Object.keys(game.exchange).length === 3) allExchanged = true;
      }
      if(allExchanged){
        var oldHands = game.hands;
        var oldExchange = game.exchange;
        oldExchange[userOrder] = activeCard;

        var indexOfExchange = [];
        for(var i=0;i<4;i++){ // for all players get element of hand to replace
          indexOfExchange.push(game.hands[i].indexOf(oldExchange[i]));
          if(game.hands[i].indexOf(oldExchange[i])===-1){
            alert('bug alert: invalid card supplied');
          }
        }
        for(var k=0;k<4;k++){ 
          oldHands[k][indexOfExchange[k]] = oldExchange[(k+2)%4]; 
        }
        const gameRef = firebase.database().ref(`games/${gameId}/`);
        gameRef.update({hands:oldHands});
      }
      // add to exchange
      if(!game.exchange){
        const gameExchangeRef = firebase.database().ref(`games/${gameId}/exchange`);
        gameExchangeRef.update({[userOrder]:activeCard});
      }else{
        const newExchange = game.exchange;
        newExchange[userOrder] = activeCard;
        const gameExchangeRef = firebase.database().ref(`games/${gameId}/exchange`);
        gameExchangeRef.set(newExchange);
      }
    }
  );

  if (redirect) return <Redirect push to={redirect} />;

  if (game === undefined) {
    return <NotFoundPage />;
  }

  if (!game) {
    return <LoadingPage />;
  }

  if (game.meta.status === "waiting") {
    return (
      <Container>
        <Box p={4}>
          <Typography variant="h4" align="center">
            {t('waitStart')}
          </Typography>
        </Box>
      </Container>
    );
  }

  const onKeyDownHandler = (e) => {
    if (e.keyCode === 27) {
      disableHelpHome();
    }
  };

  const spectating = !game.meta.users || !game.meta.users[user.id];

  const gameState = computeHistory(game);

  function handlePlayAgain() {
    const idx = gameId.lastIndexOf("-");
    let id = gameId,
      num = 0;
    if (gameId.slice(idx + 1).match(/[0-9]+/)) {
      id = gameId.slice(0, idx);
      num = parseInt(gameId.slice(idx + 1));
    }
    setRedirect(`/room/${id}-${num + 1}`);
  }

  return (
    <Grid container spacing={0} sx={{ height: '100%' }}>        
      {isMobile ? (
        <Modal onBackdropClick={disableHelpHome} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} open={!spectating && helpDisabled.home && game.meta.status === "ingame"}>
          <Paper sx={{ outline: 0, p: 1, m: 1, maxWidth: '95%', textAlign: 'center' }}>
            <Typography variant="h5" style={{padding:"10px"}}>
              {t("howMove")}
            </Typography>
            {getStepContent(activeStep)}
            <MobileStepper 
              steps={steps.length} 
              position="static" 
              variant="text" 
              activeStep={activeStep} 
              nextButton={
                <Button variant="contained" color="primary" onClick={handleNext} sx={buttonSpac}>
                  {activeStep === steps.length - 1 ? t("btnFinish") : t("btnNext")}
                </Button>
              } 
              backButton={         
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={buttonSpac}
                >Back</Button>}
            >
            </MobileStepper>
          </Paper> 
        </Modal>
      ) : (
        <Dialog onKeyDown={onKeyDownHandler} onBackdropClick={disableHelpHome} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} open={!spectating && helpDisabled.home && game.meta.status === "ingame"}>
          <Box sx={{ outline: 0, p: 3.5, textAlign: 'center' }}>
            <Typography variant="h5">
              {t("howMove")}
            </Typography>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Typography>{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={buttonSpac}
              >
                {t("btnBack")}
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext} sx={buttonSpac}>
                {activeStep === steps.length - 1 ? t("btnFinish") : t("btnNext")}
              </Button>
              <Button
                variant="contained"
                color="default"
                onClick={disableHelpHome}
              >
                {t("btnClose")}
              </Button>
            </div>
          </Box>
        </Dialog>
      )}

      <Modal sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} open={game.meta.status === "done" && statsModalOpen}>
        <Paper sx={{ outline: 0, p: 3.5, m: 3.5, textAlign: 'center' }}>
          <Stats game={game}/>
          <Button
            sx={{ mt: 1.75, mr: 0.5 }}
            variant="contained"
            color="primary"
            onClick={toggleStatsModal}
          >
            {t("btnCloseStats")}
          </Button>
        </Paper>
      </Modal>
      <Modal sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} open={game.meta.status === "done" && !statsModalOpen}>
        <Paper sx={{ outline: 0, p: 6, textAlign: 'center' }}>
          <GameEnd
            spectating={spectating}
            userId={user.id}
            gameOrder={game.order}
            metaUsers={game.meta.users}
            winnerTeam={[80,81,82,83,88,89,90,91].every(v => (game.balls).includes(v)) ? 0 : 1}
            audioDisabled={audioDisabled}
          />
          <Button
            sx={{ mt: 1.75, mr: 0.5 }}
            variant="contained"
            color="primary"
            onClick={handlePlayAgain}
          >
            {t("btnPlayAgain")}
          </Button>
          <Button
            sx={{ mt: 1.75, mr: 0.5 }}
            variant="contained"
            color="primary"
            onClick={toggleStatsModal}
          >
            {t("btnViewStats")}
          </Button>
        </Paper>
      </Modal>

      {/* Game Area */}
      {isMobile ? (
        <Grid direction={"column"} container item xs={12} className={"gamePanel"} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxHeight: '100vh' }}>
          {/* Header,Board,Hand */}
          <DogGame
            game={game}
            spectating={spectating}
            onSubmit={makeTurn}
            user={user ? user : undefined}
            doExchange={makeExchange}
            gameId={gameId}
            helpDisabled={helpDisabled}
          />
        </Grid>
      ) : (
        <React.Fragment>
          <Grid direction={"column"} container item xs={12} sm={8} md={8} lg={9} xl={10} className={"gamePanel"} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxHeight: '100vh' }}>
            {/* Header,Board,Hand */}
            <DogGame
              game={game}
              gameState={gameState}
              spectating={spectating}
              onSubmit={makeTurn}
              user={user ? user : undefined}
              doExchange={makeExchange}
              gameId={gameId}
              helpDisabled={helpDisabled}
            />
          </Grid>
          <Grid item xs={false} sm={4} md={4} lg={3} xl={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderLeft: '1px solid lightgray' }}>
            {/* Sidebar */}
            <Sidebar 
              game={game}
              gameState={gameState}
              toggleAudio={toggleAudio}
              audioDisabled={audioDisabled}
              toggleHelp={toggleHelp}
              helpDisabled={helpDisabled}
            />
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  );
}

export default GamePage;