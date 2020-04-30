import React, { useEffect, useState, useCallback, useMemo } from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import SnackContent from "./SnackContent";
import { makeStyles } from "@material-ui/core/styles";
import { animated, useSprings } from "react-spring";
import Board from "../assets/board.svg";
import { SvgLoader, SvgProxy } from 'react-svgmt';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import JassCard from "../components/JassCard";

// gameState.ballLocations
// gameState.history

const useStyles = makeStyles({
  gameContainer: {
    display: "flex",
    margin: "10px auto",
    flexShrink: 0,
    justifyContent: "center",
    "& > *": {
      position: "absolute"
    }
  },
  gameBoard: {
    display: "flex"
  },
  playerCards: {
    display: "flex",
    flex:1,
    borderTop: "1px solid lightgray",
    justifyContent: "flex-end"
  },
  controlButtons: {
  	display: "flex",
  	position: "fixed",
  	"& > *": {
      margin: "3px"
    }
  }
});

function DogGame({ game, gameState, spectating, onSubmit }) {
	const classes = useStyles();
	const [state, setSelected] = useState([]);
	const [randomState, setState] = useState([]);
	const [snack, setSnack] = useState({ open: false });
	const [activeCards, setCardState] = useState([]);


  	const cardArray = randomCards(5);


  useEffect(() => {
    setSelected({selected:[],card:''});
  }, [game]);

  useEffect(() => {
    setState([19,30,64,45,70,71,25,51,50,72,36,4,34,11,77,61]);
  }, [game]);

  useEffect(() => {
    setCardState([]);
  }, [game]);

   const handleCard = useCallback(
    card => {
    	console.log('you played a ' + card);
      if (spectating) return;
      setCardState(activeCard => {
      	if(activeCards.includes(card)){
      		return [];
      	}else{
            return activeCards;
      	}
      });
    },
    [spectating]
  );

  const clickHandlers = useMemo(() => {
    const obj = {};
    console.log('hey dude!');
    console.log(activeCards);
    for (const card of cardArray) {
      obj[card] = () => handleCard(card);
    }
    return obj;
  }, [handleCard]);

  const handleClick = useCallback(
    (isCard,card,field,isBall) => {
      if (spectating) return;
      if(isCard){
      	setSelected(state => {
      		console.log(isCard);
      	});
      }
      setSelected(state => {
	      console.log(state.selected);
	      var firstChoice = state.selected.length % 2 == 0;
	      console.log(firstChoice);
	      if(state.selected.includes(field)){
	        state.selected.splice(state.selected.indexOf(field), 1);
	        return [...state.selected];
	      }
	      if ((firstChoice && !isBall) || (!firstChoice && isBall)) return [...state.selected];
        if (state.selected.includes(field)) {
          state.selected.splice(state.selected.indexOf(field), 1);
          // console.log(field + ' removed from selection');
          return [...state.selected];
        } else {
          console.log('FUNN!');
          // console.log([...selected, field]);
          return [...state.selected, field];
        }
      });
    },
    [spectating]
  );



  /*const clickHandlers = useMemo(() => {
    const obj = {};
    for (const card of generateCards()) {
      obj[card] = () => handleClick(card);
    }
    return obj;
  }, [handleClick]);*/


  /*function addActiveClass(node){
  	console.log(node.originalTarget.attributes[1].value);
  		var id = node.originalTarget.attributes[1].value;
  		var idx = parseInt(id.substring(1,3));
  		active[idx] = !active[idx];
  }*/

	function initialBallLocations(){
		return [64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79];
	}
	var ballLocations = initialBallLocations();
	var active = new Array(85);

	// var randomState = [19,30,64,45,70,71,25,51,50,72,36,4,34,11,77,61]; //genRandomStone();

	const allFields = [...Array(96).keys()];
	function genRandomStone(){
		var arr = [];
		const min = 0;
	    const max = 63;
		for(var i=0;i<16;++i){
			arr.push(Math.floor(min + Math.random() * (max - min)));
		}
		return arr;
	}

	function randomStone(){
		const min = 0;
	    const max = 62;
		const rand = Math.floor(min + Math.random() * (max - min));
		var element = "#f"+rand;
		return (element);
	};

	function setStone(nr){
		return ("#f"+nr);
	}

	function setColor(index){
		switch(parseInt(index/4)){
			case 0:
				return "blue";
			case 1:
				return "yellow";
			case 2:
				return "green";
			case 3:
				return "red";
			default:
				return "WTFCLASS"; // should not be possible as state.length == 16
		}
	}

	function checkTurnValidity(){
		return state.selected.length % 2 === 0;
	}
	function randomCards(n){
		const colors = ['C','D','S','H'];
		const rank = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
		var out = [];
		for(var i=0;i<n;++i){
			var a = Math.floor(Math.random() * 13);
			var b = Math.floor(Math.random() * 3);
			out.push(''+rank[a]+colors[b]);
		}
		return out;
	}
	const submitSelection = useCallback(
	  () => {
  		console.log('submit');
  		if(checkTurnValidity()){
  			for(var i=0;i<state.selected.length;i+=2){
  				randomState[randomState.indexOf(state.selected[i])] = state.selected[i+1];
  			}
  		}else{
	  		setSnack({
	            open: true,
	            variant: "error",
	            message: "Invalid turn!"
	          });
			return;
  		}
  		if(activeCards == null){
  			console.log('no card selected');
			return;
  		}
  		onSubmit(state);
  		setSelected(state => {return {selected:[],card:''};});
  		setState(randomState);
  		setCardState(null);
  		setSnack({
                open: true,
                variant: "success",
                message: "Turn applied."
              });
  	  }
  	);
	const sampleCard= {rank: '2', color:'S'}
	return (
		<>
		<Grid item xs={12} lg={12} className={classes.gameBoard}>
		<div className={classes.gameContainer}>
			<SvgLoader path={Board}>
  				{/*{ballLocations.map((ball, ix) => (
          			<SvgProxy key={ix} selector={setStone(ball)} class={setColor(ix)} /> //{setColor(ix)}  {setStone(ball)}
        		))};*/}

        		{allFields.map((field, ix) => (
        			randomState.includes(field) ?
						(<SvgProxy key={ix} selector={setStone(field)} onClick={(node) => {handleClick(false,sampleCard,field,true)}} class={"ball" + " " + setColor(randomState.indexOf(field)) + " " + (state.selected.includes(field) ? 'active': '') } /> //{setColor(ix)}  {setStone(ball)}
        			) : (
          				<SvgProxy key={ix} selector={setStone(field)} onClick={(node) => {handleClick(false,sampleCard,field,false)}} class={"white" + " " + (state.selected.includes(field) ? 'active': '') + " " + (state.selected.length % 2 == 0 ? '' : 'destination') } /> //{setColor(ix)}  {setStone(ball)}
        			)
        		))};
			</SvgLoader>
		</div>
		<div className={classes.controlButtons}>
		
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={submitSelection}
              >
                <Typography>Submit Turn</Typography>
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled={state.selected.length == 0 ? true : false}
                onClick={useCallback(() => {setSelected(selected => {return {selected:[],card:''};});})}
              >
                <Typography>Clear Selection</Typography>
              </Button>
        
        </div>
            </Grid>
        <Grid item xs={12} lg={12} className={classes.playerCards}>
      {cardArray.map((card, idx) => (
	      <JassCard
	      	key={idx}
	        value={card}
	        /*color={(card[1]==='S'||card[1]==='C')?'black':'red'}*/
	        active={activeCards.includes(card) ? 'active' : ''}
	        selected={activeCards ? activeCards.includes(card) : null}
	        onClick={(e) => {handleClick(true,{rank:card[0],color:card[1]},0/*sampleField*/,)}}//clickHandlers[card]}
	      />
      	))}
      </Grid>
		</>
	);
}

