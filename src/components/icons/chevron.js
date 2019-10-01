import React from "react";

const ChevronIcon = ({ color, rotation }) => {

  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={ color } stroke-width="3" stroke-linecap="square" stroke-linejoin="arcs"><path d="M6 9l6 6 6-6" transform={`rotate(${rotation} 12 12)`}/></svg>
  )
}

export default ChevronIcon
