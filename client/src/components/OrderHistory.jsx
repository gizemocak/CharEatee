import React from "react";
import Navbar from "./NavBar";
import { useStoreState } from "easy-peasy";

export default function OrderHistory(props) {
  const order = useStoreState(state => state.order);
  console.log(order);
  return (
    <>
      <Navbar />
      {order.length > 0 &&
        JSON.parse(localStorage.getItem("user")).type === "Charity" && (
          <div>
            <div>Order History</div>
            <ul>
              {order.map(item => {
                return <li>{item.name}</li>;
              })}
            </ul>
          </div>
        )}
      {order.length > 0 &&
        JSON.parse(localStorage.getItem("user")).type !== "Charity" && (
          <div>My Donations History</div>
        )}
    </>
  );
}
