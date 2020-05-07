import React from "react";

import ***REMOVED*** SvgProxy ***REMOVED*** from 'react-svgmt';
import ***REMOVED*** Motion, spring ***REMOVED*** from "react-motion";
import ***REMOVED*** useCallback, useState, useEffect ***REMOVED*** from "react";
import ***REMOVED*** useTranslation ***REMOVED*** from 'react-i18next';

import ***REMOVED*** getEmptyHomeField, isMyBall, isHomeField, isPartnerBall, iHaveFinished, getLastField ***REMOVED*** from "../util";

function Balls(***REMOVED***gameBalls, selected, setSelected, turn, lastFour, orderMyPosition, activeCard, spectating,gameRooted, gameRules, setSnack***REMOVED***)***REMOVED***

  const [suggestion,setSuggestion] = useState([]);
  const ***REMOVED*** t ***REMOVED*** = useTranslation();
  const configMotion = ***REMOVED*** stiffness: 89, damping: 13***REMOVED***;
  const COORDS = [[33.75, 132], [58.34, 156.59], [82.93, 181.18], [107.51, 205.77], [132.1, 230.36], [132.1, 265.13], [132.1, 299.9], [132.1, 334.67], [132.1, 369.45], [107.51, 394.03], [82.93, 418.62], [58.34, 443.21], [33.75, 467.8], [58.34, 492.39], [82.93, 516.97], [107.51, 541.56], [132.1, 566.15], [156.69, 541.56], [181.28, 516.97], [205.87, 492.39], [230.45, 467.8], [265.23, 467.8], [300, 467.8], [334.77, 467.8], [369.55, 467.8], [394.13, 492.39], [418.72, 516.97], [443.31, 541.56], [467.9, 566.15], [492.49, 541.56], [517.07, 516.97], [541.66, 492.39], [566.25, 467.8], [541.66, 443.21], [517.07, 418.62], [492.49, 394.03], [467.9, 369.45], [467.9, 334.67], [467.9, 299.9], [467.9, 265.13], [467.9, 230.36], [492.49, 205.77], [517.07, 181.18], [541.66, 156.59], [566.25, 132], [541.66, 107.42], [517.07, 82.83], [492.49, 58.24], [467.9, 33.65], [443.31, 58.24], [418.72, 82.83], [394.13, 107.42], [369.55, 132], [334.77, 132], [300, 132], [265.23, 132], [230.45, 132], [205.87, 107.42], [181.28, 82.83], [156.69, 58.24], [132.1, 33.65], [107.51, 58.24], [82.93, 82.83], [58.34, 107.42], [31.48, 195.58], [31.48, 230.36], [31.48, 265.13], [31.48, 299.9], [195.58, 568.52], [230.36, 568.52], [299.9, 568.52], [265.13, 568.52], [568.52, 404.42], [568.52, 369.64], [568.52, 334.87], [568.52, 300.1], [404.42, 31.48], [369.64, 31.48], [334.87, 31.48], [300.1, 31.48], [92.15, 132], [131.47, 131.47], [161.69, 161.69], [192.05, 192.05], [132, 507.85], [131.47, 468.53], [161.69, 438.31], [192.05, 407.95], [507.85, 468], [468.53, 468.53], [438.31, 438.31], [407.95, 407.95], [468, 92.15], [468.53, 131.47], [438.31, 161.69], [407.95, 192.05]];
	
  const prevSel = lastFour && lastFour[""+(turn+3)%4] && lastFour[""+(turn+3)%4].selection !== undefined ? lastFour[""+(turn+3)%4]["selection"] : [];
  const animatedBalls = prevSel.filter(function(element, index) ***REMOVED*** return (index % 2 === 1);***REMOVED***);
  const allFields = [...Array(96).keys()];
  const currentPlayerBalls = gameBalls.slice(turn*4,(turn*4)+4);

  useEffect(() => ***REMOVED***
    if(selected.length % 2 === 1) setSuggestion(trySuggestion());
    else setSuggestion([]);
***REMOVED***, [selected]);

  function trySuggestion()***REMOVED***
    var s = buildSuggestion();
    if(s === -1)***REMOVED***
      return [];
