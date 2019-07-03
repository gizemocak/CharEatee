import React, { useEffect  } from 'react';
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
import Cart from "./components/Cart"
import cartModel from "./stores/cartModel"
import HomeSub from "./components/HomeSub"
import OrderHistory from "./components/OrderHistory"
import OrderHistoryModel from "./stores/orderHistoryModel"

const store = createStore({
  ...usersProductsModel,
  ...adminModel,
  ...cartModel,
  ...OrderHistoryModel
})


function App() {
    useEffect(() => {
      store.dispatch.fetchGoogleMapsAPIKey()
    },[])
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
          <Route path='/cart' component={Cart}/>
          <Route path='/account' component={HomeSub}/>
          <Route path='/order-history' component={OrderHistory}/>
        </Switch>
      </div>
      </StoreProvider>
    );
}

export default withRouter(App);
