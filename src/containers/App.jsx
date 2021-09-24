import React, { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import {VscDebugRestart} from "react-icons/vsc";
// import {ImPlay2} from "react-icons/im";
// import {CgPlayStopO} from "react-icons/cg";



export const App = () => {
    const [break2, setBreak2] = useState(5);
    const [seion, setSeion] = useState(25)
    const [minutes, setMinutes] = useState(seion);
    const [seconds, setSeconds] = useState(0);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [intervalId, setIntervalId] = useState(0);
    const [stopStar, setStopStar] = useState(true);
    const [audioBeep, setAudioBeep] = useState();
  




    const aumentaB = () =>{
      setBreak2(break2 +1)
     
    }
    const aumentaS = () =>{
      if(stopStar){
      setMinutes(seion+1)
      setSeion(seion +1)
    } else{
      setSeion(seion +1)
    }
    }
   const disminuyeS = () =>{
     if(seion > 1){
    if(stopStar){
    setMinutes(seion-1)
      setSeion(seion -1)
    } else{
      setSeion(seion -1)
    }
  }
    }
    const disminuyeB = () =>{
      if (break2 > 1 && break2 <= 60){
      setBreak2(break2 -1)}
    }
    const stop = () => {
     setStopStar(true)

    }
    const play = () => {
      setStopStar(false)
    }
    
    const reload = () => {
      setStopStar(true)
      setMinutes(seion)
      setSeconds(0)
      displayMessage&&
      setDisplayMessage(!displayMessage);
    }
    

    useEffect(() => {
      if (stopStar === false) {
        
      const newIntervalId = setInterval(() => {
        clearInterval(newIntervalId);

      if (seconds === 0) {
        if (minutes !== 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        } else {
  audioBeep.play()

          let minutes = displayMessage ? seion-1 : break2-1;
          let seconds = 59;

          setSeconds(seconds);
          setMinutes(minutes);
          setDisplayMessage(!displayMessage);
        }
      } else {
        setSeconds(seconds - 1);
      }
      }, 1000);
      setIntervalId(newIntervalId);
    }else{
      clearInterval(intervalId);
      setIntervalId(0);
    }
  }, [seconds, stopStar]);
 


  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return (
        <div>
        <br/>  <br/>
        <label id="break-label">Break length</label>
        <label>Sesion length</label>
        <br/>
        <button 
        id="break-decrement"
        onClick={disminuyeB}
        ><IoIosArrowDown/></button> 
        <label id="break-length" >{break2}</label>
        <button
        onClick={aumentaB}
        id="break-increment"
        ><IoIosArrowUp/></button>
       
        <button
        onClick={disminuyeS}
        id="session-decrement"
        ><IoIosArrowDown/></button>
        
        <label id="session-label" >{seion}</label>
        <button
        onClick={aumentaS}
        id="session-increment"
        ><IoIosArrowUp/></button>
       <br/>  <br/>
      <div className="timer">
      <div className="message">
        {displayMessage && <div>Break time!</div>}
      </div>
    
      <label id="time-left">
        {timerMinutes}:{timerSeconds}
        </label>
 
      <div className="timer-control">
      <button id="start_stop"
      onClick={play}
      > P
      {/* <ImPlay2/> */}
      </button>
      <button id = "stop"
      onClick={stop}
      >
    S
      {/* <CgPlayStopO/> */}
      </button>
   <button id="reset"
   onClick={reload}
   >
    R
   {/* <VscDebugRestart/> */}
   </button>
   </div>
   </div>
 <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
             setAudioBeep(audio);
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>

 
    )
}