export default DogGame;


import React, { useEffect, useState, useCallback, useMemo } from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import SnackContent from "./SnackContent";
import { makeStyles } from "@material-ui/core/styles";
import { animated, useSprings } from "react-spring";
import Board from "../assets/board.svg";
import { SvgLoader, SvgProxy } from 'react-svgmt';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import JassCard from "../components/JassCard";

// gameState.ballLocations
// gameState.history

const useStyles = makeStyles({
  gameContainer: {
    display: "flex",
    margin: "10px auto",
    flexShrink: 0,
    justifyContent: "center",
    "& > *": {
      position: "absolute"
    }
  },
  gameBoard: {
    display: "flex"
  },
  playerCards: {
    display: "flex",
    flex:1,
    borderTop: "1px solid lightgray",
    justifyContent: "flex-end"
  },
  controlButtons: {
    display: "flex",
    position: "fixed",
    "& > *": {
      margin: "3px"
    }
  }
});

function DogGame({ game, gameState, spectating, onSubmit }) {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [randomState, setState] = useState([]);
  const [snack, setSnack] = useState({ open: false });
  const [activeCards, setCardState] = useState([]);


    const card = 0;
    const cardArray = randomCards(5);


  useEffect(() => {
    setSelected([]);
  }, [game]);

  useEffect(() => {
    setState([19,30,64,45,70,71,25,51,50,72,36,4,34,11,77,61]);
  }, [game]);

  useEffect(() => {
    setCardState([]);
  }, [game]);

   const handleCard = useCallback(
    card => {
      console.log('you played a ' + card);
      if (spectating) return;
      setCardState(activeCard => {
        if(activeCards.includes(card)){
          return -1;
        }else{
            return activeCards;
        }
      });
    },
    [spectating]
  );

  const clickHandlers = useMemo(() => {
    const obj = {};
    for (const card of cardArray) {
      obj[card] = () => handleCard(card);
    }
    return obj;
  }, [handleCard]);

  const handleClick = useCallback(
    (field,isBall) => {
      if (spectating) return;
      setSelected(selected => {
        console.log(selected);
        var firstChoice = selected.length % 2 == 0;
        console.log(firstChoice);
        if(selected.includes(field)){
          selected.splice(selected.indexOf(field), 1);
          return [...selected];
        }
        if ((firstChoice && !isBall) || (!firstChoice && isBall)) return [...selected];
        if (selected.includes(field)) {
          selected.splice(selected.indexOf(field), 1);
          // console.log(field + ' removed from selection');
          return [...selected];
        } else {
          console.log('FUNN!');
          // console.log([...selected, field]);
          return [...selected, field];
        }
      });
    },
    [spectating]
  );



  /*const clickHandlers = useMemo(() => {
    const obj = {};
    for (const card of generateCards()) {
      obj[card] = () => handleClick(card);
    }
    return obj;
  }, [handleClick]);*/


  /*function addActiveClass(node){
    console.log(node.originalTarget.attributes[1].value);
      var id = node.originalTarget.attributes[1].value;
      var idx = parseInt(id.substring(1,3));
      active[idx] = !active[idx];
  }*/

  function initialBallLocations(){
    return [64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79];
  }
  var ballLocations = initialBallLocations();
  var active = new Array(85);

  // var randomState = [19,30,64,45,70,71,25,51,50,72,36,4,34,11,77,61]; //genRandomStone();

  const allFields = [...Array(96).keys()];
  function genRandomStone(){
    var arr = [];
    const min = 0;
      const max = 63;
    for(var i=0;i<16;++i){
      arr.push(Math.floor(min + Math.random() * (max - min)));
    }
    return arr;
  }

  function randomStone(){
    const min = 0;
      const max = 62;
    const rand = Math.floor(min + Math.random() * (max - min));
    var element = "#f"+rand;
    return (element);
  };

  function setStone(nr){
    return ("#f"+nr);
  }

  function setColor(index){
    switch(parseInt(index/4)){
      case 0:
        return "blue";
      case 1:
        return "yellow";
      case 2:
        return "green";
      case 3:
        return "red";
      default:
        return "WTFCLASS"; // should not be possible as state.length == 16
    }
  }

  function checkTurnValidity(){
    return selected.length % 2 === 0;
  }
  function randomCards(n){
    const colors = ['C','D','S','H'];
    const rank = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    var out = [];
    for(var i=0;i<n;++i){
      var a = Math.floor(Math.random() * 13);
      var b = Math.floor(Math.random() * 3);
      out.push(''+rank[a]+colors[b]);
    }
    return out;
  }
  const submitSelection = useCallback(
    () => {
      console.log('submit');
      if(checkTurnValidity()){
        for(var i=0;i<selected.length;i+=2){
          randomState[randomState.indexOf(selected[i])] = selected[i+1];
        }
      }else{
        setSnack({
              open: true,
              variant: "error",
              message: "Invalid turn!"
            });
      return;
      }
      if(card == null){
        console.log('no card selected');
      return;
      }
      onSubmit(selected);
      setSelected(selected => {return [];});
      setState(randomState);
      setCardState(null);
      setSnack({
                open: true,
                variant: "success",
                message: "Turn applied."
              });
      }
    );

  return (
    <>
    <Grid item xs={12} lg={12} className={classes.gameBoard}>
    <div className={classes.gameContainer}>
      <SvgLoader path={Board}>
          {/*{ballLocations.map((ball, ix) => (
                <SvgProxy key={ix} selector={setStone(ball)} class={setColor(ix)} /> //{setColor(ix)}  {setStone(ball)}
            ))};*/}

            {allFields.map((field, ix) => (
              randomState.includes(field) ?
            (<SvgProxy key={ix} selector={setStone(field)} onClick={(node) => {handleClick(field,true)}} class={"ball" + " " + setColor(randomState.indexOf(field)) + " " + (selected.includes(field) ? 'active': '') } /> //{setColor(ix)}  {setStone(ball)}
              ) : (
                  <SvgProxy key={ix} selector={setStone(field)} onClick={(node) => {handleClick(field,false)}} class={"white" + " " + (selected.includes(field) ? 'active': '') + " " + (selected.length % 2 == 0 ? '' : 'destination') } /> //{setColor(ix)}  {setStone(ball)}
              )
            ))};
      </SvgLoader>
    </div>
    <div className={classes.controlButtons}>
    
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={submitSelection}
              >
                <Typography>Submit Turn</Typography>
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled={selected.length == 0 ? true : false}
                onClick={useCallback(() => {setSelected(selected => {return [];});})}
              >
                <Typography>Clear Selection</Typography>
              </Button>
        
        </div>
            </Grid>
        <Grid item xs={12} lg={12} className={classes.playerCards}>
      {cardArray.map((card, idx) => (
          console.log(card),
        <JassCard
          key={idx}
          value={card}
          /*color={(card[1]==='S'||card[1]==='C')?'black':'red'}*/
          active={activeCards.includes(card) ? 'active' : ''}
          selected={activeCards ? activeCards.includes(card) : null}
          onClick={clickHandlers[card]}
        />
        ))}
      </Grid>
    </>
  );
}

