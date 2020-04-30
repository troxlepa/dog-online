import React, ***REMOVED*** useEffect, useState, useCallback, useMemo ***REMOVED*** from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import SnackContent from "./SnackContent";
import ***REMOVED*** makeStyles ***REMOVED*** from "@material-ui/core/styles";
import ***REMOVED*** animated, useSprings ***REMOVED*** from "react-spring";
import Board from "../assets/board.svg";
import ***REMOVED*** SvgLoader, SvgProxy ***REMOVED*** from 'react-svgmt';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import JassCard from "../components/JassCard";

// gameState.ballLocations
// gameState.history

const useStyles = makeStyles(***REMOVED***
  gameContainer: ***REMOVED***
    display: "flex",
    margin: "10px auto",
    flexShrink: 0,
    justifyContent: "center",
    "& > *": ***REMOVED***
      position: "absolute"
***REMOVED***
***REMOVED***,
  gameBoard: ***REMOVED***
    display: "flex"
***REMOVED***,
  playerCards: ***REMOVED***
    display: "flex",
    flex:1,
    borderTop: "1px solid lightgray",
    justifyContent: "flex-end"
***REMOVED***,
  controlButtons: ***REMOVED***
  	display: "flex",
  	position: "fixed",
  	"& > *": ***REMOVED***
      margin: "3px"
***REMOVED***
***REMOVED***
***REMOVED***);

