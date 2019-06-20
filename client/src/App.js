import React, { Component } from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import List from './components/List';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/list' component={List}/>
    </Switch>
      </div>
    );
  }
}

export default withRouter(App);
