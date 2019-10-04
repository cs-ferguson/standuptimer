import React, { useState, useEffect } from "react";

import { useStateValue } from "../hooks/useGlobalState";

import Timer from "./timer";
import CloseIcon from "./icons/close";
import DoubleChevronIcon from "./icons/doubleChevron";

import styles from "./standuptimer.module.scss";
import formStyles from "./forms.module.scss";

const Standup = ({ people }) => {

  const [{mode, colors}, dispatch] = useStateValue();
  const [timerIndex, setTimerIndex] = useState( 0 );
  const [timerRunning, setTimerRunning] = useState( true );

  const nextTimer = () => {
    setTimerRunning( true );
    setTimerIndex( timerIndex + 1 );
  }
  const prevTimer = () => {
    setTimerRunning( true );
    setTimerIndex( timerIndex - 1 );
  }

  const exitStandup = () => {
    return dispatch({ type: 'EXIT_STANDUP' });
  }
  const restartStandup = () => {
    setTimerRunning( false );
    setTimerIndex( 0 );
  }

  const nextDisabled = timerIndex < people.length - 1 ? false : true ;
  const prevDisabled = timerIndex > 0 ? false : true ;

  const nextButton = <button type="button" onClick={ nextTimer } className={ formStyles.iconButton } disabled={ nextDisabled } ><DoubleChevronIcon /></button>;
  const prevButton = <button type="button" onClick={ prevTimer } className={ formStyles.iconButton } disabled={ prevDisabled }><DoubleChevronIcon rotation={ 180 } /></button>;

  //EFFECT HOOK FOR KEYPRESSES
  useEffect(() => {
    const keyPressHandler = (e) => {
      //next
      if( e.keyCode === 39 ){
        if( timerIndex < people.length - 1 ){
          console.log(timerIndex);
          nextTimer();
        }
      }
      //prev
      if( e.keyCode === 37 ){
        if( timerIndex > 0 ){
          console.log(timerIndex);
          prevTimer();
        }
      }
      //exit
      if( e.keyCode === 27 ){
        exitStandup();
      }
    }
    window.addEventListener('keydown', keyPressHandler);
    return () => {
      window.removeEventListener('keydown', keyPressHandler);
    };
  }, [timerIndex]);



  return(
    <div style={{ width: '100%' }}>
      {/*setting key forces remount for flasher timeout to trigger!*/}
      <Timer key={`timer-${timerIndex}`} person={people[timerIndex]} timerRunning={ timerRunning } nextTimer={ nextTimer } lastTimer={ ( timerIndex === people.length - 1) ? true : false } nextButton={ nextButton } prevButton={ prevButton } />
      <button type="button" onClick={ exitStandup } className={ formStyles.iconButton } style={{ position: 'fixed', top: '0.5rem', right: '0.5rem'}}>
        <CloseIcon color={ colors.lowlightOne }/>
      </button>

    </div>
  )
}

export default Standup
