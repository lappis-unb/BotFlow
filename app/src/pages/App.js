import "./App.css"
import React from 'react';
import UtterPage from "./UtterPage";
import IntentPage from './IntentPage';
import AppIcon from '../icons/AppIcon';
import { Link } from 'react-router-dom';
import StoriesPage from './StoriesPage';
import StoryEditPage from './StoryEditPage';
import MainNav from "../components/MainNav";
import Button from '@material-ui/core/Button';
import { message } from '../utils/messages.js';
import { AppBar, Toolbar } from '@material-ui/core';
import { DOWNLOAD_URL} from '../utils/url_routes.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AppBar id="app-bar-menu">
        <Toolbar>
          <Link to="/">
            <AppIcon />
          </Link>
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