***REMOVED***
    if(s.length < 1)***REMOVED***
      setSnack("no valid moves with this ball");
      setSelected([]);
      return [];
***REMOVED***else if(s.length === 1)***REMOVED***
      setSelected([...selected,s[0]]);
***REMOVED***
    return s;
***REMOVED***

  function buildSuggestion()***REMOVED***
    var start = selected[0];
    var ballColor = getBallColor(start);
    let aC = activeCard.length === 3 ? activeCard.charAt(2) : activeCard.charAt(0);
    if(aC === '7' || aC === 'J') return -1;
    if(start >= 64 && start < 80)***REMOVED***
      console.log('yoll',aC);
      if(aC === 'A' || aC === 'K') return [ballColor*16];
      return [];
***REMOVED*** 
    let cardval = 0;
    if(aC === 'A') cardval = 11;
    else if(aC === 'K') cardval = 13;
    else if(aC === 'Q') cardval = 12;
    else if(aC === 'T') cardval = 10;
    else cardval = parseInt(aC);
    if(cardval < 4 && start >= 80)***REMOVED*** // ball in finish
      if((start%4)+cardval <= 4)***REMOVED*** // ball field < max field
        if(noBallsInRange(start+1,start+cardval+1)) return [start+cardval];// no balls in between
          
***REMOVED***
      return [];
***REMOVED***
    var out = [];
    
    //ball not in finish
    console.log(cardval);
    if(cardval === 4 && moveFourBk)***REMOVED***
      out.push((64+start-4)%64);
***REMOVED***
    var homeFields = [0,16,32,48];
    var ownHomeUnblocked = gameRooted.charAt(ballColor) === '0';
    if(start === homeFields[ballColor])***REMOVED***
      if(ownHomeUnblocked && cardval <= 4 && noBallsInRange(79+4*ballColor,79+4*ballColor+cardval)) 
        out.push(79+4*ballColor+cardval);
***REMOVED***
    //ball not in finish or own unblocked homefield
    
    if(movesOverBlocked(start,cardval)) return [];
    // possibly finishes
    if(possibleMoveIntoFinish(cardval,ballColor,start))***REMOVED***
      var dest = 80+4*ballColor+((start+cardval)%64)-homeFields[ballColor]-1;
      if(noBallsInRange(80+4*ballColor,dest) && (dest <= 83+4*ballColor))***REMOVED*** // no overshoot
        out.push(dest);
***REMOVED***
***REMOVED***
    
    
    return [...out,(selected[0]+cardval)%64];
***REMOVED***
  function moveFourBk(start)***REMOVED***
    var homeFields = [0,16,32,48];
    console.log('fired');
    return !(homeFields.some((f,i) => start > f && start <= f+4 && gameRooted.charAt(i) === '1'));

***REMOVED***

  function movesOverBlocked(start,val)***REMOVED***
    // moving over 0
    if(start < 64 && start > 50 && (start+val)%64 <= 13 && gameRooted.charAt(0) === '1') return true;
    var homeFields = [16,32,48];
    return homeFields.some((f,i) => (start < f && start+val >= f && gameRooted.charAt(i+1) === '1'));
***REMOVED***
  function possibleMoveIntoFinish(val,ballColor,start)***REMOVED***
    if(ballColor === 0)***REMOVED***
      return gameRooted.charAt(ballColor) === '0' && start < 64 && start > 50 && (start+val)%64 <= 13;
***REMOVED***else***REMOVED***
      var homeFields = [16,32,48];
      return gameRooted.charAt(ballColor) === '0' && start < homeFields[ballColor] && start+val >= homeFields[ballColor];
***REMOVED***
    
    
***REMOVED***

  function noBallsInRange(start,dest)***REMOVED***
    return ![...Array(dest-start).keys()].map(i => start+i).some(x => gameBalls.includes(x));
