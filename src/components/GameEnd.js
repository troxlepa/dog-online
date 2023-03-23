import React from "react";
import ColorSquare from "../components/ColorSquare";
import Trophy from "../assets/trophy.svg";
import LoserImage from "../assets/loser.svg";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import WinnerAudio from "../assets/sounds/win.mp3";
import LoserAudio from "../assets/sounds/losing.mp3";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from 'react-i18next';

function GameEnd({spectating,userId,gameOrder,metaUsers,winnerTeam, audioDisabled}){
  const winAudio = new Audio(WinnerAudio);
  const loseAudio = new Audio(LoserAudio);
  const isWinner=(userId === gameOrder[winnerTeam]) || (userId === gameOrder[winnerTeam+2]);
  const { t } = useTranslation();

  function getWinners(){
    const winner1=metaUsers[gameOrder[winnerTeam]];
    const winner2=metaUsers[gameOrder[winnerTeam+2]];
    return(
      <React.Fragment>
        <ListItem button>
          <ColorSquare color={winner1.color} />
          <ListItemText>
            {winner1.name}
          </ListItemText>
        </ListItem>
        <ListItem button>
          <ColorSquare color={winner2.color} />
          <ListItemText>
            {winner2.name}
          </ListItemText>
        </ListItem>
      </React.Fragment>
    );
  }

  if(spectating){
    return(
      <div>
        <Typography variant="h4" gutterBottom>
          {t('gameEnded')}
        </Typography>
        <Typography variant="body1">
          {t("doneMessage")}:
        </Typography>
        {getWinners()}
      </div>    
    );
  }
  if(!isWinner){
    if(!audioDisabled) loseAudio.play();
    return(
      <div>
        <img alt="losing team ball falling" src={LoserImage}/>
        <Typography variant="h4" gutterBottom>
          {t('loseMsg')}
        </Typography>
        <Typography variant="body1">
          {t('gameEnded')} {" "} {t("doneMessage")}:
        </Typography>
        {getWinners()}
      </div>
    );
  }
  if(!audioDisabled) winAudio.play();
  return (
    <div>
      <img alt="winning team trophy" src={Trophy}/>
      <Typography variant="h4" gutterBottom>
        {t('winMsg')}
      </Typography>
      <Typography variant="body1">
        {t('gameEnded')} {" "} {t("doneMessage")}:
      </Typography>
      {getWinners()}
    </div>
  );
}

export default GameEnd;