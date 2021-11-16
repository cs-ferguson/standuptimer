import React, {createContext, useReducer} from "react";
import {Reducer} from "../utilities/reducer";
import Storage from "../utilities/storage";

const storage = new Storage();

const getTeams = () => {
  //check storage
  if (storage.retrieve(`standupTimer`)) {
    let store = storage.retrieve(`standupTimer`);
    if (store.items.teams) {
      if (store.items.teams.length > 0) {
        return store.items.teams;
      }
    }
  }

  return [
    {
      name: "My Team",
      members: [
        {
          name: "Team Member Here...",
          active: true,
          speech: "Team Member",
          mediaUrl: null,
        },
      ],
    },
    {
      name: "My Second Team",
      members: [
        {
          name: "Team Member Here...",
          active: true,
          speech: "Team Member",
          mediaUrl: null,
        },
      ],
    },
  ];
};

const getSettings = (index) => {
  if (storage.retrieve(`standupTimer`)) {
    let store = storage.retrieve(`standupTimer`);
    if (store.items.settings) {
      return store.items.settings;
    }
  }

  return {
    origDuration: 60000,
    gongMessage: ["Please stop"],
    gongMediaUrl: [],
  };
};

let colors =
  typeof window !== "undefined" && typeof document !== "undefined"
    ? {
        white: "#fff",
        backgroundColor: window
          .getComputedStyle(document.documentElement)
          .getPropertyValue("--background-color"),
        highlightOne: window
          .getComputedStyle(document.documentElement)
          .getPropertyValue("--highlight-one"),
        lowlightOne: window
          .getComputedStyle(document.documentElement)
          .getPropertyValue("--lowlight-one"),
        vanilla: window
          .getComputedStyle(document.documentElement)
          .getPropertyValue("--vanilla"),
        flax: window
          .getComputedStyle(document.documentElement)
          .getPropertyValue("--flax"),
        neonCarrot: window
          .getComputedStyle(document.documentElement)
          .getPropertyValue("--neon-carrot"),
        giantsOrange: window
          .getComputedStyle(document.documentElement)
          .getPropertyValue("--giants-orange"),
        watermelonRed: window
          .getComputedStyle(document.documentElement)
          .getPropertyValue("--watermelon-red"),
      }
    : {};

const initialState = {
  mode: "start",
  teams: getTeams(),
  currentTeam: 0,
  colors: colors,
  imageExtensions: ["gif", "jpg", "jpeg", "png"],
  videoExtensions: ["mp4", "mov"],
  settings: getSettings(),
};
console.log(getTeams());

const Store = ({children}) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