***REMOVED***

  function ballFinishSeven(field,selected,orderMyPosition,gameBalls)***REMOVED***
    const lastField = getLastField(field);
    var sendFlag = false;
    var newSecc = [...selected]; // very hacky way to clone array
    var start = selected[selected.length-1];
    if(start === 0) return [...selected,field];
    for(var k=selected[selected.length-1]+1;k<lastField+1;k++)***REMOVED***
      const j = k%64;
      if(gameBalls.includes(j))***REMOVED***
        if(selected.includes(j))***REMOVED***
          if(selected[selected.indexOf(j)+1] < lastField[orderMyPosition]+1)***REMOVED***
            newSecc = [selected[selected.indexOf(j)+1],getEmptyHomeField(newSecc,selected[selected.indexOf(j)],gameBalls),...newSecc];
            sendFlag = true;
***REMOVED*** else ***REMOVED***
            // do nothing, since ball has moved
***REMOVED***
***REMOVED***else***REMOVED***
          console.log("popup",!iHaveFinished(gameBalls,orderMyPosition) || !isPartnerBall(k%64,gameBalls,orderMyPosition));
          newSecc = [j,getEmptyHomeField(newSecc,j,gameBalls),...newSecc];
          sendFlag = true;
***REMOVED***
***REMOVED***
***REMOVED***
    return sendFlag ? [...newSecc,field] : [...selected,field];
***REMOVED***
  function moveSeven(field,selected,orderMyPosition,gameBalls)***REMOVED***
    let endBalls = Math.min(65,field+1); // 80,newIncrease+selected[selected.length-1]+1
    var sendFlag = false;
    var newSecc = selected.concat([]); // very hacky way to clone array
    if(selected[selected.length-1] > 55 && field < 7)***REMOVED***
      endBalls = 64;
      for(var i=0;i<field+1;++i)***REMOVED***
        if(gameBalls.includes(i))***REMOVED***
          newSecc = [i,getEmptyHomeField(newSecc,i,gameBalls),...newSecc];
          sendFlag = true;
***REMOVED***
***REMOVED***
***REMOVED***



    for(var k=selected[selected.length-1]+1;k<endBalls;k++)***REMOVED***
      const j = k%64;
      console.log(" ---------- check eat: ",k,endBalls-1);
      
      if(gameBalls.includes(j))***REMOVED***
        newSecc = [j,getEmptyHomeField(newSecc,j,gameBalls),...newSecc];
        sendFlag = true;
***REMOVED***
***REMOVED***
    console.log("isset: ", sendFlag);
    return sendFlag ? [...newSecc,field] : [...selected,field];
***REMOVED***
  function isWrongBall(firstChoice,aC,field)***REMOVED***

    return firstChoice && aC !== '7' && (!(isMyBall(field,gameBalls,orderMyPosition) || !isMyBall(field,gameBalls,orderMyPosition) && iHaveFinished(gameBalls,orderMyPosition) && isPartnerBall(field,gameBalls,orderMyPosition))); 
