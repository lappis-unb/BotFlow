import React from 'react';
import './style.js';
import { List } from './style.js';
import UtterPage from "./UtterPage"
import IntentPage from './IntentPage';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "./App.css"

function App() {
  return (
    <Router>
      <AppBar id="app-bar-menu" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Logo
          </Typography>
          <List>
            <Link to="/utters">Utters</Link>
          </List>
          <List>
            <Link to="/intents">Intents</Link>
          </List>
        </Toolbar>
      </AppBar>
      <div style={{ paddingTop: "64px" }}>
        <Route exact path="/utters" component={UtterPage} />
        <Route exact path="/intents" component={IntentPage} />
      </div>
      <script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js" > </ script >
    </Router>
  );
}

export default App;