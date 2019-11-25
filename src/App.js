import React, { Component } from 'react'

import Login from './Components/login'
import Game from './Components/game'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";


export default class App extends Component {

  

  render() {
    return (
      <Router>
        <div>
          {/* <nav>
            <ul>
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/game">Game</Link>
              </li>
            </ul>
          </nav> */}
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/game">
              <Game/>
            </Route>
            <Route path="/">
             <Login/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
  
 
  
}


