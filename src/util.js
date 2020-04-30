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
    return [64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79].includes(field);
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
  let totalCards = 0;
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
                  if(popp.selection[s] >= 64 && popp.selection[s] < 80 && popp.selection[s] != popp.selection[s-1]) sendCount[i]++;
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
                for(var s = 1; s < popp.selection.length; s+=2){
                  if(popp.selection[s] >= 64 && popp.selection[s] < 80 && popp.selection[s] != popp.selection[s-1]) sendCount[i]++;
                }
              }
              prevTime = popp.time;
              firstTurn = false;
            }

          }
        }
      }
      totalCards += numCards;
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
