import React from "react";

import { useStateValue } from "../hooks/useGlobalState";

import styles from "./member.module.scss";

const EditMember = ({ memberIndex, name, speech, active, mediaUrl}) => {

  const [{team, imageExtensions, videoExtensions}, dispatch] = useStateValue();

  const onSpeechInputChange = (e) => {
    //validate length
    if(e.target.value.length > -1){
      //remove error class
      e.target.classList.remove('error');
      return dispatch({type: 'UPDATE_MEMBER', name: name, active: active, speech: e.target.value, mediaUrl: mediaUrl, memberIndex: memberIndex})
    } else {
      e.target.classList.add('error');
    }
  }

  const onMediaUrlInputChange = (e) => {
    //validate length
    if(e.target.value.length > -1){
      //validate suffix
      let fileExtension = e.target.value.split('.').pop();
      if( videoExtensions.indexOf(fileExtension) > -1 || imageExtensions.indexOf(fileExtension) > -1 ){
        //remove error class
        e.target.classList.remove('error');
      } else {
        e.target.classList.add('error');
        console.log(`${fileExtension} is not a valid file type!`);
      }
      return dispatch({type: 'UPDATE_MEMBER', name: name, active: active, speech: speech, mediaUrl: e.target.value, memberIndex: memberIndex})
    } else {
      e.target.classList.add('error');
    }
  }

  return(
    <div className={ styles.editMember }>
      <label htmlFor={`memberSpeechInput_${memberIndex}`}>Speech</label>
      <input id={`memberSpeechInput_${memberIndex}`} type="text" data-member-index={memberIndex} value={speech} onChange={ (e) => { onSpeechInputChange(e) } }  />

      <label htmlFor={`memberMediaUrlInput_${memberIndex}`}>Media URL</label>
      <input id={`memberMediaUrlInput_${memberIndex}`} type="text" data-member-index={memberIndex} value={mediaUrl} onChange={ (e) => { onMediaUrlInputChange(e) } }  />
    </div>
  )
}

export default EditMember
