import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import {useStoreState, useStoreActions } from "easy-peasy";

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
      <div className="user_nav">
      {user.type === "Grocer/Restaurant" && usersInfo && usersInfo.map(item => {
        console.log(item)
        console.log("item.id " , item.id)
        console.log(user.user_id)
        if(item.email === user.email){
          return <li>{item.name}</li>
        } else {
          return false
        }
      })}
      </div>
    </>
    );
}
