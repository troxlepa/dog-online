import React, ***REMOVED*** useState, useEffect ***REMOVED*** from "react";

import ***REMOVED*** makeStyles ***REMOVED*** from "@material-ui/core/styles";
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
import ***REMOVED*** Link as RouterLink, Redirect ***REMOVED*** from "react-router-dom";
import ***REMOVED*** animated, useTransition ***REMOVED*** from "react-spring";

import firebase from "../firebase";
import ***REMOVED*** initialBallLocations, makeHands ***REMOVED*** from "../util";
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

import ***REMOVED*** useTranslation ***REMOVED*** from 'react-i18next';
import ***REMOVED*** isMobile ***REMOVED*** from "react-device-detect";

const useStyles = makeStyles(***REMOVED***
  container: ***REMOVED***
    padding: 48,
    textAlign: "center"
***REMOVED***,
  playerList: ***REMOVED***
    margin: "auto",
    marginBottom: 16,
    display: "flex",
    flexDirection: "column"
***REMOVED***,
  chip: ***REMOVED***
    margin: "2px auto",
***REMOVED***,
  gameArea: ***REMOVED***
    padding: 16,
    display: "inline-block",
    margin: "16px auto"
***REMOVED***,
  rulesArea: ***REMOVED***
    padding: 16,
    margin: "10px auto",
    marginBottom:20,
    display: "block"
***REMOVED***,
  rulesList: ***REMOVED***
    margin: "auto",
    marginBottom: 16,
    display: "flex",
    textAlign:"left"
***REMOVED***,
  imageIcon: ***REMOVED***
    height: '100%'
***REMOVED***,
  imageIconParent: ***REMOVED***
    marginRight : "10px",
    lineHeight : "1em",
***REMOVED***,
  modalBox: ***REMOVED***
    outline: 0,
    padding: 28,
    textAlign: "center",
***REMOVED***,
***REMOVED***);

