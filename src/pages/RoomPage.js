import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from "@material-ui/core/Dialog";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import FaceIcon from "@material-ui/icons/Face";
import StarsIcon from "@material-ui/icons/Stars";
import EditIcon from "@material-ui/icons/Edit";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { animated, useTransition } from "react-spring";

import firebase from "../firebase";
import { initialBallLocations, makeHands } from "../util";
import Loading from "../components/Loading";
import Chat from "../components/Chat";
import PromptDialog from "../components/PromptDialog";
import svgTeams from "../assets/teams.svg";
import Tooltip from '@material-ui/core/Tooltip';
import RuleCA from "../assets/rules-02.svg";
import RuleTV from "../assets/rules-03.svg";
import RuleTT from "../assets/rules-04.svg";
import RuleJJ from "../assets/rules-05.svg";
import RuleLJ from "../assets/rules-06.svg";
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { useTranslation } from 'react-i18next';
import { isMobile } from "react-device-detect";

const useStyles = makeStyles({
  container: {
    padding: 48,
    textAlign: "center"
  },
  playerList: {
    margin: "auto",
    marginBottom: 16,
    display: "flex",
    flexDirection: "column"
  },
  chip: {
    margin: "2px auto",
  },
  gameArea: {
    padding: 16,
    display: "inline-block",
    margin: "16px auto"
  },
  rulesArea: {
    padding: 16,
    margin: "10px auto",
    marginBottom:20,
    display: "block"
  },
  rulesList: {
    margin: "auto",
    marginBottom: 16,
    display: "flex",
    textAlign:"left"
  },
  imageIcon: {
    height: '100%'
  },
  imageIconParent: {
    marginRight : "10px",
    lineHeight : "1em",
  },
  modalBox: {
    outline: 0,
    padding: 28,
    textAlign: "center",
  },
});

