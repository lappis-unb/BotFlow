import React from 'react';
import "./App.css"
import { AppBar, Toolbar } from '@material-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainNav from "../components/MainNav"

import UtterPage from "./UtterPage"
import IntentPage from './IntentPage';
import StoriesPage from './StoriesPage';
import AppIcon from '../icons/AppIcon';
import StoryEditPage from './StoryEditPage';

function App() {
  return (
    <Router>
      <AppBar id="app-bar-menu">
        <Toolbar>
          <AppIcon />
          <MainNav />
        </Toolbar>
      </AppBar>
      <div style={{ paddingTop: "72px" }}>
        <Route exact path="/utters" component={UtterPage} />
        <Route exact path="/intents" component={IntentPage} />
        <Route exact path="/stories" component={StoriesPage} />
        <Route exact path="/story/edit" component={StoryEditPage} />
      </div>
      <script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js" > </ script >
    </Router>
  );
}

export default App;