export default DogGame;


import React, { useEffect, useState, useCallback, useMemo } from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import SnackContent from "./SnackContent";
import { makeStyles } from "@material-ui/core/styles";
import { animated, useSprings } from "react-spring";
import Board from "../assets/board.svg";
import { SvgLoader, SvgProxy } from 'react-svgmt';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import JassCard from "../components/JassCard";

// gameState.ballLocations
// gameState.history

const useStyles = makeStyles({
  gameContainer: {
    display: "flex",
    margin: "10px auto",
    flexShrink: 0,
    justifyContent: "center",
    "& > *": {
      position: "absolute"
    }
  },
  gameBoard: {
    display: "flex"
  },
  playerCards: {
    display: "flex",
    flex:1,
    borderTop: "1px solid lightgray",
    justifyContent: "flex-end"
  },
  controlButtons: {
    display: "flex",
    position: "fixed",
    "& > *": {
      margin: "3px"
    }
  }
});

function DogGame({ game, gameState, spectating, onSubmit }) {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [randomState, setState] = useState([]);
  const [snack, setSnack] = useState({ open: false });
  const [activeCards, setCardState] = useState([]);
  const [cardArray, setCardArray] = useState([]);


    const card = 0;


  useEffect(() => {
    setSelected([]);
  }, [game]);

  useEffect(() => {
    setState(genRandomStone(16)); // [19,30,64,45,70,71,25,51,50,72,36,4,34,11,77,61]
  }, [game]);

  useEffect(() => {
    setCardArray(['2C','3S','AC', 'KS']); // randomCards(5)
  }, [game]);

  useEffect(() => {
    setCardState([]);
  }, [game]);

   const handleCard = useCallback(
    card => {
      if (spectating) return;
      if(activeCards.includes(card)) return [];
      if(activeCards.length == 1) return [...activeCards];
      setCardState(activeCards => {
        console.log(activeCards);
        if(activeCards.includes(card)){
          return [...activeCards];
        }else{
            return [...activeCards,card];
        }
      });
    },
    [spectating]
  );


  const handleClick = useCallback(
    (field,isBall) => {
      if (spectating) return;
      setSelected(selected => {
        console.log(selected);
        var firstChoice = selected.length % 2 === 0;
        console.log(firstChoice);
        if(selected.includes(field)){
          selected.splice(selected.indexOf(field), 1);
          return [...selected];
        }
        if ((firstChoice && !isBall) || (!firstChoice && isBall)) return [...selected];
        if (selected.includes(field)) {
          selected.splice(selected.indexOf(field), 1);
          // console.log(field + ' removed from selection');
          return [...selected];
        } else {
          console.log('FUNN!');
          // console.log([...selected, field]);
          return [...selected, field];
        }
      });
    },
    [spectating]
  );


  function initialBallLocations(){
    return [64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79];
  }
  var ballLocations = initialBallLocations();

  const allFields = [...Array(96).keys()];

  function genRandomStone(n){
    var arr = [];
    const min = 0;
      const max = 63;
    for(var i=0;i<n;++i){
      arr.push(Math.floor(min + Math.random() * (max - min)));
    }
    return arr;
  }

  function setStone(nr){
    return ("#f"+nr);
  }

  function setColor(index){
    switch(parseInt(index/4)){
      case 0:
        return "blue";
      case 1:
        return "yellow";
      case 2:
        return "green";
      case 3:
        return "red";
      default:
        return "WTFCLASS"; // should not be possible as state.length == 16
    }
  }

  function checkTurnValidity(){
    return selected.length % 2 === 0;
  }
  function randomCards(n){
    const colors = ['C','D','S','H'];
    const rank = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    var out = [];
    for(var i=0;i<n;++i){
      var a = Math.floor(Math.random() * 13);
      var b = Math.floor(Math.random() * 3);
      out.push(''+rank[a]+colors[b]);
    }
    return out;
  }
  const submitSelection = useCallback(
    () => {
      console.log('submit');
      if(checkTurnValidity()){
        for(var i=0;i<selected.length;i+=2){
          randomState[randomState.indexOf(selected[i])] = selected[i+1];
        }
      }else{
        setSnack({
              open: true,
              variant: "error",
              message: "Invalid turn!"
            });
      return;
      }
      if(card == null){
        console.log('no card selected');
      return;
      }
      onSubmit(selected);
      setSelected(selected => {return [];});
      setState(randomState);
      setCardState(null);
      setSnack({
                open: true,
                variant: "success",
                message: "Turn applied."
              });
      }
    );

  return (
    <>
    <Grid item xs={12} lg={12} className={classes.gameBoard}>
    <div className={classes.gameContainer}>
      <SvgLoader path={Board}>
          {/*{ballLocations.map((ball, ix) => (
                <SvgProxy key={ix} selector={setStone(ball)} class={setColor(ix)} /> //{setColor(ix)}  {setStone(ball)}
            ))};*/}

            {allFields.map((field, ix) => (
              randomState.includes(field) ?
            (<SvgProxy key={ix} selector={setStone(field)} onClick={(node) => {handleClick(field,true)}} class={"ball" + " " + setColor(randomState.indexOf(field)) + " " + (selected.includes(field) ? "active": "") } /> //{setColor(ix)}  {setStone(ball)}
              ) : (
                  <SvgProxy key={ix} selector={setStone(field)} onClick={(node) => {handleClick(field,false)}} class={"white" + " " + (selected.includes(field) ? "active": "") + " " + (selected.length % 2 === 0 ? "" : "destination") } /> //{setColor(ix)}  {setStone(ball)}
              )
            ))};
      </SvgLoader>
    </div>
    <div className={classes.controlButtons}>
    
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={submitSelection}
              >
                <Typography>Submit Turn</Typography>
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled={selected.length === 0 ? true : false}
                onClick={useCallback(() => {setSelected(selected => {return [];});})}
              >
                <Typography>Clear Selection</Typography>
              </Button>
        
        </div>
            </Grid>
        <Grid item xs={12} lg={12} className={classes.playerCards}>
      {cardArray.map((card, idx) => (
        <JassCard
          key={idx}
          value={card}
          /*color={(card[1]==='S'||card[1]==='C')?'black':'red'}*/
          active={activeCards.includes(card)}
          selected={activeCards ? activeCards.includes(card) : null}
          onClick={(e) => {handleCard(card)}}
        />
        ))}
      </Grid>
    </>
  );
}

