import React, ***REMOVED*** useState ***REMOVED*** from "react";

import generate from "project-name-generator";
import ***REMOVED*** makeStyles ***REMOVED*** from "@material-ui/core/styles";
import ***REMOVED*** Redirect ***REMOVED*** from "react-router";
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

import ***REMOVED*** useTranslation ***REMOVED*** from 'react-i18next';

const useStyles = makeStyles(theme => (***REMOVED***
  container: ***REMOVED***
    padding: 40,
    height: "100%",
    textAlign: "center"
***REMOVED***,
  menu: ***REMOVED***
    padding: 12,
    display: "flex",
    flexDirection: "column",
    "& button": ***REMOVED***
      margin: 12,
      marginTop: 6,
      marginBottom: 6
***REMOVED***
    "& button:first-child": ***REMOVED***
      marginTop: 12,
      marginBottom: 12
***REMOVED***
    "& button:last-child": ***REMOVED***
      marginBottom: 12
***REMOVED***
***REMOVED***,
  warningBtn: ***REMOVED***
    color: theme.palette.warning.contrastText,
    background: theme.palette.warning.main,
    "&:hover": ***REMOVED***
      background: theme.palette.warning.dark
***REMOVED***
***REMOVED***
***REMOVED***));

function LobbyPage(***REMOVED*** user ***REMOVED***) ***REMOVED***
  const classes = useStyles();
  const [redirect, setRedirect] = useState(null);
  const [play, setPlay] = useState(false);
  const [join, setJoin] = useState(false);
  const [joinTwo, setJoinTwo] = useState(false);
  const [spectate, setSpectate] = useState(false);
  const [options, setOptions] = useState(false);
  const ***REMOVED*** t ***REMOVED*** = useTranslation();

  if (redirect) return <Redirect push to=***REMOVED***redirect***REMOVED*** />;

  function playButton() ***REMOVED***
    setPlay(true);
***REMOVED***

  function newRoom() ***REMOVED***
    setRedirect("/room/" + generate().dashed);
***REMOVED***

  function joinRoom() ***REMOVED***
    setJoin(true);
***REMOVED***

  function joinRoomTwo() ***REMOVED***
    setJoinTwo(true);
***REMOVED***

  function handleJoin(gameId) ***REMOVED***
    setJoin(false);
    if (gameId) ***REMOVED***
      setRedirect(`/room/$***REMOVED***gameId***REMOVED***`);
***REMOVED***
***REMOVED***

  function handleJoinTwo(gameId) ***REMOVED***
    setJoinTwo(false);
    if (gameId === "") newRoom();
    if (gameId) ***REMOVED***
      setRedirect(`/room/$***REMOVED***gameId***REMOVED***`);
***REMOVED***
***REMOVED***

  function spectateGame() ***REMOVED***
    setSpectate(true);
***REMOVED***

  function handleSpectate(gameId) ***REMOVED***
    setSpectate(false);
    if (gameId) ***REMOVED***
      setRedirect(`/game/$***REMOVED***gameId***REMOVED***`);
***REMOVED***
***REMOVED***

  function optionsButton() ***REMOVED***
    setOptions(true);
***REMOVED***

  function handleReset() ***REMOVED***
    setOptions(false);
    firebase.auth().currentUser.delete();
