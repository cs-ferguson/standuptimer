import Storage from "./storage";

export const reducer = (state, action) => {

  let storage = new Storage();

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
      let newTeam = state.team.map( (member,index) => {
        if( index === action.memberIndex ){
          return {
            name: action.name,
            active: action.active
          }
        } else {
          return {
            name: member.name,
            active: member.active
          }
        }
      })
      //store
      storage.store( 'myTeam', 'standupTimer', newTeam );
      return {
        ...state,
        team: newTeam
      }
    case 'ADD_TEAM_MEMBER':
      let teamAdded = state.team.concat({
        name: '',
        active: true
      })
      //store
      storage.store( 'myTeam', 'standupTimer', teamAdded );
      return {
        ...state,
        team: teamAdded
      }
    case 'REMOVE_TEAM_MEMBER':
      let teamRemove = [...state.team.slice(0, action.memberIndex), ...state.team.slice(action.memberIndex + 1)];
      //store
      storage.store( 'myTeam', 'standupTimer', teamRemove );
      return {
        ...state,
        team: teamRemove
      }
    default:
      return state
  }
}
