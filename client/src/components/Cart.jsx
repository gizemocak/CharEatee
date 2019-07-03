import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import NavBar from "./NavBar";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faDonate } from '@fortawesome/free-solid-svg-icons';
import "../style/Cart.scss";

import styled, { keyframes } from "styled-components";
import { lightSpeedIn } from 'react-animations';
const LightSpeedInAnimation = keyframes`${lightSpeedIn}`;
const LightSpeedInDiv = styled.div`
  animation: 2s ${LightSpeedInAnimation};
`;

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
    <div className="showCart">
      <NavBar />
      <LightSpeedInDiv>
      <p className="your">Your Cart ({cart.length})</p>
      {cart.length > 0 &&
        cart.map(item => {
          return (
            <div className="cartBody">
              <div className="itemDetail">         
                <div className="im">
                  {item.imgurl? <img src={item.imgurl} style={{height: 'auto', maxWidth: '5rem'}}/> : <img src="http://thegracebeautynspa.com/public/uploads/default-product-image.png" style={{height: 'auto', maxWidth: '5rem'}}/>}
                </div>
                <div className="description">
                  <p className="iname">{item.name}</p>
                  <br/>
                  Quantity: {item.quantity} {item.unit} 
                  <br/>
                  Expiry Date: {item.expiry}
                </div>
                <div className="price">
                  FREE <FontAwesomeIcon icon={faHeart}/>
                </div>
              </div>
              <hr/>
            </div>
          );
        })}

      <Button className="placebutt" onClick={placeOrder}>Place Order <FontAwesomeIcon icon={faDonate}/></Button>
    </LightSpeedInDiv>
    </div>
  );
}
