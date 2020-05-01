import animals from "./utils/animals.json";

export function getEmptyHomeField(selected, field, gameBalls)***REMOVED***
  const playerHomes=[64,68,72,76];
  const ballColor = Math.floor(gameBalls.indexOf(field)/4);
  for(var j=0;j<4;++j)***REMOVED***
    if(!gameBalls.includes(playerHomes[ballColor]+j) && !selected.includes(playerHomes[ballColor]+j))***REMOVED***
      return playerHomes[ballColor]+j;
***REMOVED***
***REMOVED***
  alert("wow, you've found a bug!");
***REMOVED***

export function isMyBall(field,gameBalls,orderMyPosition)***REMOVED***
  if(gameBalls.slice(orderMyPosition*4,(orderMyPosition*4)+4).includes(field))***REMOVED***
    return true;
***REMOVED***
  return false;
***REMOVED***

export function isHomeField(field)***REMOVED***
  return [64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79].includes(field);
***REMOVED***

export function isMyFinish(field,orderMyPosition)***REMOVED***
  const mult = (orderMyPosition*4);
  return [80+mult,81+mult,82+mult,83+mult].includes(field);
***REMOVED***

export function isPartnerBall(field,gameBalls,orderMyPosition)***REMOVED***
  const partner = (orderMyPosition+2)%4;
  if(gameBalls.slice(partner*4,(partner*4)+4).includes(field))***REMOVED***
    return true;
***REMOVED***
  return false;
***REMOVED***

export function iHaveFinished(gameBalls,orderMyPosition)***REMOVED***
  const myBalls = gameBalls.slice(orderMyPosition*4,(orderMyPosition*4)+4);
  const allFinishes = [80,84,88,92];
  const playerFinishStart = allFinishes[orderMyPosition];
  for(var i=0;i<4;i++)***REMOVED***
    if(!myBalls.includes(playerFinishStart+i)) return false;
***REMOVED***
  return true;
***REMOVED***
export function getLastField(field)***REMOVED***
  if(field >= 92)***REMOVED***
    return 48;
***REMOVED***else if(field >= 88)***REMOVED***
    return 32;
***REMOVED***else if(field >= 84)***REMOVED***
    return 16;
***REMOVED***else***REMOVED***
    return 64;
***REMOVED***
***REMOVED***



export function trim(str, maxlen) ***REMOVED***
  if (str.length <= maxlen) return str;
  return str.substring(0, maxlen) + "…";
***REMOVED***

export function generateName() ***REMOVED***
  // Source: https://a-z-animals.com/animals/
  return "Anonymous " + animals[Math.floor(Math.random() * animals.length)];
***REMOVED***

function reverseComparer( a, b ) ***REMOVED***
  return a.time > b.time ? -1 : 1;
***REMOVED***

export function calcTurnTimes(game)***REMOVED***
  const DEFAULT_MOVE_TIME = 50000;
  const THRES_MOVE_TIME = 60000;
  let moveTimes = [0,0,0,0];
  let moveCount = [0,0,0,0];
  let jokerCount = [0,0,0,0];
  let akCount = [0,0,0,0];
  let sendCount = [0,0,0,0];
  let hist = [...Object.values(game.history)];
  hist.sort(reverseComparer);
  let prevTime = 0;
  let thisTime = 0;
  let playerToStart = 0;
  let popp = ***REMOVED******REMOVED***;
  while(hist.length > 0)***REMOVED***
    for(let numCards=6;numCards>=2;--numCards)***REMOVED***
      let thrown = [false, false, false, false];
      let firstTurn = true;
      for(let j=0;j<numCards;++j)***REMOVED***
        for(let k=0;k<4;++k)***REMOVED***
          let i = (playerToStart+k)%4;
          if(hist.length===0)***REMOVED***
            let avgMoveTimes = moveTimes.map((value,idx) => ***REMOVED***return ((value*0.001)/moveCount[idx]).toFixed(2);***REMOVED***);
            return ***REMOVED***moveTimes, moveCount, avgMoveTimes, jokerCount, akCount, sendCount***REMOVED***;
***REMOVED***
          if(!thrown[i])***REMOVED***
            if(hist[hist.length-1].card === "YY")***REMOVED***
              thrown[i] = true;
***REMOVED***
            if(!firstTurn)***REMOVED***
              popp = hist.pop();
              if(popp.card.charAt(0) === "Z") jokerCount[i]++;
              if(popp.card.charAt(0) === "A" || popp.card.charAt(0) === "K") akCount[i]++;
              if(popp.selection)***REMOVED*** // Thief 2 has no selection
                for(var s = 1; s < popp.selection.length; s+=2)***REMOVED***
                  if(popp.selection[s] >= 64 && popp.selection[s] < 80 && popp.selection[s] !== popp.selection[s-1]) sendCount[i]++;
    ***REMOVED***
  ***REMOVED***
              thisTime = popp.time;
              if(thisTime - prevTime > THRES_MOVE_TIME)***REMOVED***
                moveTimes[i] += DEFAULT_MOVE_TIME;
  ***REMOVED***else***REMOVED***
                moveTimes[i] += thisTime - prevTime;
  ***REMOVED***
              moveCount[i]++;
              prevTime = thisTime;
***REMOVED***else***REMOVED***
              popp = hist.pop();
              if(popp.card.charAt(0) === "Z") jokerCount[i]++;
              if(popp.card.charAt(0) === "A" || popp.card.charAt(0) === "K") akCount[i]++;
              if(popp.selection)***REMOVED*** // Thief 2 has no selection
                for(var t = 1; t < popp.selection.length; t+=2)***REMOVED***
                  if(popp.selection[t] >= 64 && popp.selection[t] < 80 && popp.selection[t] !== popp.selection[t-1]) sendCount[i]++;
    ***REMOVED***
  ***REMOVED***
              prevTime = popp.time;
              firstTurn = false;
***REMOVED***

***REMOVED***
***REMOVED***
***REMOVED***
      playerToStart++;
***REMOVED***
***REMOVED***
***REMOVED***

export function initialBallLocations()***REMOVED***
  return [64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79];
***REMOVED***

export function randomCards(n)***REMOVED***
  const colors = ['C','D','S','H'];
  const rank = ['A','2','3','4','5','6','7','8','9','T','J','Q','K','Z']; // Z equals to Joker
  var a = '';
  var b = '';
  var card = '';
  var out = [];
  while(out.length < 4*n)***REMOVED***
    a = Math.floor(Math.random() * 14);
    b = Math.floor(Math.random() * 4);
    card = ''+rank[a]+colors[b];
    if(!out.includes(card)) out.push(card);
***REMOVED***
  return [out.slice(0,n),out.slice(n,2*n),out.slice(2*n,3*n),out.slice(3*n,4*n)];
***REMOVED***

export function makeHands(n)***REMOVED***
  return randomCards(n);
***REMOVED***


export function computeRandomState(game) ***REMOVED***
  const history = [];
  if(game.history) ***REMOVED***
    for (const event of Object.values(game.history)) ***REMOVED***
      history.push(event);
***REMOVED***
***REMOVED***
  return ***REMOVED***history***REMOVED***;
***REMOVED***
