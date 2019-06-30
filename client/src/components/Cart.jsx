import React from 'react';
import {useStoreState } from "easy-peasy";
import NavBar from './NavBar';

export default function Cart (props) {
  const cart = useStoreState(state => state.cart)
  console.log("cart",cart)
    return (
      <>
      <NavBar/>
      <div>Cart</div>
    </>
    );
}
