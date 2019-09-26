import React, { useRef } from "react";

import { useStateValue } from "../hooks/useGlobalState";

import Member from "./member";
import styles from "./teamlist.module.scss";

 const TeamList = () => {

  const [{teams, currentTeam}, dispatch] = useStateValue();
  const formEl = useRef(null);

  const hideAddButton = () => {
    let hidden = false;
    teams[currentTeam].members.forEach( member => {
      if(member.name.length < 1){
        hidden = true;
      }
    })
    return hidden;
  }

  const teamDeets = teams[currentTeam].members.map( (member, index) => {
    //set if last member
    let lastMember = (index === teams[currentTeam].members.length - 1) ? true : false ;
    return <Member key={`member_${index}`} name={member.name} memberIndex={index} active={member.active} lastMember={lastMember} />;
  })

  let addNewMemberButton = (hideAddButton()) ? null : <button className="addNew" type="button" onClick={ () => dispatch({ type: 'ADD_TEAM_MEMBER'})}>Add another</button>;

  let prevTeamButtonDisabled = ( currentTeam > 0 ) ? false : true ;
  let nextTeamButtonDisabled = ( currentTeam < teams.length - 1 ) ? false : true ;

  return(
    <section className={ styles.teamlistCont }>
      <div className={ styles.teamSelect }>
        <button onClick={ () => dispatch({ type: 'MOVE_TO_PREV_TEAM' }) } disabled={ prevTeamButtonDisabled}>&lt;</button>
        <input type="text" value={ teams[currentTeam].name } onChange={ (e) => dispatch({ type: 'UPDATE_TEAM_NAME', teamName: e.target.value }) } />
        <button onClick={ () => dispatch({ type: 'MOVE_TO_NEXT_TEAM' }) } disabled={ nextTeamButtonDisabled } >&gt;</button>
      </div>
      <div ref={formEl} className={ styles.teamlist }>
        {teamDeets}
      </div>
      { addNewMemberButton }
    </section>
  )
}

export default TeamList
