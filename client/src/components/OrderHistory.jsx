import React, { useEffect } from "react";
import Navbar from "./NavBar";
import { useStoreState, useStoreActions } from "easy-peasy";

export default function OrderHistory(props) {
  const order = useStoreState(state => state.order);
  let user = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
   fetch(`http://localhost:8080/api/orders/?userId=${user.user_id}&type=${user.type}`,{
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(res => console.log("response!!!", res))
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