function DogGame(***REMOVED*** game, gameState, spectating, onSubmit ***REMOVED***) ***REMOVED***
	const classes = useStyles();
	const [state, setSelected] = useState([]);
	const [randomState, setState] = useState([]);
	const [snack, setSnack] = useState(***REMOVED*** open: false ***REMOVED***);
	const [activeCards, setCardState] = useState([]);


  	const cardArray = randomCards(5);


  useEffect(() => ***REMOVED***
    setSelected(***REMOVED***selected:[],card:''***REMOVED***);
***REMOVED***, [game]);

  useEffect(() => ***REMOVED***
    setState([19,30,64,45,70,71,25,51,50,72,36,4,34,11,77,61]);
***REMOVED***, [game]);

  useEffect(() => ***REMOVED***
    setCardState([]);
***REMOVED***, [game]);

   const handleCard = useCallback(
    card => ***REMOVED***
    	console.log('you played a ' + card);
      if (spectating) return;
      setCardState(activeCard => ***REMOVED***
      	if(activeCards.includes(card))***REMOVED***
      		return [];
      	***REMOVED***else***REMOVED***
            return activeCards;
      	***REMOVED***
***REMOVED***);
***REMOVED***
    [spectating]
  );

  const clickHandlers = useMemo(() => ***REMOVED***
    const obj = ***REMOVED******REMOVED***;
    console.log('hey dude!');
    console.log(activeCards);
    for (const card of cardArray) ***REMOVED***
      obj[card] = () => handleCard(card);
***REMOVED***
    return obj;
***REMOVED***, [handleCard]);

  const handleClick = useCallback(
    (isCard,card,field,isBall) => ***REMOVED***
      if (spectating) return;
      if(isCard)***REMOVED***
      	setSelected(state => ***REMOVED***
      		console.log(isCard);
      	***REMOVED***);
***REMOVED***
      setSelected(state => ***REMOVED***
	      console.log(state.selected);
	      var firstChoice = state.selected.length % 2 == 0;
	      console.log(firstChoice);
	      if(state.selected.includes(field))***REMOVED***
	        state.selected.splice(state.selected.indexOf(field), 1);
	        return [...state.selected];
	***REMOVED***
	      if ((firstChoice && !isBall) || (!firstChoice && isBall)) return [...state.selected];
        if (state.selected.includes(field)) ***REMOVED***
          state.selected.splice(state.selected.indexOf(field), 1);
          // console.log(field + ' removed from selection');
          return [...state.selected];
***REMOVED*** else ***REMOVED***
          console.log('FUNN!');
          // console.log([...selected, field]);
          return [...state.selected, field];
***REMOVED***
***REMOVED***);
***REMOVED***
    [spectating]
  );



  /*const clickHandlers = useMemo(() => ***REMOVED***
    const obj = ***REMOVED******REMOVED***;
    for (const card of generateCards()) ***REMOVED***
      obj[card] = () => handleClick(card);
***REMOVED***
    return obj;
***REMOVED***, [handleClick]);*/


  /*function addActiveClass(node)***REMOVED***
  	console.log(node.originalTarget.attributes[1].value);
  		var id = node.originalTarget.attributes[1].value;
  		var idx = parseInt(id.substring(1,3));
  		active[idx] = !active[idx];
***REMOVED****/

	function initialBallLocations()***REMOVED***
		return [64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79];
	***REMOVED***
	var ballLocations = initialBallLocations();
	var active = new Array(85);

	// var randomState = [19,30,64,45,70,71,25,51,50,72,36,4,34,11,77,61]; //genRandomStone();

	const allFields = [...Array(96).keys()];
	function genRandomStone()***REMOVED***
		var arr = [];
		const min = 0;
	    const max = 63;
		for(var i=0;i<16;++i)***REMOVED***
			arr.push(Math.floor(min + Math.random() * (max - min)));
		***REMOVED***
		return arr;
	***REMOVED***

	function randomStone()***REMOVED***
		const min = 0;
	    const max = 62;
		const rand = Math.floor(min + Math.random() * (max - min));
		var element = "#f"+rand;
		return (element);
	***REMOVED***;

	function setStone(nr)***REMOVED***
		return ("#f"+nr);
	***REMOVED***

	function setColor(index)***REMOVED***
		switch(parseInt(index/4))***REMOVED***
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
		***REMOVED***
	***REMOVED***

	function checkTurnValidity()***REMOVED***
		return state.selected.length % 2 === 0;
	***REMOVED***
	function randomCards(n)***REMOVED***
		const colors = ['C','D','S','H'];
		const rank = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
		var out = [];
		for(var i=0;i<n;++i)***REMOVED***
			var a = Math.floor(Math.random() * 13);
			var b = Math.floor(Math.random() * 3);
			out.push(''+rank[a]+colors[b]);
		***REMOVED***
		return out;
	***REMOVED***
	const submitSelection = useCallback(
	  () => ***REMOVED***
  		console.log('submit');
  		if(checkTurnValidity())***REMOVED***
  			for(var i=0;i<state.selected.length;i+=2)***REMOVED***
  				randomState[randomState.indexOf(state.selected[i])] = state.selected[i+1];
  			***REMOVED***
  		***REMOVED***else***REMOVED***
	  		setSnack(***REMOVED***
	            open: true,
	            variant: "error",
	            message: "Invalid turn!"
	***REMOVED***);
			return;
  		***REMOVED***
  		if(activeCards == null)***REMOVED***
  			console.log('no card selected');
			return;
  		***REMOVED***
  		onSubmit(state);
  		setSelected(state => ***REMOVED***return ***REMOVED***selected:[],card:''***REMOVED***;***REMOVED***);
  		setState(randomState);
  		setCardState(null);
  		setSnack(***REMOVED***
                open: true,
                variant: "success",
                message: "Turn applied."
  ***REMOVED***);
  	***REMOVED***
  	);
	const sampleCard= ***REMOVED***rank: '2', color:'S'***REMOVED***
	return (
		<>
		<Grid item xs=***REMOVED***12***REMOVED*** lg=***REMOVED***12***REMOVED*** className=***REMOVED***classes.gameBoard***REMOVED***>
		<div className=***REMOVED***classes.gameContainer***REMOVED***>
			<SvgLoader path=***REMOVED***Board***REMOVED***>
  				***REMOVED***/****REMOVED***ballLocations.map((ball, ix) => (
          			<SvgProxy key=***REMOVED***ix***REMOVED*** selector=***REMOVED***setStone(ball)***REMOVED*** class=***REMOVED***setColor(ix)***REMOVED*** /> //***REMOVED***setColor(ix)***REMOVED***  ***REMOVED***setStone(ball)***REMOVED***
        		))***REMOVED***;*/***REMOVED***

        		***REMOVED***allFields.map((field, ix) => (
        			randomState.includes(field) ?
						(<SvgProxy key=***REMOVED***ix***REMOVED*** selector=***REMOVED***setStone(field)***REMOVED*** onClick=***REMOVED***(node) => ***REMOVED***handleClick(false,sampleCard,field,true)***REMOVED******REMOVED*** class=***REMOVED***"ball" + " " + setColor(randomState.indexOf(field)) + " " + (state.selected.includes(field) ? 'active': '') ***REMOVED*** /> //***REMOVED***setColor(ix)***REMOVED***  ***REMOVED***setStone(ball)***REMOVED***
        			) : (
          				<SvgProxy key=***REMOVED***ix***REMOVED*** selector=***REMOVED***setStone(field)***REMOVED*** onClick=***REMOVED***(node) => ***REMOVED***handleClick(false,sampleCard,field,false)***REMOVED******REMOVED*** class=***REMOVED***"white" + " " + (state.selected.includes(field) ? 'active': '') + " " + (state.selected.length % 2 == 0 ? '' : 'destination') ***REMOVED*** /> //***REMOVED***setColor(ix)***REMOVED***  ***REMOVED***setStone(ball)***REMOVED***
        			)
        		))***REMOVED***;
			</SvgLoader>
		</div>
		<div className=***REMOVED***classes.controlButtons***REMOVED***>
		
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick=***REMOVED***submitSelection***REMOVED***
              >
                <Typography>Submit Turn</Typography>
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled=***REMOVED***state.selected.length == 0 ? true : false***REMOVED***
                onClick=***REMOVED***useCallback(() => ***REMOVED***setSelected(selected => ***REMOVED***return ***REMOVED***selected:[],card:''***REMOVED***;***REMOVED***);***REMOVED***)***REMOVED***
              >
                <Typography>Clear Selection</Typography>
              </Button>
        
        </div>
            </Grid>
        <Grid item xs=***REMOVED***12***REMOVED*** lg=***REMOVED***12***REMOVED*** className=***REMOVED***classes.playerCards***REMOVED***>
      ***REMOVED***cardArray.map((card, idx) => (
	      <JassCard
	      	key=***REMOVED***idx***REMOVED***
	        value=***REMOVED***card***REMOVED***
	        /*color=***REMOVED***(card[1]==='S'||card[1]==='C')?'black':'red'***REMOVED****/
	        active=***REMOVED***activeCards.includes(card) ? 'active' : ''***REMOVED***
	        selected=***REMOVED***activeCards ? activeCards.includes(card) : null***REMOVED***
	        onClick=***REMOVED***(e) => ***REMOVED***handleClick(true,***REMOVED***rank:card[0],color:card[1]***REMOVED***,0/*sampleField*/,)***REMOVED******REMOVED***//clickHandlers[card]***REMOVED***
	      />
      	))***REMOVED***
      </Grid>
		</>
	);