***REMOVED***

  const handleClick = useCallback(
    (field,isBall) => ***REMOVED***
      if (spectating) return;
      if (!activeCard)***REMOVED***
        setSnack(t("errNoCardSelected"));
        return;
***REMOVED***
      const tvEnabled = gameRules ? (gameRules.charAt(3) === '1' ? true : false) : false;
      const caEnabled = gameRules ? (gameRules.charAt(0) === '1' ? true : false) : false;

      if(tvEnabled) return handleTurnVerification(field, isBall, caEnabled); 

      setSelected(selected => ***REMOVED***
        var firstChoice = selected.length % 2 === 0;

        const aC = activeCard.length === 3 ? activeCard.substring(2,3) : activeCard.substring(0,1);
        //if(!firstChoice && isHomeField(field)) return []; //destinationNotHome
        // if(selected.includes(field)) return []; //alreadyInSelection
        if(firstChoice && !isBall) return []; //noBallSelected
        if(isWrongBall(firstChoice,aC,field)) return []; //WrongBall
        // if(!firstChoice && selected.includes(field)) return []; // already selected
        if(isMyBall(field,gameBalls,orderMyPosition) && iHaveFinished(gameBalls,orderMyPosition)) return []; //finishNoMove
        if(!firstChoice && field>=80 && gameBalls.includes(field)) return []; //noFinishSend

        switch(aC)***REMOVED***
        case 'J':
          if(selected.length > 1) return [...selected];
          if(!firstChoice && !gameBalls.includes(field,gameBalls,orderMyPosition)) return [...selected];
          break;
        case '7':***REMOVED***
          //if(firstChoice && isHomeField(field)) return []; //noLeaveHome
          if(firstChoice && !isMyBall(field,gameBalls,orderMyPosition) && !isPartnerBall(field,gameBalls,orderMyPosition)) return []; // noTeamBall

          const evalBalls = [...gameBalls].map((el) => ***REMOVED***if(selected.indexOf(el) % 2 === 0)***REMOVED***return selected[selected.indexOf(el)+1];***REMOVED***return el;***REMOVED***);
          /*** valid move selection ***/
          if(!firstChoice)***REMOVED***
            if(field >= 80)***REMOVED***
              return ballFinishSeven(field,selected,orderMyPosition,evalBalls);
***REMOVED***
            return moveSeven(field,selected,orderMyPosition,evalBalls);
***REMOVED***
          break; // return [...selected,field]
***REMOVED***
        // other cards
        default:
          if(selected.length > 1) return [...selected];
          if(!firstChoice && isBall) return [field,getEmptyHomeField(selected,field,gameBalls),...selected,field];
***REMOVED***
        return [...selected,field];
***REMOVED***);
***REMOVED***
    [selected, activeCard]
  );

  function debugSetReason(str,nr)***REMOVED***
    console.log("err_nr: ", nr);
    setSnack(t("err"+str));
    return [];
***REMOVED***

  function wrongFinish(color,field)***REMOVED***
    if(field < 84)
      return color !== 0;
    else if(field < 88)
      return color !== 1;
    else if(field < 92)
      return color !== 2;
    else
      return color !== 3;
***REMOVED***

  function getBallColor(ball)***REMOVED***

    return Math.floor(gameBalls.indexOf(ball)/4);
