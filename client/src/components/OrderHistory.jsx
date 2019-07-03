import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";
import "../style/Profile.scss";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import posed from "react-pose";
import ListGroup from "react-bootstrap/ListGroup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import styled, { keyframes } from "styled-components";
import { fadeInUp } from "react-animations";
const FadeInUpAnimation = keyframes`${fadeInUp}`;
const FadeInUpDiv = styled.div`
  animation: 500ms ${FadeInUpAnimation};
`;

export default function OrderHistory(props) {
  let user = JSON.parse(localStorage.getItem("user"));
  const [products, setProducts] = useState([{}]);

  const Hover = posed.div({
    hoverable: true,
    pressable: true,
    init: {
      scale: 1,
      boxShadow: "0px 0px 0px rgba(0,0,0,0)"
    },
    hover: {
      scale: 1.2,
      boxShadow: "0px 5px 10px rgba(0,0,0,0.2)"
    },
    press: {
      scale: 1.1,
      boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
    }
  });

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
      <div className="greeting">
        <h3>{JSON.parse(localStorage.getItem("user")).name}</h3>
        {JSON.parse(localStorage.getItem("user")).type === "Charity" ? (
          <div>
            <div>Your Order History</div>
          </div>
        ) : (
          <div>Your Donations History</div>
        )}
      </div>
      <ul>
        <div className="itemList">
          {products &&
            products.orders &&
            products.orders.map(item => {
              return (
                <div>
                  {item.line_items.lineItems &&
                    item.line_items.lineItems.map(product => {
                      console.log("product", product.product);
                      return (
                        <div className="singleItem">
                          <ListGroup>
                            <ListGroup.Item action variant="warning">
                              {product.product}
                            </ListGroup.Item>
                          </ListGroup>
                          <br />
                        </div>
                      );
                    })}
                </div>
              );
              // console.log("item", item.line_items.lineItems);
            })}
        </div>
      </ul>
    </>
  );
}