***REMOVED***

export default DogGame;


import React, ***REMOVED*** useEffect, useState, useCallback, useMemo ***REMOVED*** from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import SnackContent from "./SnackContent";
import ***REMOVED*** makeStyles ***REMOVED*** from "@material-ui/core/styles";
import ***REMOVED*** animated, useSprings ***REMOVED*** from "react-spring";
import Board from "../assets/board.svg";
import ***REMOVED*** SvgLoader, SvgProxy ***REMOVED*** from 'react-svgmt';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import JassCard from "../components/JassCard";

// gameState.ballLocations
// gameState.history

const useStyles = makeStyles(***REMOVED***
  gameContainer: ***REMOVED***
    display: "flex",
    margin: "10px auto",
    flexShrink: 0,
    justifyContent: "center",
    "& > *": ***REMOVED***
      position: "absolute"
***REMOVED***
***REMOVED***,
  gameBoard: ***REMOVED***
    display: "flex"
***REMOVED***,
  playerCards: ***REMOVED***
    display: "flex",
    flex:1,
    borderTop: "1px solid lightgray",
    justifyContent: "flex-end"
***REMOVED***,
  controlButtons: ***REMOVED***
    display: "flex",
    position: "fixed",
    "& > *": ***REMOVED***
      margin: "3px"
***REMOVED***
***REMOVED***
***REMOVED***);

function DogGame(***REMOVED*** game, gameState, spectating, onSubmit ***REMOVED***) ***REMOVED***
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [randomState, setState] = useState([]);
  const [snack, setSnack] = useState(***REMOVED*** open: false ***REMOVED***);
  const [activeCards, setCardState] = useState([]);


    const card = 0;
    const cardArray = randomCards(5);


  useEffect(() => ***REMOVED***
    setSelected([]);
***REMOVED***, [game]);

  useEffect(() => ***REMOVED***
    setState([19,30,64,45,70,71,25,51,50,72,36,4,34,11,77,61]);
***REMOVED***, [game]);

  useEffect(() => ***REMOVED***
    setCardState([]);
***REMOVED***, [game]);

   const handleCard = useCallback(
    card => ***REMOVED***
      console.log('you played a ' + card);
      if (spectating) return;
      setCardState(activeCard => ***REMOVED***
        if(activeCards.includes(card))***REMOVED***
          return -1;
***REMOVED***else***REMOVED***
            return activeCards;
***REMOVED***
***REMOVED***);
***REMOVED***
    [spectating]
  );

  const clickHandlers = useMemo(() => ***REMOVED***
    const obj = ***REMOVED******REMOVED***;
    for (const card of cardArray) ***REMOVED***
      obj[card] = () => handleCard(card);
***REMOVED***
    return obj;
***REMOVED***, [handleCard]);

  const handleClick = useCallback(
    (field,isBall) => ***REMOVED***
      if (spectating) return;
      setSelected(selected => ***REMOVED***
        console.log(selected);
        var firstChoice = selected.length % 2 == 0;
        console.log(firstChoice);
        if(selected.includes(field))***REMOVED***
          selected.splice(selected.indexOf(field), 1);
          return [...selected];
***REMOVED***
        if ((firstChoice && !isBall) || (!firstChoice && isBall)) return [...selected];
        if (selected.includes(field)) ***REMOVED***
          selected.splice(selected.indexOf(field), 1);
          // console.log(field + ' removed from selection');
          return [...selected];
***REMOVED*** else ***REMOVED***
          console.log('FUNN!');
          // console.log([...selected, field]);
          return [...selected, field];
***REMOVED***
***REMOVED***);
***REMOVED***
    [spectating]
  );



  /*const clickHandlers = useMemo(() => ***REMOVED***
    const obj = ***REMOVED******REMOVED***;
    for (const card of generateCards()) ***REMOVED***
      obj[card] = () => handleClick(card);
***REMOVED***
    return obj;
***REMOVED***, [handleClick]);*/


  /*function addActiveClass(node)***REMOVED***
    console.log(node.originalTarget.attributes[1].value);
      var id = node.originalTarget.attributes[1].value;
      var idx = parseInt(id.substring(1,3));
      active[idx] = !active[idx];
***REMOVED****/

  function initialBallLocations()***REMOVED***
    return [64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79];