***REMOVED***

  function handleTurnVerification(field, isBall, caEnabled)***REMOVED***
    setSelected(selected => ***REMOVED***
      var fc = selected.length % 2 === 0;
      const startFields = [0,16,32,48];
      const aC = activeCard.length === 3 ? activeCard.substring(2,3) : activeCard.substring(0,1);

      //@141 if(selected.includes(field)) return []; //alreadyInSelection
      console.log(fc,selected.includes(field));
      if(fc && selected.includes(field) && aC==='7') return debugSetReason("ballHasMoved",0);//@141
      if(isWrongBall(fc,aC,field)) return []; //WrongBall
      if(isMyBall(field,gameBalls,orderMyPosition) && iHaveFinished(gameBalls,orderMyPosition)) return []; //finishNoMove

      if(!fc && field>=80 && gameBalls.includes(field) && aC!== '7') return []; //noFinishSend
      

      if(!fc && isHomeField(field)) return []; //destinationNotHome

      if(fc && !isBall) return []; //noBallSelected
      if(selected.length >= 2 && aC!=="7") return []; // onlyTwoSelected
      if(isHomeField(field) && aC!=="A" && aC!=="K") return []; // noSelectHome

      switch(aC)***REMOVED***
      case 'J':
        if(field >= 80) return []; //noFinishSwap
        if(!fc && !gameBalls.includes(field,gameBalls,orderMyPosition)) return [...selected]; //noSwapDest
        if(startFields.includes(field) && gameRooted.charAt(getBallColor(field)) === "1") return debugSetReason("NoSwapBlocking",0);
        return [...selected,field];
      case '7':***REMOVED***
        const homeFields = [0,16,32,48];
        if(fc && !isMyBall(field,gameBalls,orderMyPosition) && !isPartnerBall(field,gameBalls,orderMyPosition)) return debugSetReason("SevenWrongBall",15); // noTeamBall
        
        const evalBalls = [...gameBalls].map((el) => ***REMOVED***if(selected.indexOf(el) % 2 === 0)***REMOVED***return selected[selected.indexOf(el)+1];***REMOVED***return el;***REMOVED***);
        const evalRooted = evalRootedSeven(selected);

        if(!fc && field>=80 && aC === '7' && evalBalls.includes(field)) return debugSetReason("NoSendHomeFinishSeven",0);
        if(!caEnabled)***REMOVED***
          if(isPartnerBall(field,evalBalls,orderMyPosition) && !iHaveFinished(evalBalls,orderMyPosition)) return debugSetReason("noCanadianAndPartnerAndNoFinish",16); // noPartnerBeforeFinish
***REMOVED***
        if(fc) return [...selected,field];
        /***** begin verify !fc *****/
        const start = selected[selected.length-1];
        const dest = field;
        const ballColorSev = getFinishColor(field);
        if(homeFields.includes(dest) && evalRooted.charAt(getBallColor(dest)) === "1") return debugSetReason("noSetDestinationToBlockedField",32);
        if(!(start > 55 && start < 64 && dest < 8) && start > dest) return debugSetReason("noBackwards",23);

        if(dest >= 80)***REMOVED***
          if(homeFields.includes(start) && gameRooted.charAt(getBallColor(start)) === '1' && dest>=80) return debugSetReason("noDirectFinishSeven",35);
          if(!fc && wrongFinish(ballColorSev,field)) return debugSetReason("wrongFinish",3);
          if(evalRooted.charAt(ballColorSev) === '1' && start < 80) return debugSetReason("ForwardBlocking",32);
          if(start < 80 && rootedFinishSeven(start,ballColorSev,evalRooted)) return debugSetReason("rootedToFinishSeven",33);
***REMOVED***else***REMOVED***
          if(homeFields.includes(start))***REMOVED***
            // release newRoot (happens when calling onSubmit())
***REMOVED***
          if(rootedSeven(start,dest,ballColorSev,evalRooted)) return debugSetReason("rootedSeven",34);
***REMOVED***
        /***** end verify !fc *****/

        /***** begin calc sum *****/
        const sumMove = calcSevenSum(selected,dest);
        if(sumMove <= 0 || sumMove > 7) return debugSetReason("SevenTooMany",17);
        /***** end calc sum *****/
        
        /***** begin send Home *****/
        if(field >= 80)***REMOVED***
          for(let i=1;i<(field%4);++i)***REMOVED***
            if(evalBalls.includes(field-i) && selected[selected.length-1]%4!==i) return debugSetReason("HopOverFinish",13); // hop over
***REMOVED***
          console.log("ballFinishSeven");
          return iHaveFinished(evalBalls,orderMyPosition) ? ballFinishSeven(field,selected,(orderMyPosition+2)%4,evalBalls,caEnabled) : ballFinishSeven(field,selected,orderMyPosition,evalBalls,caEnabled);
***REMOVED***
        return iHaveFinished(evalBalls,orderMyPosition) ? moveSeven(field,selected,(orderMyPosition+2)%4,evalBalls,caEnabled) : moveSeven(field,selected,orderMyPosition,evalBalls,caEnabled);
        /***** end send Home *****/
***REMOVED***

      default:***REMOVED***
        //if(selected.length > 1) return debugSetReason("already two balls selected",1);
        if(fc) return [field];
        const ballColor = getBallColor(selected[0]);
        
        if(isHomeField(selected[0]))***REMOVED***
          if(isBall) return [field,getEmptyHomeField(selected,field,gameBalls),...selected,field]; // outAndSendHome
          return field === startFields[ballColor] ? [selected[0],field] : debugSetReason("outOnlyToStartField",2); // outOnlyToStartField
***REMOVED*** 
        let cVal;
        if(aC === "Q")***REMOVED***
          cVal = 12;
***REMOVED***else if(aC === "K")***REMOVED***
          cVal = 13;
***REMOVED***else if(aC === "A")***REMOVED***
          cVal = 1;
***REMOVED***else if(aC === "T")***REMOVED***
          cVal = 10;
***REMOVED***else***REMOVED***
          cVal = parseInt(aC);
***REMOVED***
        
        // Verify Destination
        if(field >= 80)***REMOVED***
          if(!fc && wrongFinish(ballColor,field)) return debugSetReason("wrongFinish",3);
          if(isBall) return [];
          return validateFinish(selected[0],field,ballColor,cVal);
***REMOVED***
        return validateRegular(selected[0],field,ballColor,cVal,isBall);
***REMOVED***
***REMOVED***
***REMOVED***);
***REMOVED***

  function evalRootedSeven(selected)***REMOVED***
    for(let i=0;i<selected.length;i+=2)***REMOVED***
      const start = selected[i];
      const homeFields = [0,16,32,48];
      if(homeFields.includes(start) && gameRooted.charAt(homeFields.indexOf(start)) === '1')***REMOVED***
        return replaceChar(gameRooted,homeFields.indexOf(start),"0");
