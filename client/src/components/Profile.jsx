import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useStoreState, useStoreActions, StoreProvider } from "easy-peasy";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
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

export default function Profile(props) {
  console.log("props", props);
  const stores = useStoreState(state => state.stores);
  const [username, setUserName] = useState("");
  const fetchStores = useStoreActions(actions => actions.fetchStores);

  const cart = useStoreState(state => state.cart);
  const addToCart = useStoreActions(action => action.addToCart);
  const removeFromCart = useStoreActions(action => action.removeFromCart);

  const [clicked, updateClickedButton] = useState(false);
  const [toggleState, setToggleState] = useState("+");
  // const usersInfo = useStoreState(state => state.pins);

  useEffect(() => {
    setTimeout(() => {
      fetchStores();
    }, 500);
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = item => {
    console.log("item", item);
    const currentProductIndex = cart.findIndex(
      product => item.id === product.id
    );
    if (currentProductIndex === -1) {
      addToCart(item);
    } else {
      let newCart = [...cart];
      newCart.splice(currentProductIndex, 1);
      removeFromCart(newCart);
    }

    if (clicked) {
      updateClickedButton(true);
    } else {
      updateClickedButton(false);
    }
  };

  const toggle = () => {
    setToggleState(toggleState === "+" ? "-" : "+");
  };

  let user = JSON.parse(localStorage.getItem("user"));

  let filteredStore = stores.find(store => {
    return store.id === Number(props.match.params.id);
  });

  return (
    <div className="showItems">
      <NavBar />
      <FadeInUpDiv>
        <div className="subNav">
          <p>
            <Link to={`/charity/home/${user.user_id}`}>Go back to Map</Link>
          </p>
          {user.type === "Charity" && (
            <p className="cart">
              <Link to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} /> cart: {cart.length}{" "}
              </Link>
            </p>
          )}
        </div>

        <h3> Welcome back, {user && user.name}</h3>
        {user.type === "Grocer/Restaurant" && stores && (
          <div className="greeting">
            <p>We really appreciate your kindness!</p>
            <p>
              Click{" "}
              <Link
                to={`/grocery/home/${
                  JSON.parse(localStorage.getItem("user")).user_id
                }`}
              >
                HERE
              </Link>{" "}
              if you want to make more donations
            </p>
            <p>Or you can check your past donations below:</p>
          </div>
        )}

        {user.type === "Charity" && stores && (
          <div className="greeting">
            <p>Please select the items you need from this store:</p>
          </div>
        )}

        <ul>
          {user.type === "Charity" && stores && (
            <div className="itemsList">
              {filteredStore &&
                filteredStore.products &&
                filteredStore.products
                  .filter(item => !item.deleted_at)
                  .map((item, index) => {
                    return (
                      <div className="singleItem">
                        <ListGroup>
                          <ListGroup.Item action variant="warning">
                            {item.name}: {item.quantity} {item.unit}
                            <br />
                            Expires: {item.expiry}
                            <br />
                            <img
                              src={item.imgurl}
                              style={{ height: "5rem", marginTop: "1rem" }}
                            />
                            <Button
                              id={index}
                              onClick={() => {
                                handleAddToCart(item);
                              }}
                              style={{
                                marginLeft: "0.5rem",
                                height: "35px",
                                width: "35px"
                              }}
                            >
                              -
                            </Button>
                            <Button
                              id={index}
                              onClick={() => {
                                handleAddToCart(item);
                              }}
                              style={{ height: "35px", width: "35px" }}
                            >
                              +
                            </Button>
                          </ListGroup.Item>
                        </ListGroup>
                        <br />
                      </div>
                    );
                  })}
              {cart.length > 0 && (
                <Button
                  className="checkoutButton"
                  onClick={() => {
                    props.history.push("/cart");
                  }}
                >
                  Checkout{" "}
                  {cart.length === 1 ? "1 Item" : `${cart.length} Items`}
                </Button>
              )}
            </div>
          )}

          {user.type === "Grocer/Restaurant" &&
            stores.map(store => {
              if (store.id === Number(props.match.params.id)) {
                if (username !== store.username) {
                  setUserName(store.username);
                }
                return (
                  store.products &&
                  store.products.map(product => {
                    return (
                      <div className="grocerItems">
                        <Accordion>
                          <Card>
                            <Card.Header>
                              <Accordion.Toggle
                                as={Button}
                                variant="link"
                                eventKey="0"
                              >
                                <Hover className="hoverTitle">
                                  {product.name}
                                </Hover>
                              </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                              <Card.Body>
                                Quantity: {product.quantity} {product.unit}
                                <hr />
                                Expiry Date: {product.expiry.slice(0, 10)}
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                          <Card>
                            <Card.Header>
                              <Accordion.Toggle
                                as={Button}
                                variant="link"
                                eventKey="1"
                              >
                                <Hover className="hoverTitle">
                                  Image of {product.name}
                                </Hover>
                              </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                              <Card.Body>
                                {product.imgurl ? (
                                  <img
                                    src={product.imgurl}
                                    style={{ height: "5rem" }}
                                  />
                                ) : (
                                  <p>No image for this item</p>
                                )}
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                          <br />
                        </Accordion>
                      </div>
                    );
                  })
                );
              }
            })}
        </ul>
        <footer className="footPf">
          <span>Give a little. Help a lot.</span>
        </footer>
      </FadeInUpDiv>
    </div>
  );
}
