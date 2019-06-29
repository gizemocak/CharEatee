import React, { useState } from 'react';
import NavBar from './NavBar';
import {useStoreState } from "easy-peasy";

export default function Profile () {
  const usersInfo = useStoreState(state => state.pins);
  let userId = (JSON.parse(localStorage.getItem('user'))).user_id

  console.log(usersInfo)
    return (
      <>
      <NavBar/>
      <div className="user_nav">
      {/* <h1>{userId.name}</h1> */}
      </div>
    </>
    );
}