function RoomPage({ user, gameId }) {
  const classes = useStyles();
  const [game, setGame] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [changeName, setChangeName] = useState(false);
  const [openMobileDialog,setMobileDialog] = useState(true);

  const { t, i18n } = useTranslation();
  const [rules, setRules] = useState(); //ca,jj,tt,tv
    

  let players = [];
  if (game && game.meta.users) {
    players = Object.entries(game.meta.users).sort((a, b) => {
      if (a[0] === game.meta.admin) return -1;
      if (b[0] === game.meta.admin) return 1;
      return a[0] < b[0] ? -1 : 1;
    });
  }

  const transitions = useTransition(players, player => player[0], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { friction: 40 }
  });

  /*useEffect(() => {
    game !== null && game.rules !== null ? setRules(game.rules) : console.log("no game");
  },[game]);*/

  useEffect(() => {
    function update(snapshot) {
      if (snapshot.exists()) {
        setGame(snapshot.val());
      } else {
        // Initialize a new game as admin
        gameRef.set({
          history: {},
          balls: initialBallLocations(),
          hands: makeHands(6),
          round: 0,
          rules: "00011",
          nextPlayer: 1,
          numCards: 5,
          order: {"0":user.id},
          exchange: {},
          rooted: "0000",
          meta: {
            admin: user.id,
            created: firebase.database.ServerValue.TIMESTAMP,
            status: "waiting",
            users: {[user.id]:{name:user.name, color:"hsl(221, 55%, 53%)"}}
          }
        });
      }
    }

    const gameRef = firebase.database().ref(`games/${gameId}`);
    gameRef.on("value", update);
    return () => {
      gameRef.off("value", update);
    };
  }, [user.id, gameId]);

  // Add self to game
  useEffect(() => {
    if (
      game &&
      user &&
      game.meta.admin !== user.id &&
      game.meta.status === "waiting" &&
      (!game.meta.users || !(user.id in game.meta.users))
    ) {
      const order = players.length;
      const currOrder = game.order ? game.order : {};
      currOrder[order] = user.id;
      const fieldColors = ["hsl(221, 55%, 53%)","hsl(49, 90%, 45%)","hsl(124, 53%, 38%)",  "hsl(12, 100%, 40%)"];
      firebase
        .database()
        .ref(`games/${gameId}/meta/users/${user.id}`)
        .set({ name: user.name, color: fieldColors[order]});
      firebase
        .database()
        .ref(`users/${user.id}/games`)
        .push(gameId);
    }
  }, [game, gameId, user, players.length]);

  // Admin add user to order
  useEffect(() => {
    if (
      game &&
      game.meta.admin == user.id &&
      user &&
      game.meta.status === "waiting" &&
      game.order &&
      Object.values(game.order).length < 4 &&
      Object.values(game.meta.users).length !== Object.values(game.order).length
    ) {
      const orderLength = Object.values(game.order).length;
      const usersLength = Object.keys(game.meta.users).length;
      const currOrder = game.order;
      const fieldColors = ["hsl(221, 55%, 53%)","hsl(49, 90%, 45%)","hsl(124, 53%, 38%)",  "hsl(12, 100%, 40%)"];
      const usersNotInOrder = [];
      for(let j=0;j<usersLength;++j){
        if(!Object.values(game.order).includes(Object.keys(game.meta.users)[j])){
          usersNotInOrder.push(Object.keys(game.meta.users)[j]);
        }
      }
      for(let i=0;i<usersNotInOrder.length;i++){
        currOrder[orderLength+i] = usersNotInOrder[i];
      }
      let updates = game.meta.users;
      for(let k=0;k<usersLength;++k){
        updates[currOrder[k]]["color"] = fieldColors[k];
      }
      console.log(updates);
      firebase
        .database()
        .ref(`games/${gameId}/meta/users/`)
        .update(updates);
      /*firebase
        .database()
        .ref(`games/${gameId}/meta/users/${user.id}`)
        .update({color: fieldColors[order]});*/
      firebase
        .database()
        .ref(`games/${gameId}/order`)
        .set(currOrder);
    }
  }, [game, gameId]);

  // Redirect if game has started
  useEffect(() => {
    if (
      game &&
      game.meta.status !== "waiting" &&
      game.meta.users &&
      user.id in game.meta.users
    ) {
      const id = setTimeout(() => {
        setRedirect(true);
      }, 1500);
      return () => clearTimeout(id);
    }
  }, [game, user]);

  const handleSetRules = event => {
    const newRules = encodeRules(event);
    firebase
      .database()
      .ref(`games/${gameId}/rules/`)
      .set(newRules);
  };

  const encodeRules = event => {
    let out = "";
    for(let i=0;i<game.rules.length;++i){
      if(i === parseInt(event.target.name)){
        out += (event.target.checked ? "1" : "0");
      } else {
        out += game.rules.charAt(i);
      }
    }
    console.log(out);
    return out;
  };

  function handleChangeName(name) {
    setChangeName(false);
    if (name) {
      const updates = {};
      updates[`users/${user.id}/name`] = name;
      updates[`games/${gameId}/meta/users/${user.id}/name`] = name;
      firebase
        .database()
        .ref()
        .update(updates);
    }
  }

  function startGame() {
    firebase
      .database()
      .ref(`games/${gameId}/meta`)
      .update({
        status: "ingame",
        started: firebase.database.ServerValue.TIMESTAMP
      });
  }

  function rotateTeams() {
    const fieldColors = ["hsl(221, 55%, 53%)","hsl(49, 90%, 45%)","hsl(124, 53%, 38%)",  "hsl(12, 100%, 40%)"];
    let newUids = shuffle(game.order);
    let updates = {};
    for(var i=0;i<4;i++){
      // update color
      const newField = {color: fieldColors[i], name: game.meta.users[newUids[i]].name};
      updates[newUids[i]] = newField;
    }
    // update db
    firebase
      .database()
      .ref(`games/${gameId}/meta/users`)
      .update(updates);
    firebase
      .database()
      .ref(`games/${gameId}/order`)
      .update(newUids);
  }