***REMOVED***
***REMOVED***
    return gameRooted;
***REMOVED***

  function replaceChar(rooted,index,value)***REMOVED***

    return rooted.substring(0,index) + value + rooted.substring(index+1);
***REMOVED***

  function validateRegular(start,finish,ballColor,cVal,isBall)***REMOVED***
    console.log("debug:validateRegular()");
    const homeFields = [0,16,32,48];

    // noSetDestinationToBlockedField
    for(let j=0;j<4;++j)***REMOVED***
      if(gameBalls.includes(homeFields[j]) && gameRooted.charAt(j) === '1' && finish===homeFields[j]) return debugSetReason("noSetDestinationToBlockedField",4);
***REMOVED***
    //check distance
    if(start>49 && finish<14)***REMOVED*** // over start
      if(gameRooted.charAt(0) === '1') return debugSetReason("player 0 blocking",7); //player 0 rooted
      if(cVal === 1 && (start+cVal+10)%64 === finish)***REMOVED***
        //skip
***REMOVED***else if((start+cVal)%64 !== finish)***REMOVED***
        return debugSetReason("over Zero with Wrong value",5);
***REMOVED***
      console.log("overZeroField");
***REMOVED***else if(cVal === 4 && start < 4 && finish > 59)***REMOVED*** // is four and goes backwards over start
      if(gameRooted.charAt(0) === '1' && homeFields[0] !== start) return debugSetReason("BackwardsOverHomeZero & SelfIsNotBlocking",6); // backwards over rooted and is not root
      if(64+start-4 !== finish) return debugSetReason("BackwardsOverZeroField",8); // verify backwards over zeroField
***REMOVED***else if(cVal === 1 && start+cVal+10 === finish)***REMOVED*** // case 11, skip
      //skip
***REMOVED***else if(cVal === 4 && start-4 === finish)***REMOVED*** // case 4 backwards
      console.log("4 backwards");
      //skip
***REMOVED***else if(start+cVal !== finish)***REMOVED***
      return debugSetReason("WrongNumberCount",9);
***REMOVED***
    console.log("check");

    // check if is homeField && backwards
    if(cVal === 4 && homeFields[0] === start && finish === 60) return [start,finish];
    // check if forward over zero
    if(cVal === 4 && start > 59 && finish < 4 && gameRooted.charAt(0) !== '1') return [start,finish];
    // check others rooted, backwards with 4
    if(cVal === 4 && start > finish)***REMOVED***
      for(let i=1;i<4;++i)***REMOVED***
        if(start>(16*i) && finish<(16*i))***REMOVED***
          if(gameRooted.charAt(i) === '1' && homeFields[i] !== start) return debugSetReason("BackwardsBlocking",10);
***REMOVED***
***REMOVED***
***REMOVED***
    // check others rooted
    for(let i=1;i<4;++i)***REMOVED***
      if(finish>(16*i) && finish<(16*i)+14 && start<(16*i) && start>(16*i)-14)***REMOVED***
        if(gameRooted.charAt(i) === '1' && homeFields[i] !== start) return debugSetReason("ForwardBlocking",11);
***REMOVED***
***REMOVED***
    if(isBall)***REMOVED***
      return [finish,getEmptyHomeField(selected,finish,gameBalls),...selected,finish];
