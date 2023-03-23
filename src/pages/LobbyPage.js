import React, { useState } from "react";

import generate from "project-name-generator";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

import PromptDialog from "../components/PromptDialog";
import firebase from "../firebase";
import Tooltip from '@material-ui/core/Tooltip';

import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  container: {
    padding: 40,
    height: "100%",
    textAlign: "center"
  },
  menu: {
    padding: 12,
    display: "flex",
    flexDirection: "column",
    "& button": {
      margin: 12,
      marginTop: 6,
      marginBottom: 6
    },
    "& button:first-child": {
      marginTop: 12,
      marginBottom: 12
    },
    "& button:last-child": {
      marginBottom: 12
    }
  },
  warningBtn: {
    color: theme.palette.warning.contrastText,
    background: theme.palette.warning.main,
    "&:hover": {
      background: theme.palette.warning.dark
    }
  }
}));

function LobbyPage({ user }) {
  const classes = useStyles();
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
    setRedirect("/room/" + generate().dashed);
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
    <Container className={classes.container}>
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
            <Button className={classes.warningBtn} onClick={handleReset}>
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
          <Card elevation={2} className={classes.menu}>
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
