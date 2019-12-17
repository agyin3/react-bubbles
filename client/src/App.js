import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute'

import Login from "./components/Login";
import BubblePage from './components/BubblePage';
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path='/bubbles' component={BubblePage} />
          <Route path='/login' component={Login}/>
          <Route exact path='/' component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