***REMOVED***
    return[start,finish];
***REMOVED***

  function validateFinish(start,finish,ballColor,cVal)***REMOVED***
    // check hop-over in finish
    if(start >= 80)***REMOVED***
      for(let i=1;i<(finish%4-start%4);++i)***REMOVED***
        if(gameBalls.includes(finish-i) && start!==i) return debugSetReason("HopOverFinish",13); // hop over
***REMOVED***
      return [start, finish];
***REMOVED***
    if(gameRooted.charAt(ballColor) === "1") return debugSetReason("BlockedFinish",12); //rooted ball
    for(let i=1;i<(finish%4);++i)***REMOVED***
      if(gameBalls.includes(finish-i) && start!==i) return debugSetReason("HopOverFinish",13); // hop over
***REMOVED***
    // check number
    const lastFields = [64,16,32,48];
    /** debug start **/
    if(lastFields[ballColor]-start<0)***REMOVED***
      console.log("debug:validateFinish",lastFields[ballColor],start);
      return debugSetReason("WUT",22);
***REMOVED***
    /**debug end **/

    if(start===0 && finish-79 === cVal) return [start,finish]; // special case start is 0
    if(cVal === 1)***REMOVED*** // case Ace 1,11
      if(lastFields[ballColor] - start + (finish%4+1) === 11) return [start, finish];
***REMOVED***
    if(lastFields[ballColor] - start + (finish%4+1) !== cVal) return debugSetReason("wrongFinishValue",14);
    return [start,finish];
***REMOVED***

  function calcSevenSum(selected,field)***REMOVED***
    let sum = 0;
    console.log("--------------------- calcSevenSum:",selected,field);
    const selectedAndField = [...selected,field];
    for(var i=1;i<selectedAndField.length;i+=2)***REMOVED***
      const dest = selectedAndField[i];
      if(!(dest > 63 && dest < 80))***REMOVED***  //sendHome
        const start = selectedAndField[i-1];
        // goFinish
        if(dest >= 80)***REMOVED***
          if(start >= 80)***REMOVED***
            sum += dest-start;
***REMOVED***
          else if(start === 0)***REMOVED***
            sum += dest-79; //noZeroToFinish
***REMOVED***
          else if(start > 57)***REMOVED***
            sum += (64-start)+(dest-79);
***REMOVED***
          else if(dest >= 92)***REMOVED***
            sum += (48-start)+(dest-91);
***REMOVED***
          else if(dest >= 88)***REMOVED***
            sum += (32-start)+(dest-87);
***REMOVED***
          else if(dest >= 84)***REMOVED***
            sum += (16-start)+(dest-83);
***REMOVED***
          else***REMOVED***
            alert("are you trying to move backwards? bug alert");
***REMOVED***
***REMOVED***
        else***REMOVED***
          if(start > 56 && dest < 7)***REMOVED***
            sum += dest+64-start;
***REMOVED***else***REMOVED***
            sum += dest-start;
***REMOVED***
          if(sum <= 0) return 999;
***REMOVED***
        console.log("------------- calc seven sum summand:",i," is ",sum);
***REMOVED*** // sendHome
***REMOVED***
    if(sum <= 0) return 999;
    return sum;
***REMOVED***

  function rootedSeven(start,dest,color, evalRooted)***REMOVED***
    // special treatment
    if(start > 57 && dest < 7)***REMOVED***
      return evalRooted.charAt(0) === '1';
***REMOVED***
    for(let i=1;i<4;++i)***REMOVED***
      if(start > 9+(16*(i-1)) && start < 16+(16*(i-1)) && dest > 16+(16*(i-1))) return evalRooted.charAt(i) === '1';
***REMOVED***
    // does not go over start
    return false;
***REMOVED***

  function rootedFinishSeven(start,color, evalRooted)***REMOVED***
    // special treatment
    if(color === 0)***REMOVED***
      if(57 < start || start === 0)***REMOVED***
        return evalRooted.charAt(color) === '1';
***REMOVED***
      return false;
