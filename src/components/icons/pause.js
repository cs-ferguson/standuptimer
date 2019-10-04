import React from "react";

const PauseIcon = ({ color, strokeWidth }) => {

  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={ color } strokeWidth={ strokeWidth } stroke-linecap="square" stroke-linejoin="arcs"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
  )
}

PauseIcon.defaultProps = {
  color: '#fff',
  strokeWidth: 2
}

export default PauseIcon
