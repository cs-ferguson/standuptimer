import React, {useContext} from "react";

import {Context} from "./store";
import styles from "./timer.module.scss";

const Clock = ({time, duration}) => {
  const [{colors}] = useContext(Context);

  const padNumber = (num, size) => {
    let s = "000000000" + num;
    return s.substr(s.length - size);
  };

  if (!time) {
    time = duration;
  }

  const percProgress = time / duration;
  const secs = Math.floor(time / 1000);
  const ms = padNumber(time - Math.floor(time / 1000) * 1000, 3);

  //stroke colors
  const stroke = (percProgress) => {
    if (percProgress > 0.8) {
      return "#fff";
    }
    if (percProgress > 0.64) {
      return colors.vanilla;
    }
    if (percProgress > 0.48) {
      return colors.flax;
    }
    if (percProgress > 0.32) {
      return colors.neonCarrot;
    }
    if (percProgress > 0.16) {
      return colors.giantsOrange;
    }
    return colors.watermelonRed;
  };

  return (
    <div className={styles.clock}>
      <svg viewBox="0 0 36 36" style={{transform: "scaleX(-1)"}}>
        <circle
          className="stroke"
          cx="18"
          cy="18"
          r="16"
          fill="transparent"
          stroke="#000"
          strokeOpacity="0.15"
          strokeWidth="1"
        ></circle>
        <circle
          className="stroke"
          cx="18"
          cy="18"
          r="16"
          fill="transparent"
          stroke={stroke(percProgress)}
          strokeWidth="1"
          strokeDasharray={`${percProgress * 100.5} ${
            (1 - percProgress) * 100.5
          }`}
          strokeDashoffset="0"
          transform="rotate(-88 18 18)"
          style={{transition: `9s stroke`}}
        ></circle>
      </svg>
      <p
        className={styles.timerNumbers}
        style={{color: stroke(percProgress), transition: `9s color`}}
      >
        {secs}.<span className="ms">{ms}</span>
      </p>
    </div>
  );
};

export default Clock;
