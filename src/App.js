import React from 'react';

import { StateProvider } from "./hooks/useGlobalState";
import { reducer } from "./utilities/reducer";

import StandupTimer from "./components/standupTimer";
import Storage from "./utilities/storage";

const App = () => {

  const storage = new Storage();

  const getTeams = () => {
    //check storage
    if( storage.retrieve(`standupTimer`) ){
      let store = storage.retrieve(`standupTimer`);
      if( store.items.teams ){
        if( store.items.teams.length > 0 ){
          return store.items.teams;
        }
      }
    }

    return [
      {
        name: 'My Team',
        members: [
          {
            name: 'Team Member Here...',
            active: true,
            speech: 'Team Member',
            mediaUrl: null
          }
        ]
      },
      {
        name: 'My Second Team',
        members: [
          {
            name: 'Team Member Here...',
            active: true,
            speech: 'Team Member',
            mediaUrl: null
          }
        ]
      }
    ]
  }

  let colors = ( typeof window !== 'undefined' && typeof document !== 'undefined' ) ? {
    white: '#fff',
    backgroundColor: window.getComputedStyle(document.documentElement).getPropertyValue('--background-color'),
    highlightOne: window.getComputedStyle(document.documentElement).getPropertyValue('--highlight-one'),
    lowlightOne: window.getComputedStyle(document.documentElement).getPropertyValue('--lowlight-one')
  } : {} ;

  const initialState = {
    mode: 'start',
    teams: getTeams(),
    currentTeam: 0,
    colors: colors
  }

  console.log(getTeams());

  return (
    <StateProvider reducer={reducer} initialState={initialState}>
      <main className="app">
        <StandupTimer />
      </main>
    </StateProvider>
  );
}

export default App;