import React, { Component } from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import List from './components/List';
import SignUpForm from './components/SignupForm';
import Login from './components/Login';
import CharityHome from './components/CharityHome';
import GroceryHome from './components/GroceryHome'
import Profile from './components/Profile'
import {createStore, StoreProvider} from 'easy-peasy'
import usersProductsModel from "./stores/usersProductsModel"
import adminModel from "./stores/adminModel"

const store = createStore({
  ...usersProductsModel,
  ...adminModel
})

function App() {
    return (
      <StoreProvider store={store}>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/list' component={List}/>
          <Route path='/signup' component={SignUpForm}/>
          <Route path='/login' component={Login}/>
          <Route path='/grocery/home/:id' component={GroceryHome}/>
          <Route path='/charity/home/:id' component={CharityHome}/>
          <Route path='/profile/:id' component={Profile}/>
        </Switch>
      </div>
      </StoreProvider>
    );
}

export default withRouter(App);