***REMOVED***
    const homeFields = [0,16,32,48];
    const myField = homeFields[color];
    if(start > myField-7 && start <= myField)***REMOVED***
      return evalRooted.charAt(color) === '1';
***REMOVED***
***REMOVED***

  function getFinishColor(dest)***REMOVED***

    return Math.floor((dest-80)/4);
***REMOVED***


  function setStone(nr)***REMOVED***

    return ("#f"+nr);
***REMOVED***

  function setBall(ix)***REMOVED***

    return ("#b"+ix);
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
      return ""; // should not be possible as state.length === 16
***REMOVED***
***REMOVED***

  return(
    <React.Fragment>
      ***REMOVED***gameBalls ? (
        gameBalls.map((field, ix) => (
          animatedBalls.includes(field) ? (          
            <Motion
              defaultStyle=***REMOVED******REMOVED*** x: COORDS[prevSel[animatedBalls.indexOf(field)*2]][0], y: COORDS[prevSel[animatedBalls.indexOf(field)*2]][1]***REMOVED******REMOVED***
              key=***REMOVED***ix***REMOVED***
              style=***REMOVED******REMOVED***
                x: spring(COORDS[prevSel[(animatedBalls.indexOf(field)*2)+1]][0], configMotion),
                y: spring(COORDS[prevSel[(animatedBalls.indexOf(field)*2)+1]][1], configMotion),
  ***REMOVED******REMOVED***
            >
              ***REMOVED***value => ***REMOVED***
                const tr = `translate($***REMOVED***value.x***REMOVED***,$***REMOVED***value.y***REMOVED***)`;
                return <SvgProxy transform=***REMOVED***tr***REMOVED*** key =***REMOVED***"b"+ix***REMOVED*** selector=***REMOVED***setBall(ix)***REMOVED*** onClick=***REMOVED***() => ***REMOVED***handleClick(field,true);***REMOVED******REMOVED*** class=***REMOVED***"ball "+(selected.includes(field)?"active active"+Math.floor(selected.lastIndexOf(field)/2):"")+" "+setColor(ix)+" "+(currentPlayerBalls.includes(field)?"pulsing":"")***REMOVED*** />; //***REMOVED***setColor(ix)***REMOVED***  ***REMOVED***setStone(ball)***REMOVED***
  ***REMOVED******REMOVED***
            </Motion>
          ) : (
            <SvgProxy key=***REMOVED***"b"+ix***REMOVED*** transform=***REMOVED***`translate($***REMOVED***COORDS[field][0]***REMOVED***,$***REMOVED***COORDS[field][1]***REMOVED***)`***REMOVED*** selector=***REMOVED***setBall(gameBalls.indexOf(field))***REMOVED*** onClick=***REMOVED***() => ***REMOVED***handleClick(field,true);***REMOVED******REMOVED*** class=***REMOVED***"ball "+(selected.includes(field)?"active active"+Math.floor(selected.lastIndexOf(field)/2):"")+" "+setColor(ix)+" "+(currentPlayerBalls.includes(field)?"pulsing":"")***REMOVED*** /> //***REMOVED***setColor(ix)***REMOVED***  ***REMOVED***setStone(ball)***REMOVED***
          )))) : (console.log("no entries"))
***REMOVED***
      ***REMOVED***gameBalls ? allFields.map((field, ix) => (
        <SvgProxy key=***REMOVED***"f"+ix***REMOVED*** selector=***REMOVED***setStone(field)***REMOVED*** onClick=***REMOVED***() => ***REMOVED***handleClick(field,false);***REMOVED******REMOVED*** class=***REMOVED***"white " + (suggestion.includes(field) ? "suggested " : "") +(selected.includes(field) ? "active active"+Math.floor(selected.lastIndexOf(field)/2)+" ": " ") + (selected.length % 2 === 0 ? "" : "destination") ***REMOVED*** /> //***REMOVED***setColor(ix)***REMOVED***  ***REMOVED***setStone(ball)***REMOVED***
      )) : (console.log("no entries"))***REMOVED***
    </React.Fragment>
  );
***REMOVED***

export default Balls;