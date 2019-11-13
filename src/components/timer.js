import React, { useState, useEffect } from "react";
import moment from "moment";

import { useStateValue } from "../hooks/useGlobalState";

import SpeechAudio from "./speechAudio";
import Clock from "./clock";
import Audio from "./audio";
import PlayIcon from "./icons/play";
import PauseIcon from "./icons/pause";
import ResetIcon from "./icons/reset";

import styles from './timer.module.scss';
import formStyles from './forms.module.scss';

const Timer = ({ person, timerRunning, nextTimer, lastTimer, nextButton, prevButton }) => {

  const [{settings, imageExtensions, videoExtensions}, dispatch] = useStateValue();

  const [mode, setMode] = useState('flasher');
  const [paused, setPaused] = useState( (timerRunning === false) ? true : false );
  const [duration, setDuration] = useState(settings.origDuration);
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
    setTime( settings.origDuration );
    setDuration( settings.origDuration );
  }

  useEffect( () => {
    let clockInterval = null;
    let finishTimer = null;

    //tick function
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
    //keypress handler
    const keyPressHandler = (e) => {
      //next
      if( e.keyCode === 32 ){
        if( paused ){
          console.log('paused');
          playTimer();
        } else {
          pauseTimer();
        }
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
      window.addEventListener('keydown', keyPressHandler);
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
      return () => {
        clearInterval(clockInterval);
        window.removeEventListener('keydown', keyPressHandler);
      }
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

  //set gong background and message
  const gongMessage = () => {
    if( Array.isArray( settings.gongMessage ) && settings.gongMessage.length > 0 ){
      let msgIndex = 0;
      if( settings.gongMessage.length > 1 ){
        msgIndex = Math.floor( Math.random() * settings.gongMessage.length );
      }
      return settings.gongMessage[msgIndex];
    }
    return null;
  }

  const gongMedia = () => {
    let elements = [<Audio src='assets/end_bell_1.mp3' />];
    if( Array.isArray( settings.gongMediaUrl ) && settings.gongMediaUrl.length > 0 ){
      //get index
      let mediaIndex = 0;
      if( settings.gongMediaUrl.length > 1 ){
        mediaIndex = Math.floor( Math.random() * settings.gongMediaUrl.length );
      }
      //return media

      let fileType = getFileType( settings.gongMediaUrl[mediaIndex] );
      if( fileType ){
        if( fileType === 'image' ){
          elements.push(<img src={ settings.gongMediaUrl[mediaIndex] } />)
        }
        if( fileType === 'video' ){
          elements = <video autoPlay='autoplay'>
                      <source src={ settings.gongMediaUrl[mediaIndex] } />
                    </video>
        }
      }
    }
    return elements;
  }

  //member media
  const getFileType = (fileUrl) => {
    let mediaExtension = fileUrl.split('.').pop();
    if( imageExtensions.indexOf( mediaExtension ) > -1 ){
      return 'image';
    }
    if( videoExtensions.indexOf( mediaExtension ) > -1 ){
      return 'video';
    }
    return false;
  }

  const setMemberMedia = () => {
    let elements = [<SpeechAudio word={ speechWord } />];
    if( person.mediaUrl ){
      let fileType = getFileType( person.mediaUrl );
      if( fileType ){
        if( fileType === 'image' ){
          elements.push(<img src={ person.mediaUrl } />)
        }
        if( fileType === 'video' ){
          elements = <video autoPlay='autoplay'>
                      <source src={ person.mediaUrl } />
                    </video>
        }
      }
    }
    return elements;
  }



  if( mode == 'flasher' ){
    return(
      <div className={ `${styles.largeNotice} ${styles.flasher}` }>
        <h1><span>{ person.name }</span></h1>
        { setMemberMedia() }
      </div>
    )
  } else if (mode == 'finished'){
    return(
      <div className={ `${styles.largeNotice} ${styles.gong}` }>
        <h1>{ gongMessage() }</h1>
        { gongMedia() }
      </div>
    )
  } else {
    return(
      <div className={ styles.timer }>
        <Clock time={ time } duration={ settings.origDuration } />
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
