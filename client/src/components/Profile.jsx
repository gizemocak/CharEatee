import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useStoreState, useStoreActions } from "easy-peasy";
import Button from "react-bootstrap/Button";
import Cart from "../components/Cart.jsx";
import { Link } from "react-router-dom";

export default function Profile(props) {
  console.log("props", props);
  const usersInfo = useStoreState(state => state.pins);
  const [username, setUserName] = useState("");
  const fetchUserInfo = useStoreActions(actions => actions.fetchPins);

  // const [cart, setCart] = useState([])
  const cart = useStoreState(state => state.cart);
  const addToCart = useStoreActions(action => action.addToCart);
  const removeFromCart = useStoreActions(action => action.removeFromCart);

  const [clicked, updateClickedButton] = useState(false);

  console.log(cart);
  useEffect(() => {
    fetchUserInfo();
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
  return (
    <>
      <NavBar />
      {user.type === "Charity" && <Link to="/cart">cart: {cart.length} </Link>}

      <h3>{username && username}</h3>

      <ul>
        {user.type === "Charity" && usersInfo && (
          <div>
            {usersInfo.map(item => {
              if (item.user_id === Number(props.match.params.id)) {
                if (username !== item.username) {
                  setUserName(item.username);
                }
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
              }
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
          usersInfo &&
          usersInfo.map(item => {
            if (item.user_id === Number(props.match.params.id)) {
              if (username !== item.username) {
                setUserName(item.username);
              }
              return (
                <div>
                  <li>
                    {item.name} {item.quantity} {item.unit}{" "}
                  </li>
                </div>
              );
            }
          })}
      </ul>
    </>
  );
}
