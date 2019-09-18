import React, { useRef } from "react";

import { useStateValue } from "../hooks/useGlobalState";

import Member from "./member"

 const TeamList = () => {

  const [{team}, dispatch] = useStateValue();
  const formEl = useRef(null);

  const hideAddButton = () => {
    let hidden = false;
    team.forEach( member => {
      if(member.name.length < 1){
        hidden = true;
      }
    })
    return hidden;
  }

  const teamDeets = team.map( (member, index) => {
    //set if last member
    let lastMember = (index === team.length - 1) ? true : false ;
    return <Member key={`member_${index}`} name={member.name} memberIndex={index} active={member.active} lastMember={lastMember} />;
  })

  let button = (hideAddButton()) ? null : <button className="addNew" type="button" onClick={ () => dispatch({ type: 'ADD_TEAM_MEMBER'})}>Add another</button>;

  return(
    <section>
      <form ref={formEl}>
        {teamDeets}
      </form>
      {button}
    </section>
  )
}

export default TeamList
