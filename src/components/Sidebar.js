import React, ***REMOVED*** useEffect, useRef ***REMOVED*** from "react";

import ***REMOVED*** useTranslation ***REMOVED*** from 'react-i18next';

import ***REMOVED*** makeStyles ***REMOVED*** from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import TranslateIcon from '@material-ui/icons/Translate';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import PanToolIcon from '@material-ui/icons/PanTool';

import ***REMOVED*** trim ***REMOVED*** from "../util.js";
import autoscroll from "../utils/autoscroll";
import CardIcon from "../assets/card_icon.svg";
import RuleCA from "../assets/rule_icons/rules-02.svg";
import RuleTV from "../assets/rule_icons/rules-03.svg";
import RuleTT from "../assets/rule_icons/rules-04.svg";
import RuleJJ from "../assets/rule_icons/rules-05.svg";
import RuleLJ from "../assets/rule_icons/rules-06.svg";

import ColorSquare from "./ColorSquare";
import JassCard from "./JassCard";

const useStyles = makeStyles(***REMOVED***
  panel: ***REMOVED***
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
***REMOVED***,
  panelTitle: ***REMOVED***
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    textAlign: "center",
    flexShrink: 0
***REMOVED***,
  panelList: ***REMOVED***
    flexGrow: 1,
    overflowY: "auto",
***REMOVED***,
  textOverflow: ***REMOVED***
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden"
***REMOVED***,
  logText:***REMOVED***
    marginLeft: "10px"
***REMOVED***,
  infoText: ***REMOVED***
    fontWeight: "bold",
    marginLeft: "10px"  
***REMOVED***,
  logName: ***REMOVED***
    fontWeight: "bold"
***REMOVED***,
  historyTimeIcon: ***REMOVED***
    marginRight: 12,
    "& span": ***REMOVED***
      margin: "0 auto"
***REMOVED***
***REMOVED***,
  inactive: ***REMOVED***
    opacity: 0.4
***REMOVED***,
  even : ***REMOVED***
    backgroundColor: "#ddd",
***REMOVED***,
  imageIcon: ***REMOVED***
    height: '100%'
***REMOVED***,
  iconRoot: ***REMOVED***
    textAlign: 'center'
***REMOVED***,
  largeIcon: ***REMOVED***
    width: 30,
    height: 30,
    margin:3
***REMOVED***,
  handIcon:***REMOVED***
    fontSize:"1.5em",
    margin:1
***REMOVED***,
  cardIcon:***REMOVED***
    width:"1rem",
    height:"1rem",
    position:"relative",
    top:".125rem"
***REMOVED***
***REMOVED***);



function Sidebar(***REMOVED*** game, gameState, toggleAudio, audioDisabled, toggleHelp, helpDisabled***REMOVED***) ***REMOVED***
  const classes = useStyles();
  const logEl = useRef(null);
  const lightColors = ["rgba(69, 111, 201, .1)","rgba(218, 180, 11, .1)","rgba(46, 148, 52, .1)",  "rgba(204, 41, 0, .1)"];
  const playerColors = ["rgba(69, 111, 201)","rgba(218, 180, 11)","rgba(46, 148, 52)",  "rgba(204, 41, 0)"];
  const ***REMOVED*** t, i18n ***REMOVED*** = useTranslation();

  useEffect(() => ***REMOVED***
    return autoscroll(logEl.current);
***REMOVED***, []);

  const changeLanguage = (lng) => ***REMOVED***
    i18n.changeLanguage(lng);
***REMOVED***;
  const getLanguage = () => (i18n.language || window.localStorage.i18nextLng);

  function displayRule(key)***REMOVED***
    if(key > 4) return;
    let titles = [t('canadian7'),t('jackJack'),t('twoThief'),t('turnVerification'),t('lastJoker')];
    let title = titles[key];
    return(
      <Icon className=***REMOVED***classes.largeIcon***REMOVED*** key=***REMOVED***key***REMOVED*** title=***REMOVED***title***REMOVED*** classes=***REMOVED******REMOVED***root: classes.iconRoot***REMOVED******REMOVED***>***REMOVED***getRuleIcon(key)***REMOVED***</Icon>
    );

