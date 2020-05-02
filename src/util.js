import animals from "./utils/animals.json";

export function getEmptyHomeField(selected, field, gameBalls){
  const playerHomes=[64,68,72,76];
  const ballColor = Math.floor(gameBalls.indexOf(field)/4);
  for(var j=0;j<4;++j){
    if(!gameBalls.includes(playerHomes[ballColor]+j) && !selected.includes(playerHomes[ballColor]+j)){
      return playerHomes[ballColor]+j;
    }
  }
  alert("wow, you've found a bug!");
}

export function isMyBall(field,gameBalls,orderMyPosition){
  if(gameBalls.slice(orderMyPosition*4,(orderMyPosition*4)+4).includes(field)){
    return true;
  }
  return false;
}

export function isHomeField(field){

  return field <= 64 && field < 80;
}

export function isMyFinish(field,orderMyPosition){
  const mult = (orderMyPosition*4);
  return [80+mult,81+mult,82+mult,83+mult].includes(field);
}

export function isPartnerBall(field,gameBalls,orderMyPosition){
  const partner = (orderMyPosition+2)%4;
  if(gameBalls.slice(partner*4,(partner*4)+4).includes(field)){
    return true;
  }
  return false;
}

export function iHaveFinished(gameBalls,orderMyPosition){
  const myBalls = gameBalls.slice(orderMyPosition*4,(orderMyPosition*4)+4);
  const allFinishes = [80,84,88,92];
  const playerFinishStart = allFinishes[orderMyPosition];
  for(var i=0;i<4;i++){
    if(!myBalls.includes(playerFinishStart+i)) return false;
  }
  return true;
}

export function getLastField(field){
  if(field >= 92){
    return 48;
  }else if(field >= 88){
    return 32;
  }else if(field >= 84){
    return 16;
  }else{
    return 64;
  }
}

export function trim(str, maxlen) {
  if (str.length <= maxlen) return str;
  return str.substring(0, maxlen) + "…";
}

export function generateName() {
  // Source: https://a-z-animals.com/animals/
  return "Anonymous " + animals[Math.floor(Math.random() * animals.length)];
}

function reverseComparer( a, b ) {

  return a.time > b.time ? -1 : 1;
}

export function calcTurnTimes(game){
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
  let popp = {};
  while(hist.length > 0){
    for(let numCards=6;numCards>=2;--numCards){
      let thrown = [false, false, false, false];
      let firstTurn = true;
      for(let j=0;j<numCards;++j){
        for(let k=0;k<4;++k){
          let i = (playerToStart+k)%4;
          if(hist.length===0){
            let avgMoveTimes = moveTimes.map((value,idx) => {return ((value*0.001)/moveCount[idx]).toFixed(2);});
            return {moveTimes, moveCount, avgMoveTimes, jokerCount, akCount, sendCount};
          }
          if(!thrown[i]){
            if(hist[hist.length-1].card === "YY"){
              thrown[i] = true;
            }
            if(!firstTurn){
              popp = hist.pop();
              if(popp.card.charAt(0) === "Z") jokerCount[i]++;
              if(popp.card.charAt(0) === "A" || popp.card.charAt(0) === "K") akCount[i]++;
              if(popp.selection){ // Thief 2 has no selection
                for(var s = 1; s < popp.selection.length; s+=2){
                  if(popp.selection[s] >= 64 && popp.selection[s] < 80 && popp.selection[s] !== popp.selection[s-1]) sendCount[i]++;
                }
              }
              thisTime = popp.time;
              if(thisTime - prevTime > THRES_MOVE_TIME){
                moveTimes[i] += DEFAULT_MOVE_TIME;
              }else{
                moveTimes[i] += thisTime - prevTime;
              }
              moveCount[i]++;
              prevTime = thisTime;
            }else{
              popp = hist.pop();
              if(popp.card.charAt(0) === "Z") jokerCount[i]++;
              if(popp.card.charAt(0) === "A" || popp.card.charAt(0) === "K") akCount[i]++;
              if(popp.selection){ // Thief 2 has no selection
                for(var t = 1; t < popp.selection.length; t+=2){
                  if(popp.selection[t] >= 64 && popp.selection[t] < 80 && popp.selection[t] !== popp.selection[t-1]) sendCount[i]++;
                }
              }
              prevTime = popp.time;
              firstTurn = false;
            }

          }
        }
      }
      playerToStart++;
    }
  }
}

export function initialBallLocations(){
  return [64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79];
}

