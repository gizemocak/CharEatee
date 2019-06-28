import React, { useState } from 'react';
import NavBar from './NavBar';
import { useStoreActions, useStoreState } from "easy-peasy";

export default function Profile () {
  const formData = useStoreState(state => {
    return state.formData
  }
  );
     console.log("formdata",formData)
    return (
      <>
      <NavBar/>
      <h1>profile</h1>
      {formData.email}
    </>
    );
}