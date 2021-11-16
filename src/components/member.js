import React, { useState, useEffect, useRef, useContext } from "react";

import { Context } from "./store";
import EditMember from "./editMember";
import RubbishIcon from "./icons/rubbish";
import ChevronIcon from "./icons/chevron";
import styles from "./member.module.scss";
import formStyles from "./forms.module.scss";

const Member = ({
  name,
  active,
  speech,
  mediaUrl,
  memberIndex,
  lastMember,
}) => {
  const [{ team, mode, colors }, dispatch] = useContext(Context);
  const [inputValue, setInputValue] = useState(name);
  const [editing, setEditing] = useState();
  const inputEl = useRef(null);

  const onNameInputChange = (e) => {
    //validate length
    if (e.target.value.length > -1) {
      //remove error class
      e.target.classList.remove("error");
      return dispatch({
        type: "UPDATE_MEMBER",
        name: e.target.value,
        active: active,
        speech: speech,
        mediaUrl: mediaUrl,
        memberIndex: memberIndex,
      });
    } else {
      e.target.classList.add("error");
    }
  };

  const onActiveInputChange = (e) => {
    let newActiveState = e.target.checked ? true : false;
    return dispatch({
      type: "UPDATE_MEMBER",
      name: name,
      active: newActiveState,
      speech: speech,
      mediaUrl: mediaUrl,
      memberIndex: memberIndex,
    });
  };

  const onRemoveButtonPress = () => {
    let confirmDelete = window.confirm(
      "Are you sure you wish to remove this team member?"
    );
    if (confirmDelete) {
      return dispatch({ type: "REMOVE_TEAM_MEMBER", memberIndex: memberIndex });
    }
  };

  const removeButton =
    memberIndex > 0 ? (
      <button
        type="button"
        onClick={onRemoveButtonPress}
        className={formStyles.iconButton}
        tabIndex="-1"
      >
        <RubbishIcon color={`#fff`} />
      </button>
    ) : null;

  const editButton = editing ? (
    <button
      onClick={() => setEditing(false)}
      className={formStyles.iconButton}
      tabIndex="-1"
    >
      <ChevronIcon color={`#fff`} rotation={180} />
    </button>
  ) : (
    <button
      onClick={() => setEditing(true)}
      className={formStyles.iconButton}
      tabIndex="-1"
    >
      <ChevronIcon color={`#fff`} rotation={0} />
    </button>
  );

  const editForm = editing ? (
    <EditMember
      memberIndex={memberIndex}
      name={name}
      speech={speech}
      mediaUrl={mediaUrl}
      active={active}
    />
  ) : null;

  //styles
  const elStyles = {
    height: "2.5rem",
    border: `1px solid transparent`,
    padding: `0.5rem 0.5rem 0 0.5rem`,
  };
  if (editing) {
    elStyles.height = "13rem";
    elStyles.border = `1px solid ${colors.highlightOne}`;
    elStyles.padding = `0.5rem 0.5rem 0.5rem 0.5rem`;
  }

  //use effect hook
  useEffect(() => {
    if (lastMember) {
      inputEl.current.focus();
    }
  }, []);

  return (
    <div style={elStyles} className={styles.member}>
      <div className={styles.memberHeader}>
        <input
          type="checkbox"
          id={`active-checkbox-${memberIndex}`}
          data-member-index={memberIndex}
          onChange={(e) => {
            onActiveInputChange(e);
          }}
          checked={active}
        />
        <label htmlFor={`active-checkbox-${memberIndex}`}></label>
        <input
          type="text"
          data-member-index={memberIndex}
          value={name}
          onChange={(e) => {
            onNameInputChange(e);
          }}
          ref={inputEl}
        />
        <div className={styles.buttonsCont}>
          {editButton}
          {removeButton}
        </div>
      </div>
      {editForm}
    </div>
  );
};

export default Member;
