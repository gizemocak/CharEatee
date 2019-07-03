import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";
import { useStoreState, useStoreActions } from "easy-peasy";

export default function OrderHistory(props) {
  const order = useStoreState(state => state.order);
  let user = JSON.parse(localStorage.getItem("user"));
  const [products, setProducts] = useState([{}]);

  useEffect(() => {
    fetch(
      `http://localhost:8080/api/orders/?userId=${user.user_id}&type=${
        user.type
      }`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(res => setProducts(res))
      .then(res => console.log("state", products));
  }, []);

  return (
    <>
      <Navbar />
      <h3>{JSON.parse(localStorage.getItem("user")).name}</h3>
      {JSON.parse(localStorage.getItem("user")).type === "Charity" ? (
        <div>
          <div>Your Order History</div>
        </div>
      ) : (
        <div>Your Donations History</div>
      )}
      <ul>
        {products &&
          products.orders &&
          products.orders.map(item => {
            return (
              <div>
                {item.line_items.lineItems &&
                  item.line_items.lineItems.map(product => {
                    // console.log("product", product.product);
                    return (
                      <div>
                        <li>{product.product}</li>
                      </div>
                    );
                  })}
              </div>
            );
            // console.log("item", item.line_items.lineItems);
          })}
      </ul>
    </>
  );
}
