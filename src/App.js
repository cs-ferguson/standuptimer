import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { StateProvider } from "./hooks/useGlobalState";
import { reducer } from "./utilities/reducer";

import StandupTimer from "./components/standupTimer";
import Settings from "./components/settings";
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

  const getSettings = (index) => {
    if( storage.retrieve(`standupTimer`) ){
      let store = storage.retrieve(`standupTimer`);
      if( store.items.settings ){
        return store.items.settings;
      }
    }

    return {
      origDuration: 50000,
      gongMessage: ['Please stop','Please stop now'],
      gongMediaUrl: ['https://media.giphy.com/media/XBgZuQGJWXuww/giphy.gif'],
    };
  }

  let colors = ( typeof window !== 'undefined' && typeof document !== 'undefined' ) ? {
    white: '#fff',
    backgroundColor: window.getComputedStyle(document.documentElement).getPropertyValue('--background-color'),
    highlightOne: window.getComputedStyle(document.documentElement).getPropertyValue('--highlight-one'),
    lowlightOne: window.getComputedStyle(document.documentElement).getPropertyValue('--lowlight-one'),
    vanilla: window.getComputedStyle(document.documentElement).getPropertyValue('--vanilla'),
    flax: window.getComputedStyle(document.documentElement).getPropertyValue('--flax'),
    neonCarrot: window.getComputedStyle(document.documentElement).getPropertyValue('--neon-carrot'),
    giantsOrange: window.getComputedStyle(document.documentElement).getPropertyValue('--giants-orange'),
    watermelonRed: window.getComputedStyle(document.documentElement).getPropertyValue('--watermelon-red'),
  } : {} ;

  const initialState = {
    mode: 'start',
    teams: getTeams(),
    currentTeam: 0,
    colors: colors,
    imageExtensions: ['gif','jpg','jpeg','png'],
    videoExtensions: ['mp4','mov'],
    settings: getSettings(),
  }

  console.log(getTeams());

  return (
    <StateProvider reducer={reducer} initialState={initialState}>
      <Router>
        <Switch>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/">
            <StandupTimer />
          </Route>
        </Switch>
      </Router>
    </StateProvider>
  );
}

export default App;