***REMOVED***
  var ballLocations = initialBallLocations();
  var active = new Array(85);

  // var randomState = [19,30,64,45,70,71,25,51,50,72,36,4,34,11,77,61]; //genRandomStone();

  const allFields = [...Array(96).keys()];
  function genRandomStone()***REMOVED***
    var arr = [];
    const min = 0;
      const max = 63;
    for(var i=0;i<16;++i)***REMOVED***
      arr.push(Math.floor(min + Math.random() * (max - min)));
***REMOVED***
    return arr;
***REMOVED***

  function randomStone()***REMOVED***
    const min = 0;
      const max = 62;
    const rand = Math.floor(min + Math.random() * (max - min));
    var element = "#f"+rand;
    return (element);
***REMOVED***;

  function setStone(nr)***REMOVED***
    return ("#f"+nr);
***REMOVED***

  function setColor(index)***REMOVED***
    switch(parseInt(index/4))***REMOVED***
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
***REMOVED***
***REMOVED***

  function checkTurnValidity()***REMOVED***
    return selected.length % 2 === 0;
***REMOVED***
  function randomCards(n)***REMOVED***
    const colors = ['C','D','S','H'];
    const rank = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    var out = [];
    for(var i=0;i<n;++i)***REMOVED***
      var a = Math.floor(Math.random() * 13);
      var b = Math.floor(Math.random() * 3);
      out.push(''+rank[a]+colors[b]);
***REMOVED***
    return out;
***REMOVED***
  const submitSelection = useCallback(
    () => ***REMOVED***
      console.log('submit');
      if(checkTurnValidity())***REMOVED***
        for(var i=0;i<selected.length;i+=2)***REMOVED***
          randomState[randomState.indexOf(selected[i])] = selected[i+1];
***REMOVED***
***REMOVED***else***REMOVED***
        setSnack(***REMOVED***
              open: true,
              variant: "error",
              message: "Invalid turn!"
***REMOVED***);
      return;
***REMOVED***
      if(card == null)***REMOVED***
        console.log('no card selected');
      return;
***REMOVED***
      onSubmit(selected);
      setSelected(selected => ***REMOVED***return [];***REMOVED***);
      setState(randomState);
      setCardState(null);
      setSnack(***REMOVED***
                open: true,
                variant: "success",
                message: "Turn applied."
  ***REMOVED***);
***REMOVED***
    );

  return (
    <>
    <Grid item xs=***REMOVED***12***REMOVED*** lg=***REMOVED***12***REMOVED*** className=***REMOVED***classes.gameBoard***REMOVED***>
    <div className=***REMOVED***classes.gameContainer***REMOVED***>
      <SvgLoader path=***REMOVED***Board***REMOVED***>
          ***REMOVED***/****REMOVED***ballLocations.map((ball, ix) => (
                <SvgProxy key=***REMOVED***ix***REMOVED*** selector=***REMOVED***setStone(ball)***REMOVED*** class=***REMOVED***setColor(ix)***REMOVED*** /> //***REMOVED***setColor(ix)***REMOVED***  ***REMOVED***setStone(ball)***REMOVED***
            ))***REMOVED***;*/***REMOVED***

            ***REMOVED***allFields.map((field, ix) => (
              randomState.includes(field) ?
            (<SvgProxy key=***REMOVED***ix***REMOVED*** selector=***REMOVED***setStone(field)***REMOVED*** onClick=***REMOVED***(node) => ***REMOVED***handleClick(field,true)***REMOVED******REMOVED*** class=***REMOVED***"ball" + " " + setColor(randomState.indexOf(field)) + " " + (selected.includes(field) ? 'active': '') ***REMOVED*** /> //***REMOVED***setColor(ix)***REMOVED***  ***REMOVED***setStone(ball)***REMOVED***
              ) : (
                  <SvgProxy key=***REMOVED***ix***REMOVED*** selector=***REMOVED***setStone(field)***REMOVED*** onClick=***REMOVED***(node) => ***REMOVED***handleClick(field,false)***REMOVED******REMOVED*** class=***REMOVED***"white" + " " + (selected.includes(field) ? 'active': '') + " " + (selected.length % 2 == 0 ? '' : 'destination') ***REMOVED*** /> //***REMOVED***setColor(ix)***REMOVED***  ***REMOVED***setStone(ball)***REMOVED***
              )
            ))***REMOVED***;
      </SvgLoader>
    </div>
    <div className=***REMOVED***classes.controlButtons***REMOVED***>
    
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick=***REMOVED***submitSelection***REMOVED***
              >
                <Typography>Submit Turn</Typography>
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled=***REMOVED***selected.length == 0 ? true : false***REMOVED***
                onClick=***REMOVED***useCallback(() => ***REMOVED***setSelected(selected => ***REMOVED***return [];***REMOVED***);***REMOVED***)***REMOVED***
              >
                <Typography>Clear Selection</Typography>
              </Button>
        
        </div>
            </Grid>
        <Grid item xs=***REMOVED***12***REMOVED*** lg=***REMOVED***12***REMOVED*** className=***REMOVED***classes.playerCards***REMOVED***>
      ***REMOVED***cardArray.map((card, idx) => (
          console.log(card),
        <JassCard
          key=***REMOVED***idx***REMOVED***
          value=***REMOVED***card***REMOVED***
          /*color=***REMOVED***(card[1]==='S'||card[1]==='C')?'black':'red'***REMOVED****/
          active=***REMOVED***activeCards.includes(card) ? 'active' : ''***REMOVED***
          selected=***REMOVED***activeCards ? activeCards.includes(card) : null***REMOVED***
          onClick=***REMOVED***clickHandlers[card]***REMOVED***
        />
        ))***REMOVED***
      </Grid>
    </>
  );
