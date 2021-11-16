import React from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import Store from "./components/store";
import StandupTimer from "./components/standupTimer";
import Settings from "./components/settings";

const App = () => {
  return (
    <Store>
      <Router>
        <Routes>
          <Route exact path="/" element={<StandupTimer />} />
          <Route path="/settings" element={<Settings />} />
          <Route element={() => <div>404 Not Found!</div>} />
        </Routes>
      </Router>
    </Store>
  );
};

export default App;
