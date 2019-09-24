import React from 'react';
import "./App.css"
import { AppBar, Toolbar } from '@material-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainNav from "../components/MainNav"

import UtterPage from "./UtterPage"
import IntentPage from './IntentPage';
import AppIcon from '../icons/AppIcon';
import StoryEditPage from './StoryEditPage';
import StoriesPage from './StoriesPage';
import Button from '@material-ui/core/Button';
import { message } from '../utils/messages.js';
import { DOWNLOAD_URL} from '../utils/url_routes.js';

function App() {
  return (
    <Router>
      <AppBar id="app-bar-menu">
        <Toolbar>
          <AppIcon />
          <MainNav />
          <Button
            color="secondary"
            variant="contained"
            href={DOWNLOAD_URL}>
            {message.download} 
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ paddingTop: "74px" }}>
        <Route exact path="/" component={StoriesPage} />
        <Route path="/utters/" component={UtterPage} />
        <Route path="/intents/" component={IntentPage} />
        <Route path="/stories/" component={StoryEditPage} />
      </div>
      <script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></ script >
    </Router>
  );
}

export default App;
