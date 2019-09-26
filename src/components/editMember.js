import React from "react";

import { useStateValue } from "../hooks/useGlobalState";

import styles from "./member.module.scss";

const EditMember = ({ memberIndex, name}) => {

  const [{team}, dispatch] = useStateValue();

  return(
    <div className={ styles.editMember }>
      <label htmlFor={`memberSpeechInput_${memberIndex}`}>Speech</label>
      <input id={`memberSpeechInput_${memberIndex}`} type="text" data-member-index={memberIndex} value={name} />
    </div>
  )
}

export default EditMember