function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}

function generateLog(){
  const logEntries = [t('log1'),t('log2'),t('log3'),t('log4')];
  return( 
    logEntries.map((val,idx) =>(
      <ListItem key={idx}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText
          primary={val}
        />
      </ListItem>)));
}

  if (redirect) return <Redirect to={`/game/${gameId}`} />;

  let starting = false;
  if (game && game.meta.status !== "waiting") {
    if (game.meta.users && user.id in game.meta.users) {
      starting = true;
    } else {
      return (
        <Container className={classes.container}>
          <Typography variant="h4" align="center" gutterBottom>
            The game has already{" "}
            {game.meta.status === "ingame" ? "started" : "ended"}.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setRedirect(true)}
          >
            Spectate
          </Button>
        </Container>
      );
    }
  }

  return (
    <Container className={classes.container}>
           <Dialog className={classes.modal} open={isMobile && openMobileDialog}>
          <Paper className={classes.modalBox}>
            <Typography variant="h5" gutterBottom>
              {t("mobileWarning")}
            </Typography>
              <Button
                variant="contained"
                color="primary"
                disabled={false}
                onClick={() => {setMobileDialog(false);}}
              >
                {t("btnClose")}
              </Button>
          </Paper>
        </Dialog>
      <PromptDialog
        open={changeName}
        onClose={handleChangeName}
        title={t("changeName")}
        message={t("changeNameMsg")}
        label="Name"
        maxLength={40}
      />
      <Typography variant="h4" align="center" gutterBottom>
        {starting ? t("starting") : t("waitingPlayers")}
      </Typography>
      <Typography variant="body1" align="center">
        {t("invLink")}:{" "}
        <Link component={RouterLink} to={`/room/${gameId}`}>
          {window.location.href}
        </Link>
      </Typography>
      {game ? (
        <React.Fragment>
        <Paper className={classes.gameArea}>
          <div className={classes.playerList}>
            <img alt="" style={{marginBottom:10}}src={svgTeams}/>
            {transitions.map(({ item: [id, info], props, key }) => (
              <animated.div key={key} style={props}>
                <Chip
                  icon={id === game.meta.admin ? <StarsIcon style={{ color:"#333" }}  /> : <FaceIcon style={{ color:"#333" }} />}
                  label={info.name + (id === user.id ? " ("+t("you")+")" : "")}
                  className={classes.chip}
                  onDelete={id === user.id ? () => setChangeName(true) : null}
                  deleteIcon={<EditIcon style={{ color:"#111" }} />}
                  style={{backgroundColor: info.color, margin: 3}}
                />
              </animated.div>
            ))}
          </div>
          <div className={classes.center}>

            {players.length === 4 ? (
            user.id === game.meta.admin ? (
              <Button
                variant="contained"
                color="primary"
                onClick={startGame}
                disabled={starting}
              >
                Start
              </Button>
            ) : (
              <Button disabled>
                {starting ? t("stating") : t("waitStarting")}
              </Button>
            )) :
            (
              <Button disabled>
                {t("waiting")} {4-players.length} {4-players.length === 1 ? t("player") : t("players")} {t("rpJoin")}
              </Button>
            )}
            {players.length === 4 ? (
              <Button
                variant="contained"
                color="primary"
                style={{margin:3}}
                onClick={rotateTeams}
                disabled={user.id !== game.meta.admin}
              >
                {t("rotTeams")}
              </Button>
            ) :
            (null)}

          </div>
        </Paper>
     {/*} <Paper className={classes.rulesArea}>
        <Typography variant="h5" align="left" gutterBottom>
        Known Bugs (v.1.3.0)
      </Typography>
         <Typography align="left" gutterBottom>
        {t("bug1")}
      </Typography>
      <Typography align="left" gutterBottom>
        {t("bug2")}
      </Typography>
      </Paper> */}

     {/* <Paper className={classes.rulesArea}>
        <Typography variant="h5" align="left" gutterBottom>
        {t("comUp")}
      </Typography>
         <Typography align="left" gutterBottom>
        {t("cU1")}
      </Typography>
      <Typography align="left" gutterBottom>
        {t("cU2")}
      </Typography>
      </Paper>*/}
     { game && game.rules ? (<Paper className={classes.rulesArea}>
      <Typography variant="h5" align="left" gutterBottom>
        {t('rules')}
      </Typography>
        <div className={classes.rulesList}>
          <FormGroup column="true">
          <FormControlLabel
            control={
              <React.Fragment>
              <Checkbox
                checked={game.rules.charAt(4) === "1"}
                onChange={handleSetRules}
                name="4"
                color="primary"
                disabled={user.id === game.meta.admin ? false : true}
              />
              <Icon title={t('lastJoker')} className={classes.imageIconParent}><img className={classes.imageIcon} alt="" src={RuleLJ} /></Icon>
              </React.Fragment>
            }
            label={<React.Fragment><b>{t('r_lj_b')}</b>{t('r_lj')}</React.Fragment>}
          />
          <FormControlLabel
            control={
              <React.Fragment>
              <Checkbox
                checked={game.rules.charAt(3) === "1"}
                onChange={handleSetRules}
                name="3"
                color="primary"
                disabled={user.id === game.meta.admin ? false : true}
              />
              <Icon title={t("turnVerification")} className={classes.imageIconParent}><img className={classes.imageIcon} alt="" src={RuleTV} /></Icon>
              </React.Fragment>
            }
            label={<React.Fragment><b>{t('r_tv_b')}</b>{t('r_tv')}</React.Fragment>}
          />
          <FormControlLabel
            control={
              <React.Fragment>
              <Checkbox
                checked={game.rules.charAt(0) === "1"}
                onChange={handleSetRules}
                name="0"
                color="primary"
                disabled={user.id === game.meta.admin ? false : true}
              />
              <Icon title={t('canadian7')} className={classes.imageIconParent}><img className={classes.imageIcon} alt="" src={RuleCA} /></Icon>
              </React.Fragment>
            }
            label={<React.Fragment><b>{t('r_ca_b')}</b>{t('r_ca')}</React.Fragment>}
          />
          <FormControlLabel
            control={
              <React.Fragment>
              <Checkbox
                checked={game.rules.charAt(2) === "1"}
                onChange={handleSetRules}
                name="2"
                color="primary"
                disabled={user.id === game.meta.admin ? false : true}
              />
              <Icon title={t('twoThief')} className={classes.imageIconParent}><img className={classes.imageIcon} alt="" src={RuleTT} /></Icon>
              </React.Fragment>
            }
            label={<React.Fragment><b>{t('r_tt_b')}</b>{t('r_tt')}</React.Fragment>}
          />
          <Tooltip placement="left" title={user.id === game.meta.admin ? "Coming in v2.0.0" : "Only usable by admin & Coming in v2.0.0" }>
          <FormControlLabel
            control={
              <React.Fragment>
              <Checkbox
                checked={game.rules.charAt(1) === "1"}
                onChange={handleSetRules}
                name="1"
                color="primary"
                disabled={true}
              />
              <Icon title={t('jackJack')} className={classes.imageIconParent}><img className={classes.imageIcon} alt="" src={RuleJJ} /></Icon>
              </React.Fragment>
            }
            label={<React.Fragment><b>{t('r_jj_b')}</b>{t('r_jj')}</React.Fragment>}
          />
          </Tooltip>


          </FormGroup>
        </div>
      </Paper>):(console.log("init rules..."))}
      </React.Fragment>
      ) : (
        <Loading />
      )}
      <Paper className={classes.rulesArea}>

      <Typography variant="h5" align="left" gutterBottom>
        {t('version')}
      </Typography>
      <List dense>
        {generateLog()}
      </List>
      </Paper>
</Container>
  );
}

export default RoomPage;