function RoomPage(***REMOVED*** user, gameId ***REMOVED***) ***REMOVED***
  const classes = useStyles();
  const [game, setGame] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [changeName, setChangeName] = useState(false);
  const [openMobileDialog,setMobileDialog] = useState(true);

  const ***REMOVED*** t, i18n ***REMOVED*** = useTranslation();
  const [rules, setRules] = useState(); //ca,jj,tt,tv
    

  let players = [];
  if (game && game.meta.users) ***REMOVED***
    players = Object.entries(game.meta.users).sort((a, b) => ***REMOVED***
      if (a[0] === game.meta.admin) return -1;
      if (b[0] === game.meta.admin) return 1;
      return a[0] < b[0] ? -1 : 1;
***REMOVED***);
***REMOVED***

  const transitions = useTransition(players, player => player[0], ***REMOVED***
    from: ***REMOVED*** opacity: 0 ***REMOVED***,
    enter: ***REMOVED*** opacity: 1 ***REMOVED***,
    leave: ***REMOVED*** opacity: 0 ***REMOVED***,
    config: ***REMOVED*** friction: 40 ***REMOVED***
***REMOVED***);

  /*useEffect(() => ***REMOVED***
    game !== null && game.rules !== null ? setRules(game.rules) : console.log("no game");
***REMOVED***,[game]);*/

  useEffect(() => ***REMOVED***
    function update(snapshot) ***REMOVED***
      if (snapshot.exists()) ***REMOVED***
        setGame(snapshot.val());
***REMOVED*** else ***REMOVED***
        // Initialize a new game as admin
        gameRef.set(***REMOVED***
          history: ***REMOVED******REMOVED***,
          balls: initialBallLocations(),
          hands: makeHands(6),
          round: 0,
          rules: "00011",
          nextPlayer: 1,
          numCards: 5,
          order: ***REMOVED***"0":user.id***REMOVED***,
          exchange: ***REMOVED******REMOVED***,
          rooted: "0000",
          meta: ***REMOVED***
            admin: user.id,
            created: firebase.database.ServerValue.TIMESTAMP,
            status: "waiting",
            users: ***REMOVED***[user.id]:***REMOVED***name:user.name, color:"hsl(221, 55%, 53%)"***REMOVED******REMOVED***
***REMOVED***
***REMOVED***);
***REMOVED***
***REMOVED***

    const gameRef = firebase.database().ref(`games/$***REMOVED***gameId***REMOVED***`);
    gameRef.on("value", update);
    return () => ***REMOVED***
      gameRef.off("value", update);
***REMOVED***;
***REMOVED***, [user.id, gameId]);

  // Add self to game
  useEffect(() => ***REMOVED***
    if (
      game &&
      user &&
      game.meta.admin !== user.id &&
      game.meta.status === "waiting" &&
      (!game.meta.users || !(user.id in game.meta.users))
    ) ***REMOVED***
      const order = players.length;
      const currOrder = game.order ? game.order : ***REMOVED******REMOVED***;
      currOrder[order] = user.id;
      const fieldColors = ["hsl(221, 55%, 53%)","hsl(49, 90%, 45%)","hsl(124, 53%, 38%)",  "hsl(12, 100%, 40%)"];
      firebase
        .database()
        .ref(`games/$***REMOVED***gameId***REMOVED***/meta/users/$***REMOVED***user.id***REMOVED***`)
        .set(***REMOVED*** name: user.name, color: fieldColors[order]***REMOVED***);
      firebase
        .database()
        .ref(`users/$***REMOVED***user.id***REMOVED***/games`)
        .push(gameId);
***REMOVED***
***REMOVED***, [game, gameId, user, players.length]);

  // Admin add user to order
  useEffect(() => ***REMOVED***
    if (
      game &&
      game.meta.admin == user.id &&
      user &&
      game.meta.status === "waiting" &&
      game.order &&
      Object.values(game.order).length < 4 &&
      Object.values(game.meta.users).length !== Object.values(game.order).length
    ) ***REMOVED***
      const orderLength = Object.values(game.order).length;
      const usersLength = Object.keys(game.meta.users).length;
      const currOrder = game.order;
      const fieldColors = ["hsl(221, 55%, 53%)","hsl(49, 90%, 45%)","hsl(124, 53%, 38%)",  "hsl(12, 100%, 40%)"];
      const usersNotInOrder = [];
      for(let j=0;j<usersLength;++j)***REMOVED***
        if(!Object.values(game.order).includes(Object.keys(game.meta.users)[j]))***REMOVED***
          usersNotInOrder.push(Object.keys(game.meta.users)[j]);
***REMOVED***
***REMOVED***
      for(let i=0;i<usersNotInOrder.length;i++)***REMOVED***
        currOrder[orderLength+i] = usersNotInOrder[i];
***REMOVED***
      let updates = game.meta.users;
      for(let k=0;k<usersLength;++k)***REMOVED***
        updates[currOrder[k]]["color"] = fieldColors[k];
***REMOVED***
      console.log(updates);
      firebase
        .database()
        .ref(`games/$***REMOVED***gameId***REMOVED***/meta/users/`)
        .update(updates);
      /*firebase
        .database()
        .ref(`games/$***REMOVED***gameId***REMOVED***/meta/users/$***REMOVED***user.id***REMOVED***`)
        .update(***REMOVED***color: fieldColors[order]***REMOVED***);*/
      firebase
        .database()
        .ref(`games/$***REMOVED***gameId***REMOVED***/order`)
        .set(currOrder);
***REMOVED***
***REMOVED***, [game, gameId]);

  // Redirect if game has started
  useEffect(() => ***REMOVED***
    if (
      game &&
      game.meta.status !== "waiting" &&
      game.meta.users &&
      user.id in game.meta.users
    ) ***REMOVED***
      const id = setTimeout(() => ***REMOVED***
        setRedirect(true);
***REMOVED***, 1500);
      return () => clearTimeout(id);
***REMOVED***
***REMOVED***, [game, user]);

  const handleSetRules = event => ***REMOVED***
    const newRules = encodeRules(event);
    firebase
      .database()
      .ref(`games/$***REMOVED***gameId***REMOVED***/rules/`)
      .set(newRules);
***REMOVED***;

  const encodeRules = event => ***REMOVED***
    let out = "";
    for(let i=0;i<game.rules.length;++i)***REMOVED***
      if(i === parseInt(event.target.name))***REMOVED***
        out += (event.target.checked ? "1" : "0");
***REMOVED*** else ***REMOVED***
        out += game.rules.charAt(i);
***REMOVED***
***REMOVED***
    console.log(out);
    return out;
***REMOVED***;

  function handleChangeName(name) ***REMOVED***
    setChangeName(false);
    if (name) ***REMOVED***
      const updates = ***REMOVED******REMOVED***;
      updates[`users/$***REMOVED***user.id***REMOVED***/name`] = name;
      updates[`games/$***REMOVED***gameId***REMOVED***/meta/users/$***REMOVED***user.id***REMOVED***/name`] = name;
      firebase
        .database()
        .ref()
        .update(updates);
***REMOVED***
***REMOVED***

  function startGame() ***REMOVED***
    firebase
      .database()
      .ref(`games/$***REMOVED***gameId***REMOVED***/meta`)
      .update(***REMOVED***
        status: "ingame",
        started: firebase.database.ServerValue.TIMESTAMP
***REMOVED***);
***REMOVED***

  function rotateTeams() ***REMOVED***
    const fieldColors = ["hsl(221, 55%, 53%)","hsl(49, 90%, 45%)","hsl(124, 53%, 38%)",  "hsl(12, 100%, 40%)"];
    let newUids = shuffle(game.order);
    let updates = ***REMOVED******REMOVED***;
    for(var i=0;i<4;i++)***REMOVED***
      // update color
      const newField = ***REMOVED***color: fieldColors[i], name: game.meta.users[newUids[i]].name***REMOVED***;
      updates[newUids[i]] = newField;
***REMOVED***
    // update db
    firebase
      .database()
      .ref(`games/$***REMOVED***gameId***REMOVED***/meta/users`)
      .update(updates);
    firebase
      .database()
      .ref(`games/$***REMOVED***gameId***REMOVED***/order`)
      .update(newUids);
***REMOVED***

function shuffle(sourceArray) ***REMOVED***
    for (var i = 0; i < sourceArray.length - 1; i++) ***REMOVED***
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
***REMOVED***
    return sourceArray;
***REMOVED***

function generateLog()***REMOVED***
  const logEntries = [t('log1'),t('log2'),t('log3'),t('log4')];
  return( 
    logEntries.map((val,idx) =>(
      <ListItem key=***REMOVED***idx***REMOVED***>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText
          primary=***REMOVED***val***REMOVED***
        />
      </ListItem>)));
***REMOVED***

  if (redirect) return <Redirect to=***REMOVED***`/game/$***REMOVED***gameId***REMOVED***`***REMOVED*** />;

  let starting = false;
  if (game && game.meta.status !== "waiting") ***REMOVED***
    if (game.meta.users && user.id in game.meta.users) ***REMOVED***
      starting = true;
***REMOVED*** else ***REMOVED***
      return (
        <Container className=***REMOVED***classes.container***REMOVED***>
          <Typography variant="h4" align="center" gutterBottom>
            The game has already***REMOVED***" "***REMOVED***
            ***REMOVED***game.meta.status === "ingame" ? "started" : "ended"***REMOVED***.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick=***REMOVED***() => setRedirect(true)***REMOVED***
          >
            Spectate
          </Button>
        </Container>
      );
***REMOVED***
***REMOVED***

  return (
    <Container className=***REMOVED***classes.container***REMOVED***>
           <Dialog className=***REMOVED***classes.modal***REMOVED*** open=***REMOVED***isMobile && openMobileDialog***REMOVED***>
          <Paper className=***REMOVED***classes.modalBox***REMOVED***>
            <Typography variant="h5" gutterBottom>
              ***REMOVED***t("mobileWarning")***REMOVED***
            </Typography>
              <Button
                variant="contained"
                color="primary"
                disabled=***REMOVED***false***REMOVED***
                onClick=***REMOVED***() => ***REMOVED***setMobileDialog(false);***REMOVED******REMOVED***
              >
                ***REMOVED***t("btnClose")***REMOVED***
              </Button>
          </Paper>
        </Dialog>
      <PromptDialog
        open=***REMOVED***changeName***REMOVED***
        onClose=***REMOVED***handleChangeName***REMOVED***
        title=***REMOVED***t("changeName")***REMOVED***
        message=***REMOVED***t("changeNameMsg")***REMOVED***
        label="Name"
        maxLength=***REMOVED***40***REMOVED***
      />
      <Typography variant="h4" align="center" gutterBottom>
        ***REMOVED***starting ? t("starting") : t("waitingPlayers")***REMOVED***
      </Typography>
      <Typography variant="body1" align="center">
        ***REMOVED***t("invLink")***REMOVED***:***REMOVED***" "***REMOVED***
        <Link component=***REMOVED***RouterLink***REMOVED*** to=***REMOVED***`/room/$***REMOVED***gameId***REMOVED***`***REMOVED***>
          ***REMOVED***window.location.href***REMOVED***
        </Link>
      </Typography>
      ***REMOVED***game ? (
        <React.Fragment>
        <Paper className=***REMOVED***classes.gameArea***REMOVED***>
          <div className=***REMOVED***classes.playerList***REMOVED***>
            <img alt="" style=***REMOVED******REMOVED***marginBottom:10***REMOVED******REMOVED***src=***REMOVED***svgTeams***REMOVED***/>
            ***REMOVED***transitions.map((***REMOVED*** item: [id, info], props, key ***REMOVED***) => (
              <animated.div key=***REMOVED***key***REMOVED*** style=***REMOVED***props***REMOVED***>
                <Chip
                  icon=***REMOVED***id === game.meta.admin ? <StarsIcon style=***REMOVED******REMOVED*** color:"#333" ***REMOVED******REMOVED***  /> : <FaceIcon style=***REMOVED******REMOVED*** color:"#333" ***REMOVED******REMOVED*** />***REMOVED***
                  label=***REMOVED***info.name + (id === user.id ? " ("+t("you")+")" : "")***REMOVED***
                  className=***REMOVED***classes.chip***REMOVED***
                  onDelete=***REMOVED***id === user.id ? () => setChangeName(true) : null***REMOVED***
                  deleteIcon=***REMOVED***<EditIcon style=***REMOVED******REMOVED*** color:"#111" ***REMOVED******REMOVED*** />***REMOVED***
                  style=***REMOVED******REMOVED***backgroundColor: info.color, margin: 3***REMOVED******REMOVED***
                />
              </animated.div>
            ))***REMOVED***
          </div>
          <div className=***REMOVED***classes.center***REMOVED***>

            ***REMOVED***players.length === 4 ? (
            user.id === game.meta.admin ? (
              <Button
                variant="contained"
                color="primary"
                onClick=***REMOVED***startGame***REMOVED***
                disabled=***REMOVED***starting***REMOVED***
              >
                Start
              </Button>
            ) : (
              <Button disabled>
                ***REMOVED***starting ? t("stating") : t("waitStarting")***REMOVED***
              </Button>
            )) :
            (
              <Button disabled>
                ***REMOVED***t("waiting")***REMOVED*** ***REMOVED***4-players.length***REMOVED*** ***REMOVED***4-players.length === 1 ? t("player") : t("players")***REMOVED*** ***REMOVED***t("rpJoin")***REMOVED***
              </Button>
            )***REMOVED***
            ***REMOVED***players.length === 4 ? (
              <Button
                variant="contained"
                color="primary"
                style=***REMOVED******REMOVED***margin:3***REMOVED******REMOVED***
                onClick=***REMOVED***rotateTeams***REMOVED***
                disabled=***REMOVED***user.id !== game.meta.admin***REMOVED***
              >
                ***REMOVED***t("rotTeams")***REMOVED***
              </Button>
            ) :
            (null)***REMOVED***

          </div>
        </Paper>
     ***REMOVED***/****REMOVED*** <Paper className=***REMOVED***classes.rulesArea***REMOVED***>
        <Typography variant="h5" align="left" gutterBottom>
        Known Bugs (v.1.3.0)
      </Typography>
         <Typography align="left" gutterBottom>
        ***REMOVED***t("bug1")***REMOVED***
      </Typography>
      <Typography align="left" gutterBottom>
        ***REMOVED***t("bug2")***REMOVED***
      </Typography>
      </Paper> */***REMOVED***

     ***REMOVED***/* <Paper className=***REMOVED***classes.rulesArea***REMOVED***>
        <Typography variant="h5" align="left" gutterBottom>
        ***REMOVED***t("comUp")***REMOVED***
      </Typography>
         <Typography align="left" gutterBottom>
        ***REMOVED***t("cU1")***REMOVED***
      </Typography>
      <Typography align="left" gutterBottom>
        ***REMOVED***t("cU2")***REMOVED***
      </Typography>
      </Paper>*/***REMOVED***
     ***REMOVED*** game && game.rules ? (<Paper className=***REMOVED***classes.rulesArea***REMOVED***>
      <Typography variant="h5" align="left" gutterBottom>
        ***REMOVED***t('rules')***REMOVED***
      </Typography>
        <div className=***REMOVED***classes.rulesList***REMOVED***>
          <FormGroup column="true">
          <FormControlLabel
            control=***REMOVED***
              <React.Fragment>
              <Checkbox
                checked=***REMOVED***game.rules.charAt(4) === "1"***REMOVED***
                onChange=***REMOVED***handleSetRules***REMOVED***
                name="4"
                color="primary"
                disabled=***REMOVED***user.id === game.meta.admin ? false : true***REMOVED***
              />
              <Icon title=***REMOVED***t('lastJoker')***REMOVED*** className=***REMOVED***classes.imageIconParent***REMOVED***><img className=***REMOVED***classes.imageIcon***REMOVED*** alt="" src=***REMOVED***RuleLJ***REMOVED*** /></Icon>
              </React.Fragment>
***REMOVED***
            label=***REMOVED***<React.Fragment><b>***REMOVED***t('r_lj_b')***REMOVED***</b>***REMOVED***t('r_lj')***REMOVED***</React.Fragment>***REMOVED***
          />
          <FormControlLabel
            control=***REMOVED***
              <React.Fragment>
              <Checkbox
                checked=***REMOVED***game.rules.charAt(3) === "1"***REMOVED***
                onChange=***REMOVED***handleSetRules***REMOVED***
                name="3"
                color="primary"
                disabled=***REMOVED***user.id === game.meta.admin ? false : true***REMOVED***
              />
              <Icon title=***REMOVED***t("turnVerification")***REMOVED*** className=***REMOVED***classes.imageIconParent***REMOVED***><img className=***REMOVED***classes.imageIcon***REMOVED*** alt="" src=***REMOVED***RuleTV***REMOVED*** /></Icon>
              </React.Fragment>
***REMOVED***
            label=***REMOVED***<React.Fragment><b>***REMOVED***t('r_tv_b')***REMOVED***</b>***REMOVED***t('r_tv')***REMOVED***</React.Fragment>***REMOVED***
          />
          <FormControlLabel
            control=***REMOVED***
              <React.Fragment>
              <Checkbox
                checked=***REMOVED***game.rules.charAt(0) === "1"***REMOVED***
                onChange=***REMOVED***handleSetRules***REMOVED***
                name="0"
                color="primary"
                disabled=***REMOVED***user.id === game.meta.admin ? false : true***REMOVED***
              />
              <Icon title=***REMOVED***t('canadian7')***REMOVED*** className=***REMOVED***classes.imageIconParent***REMOVED***><img className=***REMOVED***classes.imageIcon***REMOVED*** alt="" src=***REMOVED***RuleCA***REMOVED*** /></Icon>
              </React.Fragment>
***REMOVED***
            label=***REMOVED***<React.Fragment><b>***REMOVED***t('r_ca_b')***REMOVED***</b>***REMOVED***t('r_ca')***REMOVED***</React.Fragment>***REMOVED***
          />
          <FormControlLabel
            control=***REMOVED***
              <React.Fragment>
              <Checkbox
                checked=***REMOVED***game.rules.charAt(2) === "1"***REMOVED***
                onChange=***REMOVED***handleSetRules***REMOVED***
                name="2"
                color="primary"
                disabled=***REMOVED***user.id === game.meta.admin ? false : true***REMOVED***
              />
              <Icon title=***REMOVED***t('twoThief')***REMOVED*** className=***REMOVED***classes.imageIconParent***REMOVED***><img className=***REMOVED***classes.imageIcon***REMOVED*** alt="" src=***REMOVED***RuleTT***REMOVED*** /></Icon>
              </React.Fragment>
***REMOVED***
            label=***REMOVED***<React.Fragment><b>***REMOVED***t('r_tt_b')***REMOVED***</b>***REMOVED***t('r_tt')***REMOVED***</React.Fragment>***REMOVED***
          />
          <Tooltip placement="left" title=***REMOVED***user.id === game.meta.admin ? "Coming in v2.0.0" : "Only usable by admin & Coming in v2.0.0" ***REMOVED***>
          <FormControlLabel
            control=***REMOVED***
              <React.Fragment>
              <Checkbox
                checked=***REMOVED***game.rules.charAt(1) === "1"***REMOVED***
                onChange=***REMOVED***handleSetRules***REMOVED***
                name="1"
                color="primary"
                disabled=***REMOVED***true***REMOVED***
              />
              <Icon title=***REMOVED***t('jackJack')***REMOVED*** className=***REMOVED***classes.imageIconParent***REMOVED***><img className=***REMOVED***classes.imageIcon***REMOVED*** alt="" src=***REMOVED***RuleJJ***REMOVED*** /></Icon>
              </React.Fragment>
***REMOVED***
            label=***REMOVED***<React.Fragment><b>***REMOVED***t('r_jj_b')***REMOVED***</b>***REMOVED***t('r_jj')***REMOVED***</React.Fragment>***REMOVED***
          />
          </Tooltip>


          </FormGroup>
        </div>
      </Paper>):(console.log("init rules..."))***REMOVED***
      </React.Fragment>
      ) : (
        <Loading />
      )***REMOVED***
      <Paper className=***REMOVED***classes.rulesArea***REMOVED***>

      <Typography variant="h5" align="left" gutterBottom>
        ***REMOVED***t('version')***REMOVED***
      </Typography>
      <List dense>
        ***REMOVED***generateLog()***REMOVED***
      </List>
      </Paper>
</Container>
  );
***REMOVED***

export default RoomPage;
