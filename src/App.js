import React from 'react';

import { StateProvider } from "./hooks/useGlobalState";
import { reducer } from "./utilities/reducer";

import StandupTimer from "./components/standupTimer";
import Storage from "./utilities/storage";

const App = () => {

  const storage = new Storage();

  const getTeam = () => {
    //check storage
    if( storage.retrieve(`standupTimer`) ){
      let store = storage.retrieve(`standupTimer`);
      if( store.items.myTeam ){
        if( store.items.myTeam.length > 0 ){
          return store.items.myTeam;
        }
      }
    }

    return [
      {
        name: 'Team Member Here...',
        active: true
      }
    ];
  }

  const initialState = {
    mode: 'start',
    team: getTeam()
  }

  return (
    <StateProvider reducer={reducer} initialState={initialState}>
      <div className="App">
        <StandupTimer />
      </div>
    </StateProvider>
  );
}

export default App;
