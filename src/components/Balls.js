import React from "react";
import { SvgProxy } from 'react-svgmt';
import { Motion, spring } from "react-motion";
import { useEffect, useState, useCallback} from "react";
import { useTranslation } from 'react-i18next';
import { getEmptyHomeField, isMyBall, isHomeField, isMyFinish, isPartnerBall, iHaveFinished, getLastField } from "../util";

function Balls({gameBalls, selected, setSelected, turn, lastFour, orderMyPosition, activeCard, spectating,gameRooted, gameRules, setSnack}){
  const settings = {canadian:true};
  const { t, i18n } = useTranslation();
  const configMotion = { stiffness: 89, damping: 13};
  const COORDS = [[33.75, 132], [58.34, 156.59], [82.93, 181.18], [107.51, 205.77], [132.1, 230.36], [132.1, 265.13], [132.1, 299.9], [132.1, 334.67], [132.1, 369.45], [107.51, 394.03], [82.93, 418.62], [58.34, 443.21], [33.75, 467.8], [58.34, 492.39], [82.93, 516.97], [107.51, 541.56], [132.1, 566.15], [156.69, 541.56], [181.28, 516.97], [205.87, 492.39], [230.45, 467.8], [265.23, 467.8], [300, 467.8], [334.77, 467.8], [369.55, 467.8], [394.13, 492.39], [418.72, 516.97], [443.31, 541.56], [467.9, 566.15], [492.49, 541.56], [517.07, 516.97], [541.66, 492.39], [566.25, 467.8], [541.66, 443.21], [517.07, 418.62], [492.49, 394.03], [467.9, 369.45], [467.9, 334.67], [467.9, 299.9], [467.9, 265.13], [467.9, 230.36], [492.49, 205.77], [517.07, 181.18], [541.66, 156.59], [566.25, 132], [541.66, 107.42], [517.07, 82.83], [492.49, 58.24], [467.9, 33.65], [443.31, 58.24], [418.72, 82.83], [394.13, 107.42], [369.55, 132], [334.77, 132], [300, 132], [265.23, 132], [230.45, 132], [205.87, 107.42], [181.28, 82.83], [156.69, 58.24], [132.1, 33.65], [107.51, 58.24], [82.93, 82.83], [58.34, 107.42], [31.48, 195.58], [31.48, 230.36], [31.48, 265.13], [31.48, 299.9], [195.58, 568.52], [230.36, 568.52], [299.9, 568.52], [265.13, 568.52], [568.52, 404.42], [568.52, 369.64], [568.52, 334.87], [568.52, 300.1], [404.42, 31.48], [369.64, 31.48], [334.87, 31.48], [300.1, 31.48], [92.15, 132], [131.47, 131.47], [161.69, 161.69], [192.05, 192.05], [132, 507.85], [131.47, 468.53], [161.69, 438.31], [192.05, 407.95], [507.85, 468], [468.53, 468.53], [438.31, 438.31], [407.95, 407.95], [468, 92.15], [468.53, 131.47], [438.31, 161.69], [407.95, 192.05]];
	
  const prevSel = lastFour && lastFour[""+(turn+3)%4] && lastFour[""+(turn+3)%4].selection !== undefined ? lastFour[""+(turn+3)%4]["selection"] : [];
  const animatedBalls=prevSel.filter(function(element, index, array) { return (index % 2 === 1);  });
  const allFields = [...Array(96).keys()];
  const currentPlayerBalls = gameBalls.slice(turn*4,(turn*4)+4);
 

  function ballFinishSeven(field,selected,orderMyPosition,gameBalls,canadian){
    const lastField = getLastField(field);
    var sendFlag = false;
    var newSecc = [...selected]; // very hacky way to clone array
    var start = selected[selected.length-1];
    if(start === 0) return [...selected,field];
    for(var k=selected[selected.length-1]+1;k<lastField+1;k++){
      const j = k%64;
      const isMyBall = canadian ? (Math.floor(gameBalls.indexOf(j)/4) === orderMyPosition || Math.floor(gameBalls.indexOf(j)/4) === (orderMyPosition+2)%4) : Math.floor(gameBalls.indexOf(j)/4) === orderMyPosition;

      if(gameBalls.includes(j)){
        if(selected.includes(j)){
          if(selected[selected.indexOf(j)+1] < lastField[orderMyPosition]+1){
              newSecc = [selected[selected.indexOf(j)+1],getEmptyHomeField(newSecc,selected[selected.indexOf(j)],gameBalls),...newSecc];
              sendFlag = true;
          } else {
            // do nothing, since ball has moved
          }
        }else{
          console.log("popup",!iHaveFinished(gameBalls,orderMyPosition) || !isPartnerBall(k%64,gameBalls,orderMyPosition));
            newSecc = [j,getEmptyHomeField(newSecc,j,gameBalls),...newSecc];
            sendFlag = true;
        }
      }
    }
    return sendFlag ? [...newSecc,field] : [...selected,field];
  }
  function moveSeven(field,selected,orderMyPosition,gameBalls,canadian){

    let endBalls = Math.min(65,field+1); // 80,newIncrease+selected[selected.length-1]+1

    var sendFlag = false;
    var newSecc = selected.concat([]); // very hacky way to clone array

    if(selected[selected.length-1] > 55 && field < 7){
      endBalls = 64;
      for(var i=0;i<field+1;++i){
        if(gameBalls.includes(i)){
            newSecc = [i,getEmptyHomeField(newSecc,i,gameBalls),...newSecc];
            sendFlag = true;
          }
      }
    }



    for(var k=selected[selected.length-1]+1;k<endBalls;k++){
      const j = k%64;
      console.log(" ---------- check eat: ",k,endBalls-1);
      // if canadian, partner balls are "my balls"
      const isMyBall = canadian ? (Math.floor(gameBalls.indexOf(j)/4) === orderMyPosition || Math.floor(gameBalls.indexOf(j)/4) === (orderMyPosition+2)%4) : Math.floor(gameBalls.indexOf(j)/4) === orderMyPosition;
      
      if(gameBalls.includes(j)){
        newSecc = [j,getEmptyHomeField(newSecc,j,gameBalls),...newSecc];
        sendFlag = true;
      }
    }
    console.log("isset: ", sendFlag);
    return sendFlag ? [...newSecc,field] : [...selected,field];
  }
  function isWrongBall(firstChoice,aC,field){

    return firstChoice && aC !== '7' && (!(isMyBall(field,gameBalls,orderMyPosition) || !isMyBall(field,gameBalls,orderMyPosition) && iHaveFinished(gameBalls,orderMyPosition) && isPartnerBall(field,gameBalls,orderMyPosition))); 
  }

  const handleClick = useCallback(
  (field,isBall) => {
    if (spectating) return;
    if (!activeCard){
      alert('no card selected');
      return;
    }
    const tvEnabled = gameRules ? (gameRules.charAt(3) === '1' ? true : false) : false;
    const caEnabled = gameRules ? (gameRules.charAt(0) === '1' ? true : false) : false;

    if(tvEnabled) return handleTurnVerification(field, isBall, caEnabled); 

    setSelected(selected => {
      var firstChoice = selected.length % 2 === 0;

      const aC = activeCard.length === 3 ? activeCard.substring(2,3) : activeCard.substring(0,1);
      //if(!firstChoice && isHomeField(field)) return []; //destinationNotHome
      // if(selected.includes(field)) return []; //alreadyInSelection
      if(firstChoice && !isBall) return []; //noBallSelected
      if(isWrongBall(firstChoice,aC,field)) return []; //WrongBall
      // if(!firstChoice && selected.includes(field)) return []; // already selected
      if(isMyBall(field,gameBalls,orderMyPosition) && iHaveFinished(gameBalls,orderMyPosition)) return []; //finishNoMove
      if(!firstChoice && field>=80 && gameBalls.includes(field)) return []; //noFinishSend

      switch(aC){
        case 'J':
          if(selected.length > 1) return [...selected];
          if(!firstChoice && !gameBalls.includes(field,gameBalls,orderMyPosition)) return [...selected];
          break;
        case '7':
          //if(firstChoice && isHomeField(field)) return []; //noLeaveHome
          if(firstChoice && !isMyBall(field,gameBalls,orderMyPosition) && !isPartnerBall(field,gameBalls,orderMyPosition)) return []; // noTeamBall

          const evalBalls = [...gameBalls].map((el,ix) => {if(selected.indexOf(el) % 2 == 0){return selected[selected.indexOf(el)+1]}return el;});

          /*if(!caEnabled){
            if(isPartnerBall(field,evalBalls,orderMyPosition) && !iHaveFinished(evalBalls,orderMyPosition)) return []; // noPartnerBeforeFinish
          }*/
          /*** valid move selection ***/
          if(!firstChoice){
            if(field >= 80){
              return ballFinishSeven(field,selected,orderMyPosition,evalBalls);
            }
              return moveSeven(field,selected,orderMyPosition,evalBalls);
          }
          break; // return [...selected,field]
        // other cards
        default:
          if(selected.length > 1) return [...selected];
          if(!firstChoice && isBall) return [field,getEmptyHomeField(selected,field,gameBalls),...selected,field];
      }
      return [...selected,field];
    });
    },
    [selected, activeCard] //@041
  );

  function debugSetReason(str,nr){
    setSnack(t("err"+str));
    return [];
  }

  function wrongFinish(color,field){
    if(field < 84)
      return color !== 0;
    else if(field < 88)
      return color !== 1;
    else if(field < 92)
      return color !== 2;
    else
      return color !== 3;
  }

  function getBallColor(ball){

    return Math.floor(gameBalls.indexOf(ball)/4)
  }

  function handleTurnVerification(field, isBall, caEnabled){
    setSelected(selected => {
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
      //@141 if(!fc && selected.includes(field)) return []; // already selected

      if(fc && !isBall) return []; //noBallSelected
      if(selected.length >= 2 && aC!=="7") return [...selected]; // onlyTwoSelected
      if(isHomeField(field) && aC!=="A" && aC!=="K") return []; // noSelectHome

      switch(aC){
        case 'J':
          if(field >= 80) return []; //noFinishSwap
          if(!fc && !gameBalls.includes(field,gameBalls,orderMyPosition)) return [...selected]; //noSwapDest
          if(startFields.includes(field) && gameRooted.charAt(getBallColor(field)) === "1") return debugSetReason("NoSwapBlocking",0);
          return [...selected,field];
        case '7':
        // TODO::TV no finish selection
          //not backwards


          const homeFields = [0,16,32,48];
          if(fc && !isMyBall(field,gameBalls,orderMyPosition) && !isPartnerBall(field,gameBalls,orderMyPosition)) return debugSetReason("SevenWrongBall",15); // noTeamBall
          
          const evalBalls = [...gameBalls].map((el,ix) => {if(selected.indexOf(el) % 2 == 0){return selected[selected.indexOf(el)+1]}return el;});
          const evalRooted = evalRootedSeven(selected);
          //const evalRooted = newRooted;
          console.log(evalRooted);
          console.log(evalBalls);

          if(!fc && field>=80 && aC === '7' && evalBalls.includes(field)) return debugSetReason("NoSendHomeFinishSeven",0);
          if(!caEnabled){
            if(isPartnerBall(field,evalBalls,orderMyPosition) && !iHaveFinished(evalBalls,orderMyPosition)) return debugSetReason("noCanadianAndPartnerAndNoFinish",16); // noPartnerBeforeFinish
          }
          if(fc) return [...selected,field];
          /***** begin verify !fc *****/
          const start = selected[selected.length-1];
          const dest = field;
          const ballColorSev = getFinishColor(field);
          if(homeFields.includes(dest) && evalRooted.charAt(getBallColor(dest)) === "1") return [];
          if(start === 0 && dest>=80 && gameRooted.charAt(getBallColor(start))) return [];
          if(!(start > 55 && start < 64 && dest < 8) && start > dest) return debugSetReason("noBackwards",23);

          if(dest >= 80){
            if(homeFields.includes(start) && gameRooted.charAt(getBallColor(start)) === '1' && dest>=80) return debugSetReason("noDirectFinishSeven",35);
            if(!fc && wrongFinish(ballColorSev,field)) return debugSetReason("wrongFinish",3);
            if(evalRooted.charAt(ballColorSev) === '1' && start < 80) return debugSetReason("ForwardBlocking",32);
            //if(finishOverhop(dest,evalBalls)) return debugSetReason("finishOverhop",33);
            if(start < 80 && rootedFinishSeven(start,ballColorSev,evalRooted)) return debugSetReason("rootedToFinishSeven",33);
          }else{
            if(homeFields.includes(start)){
              // release newRoot
            }
            if(rootedSeven(start,dest,ballColorSev,evalRooted)) return debugSetReason("rootedSeven",34);
          }

          /***** end verify !fc *****/
          /***** begin calc sum *****/
          const sumMove = calcSevenSum(selected,dest);
          console.log("---------------- calc sum move: ", sumMove);
          if(sumMove <= 0 || sumMove > 7) return debugSetReason("SevenTooMany",17);
          /***** end calc sum *****/

          
          console.log("--------------ballEval sumMove:",sumMove);
          


          /***** begin send Home *****/

          if(field >= 80){
            for(let i=1;i<(field%4);++i){
              if(evalBalls.includes(field-i) && selected[selected.length-1]!==i) return debugSetReason("HopOverFinish",13); // hop over
            }
            console.log("ballFinishSeven");
            return iHaveFinished(evalBalls,orderMyPosition) ? ballFinishSeven(field,selected,(orderMyPosition+2)%4,evalBalls,caEnabled) : ballFinishSeven(field,selected,orderMyPosition,evalBalls,caEnabled);
          }
          return iHaveFinished(evalBalls,orderMyPosition) ? moveSeven(field,selected,(orderMyPosition+2)%4,evalBalls,caEnabled) : moveSeven(field,selected,orderMyPosition,evalBalls,caEnabled);
         /***** end send Home *****/


        default:
          //if(selected.length > 1) return debugSetReason("already two balls selected",1);
          if(fc) return [field];
          const ballColor = getBallColor(selected[0]);
          
          if(isHomeField(selected[0])){
            if(isBall) return [field,getEmptyHomeField(selected,field,gameBalls),...selected,field]; // outAndSendHome
            return field === startFields[ballColor] ? [selected[0],field] : debugSetReason("outOnlyToStartField",2); // outOnlyToStartField
          } 
          let cVal;
          if(aC === "Q"){
            cVal = 12;
          }else if(aC === "K"){
            cVal = 13;
          }else if(aC === "A"){
            cVal = 1;
          }else if(aC === "T"){
            cVal = 10;
          }else{
            cVal = parseInt(aC);
          }
          
          console.log("debug:ballColor",ballColor);
          // Verify Destination
          if(field >= 80){
            if(!fc && wrongFinish(ballColor,field)) return debugSetReason("wrongFinish",3);
            if(isBall) return [];
            return validateFinish(selected[0],field,ballColor,cVal);
          }
          return validateRegular(selected[0],field,ballColor,cVal,isBall);
        }
    });
  }

  function evalRootedSeven(selected){
    for(let i=0;i<selected.length;i+=2){
      const start = selected[i];
      const dest = selected[i+1];
      const homeFields = [0,16,32,48];
      if(homeFields.includes(start) && gameRooted.charAt(homeFields.indexOf(start)) === '1'){
        return replaceChar(gameRooted,homeFields.indexOf(start),"0");
      }
    }
    return gameRooted;
  }

  function replaceChar(rooted,index,value){

    return rooted.substring(0,index) + value + rooted.substring(index+1);
  }

  function validateRegular(start,finish,ballColor,cVal,isBall){
    console.log("debug:validateRegular()");
    const homeFields = [0,16,32,48];

    // noSetDestinationToBlockedField
    for(let j=0;j<4;++j){
      if(gameBalls.includes(homeFields[j]) && gameRooted.charAt(j) === '1' && finish===homeFields[j]) return debugSetReason("noSetDestinationToBlockedField",4);
    }
    //check distance
    if(start>49 && finish<14){ // over start
      if(gameRooted.charAt(0) === '1') return debugSetReason("player 0 blocking",7); //player 0 rooted
      if(cVal === 1 && (start+cVal+10)%64 === finish){
        //skip
      }else if((start+cVal)%64 !== finish){
        return debugSetReason("over Zero with Wrong value",5);
      }
      console.log("overZeroField");
    }else if(cVal == 4 && start < 4 && finish > 59){ // is four and goes backwards over start
      if(gameRooted.charAt(0) === '1' && homeFields[0] !== start) return debugSetReason("BackwardsOverHomeZero & SelfIsNotBlocking",6); // backwards over rooted and is not root
      if(64+start-4 !== finish) return debugSetReason("BackwardsOverZeroField",8); // verify backwards over zeroField
    }else if(cVal === 1 && start+cVal+10 === finish){ // case 11, skip
      //skip
    }else if(cVal === 4 && start-4 === finish){ // case 4 backwards
      console.log("4 backwards");
      //skip
    }else if(start+cVal !== finish){
      return debugSetReason("WrongNumberCount",9);
    }
    console.log("check");

    // check if is homeField && backwards
    if(cVal === 4 && homeFields[0] === start && finish === 60) return [start,finish];
    // check if forward over zero
    if(cVal === 4 && start > 59 && finish < 4 && gameRooted.charAt(0) !== '1') return [start,finish];
    // check others rooted, backwards with 4
    if(cVal === 4 && start > finish){
      for(let i=1;i<4;++i){
        if(start>(16*i) && finish<(16*i)){
          if(gameRooted.charAt(i) === '1' && homeFields[i] !== start) return debugSetReason("BackwardsBlocking",10);
        }
      }
    }
    // check others rooted
    for(let i=1;i<4;++i){
      if(finish>(16*i) && finish<(16*i)+14 && start<(16*i) && start>(16*i)-14){
        if(gameRooted.charAt(i) === '1' && homeFields[i] !== start) return debugSetReason("ForwardBlocking",11);
      }
    }
    if(isBall){
      return [finish,getEmptyHomeField(selected,finish,gameBalls),...selected,finish];
    }
    return[start,finish];
  }

  function validateFinish(start,finish,ballColor,cVal){
    // check hop-over in finish
    if(start >= 80){
      for(let i=1;i<(finish%4-start%4);++i){
        if(gameBalls.includes(finish-i) && start!==i) return debugSetReason("HopOverFinish",13); // hop over
      }
      return [start, finish];
    }
    if(gameRooted.charAt(ballColor) === "1") return debugSetReason("BlockedFinish",12); //rooted ball
    for(let i=1;i<(finish%4);++i){
      if(gameBalls.includes(finish-i) && start!==i) return debugSetReason("HopOverFinish",13); // hop over
    }
    // check number
    const lastFields = [64,16,32,48];
    /** debug start **/
    if(lastFields[ballColor]-start<=0){
      console.log("debug:validateFinish",lastFields[ballColor],start);
      return debugSetReason("WUT",22);
    }
    /**debug end **/

    if(start===0 && finish-79 === cVal) return [start,finish]; // special case start is 0
    if(cVal === 1){ // case Ace 1,11
      if(lastFields[ballColor] - start + (finish%4+1) === 11) return [start, finish];
    }
    if(lastFields[ballColor] - start + (finish%4+1) !== cVal) return debugSetReason("wrongFinishValue",14);
    return [start,finish];
  }

  function calcSevenSum(selected,field){
    let sum = 0;
    console.log("--------------------- calcSevenSum:",selected,field);
    const selectedAndField = [...selected,field];
    for(var i=1;i<selectedAndField.length;i+=2){
      const dest = selectedAndField[i];
      if(!(dest > 63 && dest < 80)){  //sendHome
        const start = selectedAndField[i-1];
        // goFinish
        if(dest >= 80){
          if(start >= 80){
            sum += dest-start;
          }
          else if(start === 0){
            sum += dest-79; //noZeroToFinish
          }
          else if(start > 57){
            sum += (64-start)+(dest-79);
          }
          else if(dest >= 92){
            sum += (48-start)+(dest-91);
          }
          else if(dest >= 88){
            sum += (32-start)+(dest-87);
          }
          else if(dest >= 84){
            sum += (16-start)+(dest-83);
          }
          else{
            alert("are you trying to move backwards? bug alert");
          }
        }
        else{
          if(start > 56 && dest < 7){
            sum += dest+64-start;
          }else{
            sum += dest-start;
          }
          if(sum <= 0) return 999;
        }
        console.log("------------- calc seven sum summand:",i," is ",sum);
      } // sendHome
    }
    if(sum <= 0) return 999;
    return sum;
  }

  function rootedSeven(start,dest,color, evalRooted){
    // special treatment
    if(start > 57 && dest < 7){
      return evalRooted.charAt(0) === '1';
    }
    for(let i=1;i<4;++i){
      if(start > 9+(16*(i-1)) && start < 16+(16*(i-1)) && dest > 16+(16*(i-1))) return evalRooted.charAt(i) === '1';
    }
    // does not go over start
    return false;
  }

  function rootedFinishSeven(start,color, evalRooted){
    // special treatment
    if(color === 0){
      if(57 < start || start === 0){
        return evalRooted.charAt(color) === '1';
      }
      return false;
    }
    const homeFields = [0,16,32,48];
    const myField = homeFields[color];
    if(start > myField-7 && start <= myField){
      return evalRooted.charAt(color) === '1';
    }
  }

  function finishOverhop(field, evalBalls){
    if(field % 4 === 0) return false;
    if(field % 4 === 1) return evalBalls.includes(field-1);
    if(field % 4 === 2) return evalBalls.includes(field-1) && evalBalls.includes(field-2);
    if(field % 4 === 3) return evalBalls.includes(field-1) && evalBalls.includes(field-2) && evalBalls.includes(field-3);
  }

  function getFinishColor(dest){

    return Math.floor((dest-80)/4);
  }

  function cutOverflow(field){
    if(orderMyPosition===0) return field >= 80 ? field-15 : field;
    if(orderMyPosition===1) return field >= 80 ? field-67 : field;
    if(orderMyPosition===2) return field >= 80 ? field-55 : field;
    if(orderMyPosition===3) return field >= 80 ? field-43 : field;
    alert("bug alert!");
    return 0;
  }

  function calcIncrease(start,dest){
    if(start > 56 && dest < 7){
      return 64-start+dest;
    }else{
      return dest-start;
    }
  }

  function setStone(nr){

    return ("#f"+nr);
  }

  function setBall(ix){

    return ("#b"+ix);
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
        return ""; // should not be possible as state.length == 16
    }
  }

	return(
    <>
            {gameBalls ? (
              gameBalls.map((field, ix) => (
                animatedBalls.includes(field) ? ( 
                // animatedBalls.indexOf(field)*2           
                  <Motion
                    defaultStyle={{ x: COORDS[prevSel[animatedBalls.indexOf(field)*2]][0], y: COORDS[prevSel[animatedBalls.indexOf(field)*2]][1]}}
                    key={ix}
                    style={{
                      x: spring(COORDS[prevSel[(animatedBalls.indexOf(field)*2)+1]][0], configMotion),
                      y: spring(COORDS[prevSel[(animatedBalls.indexOf(field)*2)+1]][1], configMotion),
                    }}
                  >
                    {value => {
                      const tr = `translate(${value.x},${value.y})`;
                      return <SvgProxy transform={tr} key ={"b"+ix} selector={setBall(ix)} onClick={(node) => {handleClick(field,true)}} class={"ball "+(selected.includes(field)?"active active"+Math.floor(selected.lastIndexOf(field)/2):"")+" "+setColor(ix)+" "+(currentPlayerBalls.includes(field)?"pulsing":"")} />; //{setColor(ix)}  {setStone(ball)}
                    }}
                  </Motion>
                  ) : (
                    <SvgProxy key={"b"+ix} transform={`translate(${COORDS[field][0]},${COORDS[field][1]})`} selector={setBall(gameBalls.indexOf(field))} onClick={(node) => {handleClick(field,true)}} class={"ball "+(selected.includes(field)?"active active"+Math.floor(selected.lastIndexOf(field)/2):"")+" "+setColor(ix)+" "+(currentPlayerBalls.includes(field)?"pulsing":"")} /> //{setColor(ix)}  {setStone(ball)}
                /*);*/
              )))) : (console.log("no entries"))
            }


	            {gameBalls ? allFields.map((field, ix) => (
	                  <SvgProxy key={"f"+ix} selector={setStone(field)} onClick={(node) => {handleClick(field,false)}} class={"white " + (selected.includes(field) ? "active active"+Math.floor(selected.lastIndexOf(field)/2)+" ": " ") + (selected.length % 2 === 0 ? "" : "destination") } /> //{setColor(ix)}  {setStone(ball)}
	            )) : (console.log("no entries"))}

              </>
	);
}

export default Balls;