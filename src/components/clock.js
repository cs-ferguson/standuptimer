import React from "react";

const Clock = ({ time, duration }) => {

  const percProgress = time / duration;

  return(
    <div>
      <svg viewBox="0 0 36 36" style={{ transform: 'scaleX(-1)' }}>
        <circle className="stroke" cx="18" cy="18" r="16" fill="transparent" stroke="#000" strokeOpacity="0.15" strokeWidth="1"></circle>
        <circle className="stroke" cx="18" cy="18" r="16" fill="transparent" stroke="#fff" strokeWidth="1" strokeDasharray={(percProgress * 100) + " " + ((1-percProgress) * 100)} strokeDashoffset="0" transform="rotate(-89.5 18 18)"></circle>
      </svg>
      <p>{ time }</p>
    </div>
  )
}

export default Clock
