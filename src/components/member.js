import React, {useState, useEffect, useRef} from "react";

import { useStateValue } from "../hooks/useGlobalState";

import EditMember from "./editMember";
import styles from "./member.module.scss";

const Member = ({name, active, memberIndex, lastMember}) => {

  const [{team, mode, colors}, dispatch] = useStateValue();
  const [inputValue, setInputValue] = useState(name);
  const [editing, setEditing] = useState();
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
  const editButton = (editing) ? <button onClick={ () => setEditing(false) }>Hide</button> : <button onClick={ () => setEditing(true) }>More</button>
  const editForm = (editing) ? <EditMember memberIndex={ memberIndex } name={ name } /> : null ;
  //styles
  const elStyles = { height: '2.2rem', border: `1px solid transparent`, padding: '0 0.5rem' };
  if( editing ){
    elStyles.height = '8rem';
    elStyles.border = `1px solid ${ colors.highlightOne }`;
    elStyles.padding = `0.5rem 0.5rem`;
  }



  //use effect hook
  useEffect( () => {
    if( lastMember ){
      inputEl.current.focus();
    }
  },[]);


  return(
    <div style={ elStyles } className={ styles.member }>
      <div>
        <input type="checkbox" data-member-index={memberIndex} onChange={ (e) => { onActiveInputChange(e) } } checked={ active }/>
        <input type="text" data-member-index={memberIndex} value={name} onChange={ (e) => { onNameInputChange(e)} } ref={ inputEl } />
        { editButton }
        { removeButton }
      </div>
      { editForm }
    </div>
  )
}

export default Member