export function randomCards(n){
  const colors = ['C','D','S','H'];
  const rank = ['A','2','3','4','5','6','7','8','9','T','J','Q','K','Z']; // Z equals to Joker
  var a = '';
  var b = '';
  var card = '';
  var out = [];
  while(out.length < 4*n){
    a = Math.floor(Math.random() * 14);
    b = Math.floor(Math.random() * 4);
    card = ''+rank[a]+colors[b];
    if(!out.includes(card)) out.push(card);
  }
  return [out.slice(0,n),out.slice(n,2*n),out.slice(2*n,3*n),out.slice(3*n,4*n)];
}

export function makeHands(n){
  return randomCards(n);
}


export function computeRandomState(game) {
  const history = [];
  if(game.history) {
    for (const event of Object.values(game.history)) {
      history.push(event);
    }
  }
  return {history};
}

export function initialGameState(){
  let balls = initialBallLocations();
  let hands = history[0].newHands; // @TODO
  let blocked = '0000';
  let nc = 5;
  let np = 1
  return {balls, hands, blocked, np, nc, turn}
}

export function getRank(card){
  return card.length === 3 ? card.chatAt(2) : card.charAt(0);
}

export function getNextPlayer(turn, hands){
    if(hands[(turn+1)%4]){
    return (turn+1)%4;
  } else if(hands[(turn+2)%4]){
    return (turn+2)%4;
  } else if(hands[(turn+3)%4]){
    return (turn+3)%4;
  } else {
    return -1;
  }
}

export function calcRegularTurn(balls,hands,blocked,activeCard,selection,turn){ 
  /*
  *   Calculates turn validity and returns the new gameState
  */

  const homeFields = [0,16,32,48];
  const cardRank = activeCard.length === 3 ? activeCard.charAt(2) : activeCard.charAt(0);

  if(cardRank === '7' && !calcIsSevenSum(selected)) return {'error':'notSeven'};

  if(cardRank === '7'){
    for(var i=0;i<selected.length;i+=2){
      // seven moved blocked home field -> unroot
      if(homeFields.includes(selected[i]) && blocked.charAt(homeFields.indexOf(selected[j])) === '1'){
        blocked = replaceChar(blocked,homeFields.indexOf(selected[i]),'0');
      }
      balls[balls.indexOf(selected[i])] = selected[i+1];
    }
  }else{
    const start = selection[0];
    const dest = selection[1];
    const start_idx = balls.indexOf(start);

    if(cardRank==='J'){
      const dest_idx = balls.indexOf(dest);
      [balls[start_idx],balls[dest_idx]] = [balls[dest_idx],balls[start_idx]];
    }else{
      if(isAK(cardRank) && isHomeField(selected[0])){
        blocked = replaceChar(blocked,getBallColor(selected[0]),'1');
      }
      else if(homeFields.includes(selected[0]) && blocked.charAt(homeFields.indexOf(selected[0])) === '1'){
        blocked = replaceChar(blocked,getBallColor(selected[0]),'0');
      }
      balls[start_idx] = dest;
    }
  }

  if(game.rules){
    const ljEnabled = game.rules.charAt(4) === '1';
    const partnerPos = (orderMyPosition+2)%4;
    if(ljEnabled && activeCard.charAt(0) === 'Z' && balls.slice(orderMyPosition*4,(orderMyPosition*4)+4).every(x => x >= 80) && balls.slice(partnerPos*4,(partnerPos*4)+4).every(x => x >= 80)){
      return {'error':t("ljEnabled")};
    }
  }
  if(balls.length !== new Set(balls).size){ // check if two ball on same spot
    return {'error':'two balls on same spot'};
  }
  hands[turn].splice(hands[turn].indexOf(activeCard.substring(0,2)),1); // remove card from hand

  return {hands, balls, blocked}
}

//export function calcUndoTurn(balls,hands,blocked,activeCard,selection,turn){
  /*
  * undo single turn, doesnt support undoing thrown cards or two thief
  * note: doesn't remember blocked settings! @TODO
  * note: copied from Header.js
  */
  /*if(turn === -1){
    return;
  }
  if(hands[turn]){
    for(var i=0;i<6;i++){
      if(!hands[turn][i]){
        hands[turn][i] = card;
        break;
      }
    }
  } else {
    // empty hand, was last card
    hands[turn] = [];
    hands[turn].push(card);
  }

  var starts = selection.filter(function(element, index) {
    return (index % 2 === 0);
  });
  var dests = selection.filter(function(element, index) {
    return (index % 2 === 1);
  });
  var balls = [...oldballs];
  var dId = dests.map(x => balls.indexOf(x));
  if(card.substring(0,1) === 'J' || (card.length === 3 && card.substring(2,3) === 'J')){
    var sId = starts.map(x => balls.indexOf(x));
    [ balls[sId], balls[dId] ] = [ balls[dId], balls[sId] ];
  }else{
    for(var j=dests.length-1;j>=0;j--){
      balls[dId[j]] = starts[j];
    }
  }

  return {balls,hands,turn};
}*/

