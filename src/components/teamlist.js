import React, {useRef, useContext} from "react";

import Member from "./member";
import {Context} from "./store";
import AddPersonIcon from "./icons/addPerson";
import ChevronIcon from "./icons/chevron";
import RubbishIcon from "./icons/rubbish";

import styles from "./teamlist.module.scss";
import formStyles from "./forms.module.scss";

const TeamList = () => {
  const [{teams, currentTeam}, dispatch] = useContext(Context);
  const formEl = useRef(null);

  const hideAddButton = () => {
    let hidden = false;
    teams[currentTeam].members.forEach((member) => {
      if (member.name.length < 1) {
        hidden = true;
      }
    });
    return hidden;
  };

  const teamDeets = teams[currentTeam].members.map((member, index) => {
    //set if last member
    let lastMember =
      index === teams[currentTeam].members.length - 1 ? true : false;
    return (
      <Member
        key={`member_${index}`}
        name={member.name}
        memberIndex={index}
        active={member.active}
        speech={member.speech}
        mediaUrl={member.mediaUrl}
        lastMember={lastMember}
      />
    );
  });

  const onRemoveTeamButtonPress = () => {
    let confirmDelete = window.confirm(
      "Are you sure you wish to remove this team - it cannot be restored?"
    );
    if (confirmDelete) {
      return dispatch({type: "REMOVE_TEAM", teamIndex: currentTeam});
    }
  };

  let addNewMemberButton = hideAddButton() ? null : (
    <button
      className={`${styles.addNewMemberButton} ${formStyles.textButton}`}
      type="button"
      onClick={() => dispatch({type: "ADD_TEAM_MEMBER"})}
    >
      <AddPersonIcon color={`#fff`} />
      Add another
    </button>
  );

  let prevTeamButtonDisabled = currentTeam > 0 ? false : true;
  let nextTeamButtonAction =
    currentTeam < teams.length - 1 ? "MOVE_TO_NEXT_TEAM" : "ADD_NEW_TEAM";

  return (
    <section className={styles.teamlistCont}>
      <div className={styles.teamSelect}>
        <button
          onClick={() => dispatch({type: "MOVE_TO_PREV_TEAM"})}
          disabled={prevTeamButtonDisabled}
          className={formStyles.iconButton}
        >
          <ChevronIcon color={`#fff`} rotation={90} />
        </button>
        <input
          type="text"
          value={teams[currentTeam].name}
          onChange={(e) =>
            dispatch({type: "UPDATE_TEAM_NAME", teamName: e.target.value})
          }
        />
        <button
          onClick={() => dispatch({type: nextTeamButtonAction})}
          className={formStyles.iconButton}
        >
          <ChevronIcon color={`#fff`} rotation={270} />
        </button>
        <button
          onClick={onRemoveTeamButtonPress}
          className={formStyles.iconButton}
        >
          <RubbishIcon color={`#fff`} />
        </button>
      </div>
      <div ref={formEl} className={styles.teamlist}>
        {teamDeets}
      </div>
      {addNewMemberButton}
    </section>
  );
};

export default TeamList;