export default DogGame;


import React, { useEffect, useState, useCallback, useMemo } from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import SnackContent from "./SnackContent";
import { makeStyles } from "@material-ui/core/styles";
import { animated, useSprings } from "react-spring";
import Board from "../assets/board.svg";
import { SvgLoader, SvgProxy } from 'react-svgmt';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import JassCard from "../components/JassCard";

// gameState.ballLocations
// gameState.history

const useStyles = makeStyles({
  gameContainer: {
    display: "flex",
    margin: "10px auto",
    flexShrink: 0,
    justifyContent: "center",
    "& > *": {
      position: "absolute"
    }
  },
  gameBoard: {
    display: "flex"
  },
  playerCards: {
    display: "flex",
    flex:1,
    borderTop: "1px solid lightgray",
    justifyContent: "flex-end"
  },
  controlButtons: {
    display: "flex",
    position: "fixed",
    "& > *": {
      margin: "3px"
    }
  }
});

function DogGame({ game, gameState, spectating, onSubmit }) {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [ballPositions, setState] = useState(game.balls);
  const [snack, setSnack] = useState({ open: false });
  const [activeCard, setCardState] = useState('');
  const [cardArray, setCardArray] = useState([]);

  console.log("game:");
  console.log(game);
  useEffect(() => {
    setSelected([]);
  }, [game]);

  useEffect(() => {
    
    setState(game.balls); // initialBallLocations() genRandomStone(16)
  }, [game]);

  useEffect(() => {
    setCardArray(randomCards(5)); // randomCards(5)
  }, [game]);

  useEffect(() => {
    setCardState('');
  }, [game]);

   const handleCard = useCallback(
    card => {
      if (spectating) return;
      if(activeCard === card) return '';
      setCardState(activeCard => {
        return card;
      });
    },
    [spectating]
  );


  const handleClick = useCallback(
    (field,isBall) => {
      if (spectating) return;
      setSelected(selected => {
        console.log(selected);
        var firstChoice = selected.length % 2 === 0;
        console.log(firstChoice);
        if(selected.includes(field)){
          selected.splice(selected.indexOf(field), 1);
          return [...selected];
        }
        // ball selected
        if(!firstChoice){
          console.log('not first choice' + activeCard.substring(0,1));
          if(activeCard.substring(0,1) == 'J'){
            console.log('maybe not a ball' + activeCard);
            console.log(ballPositions);
            if(!ballPositions.includes(field)) return [];
            return [...selected,field];
          }
        }
        if ((firstChoice && !isBall) || (!firstChoice && isBall)) return [...selected];
        if (selected.includes(field)) {
          selected.splice(selected.indexOf(field), 1);
          // console.log(field + ' removed from selection');
          return [...selected];
        } else {
          console.log('FUNN!');
          // console.log([...selected, field]);
          return [...selected, field];
        }
      });
    },
    [spectating,activeCard]
  );

  // var ballLocations = initialBallLocations();

  const allFields = [...Array(96).keys()];

  function genRandomStone(n){
    var arr = [];
    const min = 0;
      const max = 63;
    for(var i=0;i<n;++i){
      arr.push(Math.floor(min + Math.random() * (max - min)));
    }
    return arr;
  }

  function setStone(nr){
    return ("#f"+nr);
  }

  function setColor(index){
    switch(parseInt(index/4)){
      case 0:
        return "blue";
      case 1:
        return "yellow";
      case 2:
        return "green";
      case 3:
        return "red";
      default:
        return "WTFCLASS"; // should not be possible as state.length == 16
    }
  }

  function checkTurnValidity(){
    return selected.length % 2 === 0;
  }
  function randomCards(n){
    const colors = ['C','D','S','H'];
    const rank = ['A','J','J','4','5','6','7','8','9','10','J','Q','K'];
    var out = [];
    for(var i=0;i<n-1;++i){
      var a = Math.floor(Math.random() * 13);
      var b = Math.floor(Math.random() * 3);
      out.push(''+rank[a]+colors[b]);
    }
    out.push('JC');
    return out;
  }
  function randomCard(){
    const colors = ['C','D','S','H'];
    const rank = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    var a = Math.floor(Math.random() * 13);
    var b = Math.floor(Math.random() * 3);
    return ''+rank[a]+colors[b];
  }
  const submitSelection = useCallback(
    () => {
      console.log('submit');
      if(activeCard == ''){
        console.log('no card selected');
        return;
      }
      if(selected.length<2){
         setSnack({
              open: true,
              variant: "error",
              message: "Invalid turn!"
            });
     setCardState('');
     return;
      }
      if(checkTurnValidity()){
        for(var i=0;i<selected.length;i+=2){
          if(activeCard.substring(0,1)=='J'){
            const c1 = ballPositions.indexOf(selected[i]);
            const c2 = ballPositions.indexOf(selected[i+1]);
            [ballPositions[c1],ballPositions[c2]] = [ballPositions[c2],ballPositions[c1]];
          }else{
            ballPositions[ballPositions.indexOf(selected[i])] = selected[i+1];
          }
        }
      }else{
        setSnack({
              open: true,
              variant: "error",
              message: "Invalid turn!"
            });
        return;
      }
      onSubmit(ballPositions,selected,activeCard);
      setSelected(selected => {return [];});
      cardArray.splice(cardArray.indexOf(activeCard), 1);
      setCardArray(cardArray);
      setState(ballPositions);
      setCardState('');
      setSnack({
                open: true,
                variant: "success",
                message: "Turn applied."
              });
      }
    );

  return (
    <>
    <Grid item xs={12} lg={12} className={classes.gameBoard}>
    <div className={classes.gameContainer}>
      <SvgLoader path={Board}>
          {/*{ballLocations.map((ball, ix) => (
                <SvgProxy key={ix} selector={setStone(ball)} class={setColor(ix)} /> //{setColor(ix)}  {setStone(ball)}
            ))};*/}

            {allFields.map((field, ix) => (
              ballPositions.includes(field) ?
            (<SvgProxy key={ix} selector={setStone(field)} onClick={(node) => {handleClick(field,true)}} class={"ball" + " " + setColor(ballPositions.indexOf(field)) + " " + (selected.includes(field) ? "active": "") } /> //{setColor(ix)}  {setStone(ball)}
              ) : (
                  <SvgProxy key={ix} selector={setStone(field)} onClick={(node) => {handleClick(field,false)}} class={"white" + " " + (selected.includes(field) ? "active": "") + " " + (selected.length % 2 === 0 ? "" : "destination") } /> //{setColor(ix)}  {setStone(ball)}
              )
            ))};
      </SvgLoader>
    </div>
    <div className={classes.controlButtons}>
    
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={submitSelection}
              >
                <Typography>Submit Turn</Typography>
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled={selected.length === 0 ? true : false}
                onClick={useCallback(() => {setSelected(selected => {return [];});})}
              >
                <Typography>Clear Selection</Typography>
              </Button>
        
        </div>
            </Grid>
        <Grid item xs={12} lg={12} className={classes.playerCards}>
      {cardArray.map((card, idx) => (
        <JassCard
          key={idx}
          value={card}
          /*color={(card[1]==='S'||card[1]==='C')?'black':'red'}*/
          active={activeCard===card}
          selected={activeCard===card}
          onClick={(e) => {handleCard(card)}}
        />
        ))}
      </Grid>
    </>
  );
}

export default DogGame;