export function historyRegularTurn(gameState, event){
  /*
  *  calculates a regular turn: applies selection and removes card from hand   
  */
  var balls = gameState.balls;
  var hands = gameState.hands;
  var blocked = gameState.blocked;
  const card = event.card;
  const selection = event.selection;
  var turn = gameState.turn; // [0-3]

  let newGameState = verifyRegularTurn(balls, hands, blocked, card, selection, turn);

  turn = getNextPlayer(hands,turn);
  if(turn === -1){
    // tell server to make new cards
    // set turn to np
    return {...gameState,...newGameState}
  }

  return {...gameState,...newGameState, turn};
}

export function historyStealCard(gameState, event){
  /*
  *  calculates a thief turn: removes card from victim and replaces 2 by stolen card 
  */
  const balls = gameState.balls;
  var hands = gameState.hands;
  var blocked = gameState.blocked;
  const thief = event.turn; // equal to event.start
  const card = event.card;
  const victim = event.dest;
  const stolenCard = event.stolenCard;
  const turn = event.turn;
  
  const stolenCard_idx = hands[victim].indexOf(stolenCard);
  let stolenCard = hands[victim].splice(stolenCard_idx,1);  // remove stolen card
  let stolenIndex = hands[turn].indexOf(card.substring(0,2));
  hands[turn][stolenIndex] = stolenCard[0]; // replace two by stolen card

  return {...gameState, hands, blocked}
}

export function historyThrowCards(gameState, event){
  /*
  * calculates a throwing cards turn: removes all cards of a given player
  * additionally: checks for gameState inconsistencies
  * @TODO: a byzantine node might throw a valid hand
  */
  var hands = gameState.hands;
  const turn = event.turn;
  const throwed = event.throwed;

  const cards = hand[turn];
  if(throwed !== cards) return {'error':'gameState inconsistent, calcThrowCards'}
  hands[turn] = [];

  turn = getNextPlayer(hands,turn);
  if(turn === -1){
    return {...gameState, hands};
  }
  return {...gameState, hands, turn};
}

export function historyCardsDist(gameState, event){
  const hands = event.newHands;
  var nc = gameState.nc;
  var np = gameState.np;
  var turn = np;
  np--;
  nc--;
  if(nc === 1) nc = 6;

  return {...gameState, hands, turn, nc, np};
}

export function historyApplyExchange(gameState, event){
  const balls = gameState.balls;
  var hands = gameState.hands;
  const blocked = gameState.blocked;
  const exchange = event.exchange;

  // for all players get index of exchanged card
  var indexOfExchange = [];
  for(var i=0;i<4;i++){ 
    indexOfExchange.push(hands[i].indexOf(exchange[i]));
    if(hands[i].indexOf(exchange[i])===-1){
      return {'error':'invalid card supplied historyApplyExchange'};
    }
  }
  // replace cards
  for(var k=0;k<4;k++){ 
    hands[k][indexOfExchange[k]] = exchange[(k+2)%4]; 
  }

  return {...gameState, hands};
}

/**
 * updates the game state by one history item
 * undoing a turns out complex, therefore we re-compute the whole gamestate (for now)
 * @param  {GameState} gameState  consisting of {balls, hands, blocked, nc, np}
 * @param  {Object}    event      history item
 * @return {GameState}            new game state
 */

export function applyHistoryStep(gameState, event){
  switch(event.type){
  case 0:
    return historyRegularTurn(gameState, event);
  case 1:
    return historyStealCard(gameState, event);
  case 2:
    return historyThrowCards(gameState, event);
  case 3:
    return historyCardsDist(gameState, event);
  case 4:
    return historyApplyExchange(gameState, event);
  /*case 5:
    return historyUndoTurn(gameState, event);*/
  default:
    return {'error':'unrecognized type in history'};
  }
}

/**
 * updates the state of the game
 * @param  {GameState} gameState  consisting of {balls, hands, blocked, nc, np ,turn}
 * @return {GameState}            new game state
 */

export function computeGameState(gameState, history){

  if(gameState){
    if(history){
      //gameState.history.sort();
      for (const event of Object.values(history)){
        gameState = applyHistoryStep(gameState, event);
        if(newGameState.error){
          console.error(newGameState.error);
          return;
        }
      }
    }else{
      return initialGameState();
    }
  else{
    return initialGameState();
  }
}
