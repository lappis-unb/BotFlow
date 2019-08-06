import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Utters from './screens/Utters';
import NavBar from './components/NavBar';
import Intents from './screens/Intents';

function App() {
  
  return (
    <div>

    <NavBar/>
    <Router>
      <div>
        <Route exact path="/utters" component={Utters} />
        <Route exact path="/intents" component={Intents} />
      </div>
    </Router>
    </div>
  );
}

export default App;
