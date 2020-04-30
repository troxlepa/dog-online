import React, { useEffect, useRef } from "react";

import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import ColorSquare from "./ColorSquare";
import JassCard from "./JassCard";
import autoscroll from "../utils/autoscroll";
import { useTranslation } from 'react-i18next';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CardIcon from "../assets/card_icon.svg";
import TranslateIcon from '@material-ui/icons/Translate';
import RuleCA from "../assets/rules-02.svg";
import RuleTV from "../assets/rules-03.svg";
import RuleTT from "../assets/rules-04.svg";
import RuleJJ from "../assets/rules-05.svg";
import RuleLJ from "../assets/rules-06.svg";
import Icon from '@material-ui/core/Icon';
import PanToolIcon from '@material-ui/icons/PanTool';





import { trim } from "../util.js";

const useStyles = makeStyles({
  panel: {
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  },
  panelTitle: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    textAlign: "center",
    flexShrink: 0
  },
  panelList: {
    flexGrow: 1,
    overflowY: "auto",
  },
  textOverflow: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden"
  },
  logText:{
    marginLeft: "10px"
  },
  infoText: {
    fontWeight: "bold",
    marginLeft: "10px"  
  },
  logName: {
    fontWeight: "bold"
  },
  historyTimeIcon: {
    marginRight: 12,
    "& span": {
      margin: "0 auto"
    }
  },
  inactive: {
    opacity: 0.4
  },
  even : {
    backgroundColor: "#ddd",
  },
  imageIcon: {
    height: '100%'
  },
  iconRoot: {
    textAlign: 'center'
  },
    largeIcon: {
    width: 30,
    height: 30,
    margin:3
  },
});



