import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useStoreState, useStoreActions, StoreProvider } from "easy-peasy";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../style/Profile.scss";
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import posed from 'react-pose';

import styled, { keyframes } from "styled-components";
import { fadeInUp } from 'react-animations';
const FadeInUpAnimation = keyframes`${fadeInUp}`;
const FadeInUpDiv = styled.div`
  animation: 2s ${FadeInUpAnimation};
`;

const Hover = posed.div({
  hoverable: true,
  pressable: true,
  init: {
    scale: 1,
    boxShadow: '0px 0px 0px rgba(0,0,0,0)'
  },
  hover: {
    scale: 1.2,
    boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
  },
  press: {
    scale: 1.1,
    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
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
  // const usersInfo = useStoreState(state => state.pins);


  console.log(cart);
  useEffect(() => {
    fetchStores();
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

  let user = JSON.parse(localStorage.getItem("user"));

  let filteredStore = stores.find(store => {
    return store.id === Number(props.match.params.id);
  });
  console.log("filtered", filteredStore);

  return (
    <div className="showItems">
      <NavBar />
      <FadeInUpDiv>

        {user.type === "Charity" && <Link to="/cart">cart: {cart.length} </Link>}

        <h3> Welcome back, {username && username}</h3>
        {user.type === "Grocer/Restaurant" && stores &&
          <div className="greeting">
            <p>We really appreciate your kindness!</p>
            <p>Click <Link to={`/grocery/home/${JSON.parse(localStorage.getItem('user')).user_id}`}>HERE</Link> if you want to make more donations</p>
            <p>Or you can check your past donations below:</p>
          </div>}

        <ul>
          {user.type === "Charity" && stores && (
            <div>
              {filteredStore.products &&
                filteredStore.products.map(item => {
                  return (
                    <div>
                      <li>
                        {item.name} {item.quantity} {item.unit}
                        <Button
                          onClick={() => {
                            handleAddToCart(item);
                          }}
                          name="add to cart"
                        />
                      </li>
                    </div>
                  );
                })}
              {cart.length > 0 && (
                <Button
                  onClick={() => {
                    props.history.push("/cart");
                  }}
                >
                  Checkout {cart.length === 1 ? "1 Item" : `${cart.length} Items`}
                </Button>
              )}
            </div>
          )}

        {user.type === "Grocer/Restaurant" &&
          stores &&
          stores.map(store => {
            if (store.id === Number(props.match.params.id)) {
              if (username !== store.username) {
                setUserName(store.username);
              }
              return store.products.map(product => {
                return (
                  <div className="grocerItems">
                    <Accordion>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            <Hover className="hoverTitle">{product.name}</Hover>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            Quantity: {product.quantity} {product.unit}
                            <hr/>
                            Expiry Date: {product.expiry.slice(0,10)}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            <Hover className="hoverTitle">Image of {product.name}</Hover>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                          <Card.Body>
                            {product.imgurl? <img src={product.imgurl} style={{height: '5rem'}}/> : <p>No image for this item</p>}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <br/>
                    </Accordion>
  
                  </div>
                );
              })
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
