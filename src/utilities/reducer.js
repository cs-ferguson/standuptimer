import Storage from "./storage";

export const reducer = (state, action) => {

  let storage = new Storage();

  let newTeams = null;
  let newTeamMembers = null;

  switch (action.type) {
    case 'START_STANDUP':
      return {
        ...state,
        mode: 'active'
      }
    case 'EXIT_STANDUP':
      return {
        ...state,
        mode: 'start'
      }
    case 'UPDATE_MEMBER':
      //create new team array
      newTeamMembers = state.teams[state.currentTeam].members.map( (member,index) => {
        if( index === action.memberIndex ){
          return {
            name: action.name,
            active: action.active,
            speech: action.speech,
            mediaUrl: action.mediaUrl
          }
        } else {
          return {
            name: member.name,
            active: member.active,
            speech: member.speech,
            mediaUrl: member.mediaUrl
          }
        }
      })
      //create new teams array
      newTeams = state.teams.map( (team,index) => {
        if( index === state.currentTeam ){
          team.members = newTeamMembers;
        }
        return team;
      })
      //store
      storage.store( 'teams', 'standupTimer', newTeams );
      return {
        ...state,
        teams: newTeams
      }
    case 'ADD_TEAM_MEMBER':
      newTeamMembers = state.teams[state.currentTeam].members.concat({
        name: '',
        active: true,
        speech: null,
        mediaUrl: null
      })
      //create new teams array
      newTeams = state.teams.map( (team,index) => {
        if( index === state.currentTeam ){
          team.members = newTeamMembers;
        }
        return team;
      })
      //store
      storage.store( 'teams', 'standupTimer', newTeams );
      return {
        ...state,
        teams: newTeams
      }
    case 'REMOVE_TEAM_MEMBER':
      newTeamMembers = [...state.teams[state.currentTeam].members.slice(0, action.memberIndex), ...state.teams[state.currentTeam].members.slice(action.memberIndex + 1)];
      //create new teams array
      newTeams = state.teams.map( (team,index) => {
        if( index === state.currentTeam ){
          team.members = newTeamMembers;
        }
        return team;
      })
      //store
      storage.store( 'teams', 'standupTimer', newTeams );
      return {
        ...state,
        teams: newTeams
      }
    case 'UPDATE_TEAM_NAME':
      //create new teams array
      newTeams = state.teams.map( (team,index) => {
        if( index === state.currentTeam ){
          team.name = action.teamName;
        }
        return team;
      })
      //store
      storage.store( 'teams', 'standupTimer', newTeams );
      return {
        ...state,
        teams: newTeams
      }
    case 'MOVE_TO_PREV_TEAM':
      return {
        ...state,
        currentTeam: state.currentTeam - 1
      }
    case 'MOVE_TO_NEXT_TEAM':
      return {
        ...state,
        currentTeam: state.currentTeam + 1
      }
    case 'UPDATE_DURATION':
      //store
      let newSettings = {
        ...state.settings,
        origDuration: action.value
      }
      storage.store( 'settings', 'standupTimer', newSettings );
      return{
        ...state,
        settings: newSettings
      }
    case 'UPDATE_GONG_MESSAGE': {
      //store
      let newSettings = {
        ...state.settings,
        gongMessage: action.value
      }
      storage.store( 'settings', 'standupTimer', newSettings );
      return{
        ...state,
        settings: newSettings
      }
    }
    case 'UPDATE_GONG_MEDIA_URL': {
      //store
      let newSettings = {
        ...state.settings,
        gongMediaUrl: action.value
      }
      storage.store( 'settings', 'standupTimer', newSettings );
      return{
        ...state,
        settings: newSettings
      }
    }
    default:
      return state
  }
}
