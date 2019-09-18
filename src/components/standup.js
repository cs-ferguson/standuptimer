import React, { useState } from "react";

import { useStateValue } from "../hooks/useGlobalState";

import Timer from "./timer";

const Standup = ({ people }) => {

  const [{mode}, dispatch] = useStateValue();
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

  const nextButton = ( timerIndex < people.length - 1 ) ? <button type="button" onClick={ nextTimer }>Next</button> : null ;
  const prevButton = ( timerIndex > 0 ) ? <button type="button" onClick={ prevTimer }>Previous</button> : null ;

  return(
    <div>
      {/*setting key forces remount for flasher timeout to trigger!*/}
      <Timer key={`timer-${timerIndex}`} person={people[timerIndex]} timerRunning={ timerRunning } nextTimer={ nextTimer } lastTimer={ ( timerIndex === people.length - 1) ? true : false } />
      { prevButton }
      <button type="button" onClick={ exitStandup }>Exit</button>
      { nextButton }
    </div>
  )
}

export default Standup