***REMOVED***

export default DogGame;


import React, ***REMOVED*** useEffect, useState, useCallback, useMemo ***REMOVED*** from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import SnackContent from "./SnackContent";
import ***REMOVED*** makeStyles ***REMOVED*** from "@material-ui/core/styles";
import ***REMOVED*** animated, useSprings ***REMOVED*** from "react-spring";
import Board from "../assets/board.svg";
import ***REMOVED*** SvgLoader, SvgProxy ***REMOVED*** from 'react-svgmt';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import JassCard from "../components/JassCard";

// gameState.ballLocations
// gameState.history

const useStyles = makeStyles(***REMOVED***
  gameContainer: ***REMOVED***
    display: "flex",
    margin: "10px auto",
    flexShrink: 0,
    justifyContent: "center",
    "& > *": ***REMOVED***
      position: "absolute"
***REMOVED***
***REMOVED***,
  gameBoard: ***REMOVED***
    display: "flex"
***REMOVED***,
  playerCards: ***REMOVED***
    display: "flex",
    flex:1,
    borderTop: "1px solid lightgray",
    justifyContent: "flex-end"
***REMOVED***,
  controlButtons: ***REMOVED***
    display: "flex",
    position: "fixed",
    "& > *": ***REMOVED***
      margin: "3px"
***REMOVED***
***REMOVED***
***REMOVED***);

function DogGame(***REMOVED*** game, gameState, spectating, onSubmit ***REMOVED***) ***REMOVED***
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [randomState, setState] = useState([]);
  const [snack, setSnack] = useState(***REMOVED*** open: false ***REMOVED***);
  const [activeCards, setCardState] = useState([]);
  const [cardArray, setCardArray] = useState([]);


    const card = 0;


  useEffect(() => ***REMOVED***
    setSelected([]);
***REMOVED***, [game]);

  useEffect(() => ***REMOVED***
    setState(genRandomStone(16)); // [19,30,64,45,70,71,25,51,50,72,36,4,34,11,77,61]
***REMOVED***, [game]);

  useEffect(() => ***REMOVED***
    setCardArray(['2C','3S','AC', 'KS']); // randomCards(5)
***REMOVED***, [game]);

  useEffect(() => ***REMOVED***
    setCardState([]);
***REMOVED***, [game]);

   const handleCard = useCallback(
    card => ***REMOVED***
      if (spectating) return;
      if(activeCards.includes(card)) return [];
      if(activeCards.length == 1) return [...activeCards];
      setCardState(activeCards => ***REMOVED***
        console.log(activeCards);
        if(activeCards.includes(card))***REMOVED***
          return [...activeCards];
***REMOVED***else***REMOVED***
            return [...activeCards,card];
***REMOVED***
***REMOVED***);
***REMOVED***
    [spectating]
  );


  const handleClick = useCallback(
    (field,isBall) => ***REMOVED***
      if (spectating) return;
      setSelected(selected => ***REMOVED***
        console.log(selected);
        var firstChoice = selected.length % 2 === 0;
        console.log(firstChoice);
        if(selected.includes(field))***REMOVED***
          selected.splice(selected.indexOf(field), 1);
          return [...selected];
***REMOVED***
        if ((firstChoice && !isBall) || (!firstChoice && isBall)) return [...selected];
        if (selected.includes(field)) ***REMOVED***
          selected.splice(selected.indexOf(field), 1);
          // console.log(field + ' removed from selection');
          return [...selected];
***REMOVED*** else ***REMOVED***
          console.log('FUNN!');
          // console.log([...selected, field]);
          return [...selected, field];
***REMOVED***
***REMOVED***);
***REMOVED***
    [spectating]
  );


  function initialBallLocations()***REMOVED***
    return [64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79];
***REMOVED***
  var ballLocations = initialBallLocations();

  const allFields = [...Array(96).keys()];

  function genRandomStone(n)***REMOVED***
    var arr = [];
    const min = 0;
      const max = 63;
    for(var i=0;i<n;++i)***REMOVED***
      arr.push(Math.floor(min + Math.random() * (max - min)));
***REMOVED***
    return arr;
***REMOVED***

  function setStone(nr)***REMOVED***
    return ("#f"+nr);
