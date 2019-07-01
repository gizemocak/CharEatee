import React, {useEffect, useState} from 'react';
import {useStoreState, useStoreActions } from "easy-peasy";
import NavBar from './NavBar';

export default function Cart (props) {
  const cart = useStoreState(state => state.cart)
  // const orders = useStoreState(state => state.pins);
  // const fetchOrders = useStoreActions(actions => actions.fetchPins);
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch('/api/orders')
    .then(res => res.json())
    .then(res => setOrders(res))
  })


    return (
      <>
      <NavBar/>
      <div>Cart</div>
      {cart.length > 0 && cart.map(item => {
        return(
          <li>{item}</li>
        )
      })}
      
      <button>Checkout</button>
    </>
    );
}
