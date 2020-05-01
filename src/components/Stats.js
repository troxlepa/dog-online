import React from "react";

import ***REMOVED*** useTranslation ***REMOVED*** from 'react-i18next';

import ***REMOVED*** makeStyles ***REMOVED*** from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import ***REMOVED***calcTurnTimes, trim***REMOVED*** from "../util";



const useStyles = makeStyles(***REMOVED***
  root: ***REMOVED***
    minWidth: 275,
***REMOVED***,
  bullet: ***REMOVED***
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
***REMOVED***,
  subtitle: ***REMOVED***
    fontSize: 14,
***REMOVED***,
  pos: ***REMOVED***
    marginBottom: 12,
***REMOVED***,
***REMOVED***);

function Stats(***REMOVED***game***REMOVED***)***REMOVED***
  const classes = useStyles();
  const winnerTeam = [80,81,82,83,88,89,90,91].every(v => (game.balls).includes(v)) ? 0 : 1;
  let users = game.order.map((userId,idx) => ***REMOVED***return game.meta.users[userId];***REMOVED***);
  let ***REMOVED***moveCount, avgMoveTimes, jokerCount, akCount, sendCount***REMOVED*** = calcTurnTimes(game);

  const ***REMOVED*** t ***REMOVED*** = useTranslation();


  return(
    <>
      <Typography variant="h4" gutterBottom>
        ***REMOVED***t('stats')***REMOVED***
      </Typography>
      <Grid container spacing=***REMOVED***2***REMOVED***>
        ***REMOVED***users.map((user,idx) => (
          <Grid key=***REMOVED***idx***REMOVED*** item xs=***REMOVED***3***REMOVED***>
            <Card style=***REMOVED***idx % 2 === winnerTeam ? ***REMOVED***border:"5 px solid yellow"***REMOVED*** : ***REMOVED******REMOVED******REMOVED***>
            <CardHeader className=***REMOVED***"user_cardheader"+idx***REMOVED*** style=***REMOVED******REMOVED***height:"5rem",padding:"5px"***REMOVED******REMOVED***>
              <Typography variant="h6" style=***REMOVED******REMOVED***color:"white"***REMOVED******REMOVED*** gutterBottom>
                ***REMOVED***trim(user.name,24)***REMOVED***
              </Typography>
            </CardHeader>
              <CardContent>
                <Typography variant="h5" component="h2">
                ***REMOVED***moveCount[idx]***REMOVED***
                </Typography>
                <Typography className=***REMOVED***classes.subtitle***REMOVED*** component="h2">
                ***REMOVED***t('moves')***REMOVED***
                </Typography>
                <Divider style=***REMOVED******REMOVED***margin:"10px"***REMOVED******REMOVED***/>
                <Typography variant="h5" component="h2">
                ***REMOVED***avgMoveTimes[idx]***REMOVED***s
                </Typography>
                <Typography className=***REMOVED***classes.subtitle***REMOVED*** component="h2">
                ***REMOVED***t('avgMoves')***REMOVED***
                </Typography> 
                <Divider style=***REMOVED******REMOVED***margin:"10px"***REMOVED******REMOVED***/>
                <Typography variant="h5" component="h2">
                ***REMOVED***jokerCount[idx]***REMOVED***
                </Typography>
                <Typography className=***REMOVED***classes.subtitle***REMOVED*** component="h2">
                ***REMOVED***t('jokerCount')***REMOVED***
                </Typography>
                <Divider style=***REMOVED******REMOVED***margin:"10px"***REMOVED******REMOVED***/>
                <Typography variant="h5" component="h2">
                ***REMOVED***akCount[idx]***REMOVED***
                </Typography>
                <Typography className=***REMOVED***classes.subtitle***REMOVED*** component="h2">
                ***REMOVED***t('akCount')***REMOVED***
                </Typography> 
                <Divider style=***REMOVED******REMOVED***margin:"10px"***REMOVED******REMOVED***/>
                <Typography variant="h5" component="h2">
                ***REMOVED***sendCount[idx]***REMOVED***
                </Typography>
                <Typography className=***REMOVED***classes.subtitle***REMOVED*** component="h2">
                ***REMOVED***t('sendCount')***REMOVED***
                </Typography> 
            </CardContent>
            </Card>
          </Grid>
      ))***REMOVED***
    </Grid>
    </>
  );
***REMOVED***
export default Stats;