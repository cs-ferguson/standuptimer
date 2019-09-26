import React, { useState } from "react";

import { useStateValue } from "../hooks/useGlobalState";

import TeamList from "./teamlist";
import Standup from "./standup";
import Header from "./header";

const StandupTimer = () => {

  const [{mode, teams, currentTeam}, dispatch] = useStateValue();
  const [people, setPeople] = useState();

  const shufflePeople = (people) => {
		let shuffledPeople = people
			.map( person => [Math.random(), person])
			.sort((a,b) => a[0] - b[0])
			.map( transformedPerson => transformedPerson[1] );

		return shuffledPeople;
	}


  const startStandUp = () => {
    let newPeople = [];
    teams[currentTeam].members.forEach( member => {
      if( member.active ){
        newPeople.push( member );
      }
    })
    setPeople( shufflePeople( newPeople ) );
    return dispatch({ type: 'START_STANDUP' })
  }



  if(mode == 'start'){
    return (
      <>
        <Header />
        <TeamList />
        <button onClick={ startStandUp } type="button">Start Stand-up</button>
      </>
    )
  } else {
    return (
      <Standup people={people} />
    )
  }
}

export default StandupTimer
