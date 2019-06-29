import React, { useEffect } from 'react';
import NavBar from './NavBar';
import {useStoreState, useStoreActions } from "easy-peasy";
import Button from "react-bootstrap/Button";

export default function Profile (props) {
  const usersInfo = useStoreState(state => state.pins);
  const fetchUserInfo = useStoreActions(actions => actions.fetchPins);
   console.log(usersInfo)
  useEffect(() => {
    fetchUserInfo()
    console.log("params",props.match.params.id)
  },[])

  let user = JSON.parse(localStorage.getItem('user'))
console.log(usersInfo)
    return (
      <>
      <NavBar/>
      <h1>heeey</h1>
      <div>{user.email}</div>
      <ul>
      {user.type === "Grocer/Restaurant" && usersInfo && usersInfo.map(item => {
        console.log("params", props.match.params.id)
        console.log("user id", item.user_id)
         if(item.user_id === Number(props.match.params.id))
         {
          return (
          <div>
          <li>{item.name}  {item.quantity} {item.unit} <Button>Add to Cart</Button></li>
          </div>
          )
        }
      })}
      </ul>
    </>
    );
}
