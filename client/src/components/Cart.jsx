import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import NavBar from "./NavBar";
import Button from "react-bootstrap/Button";

export default function Cart(props) {
  const cart = useStoreState(state => state.cart);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (cart.length === 0) {
      props.history.push("/login");
    }
  }, []);

  console.log(props);
  const placeOrder = () => {
    fetch("http://localhost:8080/api/order", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart)
    }).then(res => {
      console.log("response", res);
    });
  };

  return (
    <>
      <NavBar />
      <div>Cart</div>
      {cart.length > 0 &&
        cart.map(item => {
          return <li>{item.name}</li>;
        })}

      <Button onClick={placeOrder}>Place Order</Button>
    </>
  );
}
