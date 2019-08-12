import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Utters from './screens/Utters';
import NavBar from './components/NavBar';

function App() {
  
  return (
    <div>

    <NavBar/>
    <Router>
      <div>
        <Route exact path="/utters" component={Utters} />
      </div>
    </Router>
    </div>
  );
}

export default App;
