import React, { useState, useEffect } from "react";
import moment from "moment";

import SpeechAudio from "./speechAudio";
import Clock from "./clock";
import Audio from "./audio";
import PlayIcon from "./icons/play";
import PauseIcon from "./icons/pause";
import ResetIcon from "./icons/reset";

import styles from './timer.module.scss';
import formStyles from './forms.module.scss';

const Timer = ({ person, timerRunning, nextTimer, lastTimer, nextButton, prevButton }) => {

  const origDuration = 60000;

  const [mode, setMode] = useState('flasher');
  const [paused, setPaused] = useState( (timerRunning === false) ? true : false );
  const [duration, setDuration] = useState(origDuration);
  const [time, setTime] = useState();
  const [endTime, setEndTime] = useState();

  const playTimer = () => {
    setPaused( false );
	}

  const pauseTimer = () => {
    setPaused(true);
    setEndTime( null );
    setDuration( time );
  }

  const resetTimer = () => {
    setPaused(true);
    setEndTime( null );
    setTime( origDuration );
    setDuration( origDuration );
  }

  useEffect( () => {
    let clockInterval = null;
    let finishTimer = null;

    const tick = () => {
      console.log('tick');
      let now = moment().format('x');
      let newTime = endTime - now;
      if( newTime > 0){
        setTime(newTime);
      } else {
        setTime(0);
        setMode('finished');

      }
    }

    if( mode == 'flasher' ){
      let flasherTimer = setTimeout( () => {setMode('running')}, 4000 );
      return () => clearTimeout( flasherTimer );
    } else if (mode == 'finished') {
      if(!lastTimer){
        finishTimer = setTimeout( () => { nextTimer() }, 3000 );
        return () => clearTimeout( finishTimer );
      } else {
        return () => clearTimeout( finishTimer );
      }
    } else {
      //not flasher!!
      if( !paused ){
        if( !endTime ){
          setEndTime( moment().add(duration,'ms').format('x') );
        }
        clockInterval = setInterval(() => {
          tick();
        }, 100)
      } else {
        clearInterval(clockInterval)
      }
      return () => clearInterval(clockInterval);
    }
  },[paused, time, endTime, mode]);


  const playPauseButton = () => {
    if( !paused ){
      return(
        <button type="button" onClick={pauseTimer} className={ formStyles.iconButton }>
          <PauseIcon color={`#fff`} />
        </button>
      )
    } else {
      return(
        <button type="button" onClick={playTimer} className={ formStyles.iconButton }>
          <PlayIcon color={`#fff`} />
        </button>
      )
    }
  };

  //set speech word
  const speechWord = ( person.speech ) ? person.speech : person.name ;


  if( mode == 'flasher' ){
    return(
      <div>
        <h1 style={{ fontSize: '8rem' }}>{ person.name }</h1>
        <SpeechAudio word={ speechWord } /> 
      </div>
    )
  } else if (mode == 'finished'){
    return(
      <>
        <p>You done!</p>
        <Audio src='assets/end_bell_1.mp3' />
      </>
    )
  } else {
    return(
      <div className={ styles.timer }>
        <Clock time={ time } duration={ origDuration } />
        <div className={ styles.timerButtons }>
          { prevButton }
          { playPauseButton() }
          <button type="button" onClick={resetTimer} className={ formStyles.iconButton }>
            <ResetIcon />
          </button>
          { nextButton }
          <p className={ styles.timerName }>{ person.name }</p>
        </div>
      </div>
    )
  }
}

export default Timer
