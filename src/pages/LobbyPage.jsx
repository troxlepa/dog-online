import React, { useState } from "react";

//import generate from "project-name-generator";
import Box from "@mui/material/Box";
import { Redirect } from "react-router";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

import PromptDialog from "../components/PromptDialog";
import firebase from "../firebase";
import Tooltip from '@mui/material/Tooltip';

import { useTranslation } from 'react-i18next';

const warningSx = (theme) => ({
  color: theme.palette.warning.contrastText,
  backgroundColor: theme.palette.warning.main,
  '&:hover': { backgroundColor: theme.palette.warning.dark }
});

function LobbyPage({ user }) {
  const [redirect, setRedirect] = useState(null);
  const [play, setPlay] = useState(false);
  const [join, setJoin] = useState(false);
  const [joinTwo, setJoinTwo] = useState(false);
  const [spectate, setSpectate] = useState(false);
  const [options, setOptions] = useState(false);
  const { t } = useTranslation();

  if (redirect) return <Redirect push to={redirect} />;

  function playButton() {
    setPlay(true);
  }

  function newRoom() {
    setRedirect("/room/" + generate().dashed); // TODO: random name of room
  }

  function joinRoom() {
    setJoin(true);
  }

  function joinRoomTwo() {
    setJoinTwo(true);
  }

  function handleJoin(gameId) {
    setJoin(false);
    if (gameId) {
      setRedirect(`/room/${gameId}`);
    }
  }

  function handleJoinTwo(gameId) {
    setJoinTwo(false);
    if (gameId === "") newRoom();
    if (gameId) {
      setRedirect(`/room/${gameId}`);
    }
  }

  function spectateGame() {
    setSpectate(true);
  }

  function handleSpectate(gameId) {
    setSpectate(false);
    if (gameId) {
      setRedirect(`/game/${gameId}`);
    }
  }

  function optionsButton() {
    setOptions(true);
  }

  function handleReset() {
    setOptions(false);
    firebase.auth().currentUser.delete();
  }

  return (
    <Container sx={{ p: 5, height: '100%', textAlign: 'center' }}>
      <Dialog open={play} onClose={() => setPlay(false)}>
        <DialogTitle>{t("playDog")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("beginDialog")}
          </DialogContentText>
          <DialogActions>
            <Button
              onClick={() => {
                setPlay(false);
                newRoom();
              }}
              variant="contained"
              color="primary"
            >
              {t("newRoom")}
            </Button>
            <Button
              onClick={() => {
                setPlay(false);
                joinRoom();
              }}
              variant="contained"
              color="primary"
            >
              {t("joinRoom")}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <PromptDialog
        open={join}
        onClose={handleJoin}
        title={t("joinRoom")}
        message={t("joinRoomText")}
        label={t("roomId")}
      />
      <PromptDialog
        open={joinTwo}
        onClose={handleJoinTwo}
        title={t("newRoom")}
        message={t("newRoomText")}
        label={t("roomId")}
      />
      <PromptDialog
        open={spectate}
        onClose={handleSpectate}
        title={t("spectate")}
        message={t("specText")}
        label={t("roomId")}
      />
      <Dialog open={options} onClose={() => setOptions(false)}>
        <DialogTitle>Options</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("resetDataText")}
          </DialogContentText>
          <DialogActions>
            <Button sx={warningSx} onClick={handleReset}>
              {t("resetData")}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Typography variant="h3" component="h2" gutterBottom>
        Dog At Home
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={1} sm={4}>
          {/* empty */}
        
        </Grid>
        <Grid item xs={10} sm={4}>
          <Card elevation={2} sx={{ p: 1.5, display: 'flex', flexDirection: 'column',
            '& button': { m: 1.5, mt: 0.75, mb: 0.75 }, '& button:first-child': { mt: 1.5, mb: 1.5 }, '& button:last-child': { mb: 1.5 } }}>
            <Button onClick={playButton} variant="contained" color="primary">
              {t("lpPlay")}
            </Button>
            <Button onClick={joinRoomTwo} variant="contained">
              {t("newRoom")}
            </Button>
            <Button onClick={joinRoom} variant="contained">
              {t("joinRoomId")}
            </Button>
            <Tooltip title="Coming in v2.0.0">
              <div style={{marginRight:"24px"}}>
                <Button style={{width:"100%", maxWidth:"100%"}} onClick={spectateGame} variant="contained">
                  {t("spectate")}
                </Button>
              </div>
            </Tooltip>
            <Button onClick={optionsButton} variant="contained">
              {t("options")}
            </Button>
          </Card>
        </Grid>{/*
        <Grid item xs={3}>
          <Card className={classes.menu}>
            <Typography variant="h6" gutterBottom>
              Statistics
            </Typography>
            <Typography variant="body1">Games played: {stats[0]}</Typography>
            <Typography variant="body1">Games won: {stats[1]}</Typography>
            <Typography variant="body1">Total sets: {stats[2]}</Typography>
            <Typography variant="body1">
              Avg. sets per game:{" "}
              {stats[0] ? (stats[2] / stats[0]).toFixed(2) : "N/A"}
            </Typography>
          </Card>
        </Grid>*/}
        <Grid item xs={1} sm={1}>
          {/* empty */}
        </Grid>
      </Grid>
    </Container>
  );
}

export default LobbyPage;
