import React from 'react';
import './style.js';
import UtterPage from "./UtterPage"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import IntentPage from './IntentPage';
import { List } from './style.js';



function App() {
  return (
    <Router>
      <div className="App">
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Logo
          </Typography>
            <ul>
              <List>
                <Link to="/">Home</Link>
              </List>
              <List>
                <Link to="/utters">Utters</Link>
              </List>
              <List>
                <Link to="/intents">Intents</Link>
              </List>
            </ul>
          </Toolbar>
        </AppBar>
      </div>
      <Route exact path="/utters" component={UtterPage} />
      <Route exact path="/intents" component={IntentPage} />
      <script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js" > </ script >
    </Router>
  );
}

export default App;
