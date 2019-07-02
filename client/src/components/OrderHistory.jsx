import React, { useEffect } from "react";
import Navbar from "./NavBar";
import { useStoreState, useStoreActions } from "easy-peasy";

export default function OrderHistory(props) {
  const order = useStoreState(state => state.order);
  const fetchOrders = useStoreActions(actions => actions.fetchOrders);

  console.log(order);

  useEffect(() => {
    const orderId = order[0].order_id;
    if (orderId) {
      fetchOrders(orderId);
    }
  }, []);

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
