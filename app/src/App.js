import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Utters from './screens/Utters';

function App() {
  
  return (
    <Router>
      <div>
        <Route exact path="/" component={Utters} />
      </div>
    </Router>
  );
}

export default App;
