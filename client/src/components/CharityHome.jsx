import React, { Component } from "react";
import NavBar from "./NavBar";

export default class CharityHome extends Component {
  render() {
    return (
      <>
        <NavBar />
        <div>I am Charity Home</div>
        <img src="/images/Simple-Location-Picker.png" width="400" />
      </>
    );
  }
}