***REMOVED***

  function setColor(index)***REMOVED***
    switch(parseInt(index/4))***REMOVED***
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
***REMOVED***
***REMOVED***

  function checkTurnValidity()***REMOVED***
    return selected.length % 2 === 0;
***REMOVED***
  function randomCards(n)***REMOVED***
    const colors = ['C','D','S','H'];
    const rank = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    var out = [];
    for(var i=0;i<n;++i)***REMOVED***
      var a = Math.floor(Math.random() * 13);
      var b = Math.floor(Math.random() * 3);
      out.push(''+rank[a]+colors[b]);
***REMOVED***
    return out;
***REMOVED***
  const submitSelection = useCallback(
    () => ***REMOVED***
      console.log('submit');
      if(checkTurnValidity())***REMOVED***
        for(var i=0;i<selected.length;i+=2)***REMOVED***
          randomState[randomState.indexOf(selected[i])] = selected[i+1];
***REMOVED***
***REMOVED***else***REMOVED***
        setSnack(***REMOVED***
              open: true,
              variant: "error",
              message: "Invalid turn!"
***REMOVED***);
      return;
***REMOVED***
      if(card == null)***REMOVED***
        console.log('no card selected');
      return;
***REMOVED***
      onSubmit(selected);
      setSelected(selected => ***REMOVED***return [];***REMOVED***);
      setState(randomState);
      setCardState(null);
      setSnack(***REMOVED***
                open: true,
                variant: "success",
                message: "Turn applied."
  ***REMOVED***);
***REMOVED***
    );

  return (
    <>
    <Grid item xs=***REMOVED***12***REMOVED*** lg=***REMOVED***12***REMOVED*** className=***REMOVED***classes.gameBoard***REMOVED***>
    <div className=***REMOVED***classes.gameContainer***REMOVED***>
      <SvgLoader path=***REMOVED***Board***REMOVED***>
          ***REMOVED***/****REMOVED***ballLocations.map((ball, ix) => (
                <SvgProxy key=***REMOVED***ix***REMOVED*** selector=***REMOVED***setStone(ball)***REMOVED*** class=***REMOVED***setColor(ix)***REMOVED*** /> //***REMOVED***setColor(ix)***REMOVED***  ***REMOVED***setStone(ball)***REMOVED***
            ))***REMOVED***;*/***REMOVED***

            ***REMOVED***allFields.map((field, ix) => (
              randomState.includes(field) ?
            (<SvgProxy key=***REMOVED***ix***REMOVED*** selector=***REMOVED***setStone(field)***REMOVED*** onClick=***REMOVED***(node) => ***REMOVED***handleClick(field,true)***REMOVED******REMOVED*** class=***REMOVED***"ball" + " " + setColor(randomState.indexOf(field)) + " " + (selected.includes(field) ? "active": "") ***REMOVED*** /> //***REMOVED***setColor(ix)***REMOVED***  ***REMOVED***setStone(ball)***REMOVED***
              ) : (
                  <SvgProxy key=***REMOVED***ix***REMOVED*** selector=***REMOVED***setStone(field)***REMOVED*** onClick=***REMOVED***(node) => ***REMOVED***handleClick(field,false)***REMOVED******REMOVED*** class=***REMOVED***"white" + " " + (selected.includes(field) ? "active": "") + " " + (selected.length % 2 === 0 ? "" : "destination") ***REMOVED*** /> //***REMOVED***setColor(ix)***REMOVED***  ***REMOVED***setStone(ball)***REMOVED***
              )
            ))***REMOVED***;
      </SvgLoader>
    </div>
    <div className=***REMOVED***classes.controlButtons***REMOVED***>
    
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick=***REMOVED***submitSelection***REMOVED***
              >
                <Typography>Submit Turn</Typography>
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled=***REMOVED***selected.length === 0 ? true : false***REMOVED***
                onClick=***REMOVED***useCallback(() => ***REMOVED***setSelected(selected => ***REMOVED***return [];***REMOVED***);***REMOVED***)***REMOVED***
              >
                <Typography>Clear Selection</Typography>
              </Button>
        
        </div>
            </Grid>
        <Grid item xs=***REMOVED***12***REMOVED*** lg=***REMOVED***12***REMOVED*** className=***REMOVED***classes.playerCards***REMOVED***>
      ***REMOVED***cardArray.map((card, idx) => (
        <JassCard
          key=***REMOVED***idx***REMOVED***
          value=***REMOVED***card***REMOVED***
          /*color=***REMOVED***(card[1]==='S'||card[1]==='C')?'black':'red'***REMOVED****/
          active=***REMOVED***activeCards.includes(card)***REMOVED***
          selected=***REMOVED***activeCards ? activeCards.includes(card) : null***REMOVED***
          onClick=***REMOVED***(e) => ***REMOVED***handleCard(card)***REMOVED******REMOVED***
        />
        ))***REMOVED***
      </Grid>
    </>
  );
***REMOVED***

export default DogGame;


