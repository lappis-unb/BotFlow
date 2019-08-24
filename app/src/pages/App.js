import React from 'react';
import './App.css';
import UtterPage from "./UtterPage"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Logo
          </Typography>
        </Toolbar>
      </AppBar>
      <Router>
        <Route exact path="/" component={UtterPage} />
      </Router>
      <script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js" > </ script >
    </div>
  );
}

export default App;
