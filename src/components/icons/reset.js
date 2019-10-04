import React from "react";

const ResetIcon = ({ color, strokeWidth }) => {

  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={ color } strokeWidth={ strokeWidth } stroke-linecap="square" stroke-linejoin="arcs"><path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38"/></svg>
  )
}

ResetIcon.defaultProps = {
  color: '#fff',
  strokeWidth: 2
}

export default ResetIcon
