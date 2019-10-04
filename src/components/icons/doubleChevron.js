import React from "react";

const DoubleChevronIcon = ({ color, strokeWidth, rotation }) => {

  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={ color } strokeWidth={ strokeWidth } stroke-linecap="round" stroke-linejoin="round" transform={`rotate(${rotation} 0 0)`}><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg>
  )
}

DoubleChevronIcon.defaultProps = {
  color: '#fff',
  strokeWidth: 2,
  rotation: 0
}

export default DoubleChevronIcon
