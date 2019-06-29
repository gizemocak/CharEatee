import React, { useEffect } from 'react';
import NavBar from './NavBar';
import {useStoreState, useStoreActions } from "easy-peasy";
import Button from "react-bootstrap/Button";

export default function Profile () {
  const usersInfo = useStoreState(state => state.pins);
  const fetchUserInfo = useStoreActions(actions => actions.fetchPins);

  useEffect(() => {
    fetchUserInfo()
  },[])

  let user = JSON.parse(localStorage.getItem('user'))
console.log(usersInfo)
    return (
      <>
      <NavBar/>
      <div>{user.name}</div>
      <ul>
      {user.type === "Grocer/Restaurant" && usersInfo && usersInfo.map(item => {
        if(item.email === user.email){
          return (
          <div>
          <li key={item.id}>{item.name}  {item.quantity} {item.unit} <Button>Add to Cart</Button></li>
          </div>
          )
        }
      })}
      </ul>
    </>
    );
}
