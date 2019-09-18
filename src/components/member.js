import React, {useState, useEffect, useRef} from "react";

import { useStateValue } from "../hooks/useGlobalState";


const Member = ({name, active, memberIndex, lastMember}) => {

  const [{team}, dispatch] = useStateValue();
  const [inputValue, setInputValue] = useState(name);
  const inputEl = useRef(null);

  const onNameInputChange = (e) => {
    //validate length
    if(e.target.value.length > -1){
      //remove error class
      e.target.classList.remove('error');
      return dispatch({type: 'UPDATE_MEMBER', name: e.target.value, active: active, memberIndex: memberIndex})
    } else {
      e.target.classList.add('error');
    }
  }

  const onActiveInputChange = (e) => {
    let newActiveState = (e.target.checked) ? true : false ;
    return dispatch({type: 'UPDATE_MEMBER', name: name, active: newActiveState, memberIndex: memberIndex})
  }

  const onRemoveButtonPress = () => {
    let confirmDelete = window.confirm('Are you sure you wish to remove this team member?');
    if(confirmDelete){
      return dispatch({type: 'REMOVE_TEAM_MEMBER', memberIndex: memberIndex});
    }
  }

  const removeButton = (memberIndex > 0) ? <button type="button" onClick={ onRemoveButtonPress } tabIndex="-1">Remove</button> : null ;

  //use effect hook
  useEffect( () => {
    if( lastMember ){
      inputEl.current.focus();
    }
  },[]);


  return(
    <div>
      <input type="checkbox" data-member-index={memberIndex} onChange={ (e) => { onActiveInputChange(e) } } checked={ active }/>
      <input type="text" data-member-index={memberIndex} value={name} onChange={ (e) => { onNameInputChange(e)} } ref={ inputEl } />
      {removeButton}
    </div>
  )
}

export default Member
