import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";

import "../style/OrderHistory.scss";

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from "react-bootstrap/Button";

import { useStoreState, useStoreActions } from "easy-peasy";
import { Link } from "react-router-dom";
import "../style/Profile.scss";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import posed from "react-pose";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";

import styled, { keyframes } from "styled-components";
import { zoomIn } from "react-animations";

export default function OrderHistory(props) {
  const order = useStoreState(state => state.order);
  const ZoomInAnimation = keyframes`${zoomIn}`;
  const ZoomInDiv = styled.div`
    animation: 2s ${ZoomInAnimation};
  `;

  let user = JSON.parse(localStorage.getItem("user"));
  const [products, setProducts] = useState([{}]);
  const clearCart = useStoreActions(actions => actions.clearCart);

  const clearCart = useStoreActions(actions => actions.clearCart);

  const goToMap = e => {
    e.preventDefault();
    clearCart();
    props.history.push(`/charity/home/${user.user_id}`);
  };

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
      window.scrollTo(0, 0);

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

  const goToMap = e => {
    e.preventDefault();
    clearCart();
    props.history.push(`/charity/home/${user.user_id}`);
  };

  return (
    <>
      <Navbar />
      <ZoomInDiv>
      <div className="greeting">
      <Jumbotron className="jbt">
        <h3>Thank for your order, {user.name}</h3>
        <p>
          Please contact the grocer/restuarant to arrange the pickup or delivery.
        </p>
        <p>
        <Button id="bmap" variant="primary"  onClick={goToMap}>Go back to the Map to view more donations</Button>
        </p>
    </Jumbotron>

        {JSON.parse(localStorage.getItem("user")).type === "Charity" ? (
          <div className="orderBody">
            <h5 style={{color: '#727275'}}>Your Order History <FontAwesomeIcon icon={faReceipt} /></h5>
            <Tabs defaultActiveKey="1" id="uncontrolled-tab-example" className="otabs">
              <Tab eventKey="1" title="This Week" className="stabs">
                <div className="orderItemList">
                  {products &&
                    products.orders &&
                    products.orders.map(item => {
                      return (
                        <div className="hisList">
                          {item.line_items.lineItems &&
                            item.line_items.lineItems.map(product => {
                              console.log("product", product.product);
                              return (
                                <div className="singleItem">
                                  <ListGroup>
                                    <ListGroup.Item action variant="info" id="l1">
                                      {product.product}
                                    </ListGroup.Item>
                                  </ListGroup>
                                  <br />
                                </div>
                              );
                            })}
                        </div>
                      );
                    })}
                </div>
              </Tab>
              <Tab eventKey="2" title="Past 1 Month" className="stabs">
                <div className="orderItemList">
                  {products &&
                    products.orders &&
                    products.orders.map(item => {
                      return (
                        <div className="hisList">
                          {item.line_items.lineItems &&
                            item.line_items.lineItems.map(product => {
                              console.log("productsssss", product);
                              return (
                                <div className="singleItem">
                                  <ListGroup>
                                    <ListGroup.Item action variant="warning" id="l2">
                                      {product.product}
                                    </ListGroup.Item>
                                  </ListGroup>
                                  <br />
                                </div>
                              );
                            })}
                        </div>
                      );
                    })}
                </div>
              </Tab>
              <Tab eventKey="3" title="Past 1 year" className="stabs">
                <div className="orderItemList">
                  {products &&
                    products.orders &&
                    products.orders.map(item => {
                      return (
                        <div className="hisList">
                          {item.line_items.lineItems &&
                            item.line_items.lineItems.map(product => {
                              console.log("product", product.product);
                              return (
                                <div className="singleItem">
                                  <ListGroup>
                                    <ListGroup.Item action variant="secondary" id="l3">
                                      {product.product}
                                    </ListGroup.Item>
                                  </ListGroup>
                                  <br />
                                </div>
                              );
                            })}
                        </div>
                      );
                    })}
                </div>
              </Tab>
            </Tabs>
          </div>
        ) : (
          <div>Your Donations History</div>
        )}
      </div>
      <footer className="ofoot">
        <span>Share your joy of charity.</span>
      </footer>
      </ZoomInDiv>
    </>
  );
}
