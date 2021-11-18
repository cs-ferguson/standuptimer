import React from "react";

const AddIcon = ({color, strokeWidth}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      stroke-width={strokeWidth}
      stroke-linecap="square"
      stroke-linejoin="arcs"
    >
      <line x1="6" y1="12" x2="18" y2="12"></line>
      <line x1="12" y1="6" x2="12" y2="18"></line>
    </svg>
  );
};

AddIcon.defaultProps = {
  color: "#fff",
  strokeWidth: 3,
};

export default AddIcon;
