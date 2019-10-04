import React from "react";

const CloseIcon = ({ color, strokeWidth }) => {

  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={ color } strokeWidth={ strokeWidth } stroke-linecap="square" stroke-linejoin="arcs"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  )
}

CloseIcon.defaultProps = {
  color: '#fff',
  strokeWidth: 2
}

export default CloseIcon
