import React from "react";
import ColorSquare from "../components/ColorSquare";
import Trophy from "../assets/trophy.svg";
import LoserImage from "../assets/loser.svg";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import WinnerAudio from "../assets/win.mp3";
import LoserAudio from "../assets/losing.mp3";
import Typography from "@material-ui/core/Typography";
import ***REMOVED*** useTranslation ***REMOVED*** from 'react-i18next';

function GameEnd(***REMOVED***spectating,userId,gameOrder,metaUsers,winnerTeam, audioDisabled***REMOVED***)***REMOVED***
  const winAudio = new Audio(WinnerAudio);
  const loseAudio = new Audio(LoserAudio);
  const isWinner=(userId === gameOrder[winnerTeam]) || (userId === gameOrder[winnerTeam+2]);
  const winner1=metaUsers[gameOrder[winnerTeam]];
  const winner2=metaUsers[gameOrder[winnerTeam+2]];
  const ***REMOVED*** t ***REMOVED*** = useTranslation();

  if(spectating)***REMOVED***
    return(
      <div>
        <Typography variant="h4" gutterBottom>
          ***REMOVED***t('gameEnded')***REMOVED***
        </Typography>
        <Typography variant="body1">
          ***REMOVED***t("doneMessage")***REMOVED***:
        </Typography>
        <ListItem button>
          <ColorSquare color=***REMOVED***winner1.color***REMOVED*** />
              <ListItemText>
              ***REMOVED***winner1.name***REMOVED***
            </ListItemText>
          </ListItem>
          <ListItem button>
          <ColorSquare color=***REMOVED***winner2.color***REMOVED*** />
            <ListItemText>
              ***REMOVED***winner2.name***REMOVED***
            </ListItemText>
          </ListItem>
        </div>    
    );
***REMOVED***
  if(!isWinner)***REMOVED***
    if(!audioDisabled) loseAudio.play();
    return(
      <div>
        <img alt="losing team ball falling" src=***REMOVED***LoserImage***REMOVED***/>
        <Typography variant="h4" gutterBottom>
          ***REMOVED***t('loseMsg')***REMOVED***
        </Typography>
        <Typography variant="body1">
          ***REMOVED***t('gameEnded')***REMOVED*** ***REMOVED***" "***REMOVED*** ***REMOVED***t("doneMessage")***REMOVED***:
        </Typography>
        <ListItem button>
          <ColorSquare color=***REMOVED***winner1.color***REMOVED*** />
          <ListItemText>
            ***REMOVED***winner1.name***REMOVED***
          </ListItemText>
        </ListItem>
        <ListItem button>
        <ColorSquare color=***REMOVED***winner2.color***REMOVED*** />
          <ListItemText>
            ***REMOVED***winner2.name***REMOVED***
          </ListItemText>
        </ListItem>
      </div>
    );
***REMOVED***
  if(!audioDisabled) winAudio.play();
  return (
    <div>
      <img alt="winning team trophy" src=***REMOVED***Trophy***REMOVED***/>
      <Typography variant="h4" gutterBottom>
        ***REMOVED***t('winMsg')***REMOVED***
      </Typography>
      <Typography variant="body1">
        ***REMOVED***t('gameEnded')***REMOVED*** ***REMOVED***" "***REMOVED*** ***REMOVED***t("doneMessage")***REMOVED***:
      </Typography>
      <ListItem button>
        <ColorSquare color=***REMOVED***winner1.color***REMOVED*** />
        <ListItemText>
          ***REMOVED***winner1.name***REMOVED***
        </ListItemText>
      </ListItem>
      <ListItem button>
        <ColorSquare color=***REMOVED***winner2.color***REMOVED*** />
        <ListItemText>
          ***REMOVED***winner2.name***REMOVED***
        </ListItemText>
      </ListItem>
    </div>
  );
***REMOVED***

export default GameEnd;