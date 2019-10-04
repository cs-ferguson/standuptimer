import React from "react";

import styles from './timer.module.scss';

const Clock = ({ time, duration }) => {

  const padNumber = (num, size) => {
    let s = '000000000' + num;
    return s.substr(s.length-size);
  }

  if(!time){
    time = duration;
  }

  const percProgress = time / duration;
  const secs = Math.floor(time/1000);
  const ms = padNumber(time - (Math.floor(time/1000) * 1000), 3);



  return(
    <div className={ styles.clock }>
      <svg viewBox="0 0 36 36" style={{ transform: 'scaleX(-1)' }}>
        <circle className="stroke" cx="18" cy="18" r="16" fill="transparent" stroke="#000" strokeOpacity="0.15" strokeWidth="1"></circle>
        <circle className="stroke" cx="18" cy="18" r="16" fill="transparent" stroke="#fff" strokeWidth="1" strokeDasharray={(percProgress * 100) + " " + ((1-percProgress) * 100)} strokeDashoffset="0" transform="rotate(-89.5 18 18)"></circle>
      </svg>
      <p className={ styles.timerNumbers }>{ secs }.<span className="ms">{ ms }</span></p>
    </div>
  )
}

export default Clock