function Sidebar({ game, gameState, toggleAudio, audioDisabled, toggleHelp, helpDisabled}) {
  const classes = useStyles();
  const logEl = useRef(null);
  const lightColors = ["rgba(69, 111, 201, .1)","rgba(218, 180, 11, .1)","rgba(46, 148, 52, .1)",  "rgba(204, 41, 0, .1)"];
  const playerColors = ["rgba(69, 111, 201)","rgba(218, 180, 11)","rgba(46, 148, 52)",  "rgba(204, 41, 0)"];
  const { t, i18n } = useTranslation();

  useEffect(() => {
    return autoscroll(logEl.current);
  }, []);

  const showHelpModal = () => {return;};

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const getLanguage = () => (i18n.language || window.localStorage.i18nextLng);

  function displayRule(key){
    let title = "";
    let color = "yellow";
    switch(key){
      case 0:
        title = t('canadian7');
        break;
      case 1:
        title = t('jackJack');
        break;
      case 2:
        title = t('twoThief');
        break;
      case 3:
        title = t('turnVerification');
        break;
      case 4:
        title = t('lastJoker');
        break;
      default:
        return;

    }
          return(
            <Icon className={classes.largeIcon} key={key} title={title} classes={{root: classes.iconRoot}}>{getRuleIcon(key)}</Icon>
          );

  }
  function getRuleIcon(key){
    switch(key){
      case 0:
        return <img className={classes.imageIcon} alt="" src={RuleCA} />;
      case 1:
        return <img className={classes.imageIcon} alt="" src={RuleJJ} />;
      case 2:
        return <img className={classes.imageIcon} alt="" src={RuleTT} />;
      case 3:
        return <img className={classes.imageIcon} alt="" src={RuleTV} />;
      case 4:
        return <img className={classes.imageIcon} alt="" src={RuleLJ} />;
      default:
        return;
    }
  }

  return (
    <>
       <Box maxHeight="20%" flexShrink={0} className={classes.panel}>
        {/* Settings */}
        <List disablePadding dense className={classes.panelList}>

            <ListItem>
               <IconButton title="Audio" color="primary" aria-label="volume on off" component="span" onClick={toggleAudio}>
                {audioDisabled ? <VolumeOffIcon color="disabled" /> : <VolumeUpIcon/>}
              </IconButton>
                {<IconButton title={t('fpHelp')} color="primary" aria-label="help on off" component="span" onClick={toggleHelp}>
                {(!helpDisabled.seven && !helpDisabled.home) ? <HelpOutlineIcon color="disabled" /> : <HelpOutlineIcon /> }
              </IconButton>}
               <IconButton title={t('langSwitch')} color="primary" aria-label="volume on off" component="span" onClick={() => changeLanguage(getLanguage() === "de" ? "en" : "de")}>
                <TranslateIcon/>
              </IconButton> {getLanguage() === "de" ? "DE" : "EN"}

            </ListItem>
        </List>
      </Box>
      <Divider />
          <Box maxHeight="20%" flexShrink={0} className={classes.panel}>
        {/* Next Round Info */}
        <Typography variant="h6" className={classes.panelTitle}>
          Info
        </Typography>
        <List disablePadding dense className={classes.panelList}>

            <ListItem>                
              <ListItemText className={classes.textOverflow}>
                # {t("cardsNextRound")}: 
                 <span className={classes.infoText}>
                  {game.numCards}
                </span>
                <ListItemText className={classes.textOverflow}>
                
                 {t("playerToStartNext")}: 
                 <span className={classes.infoText}>
                  {game.meta.users[game.order[game.nextPlayer]].name}
                </span>
                {game.rooted ? (
                    <ListItemText className={classes.textOverflow}>
                      {t("blocking")}:
                        <span className={classes.infoText}>
                          {[...game.rooted].map((val,idx) => (val==="1" && <PanToolIcon style={{fill:playerColors[idx], fontSize:"1.5em", margin:1}} key={idx}/>))}
                        </span> 
                      </ListItemText>
                  ): null}
                </ListItemText>
              </ListItemText>
              </ListItem>
        </List>
      </Box>
      <Divider />
      {game.rules ? (<Box maxHeight="20%" flexShrink={0} className={classes.panel}>
        {/* Scoreboard */}
        <Typography variant="h6" className={classes.panelTitle}>
          {t("activeRules")}
        </Typography>
        <List disablePadding dense className={classes.panelList}>
          <ListItem>
            {[0,1,2,3,4].map((key,idx) => {
              if(game.rules.charAt(key) === '1') return displayRule(key);
            })}
          </ListItem>
        </List>
      </Box>
      
      ):(console.log("v130+alpha without rules"))}
      <Divider />
      <Box maxHeight="40%" flexShrink={0} className={classes.panel}>
        {/* Turn */}
        <Typography variant="h6" className={classes.panelTitle}>
          {t("turn")}
        </Typography>
        <List disablePadding dense className={classes.panelList}>
          {game.order.map((userId,key) => (

            <ListItem key={key} button className={game.round%4!==key ? classes.inactive : null}>
              <ColorSquare color={game.meta.users[userId].color} />
              <ListItemText className={classes.textOverflow}>
                {trim(game.meta.users[userId].name,18)}
                {" "}
                {game.hands[key] ? [...Array(Object.keys(game.hands[key]).length)].map((idx,key)=>{return <img key={key} style={{width:"1rem",height:"1rem",position:"relative",top:".125rem"}} alt={""} src={CardIcon} />;}) : ""}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider />
      <Box flexGrow={1} className={classes.panel}>
        {/* Log */}
        <Typography variant="h6" className={classes.panelTitle}>
          {t("gameLog")}
        </Typography>
        <List disablePadding dense className={classes.panelList} ref={logEl}>
          {gameState.history.map((event, id) => (
            <ListItem style={{backgroundColor:lightColors[game.order.indexOf(event.user)]}} key={id}>
              <JassCard value={event.card.substring(0,2)} size="sm" />
              <ListItemText className={classes.textOverflow + " " + classes.logText}>
                
                <span className={classes.logName}>
                  {game.meta.users[event.user].name}
                </span>
                <span className={classes.logName}>
                    {event.card === "YY" ?(<Typography>
                       {t("throwsSidebar")} {event.selection[0]} {event.selection[0] === 1 ? t("card") : t("cards")}
                    </Typography>) : (
                    (event.card.length === 3 ? event.card.charAt(2) : event.card.charAt(0)) === '2' && event.selection === undefined ?(<Typography>
                       {t("stealsCard")}
                    </Typography>) : null)}
                </span>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}

export default Sidebar;
