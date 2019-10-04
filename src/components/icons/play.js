import React from "react";

const PlayIcon = ({ color, strokeWidth }) => {

  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={ color } strokeWidth={ strokeWidth } stroke-linecap="square" stroke-linejoin="arcs"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
  )
}

PlayIcon.defaultProps = {
  color: '#fff',
  strokeWidth: 2
}

export default PlayIcon
