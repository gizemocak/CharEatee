import React, { Component } from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import List from './components/List';
import SignUpForm from './components/SignupForm';
import Login from './components/Login';
import CharityHome from './components/CharityHome';
import GroceryHome from './components/GroceryHome'
import SearchForm from './components/SearchForm';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/list' component={List}/>
          <Route path='/signup' component={SignUpForm}/>
          <Route path='/login' component={Login}/>
          <Route path='/grocery/home/:id' component={GroceryHome}/>
          <Route path='/charity/home/:id' component={CharityHome}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
