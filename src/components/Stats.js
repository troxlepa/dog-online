import React from "react";

import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import {calcTurnTimes, trim} from "../util";



const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  subtitle: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Stats({game}){
  const classes = useStyles();
  const winnerTeam = [80,81,82,83,88,89,90,91].every(v => (game.balls).includes(v)) ? 0 : 1;
  let users = game.order.map((userId,idx) => {return game.meta.users[userId];});
  let {moveCount, avgMoveTimes, jokerCount, akCount, sendCount} = calcTurnTimes(game);

  const { t } = useTranslation();


  return(
    <>
      <Typography variant="h4" gutterBottom>
        {t('stats')}
      </Typography>
      <Grid container spacing={2}>
        {users.map((user,idx) => (
          <Grid key={idx} item xs={3}>
            <Card style={idx % 2 === winnerTeam ? {border:"5 px solid yellow"} : {}}>
            <CardHeader className={"user_cardheader"+idx} style={{height:"5rem",padding:"5px"}}>
              <Typography variant="h6" style={{color:"white"}} gutterBottom>
                {trim(user.name,24)}
              </Typography>
            </CardHeader>
              <CardContent>
                <Typography variant="h5" component="h2">
                {moveCount[idx]}
                </Typography>
                <Typography className={classes.subtitle} component="h2">
                {t('moves')}
                </Typography>
                <Divider style={{margin:"10px"}}/>
                <Typography variant="h5" component="h2">
                {avgMoveTimes[idx]}s
                </Typography>
                <Typography className={classes.subtitle} component="h2">
                {t('avgMoves')}
                </Typography> 
                <Divider style={{margin:"10px"}}/>
                <Typography variant="h5" component="h2">
                {jokerCount[idx]}
                </Typography>
                <Typography className={classes.subtitle} component="h2">
                {t('jokerCount')}
                </Typography>
                <Divider style={{margin:"10px"}}/>
                <Typography variant="h5" component="h2">
                {akCount[idx]}
                </Typography>
                <Typography className={classes.subtitle} component="h2">
                {t('akCount')}
                </Typography> 
                <Divider style={{margin:"10px"}}/>
                <Typography variant="h5" component="h2">
                {sendCount[idx]}
                </Typography>
                <Typography className={classes.subtitle} component="h2">
                {t('sendCount')}
                </Typography> 
            </CardContent>
            </Card>
          </Grid>
      ))}
    </Grid>
    </>
  );
}
export default Stats;