import React, ***REMOVED*** useEffect, useState, useCallback, useMemo ***REMOVED*** from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import SnackContent from "./SnackContent";
import ***REMOVED*** makeStyles ***REMOVED*** from "@material-ui/core/styles";
import ***REMOVED*** animated, useSprings ***REMOVED*** from "react-spring";
import Board from "../assets/board.svg";
import ***REMOVED*** SvgLoader, SvgProxy ***REMOVED*** from 'react-svgmt';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import JassCard from "../components/JassCard";

// gameState.ballLocations
// gameState.history

const useStyles = makeStyles(***REMOVED***
  gameContainer: ***REMOVED***
    display: "flex",
    margin: "10px auto",
    flexShrink: 0,
    justifyContent: "center",
    "& > *": ***REMOVED***
      position: "absolute"
***REMOVED***
***REMOVED***,
  gameBoard: ***REMOVED***
    display: "flex"
***REMOVED***,
  playerCards: ***REMOVED***
    display: "flex",
    flex:1,
    borderTop: "1px solid lightgray",
    justifyContent: "flex-end"
***REMOVED***,
  controlButtons: ***REMOVED***
    display: "flex",
    position: "fixed",
    "& > *": ***REMOVED***
      margin: "3px"
***REMOVED***
***REMOVED***
***REMOVED***);

function DogGame(***REMOVED*** game, gameState, spectating, onSubmit ***REMOVED***) ***REMOVED***
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [ballPositions, setState] = useState(game.balls);
  const [snack, setSnack] = useState(***REMOVED*** open: false ***REMOVED***);
  const [activeCard, setCardState] = useState('');
  const [cardArray, setCardArray] = useState([]);

  console.log("game:");
  console.log(game);
  useEffect(() => ***REMOVED***
    setSelected([]);
***REMOVED***, [game]);

  useEffect(() => ***REMOVED***
    
    setState(game.balls); // initialBallLocations() genRandomStone(16)
***REMOVED***, [game]);

  useEffect(() => ***REMOVED***
    setCardArray(randomCards(5)); // randomCards(5)
***REMOVED***, [game]);

  useEffect(() => ***REMOVED***
    setCardState('');
***REMOVED***, [game]);

   const handleCard = useCallback(
    card => ***REMOVED***
      if (spectating) return;
      if(activeCard === card) return '';
      setCardState(activeCard => ***REMOVED***
        return card;
***REMOVED***);
***REMOVED***
    [spectating]
  );


  const handleClick = useCallback(
    (field,isBall) => ***REMOVED***
      if (spectating) return;
      setSelected(selected => ***REMOVED***
        console.log(selected);
        var firstChoice = selected.length % 2 === 0;
        console.log(firstChoice);
        if(selected.includes(field))***REMOVED***
          selected.splice(selected.indexOf(field), 1);
          return [...selected];
***REMOVED***
        // ball selected
        if(!firstChoice)***REMOVED***
          console.log('not first choice' + activeCard.substring(0,1));
          if(activeCard.substring(0,1) == 'J')***REMOVED***
            console.log('maybe not a ball' + activeCard);
            console.log(ballPositions);
            if(!ballPositions.includes(field)) return [];
            return [...selected,field];
***REMOVED***
***REMOVED***
        if ((firstChoice && !isBall) || (!firstChoice && isBall)) return [...selected];
        if (selected.includes(field)) ***REMOVED***
          selected.splice(selected.indexOf(field), 1);
          // console.log(field + ' removed from selection');
          return [...selected];
***REMOVED*** else ***REMOVED***
          console.log('FUNN!');
          // console.log([...selected, field]);
          return [...selected, field];
***REMOVED***
***REMOVED***);
***REMOVED***
    [spectating,activeCard]
  );

  // var ballLocations = initialBallLocations();

  const allFields = [...Array(96).keys()];

  function genRandomStone(n)***REMOVED***
    var arr = [];
    const min = 0;
      const max = 63;
    for(var i=0;i<n;++i)***REMOVED***
      arr.push(Math.floor(min + Math.random() * (max - min)));
***REMOVED***
    return arr;
***REMOVED***

  function setStone(nr)***REMOVED***
    return ("#f"+nr);
***REMOVED***

  function setColor(index)***REMOVED***
    switch(parseInt(index/4))***REMOVED***
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
***REMOVED***
***REMOVED***

  function checkTurnValidity()***REMOVED***
    return selected.length % 2 === 0;
***REMOVED***
  function randomCards(n)***REMOVED***
    const colors = ['C','D','S','H'];
    const rank = ['A','J','J','4','5','6','7','8','9','10','J','Q','K'];
    var out = [];
    for(var i=0;i<n-1;++i)***REMOVED***
      var a = Math.floor(Math.random() * 13);
      var b = Math.floor(Math.random() * 3);
      out.push(''+rank[a]+colors[b]);
***REMOVED***
    out.push('JC');
    return out;
***REMOVED***
  function randomCard()***REMOVED***
    const colors = ['C','D','S','H'];
    const rank = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    var a = Math.floor(Math.random() * 13);
    var b = Math.floor(Math.random() * 3);
    return ''+rank[a]+colors[b];