***REMOVED***
  function getRuleIcon(key)***REMOVED***
    switch(key)***REMOVED***
    case 0:
      return <img className=***REMOVED***classes.imageIcon***REMOVED*** alt="" src=***REMOVED***RuleCA***REMOVED*** />;
    case 1:
      return <img className=***REMOVED***classes.imageIcon***REMOVED*** alt="" src=***REMOVED***RuleJJ***REMOVED*** />;
    case 2:
      return <img className=***REMOVED***classes.imageIcon***REMOVED*** alt="" src=***REMOVED***RuleTT***REMOVED*** />;
    case 3:
      return <img className=***REMOVED***classes.imageIcon***REMOVED*** alt="" src=***REMOVED***RuleTV***REMOVED*** />;
    case 4:
      return <img className=***REMOVED***classes.imageIcon***REMOVED*** alt="" src=***REMOVED***RuleLJ***REMOVED*** />;
    default:
      return;
***REMOVED***
***REMOVED***

  return (
    <>
      <Box maxHeight="20%" flexShrink=***REMOVED***0***REMOVED*** className=***REMOVED***classes.panel***REMOVED***>
        ***REMOVED***/* Settings */***REMOVED***
        <List disablePadding dense className=***REMOVED***classes.panelList***REMOVED***>
          <ListItem>
            <IconButton title="Audio" color="primary" aria-label="volume on off" component="span" onClick=***REMOVED***toggleAudio***REMOVED***>
              ***REMOVED***audioDisabled ? <VolumeOffIcon color="disabled" /> : <VolumeUpIcon/>***REMOVED***
            </IconButton>
            ***REMOVED***<IconButton title=***REMOVED***t('fpHelp')***REMOVED*** color="primary" aria-label="help on off" component="span" onClick=***REMOVED***toggleHelp***REMOVED***>
              ***REMOVED***(!helpDisabled.seven && !helpDisabled.home) ? <HelpOutlineIcon color="disabled" /> : <HelpOutlineIcon /> ***REMOVED***
            </IconButton>***REMOVED***
            <IconButton title=***REMOVED***t('langSwitch')***REMOVED*** color="primary" aria-label="volume on off" component="span" onClick=***REMOVED***() => changeLanguage(getLanguage() === "de" ? "en" : "de")***REMOVED***>
              <TranslateIcon/>
            </IconButton> ***REMOVED***getLanguage() === "de" ? "DE" : "EN"***REMOVED***
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box maxHeight="20%" flexShrink=***REMOVED***0***REMOVED*** className=***REMOVED***classes.panel***REMOVED***>
        ***REMOVED***/* Next Round Info */***REMOVED***
        <Typography variant="h6" className=***REMOVED***classes.panelTitle***REMOVED***>
          Info
        </Typography>
        <List disablePadding dense className=***REMOVED***classes.panelList***REMOVED***>

          <ListItem>                
            <ListItemText className=***REMOVED***classes.textOverflow***REMOVED***>
                # ***REMOVED***t("cardsNextRound")***REMOVED***: 
              <span className=***REMOVED***classes.infoText***REMOVED***>
                ***REMOVED***game.numCards***REMOVED***
              </span>
              <ListItemText className=***REMOVED***classes.textOverflow***REMOVED***>
                
                ***REMOVED***t("playerToStartNext")***REMOVED***: 
                <span className=***REMOVED***classes.infoText***REMOVED***>
                  ***REMOVED***game.meta.users[game.order[game.nextPlayer]].name***REMOVED***
                </span>
                ***REMOVED***game.rooted &&
                  <ListItemText className=***REMOVED***classes.textOverflow***REMOVED***>
                    ***REMOVED***t("blocking")***REMOVED***:
                    <span className=***REMOVED***classes.infoText***REMOVED***>
                      ***REMOVED***[...game.rooted].map((val,idx) => (val==="1" && <PanToolIcon className=***REMOVED***classes.handIcon***REMOVED*** style=***REMOVED******REMOVED***fill:playerColors[idx]***REMOVED******REMOVED*** key=***REMOVED***idx***REMOVED***/>))***REMOVED***
                    </span> 
                  </ListItemText>
    ***REMOVED***
              </ListItemText>
            </ListItemText>
          </ListItem>
        </List>
      </Box>
      <Divider />
      ***REMOVED***game.rules && 
        <Box maxHeight="20%" flexShrink=***REMOVED***0***REMOVED*** className=***REMOVED***classes.panel***REMOVED***>
          ***REMOVED***/* Scoreboard */***REMOVED***
          <Typography variant="h6" className=***REMOVED***classes.panelTitle***REMOVED***>
            ***REMOVED***t("activeRules")***REMOVED***
          </Typography>
          <List disablePadding dense className=***REMOVED***classes.panelList***REMOVED***>
            <ListItem>
              ***REMOVED***[0,1,2,3,4].map((key) => ***REMOVED***
                if(game.rules.charAt(key) === '1') return displayRule(key);
                return '';
  ***REMOVED***)***REMOVED***
            </ListItem>
          </List>
        </Box>
***REMOVED***
      <Divider />
      <Box maxHeight="40%" flexShrink=***REMOVED***0***REMOVED*** className=***REMOVED***classes.panel***REMOVED***>
        ***REMOVED***/* Turn */***REMOVED***
        <Typography variant="h6" className=***REMOVED***classes.panelTitle***REMOVED***>
          ***REMOVED***t("turn")***REMOVED***
        </Typography>
        <List disablePadding dense className=***REMOVED***classes.panelList***REMOVED***>
          ***REMOVED***game.order.map((userId,key) => (
            <ListItem key=***REMOVED***key***REMOVED*** button className=***REMOVED***game.round%4!==key ? classes.inactive : null***REMOVED***>
              <ColorSquare color=***REMOVED***game.meta.users[userId].color***REMOVED*** />
              <ListItemText className=***REMOVED***classes.textOverflow***REMOVED***>
                ***REMOVED***trim(game.meta.users[userId].name,18)***REMOVED***
                ***REMOVED***" "***REMOVED***
                ***REMOVED***game.hands[key] && [...Array(Object.keys(game.hands[key]).length)].map((idx,key)=>***REMOVED***return <img key=***REMOVED***key***REMOVED*** className=***REMOVED***classes.cardIcon***REMOVED*** alt=***REMOVED***""***REMOVED*** src=***REMOVED***CardIcon***REMOVED*** />;***REMOVED***)***REMOVED***
              </ListItemText>
            </ListItem>
          ))***REMOVED***
        </List>
      </Box>
      <Divider />
      <Box flexGrow=***REMOVED***1***REMOVED*** className=***REMOVED***classes.panel***REMOVED***>
        ***REMOVED***/* Log */***REMOVED***
        <Typography variant="h6" className=***REMOVED***classes.panelTitle***REMOVED***>
          ***REMOVED***t("gameLog")***REMOVED***
        </Typography>
        <List disablePadding dense className=***REMOVED***classes.panelList***REMOVED*** ref=***REMOVED***logEl***REMOVED***>
          ***REMOVED***gameState.history.map((event, id) => (
            <ListItem style=***REMOVED******REMOVED***backgroundColor:lightColors[game.order.indexOf(event.user)]***REMOVED******REMOVED*** key=***REMOVED***id***REMOVED***>
              <JassCard value=***REMOVED***event.card.substring(0,2)***REMOVED*** size="sm" />
              <ListItemText className=***REMOVED***classes.textOverflow + " " + classes.logText***REMOVED***>
                
                <span className=***REMOVED***classes.logName***REMOVED***>
                  ***REMOVED***game.meta.users[event.user].name***REMOVED***
                </span>
                <span className=***REMOVED***classes.logName***REMOVED***>
                  ***REMOVED***event.card === "YY" ?(
                    <Typography>
                      ***REMOVED***t("throwsSidebar")***REMOVED*** ***REMOVED***event.selection[0]***REMOVED*** ***REMOVED***event.selection[0] === 1 ? t("card") : t("cards")***REMOVED***
                    </Typography>) : (
                    (event.card.length === 3 ? event.card.charAt(2) : event.card.charAt(0)) === '2' && event.selection === undefined ? (
                      <Typography>
                        ***REMOVED***t("stealsCard")***REMOVED***
                      </Typography>
                    ) : null)***REMOVED***
                </span>
              </ListItemText>
            </ListItem>
          ))***REMOVED***
        </List>
      </Box>
    </>
  );
***REMOVED***

export default Sidebar;
