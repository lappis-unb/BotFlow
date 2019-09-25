import "./App.css"
import React from 'react';
import UtterPage from "./UtterPage";
import IntentPage from './IntentPage';
import StoriesPage from './StoriesPage';
import StoryEditPage from './StoryEditPage';
import MenuNavbar from "../components/MenuNavbar";
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <MenuNavbar />
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
