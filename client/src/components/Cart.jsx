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

  const placeOrder = () => {
    let cartObj = {
      charityId: JSON.parse(localStorage.getItem("user")).user_id,
      grocerId: cart[0].userId,
      products: cart
    };
    fetch("http://localhost:8080/api/order", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartObj)
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
          return (
            <li>
              {item.name} {item.quantity}
              {item.unit}
            </li>
          );
        })}

      <Button onClick={placeOrder}>Place Order</Button>
    </>
  );
}
