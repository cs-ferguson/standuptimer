import React from "react";

const Audio = ({ src }) => {

  return(
		<audio autoPlay='autoplay'>
			<source src={src} />
		</audio>
  )
}

export default Audio