***REMOVED***

  return (
    <Container className=***REMOVED***classes.container***REMOVED***>
      <Dialog open=***REMOVED***play***REMOVED*** onClose=***REMOVED***() => setPlay(false)***REMOVED***>
        <DialogTitle>***REMOVED***t("playDog")***REMOVED***</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ***REMOVED***t("beginDialog")***REMOVED***
          </DialogContentText>
          <DialogActions>
            <Button
              onClick=***REMOVED***() => ***REMOVED***
                setPlay(false);
                newRoom();
  ***REMOVED******REMOVED***
              variant="contained"
              color="primary"
            >
              ***REMOVED***t("newRoom")***REMOVED***
            </Button>
            <Button
              onClick=***REMOVED***() => ***REMOVED***
                setPlay(false);
                joinRoom();
  ***REMOVED******REMOVED***
              variant="contained"
              color="primary"
            >
              ***REMOVED***t("joinRoom")***REMOVED***
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <PromptDialog
        open=***REMOVED***join***REMOVED***
        onClose=***REMOVED***handleJoin***REMOVED***
        title=***REMOVED***t("joinRoom")***REMOVED***
        message=***REMOVED***t("joinRoomText")***REMOVED***
        label=***REMOVED***t("roomId")***REMOVED***
      />
      <PromptDialog
        open=***REMOVED***joinTwo***REMOVED***
        onClose=***REMOVED***handleJoinTwo***REMOVED***
        title=***REMOVED***t("newRoom")***REMOVED***
        message=***REMOVED***t("newRoomText")***REMOVED***
        label=***REMOVED***t("roomId")***REMOVED***
      />
      <PromptDialog
        open=***REMOVED***spectate***REMOVED***
        onClose=***REMOVED***handleSpectate***REMOVED***
        title=***REMOVED***t("spectate")***REMOVED***
        message=***REMOVED***t("specText")***REMOVED***
        label=***REMOVED***t("roomId")***REMOVED***
      />
      <Dialog open=***REMOVED***options***REMOVED*** onClose=***REMOVED***() => setOptions(false)***REMOVED***>
        <DialogTitle>Options</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ***REMOVED***t("resetDataText")***REMOVED***
          </DialogContentText>
          <DialogActions>
            <Button className=***REMOVED***classes.warningBtn***REMOVED*** onClick=***REMOVED***handleReset***REMOVED***>
              ***REMOVED***t("resetData")***REMOVED***
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Typography variant="h3" component="h2" gutterBottom>
        Dog At Home
      </Typography>
      <Grid container spacing=***REMOVED***3***REMOVED***>
        <Grid item xs=***REMOVED***1***REMOVED*** sm=***REMOVED***4***REMOVED***>
          ***REMOVED***/* empty */***REMOVED***
        
        </Grid>
        <Grid item xs=***REMOVED***10***REMOVED*** sm=***REMOVED***4***REMOVED***>
          <Card elevation=***REMOVED***2***REMOVED*** className=***REMOVED***classes.menu***REMOVED***>
            <Button onClick=***REMOVED***playButton***REMOVED*** variant="contained" color="primary">
              ***REMOVED***t("lpPlay")***REMOVED***
            </Button>
            <Button onClick=***REMOVED***joinRoomTwo***REMOVED*** variant="contained">
              ***REMOVED***t("newRoom")***REMOVED***
            </Button>
            <Button onClick=***REMOVED***joinRoom***REMOVED*** variant="contained">
              ***REMOVED***t("joinRoomId")***REMOVED***
            </Button>
            <Tooltip title="Coming in v2.0.0">
              <div style=***REMOVED******REMOVED***marginRight:"24px"***REMOVED******REMOVED***>
                <Button style=***REMOVED******REMOVED***width:"100%", maxWidth:"100%"***REMOVED******REMOVED*** onClick=***REMOVED***spectateGame***REMOVED*** variant="contained">
                  ***REMOVED***t("spectate")***REMOVED***
                </Button>
              </div>
            </Tooltip>
            <Button onClick=***REMOVED***optionsButton***REMOVED*** variant="contained">
              ***REMOVED***t("options")***REMOVED***
            </Button>
          </Card>
        </Grid>***REMOVED***/*
        <Grid item xs=***REMOVED***3***REMOVED***>
          <Card className=***REMOVED***classes.menu***REMOVED***>
            <Typography variant="h6" gutterBottom>
              Statistics
            </Typography>
            <Typography variant="body1">Games played: ***REMOVED***stats[0]***REMOVED***</Typography>
            <Typography variant="body1">Games won: ***REMOVED***stats[1]***REMOVED***</Typography>
            <Typography variant="body1">Total sets: ***REMOVED***stats[2]***REMOVED***</Typography>
            <Typography variant="body1">
              Avg. sets per game:***REMOVED***" "***REMOVED***
              ***REMOVED***stats[0] ? (stats[2] / stats[0]).toFixed(2) : "N/A"***REMOVED***
            </Typography>
          </Card>
        </Grid>*/***REMOVED***
        <Grid item xs=***REMOVED***1***REMOVED*** sm=***REMOVED***1***REMOVED***>
          ***REMOVED***/* empty */***REMOVED***
        </Grid>
      </Grid>
    </Container>
  );
***REMOVED***

export default LobbyPage;