***REMOVED***
  const submitSelection = useCallback(
    () => ***REMOVED***
      console.log('submit');
      if(activeCard == '')***REMOVED***
        console.log('no card selected');
        return;
***REMOVED***
      if(selected.length<2)***REMOVED***
         setSnack(***REMOVED***
              open: true,
              variant: "error",
              message: "Invalid turn!"
***REMOVED***);
     setCardState('');
     return;
***REMOVED***
      if(checkTurnValidity())***REMOVED***
        for(var i=0;i<selected.length;i+=2)***REMOVED***
          if(activeCard.substring(0,1)=='J')***REMOVED***
            const c1 = ballPositions.indexOf(selected[i]);
            const c2 = ballPositions.indexOf(selected[i+1]);
            [ballPositions[c1],ballPositions[c2]] = [ballPositions[c2],ballPositions[c1]];
***REMOVED***else***REMOVED***
            ballPositions[ballPositions.indexOf(selected[i])] = selected[i+1];
***REMOVED***
***REMOVED***
***REMOVED***else***REMOVED***
        setSnack(***REMOVED***
              open: true,
              variant: "error",
              message: "Invalid turn!"
***REMOVED***);
        return;
***REMOVED***
      onSubmit(ballPositions,selected,activeCard);
      setSelected(selected => ***REMOVED***return [];***REMOVED***);
      cardArray.splice(cardArray.indexOf(activeCard), 1);
      setCardArray(cardArray);
      setState(ballPositions);
      setCardState('');
      setSnack(***REMOVED***
                open: true,
                variant: "success",
                message: "Turn applied."
  ***REMOVED***);
***REMOVED***
    );

  return (
    <>
    <Grid item xs=***REMOVED***12***REMOVED*** lg=***REMOVED***12***REMOVED*** className=***REMOVED***classes.gameBoard***REMOVED***>
    <div className=***REMOVED***classes.gameContainer***REMOVED***>
      <SvgLoader path=***REMOVED***Board***REMOVED***>
          ***REMOVED***/****REMOVED***ballLocations.map((ball, ix) => (
                <SvgProxy key=***REMOVED***ix***REMOVED*** selector=***REMOVED***setStone(ball)***REMOVED*** class=***REMOVED***setColor(ix)***REMOVED*** /> //***REMOVED***setColor(ix)***REMOVED***  ***REMOVED***setStone(ball)***REMOVED***
            ))***REMOVED***;*/***REMOVED***

            ***REMOVED***allFields.map((field, ix) => (
              ballPositions.includes(field) ?
            (<SvgProxy key=***REMOVED***ix***REMOVED*** selector=***REMOVED***setStone(field)***REMOVED*** onClick=***REMOVED***(node) => ***REMOVED***handleClick(field,true)***REMOVED******REMOVED*** class=***REMOVED***"ball" + " " + setColor(ballPositions.indexOf(field)) + " " + (selected.includes(field) ? "active": "") ***REMOVED*** /> //***REMOVED***setColor(ix)***REMOVED***  ***REMOVED***setStone(ball)***REMOVED***
              ) : (
                  <SvgProxy key=***REMOVED***ix***REMOVED*** selector=***REMOVED***setStone(field)***REMOVED*** onClick=***REMOVED***(node) => ***REMOVED***handleClick(field,false)***REMOVED******REMOVED*** class=***REMOVED***"white" + " " + (selected.includes(field) ? "active": "") + " " + (selected.length % 2 === 0 ? "" : "destination") ***REMOVED*** /> //***REMOVED***setColor(ix)***REMOVED***  ***REMOVED***setStone(ball)***REMOVED***
              )
            ))***REMOVED***;
      </SvgLoader>
    </div>
    <div className=***REMOVED***classes.controlButtons***REMOVED***>
    
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick=***REMOVED***submitSelection***REMOVED***
              >
                <Typography>Submit Turn</Typography>
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled=***REMOVED***selected.length === 0 ? true : false***REMOVED***
                onClick=***REMOVED***useCallback(() => ***REMOVED***setSelected(selected => ***REMOVED***return [];***REMOVED***);***REMOVED***)***REMOVED***
              >
                <Typography>Clear Selection</Typography>
              </Button>
        
        </div>
            </Grid>
        <Grid item xs=***REMOVED***12***REMOVED*** lg=***REMOVED***12***REMOVED*** className=***REMOVED***classes.playerCards***REMOVED***>
      ***REMOVED***cardArray.map((card, idx) => (
        <JassCard
          key=***REMOVED***idx***REMOVED***
          value=***REMOVED***card***REMOVED***
          /*color=***REMOVED***(card[1]==='S'||card[1]==='C')?'black':'red'***REMOVED****/
          active=***REMOVED***activeCard===card***REMOVED***
          selected=***REMOVED***activeCard===card***REMOVED***
          onClick=***REMOVED***(e) => ***REMOVED***handleCard(card)***REMOVED******REMOVED***
        />
        ))***REMOVED***
      </Grid>
    </>
  );
***REMOVED***

export default DogGame;