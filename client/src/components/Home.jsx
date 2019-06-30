import React, { Component } from "react";
import Navbar from "./NavBar";
import { Link } from "react-router-dom";
import "../Style/Home.scss"

export default class Home extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="body">
        <Link to={"/login"}>Grocery Store</Link>
        <hr/>
        <Link to={"/login"}>Charity</Link>
        <hr/>
        <Link to={"/signup"}>Don't have an account?Sign Up</Link>
        <hr/>
        <Link to={'/grocery/home/:id'}>Grocery Home</Link>
        {/* Link to List.js */}
        {/* <Link to={'./list'}>
        <button variant="raised">
            My List
        </button>
      </Link> */}
      <hr/>
        <Link to={"/charity/home/:id"}>Charity Home Page</Link>
        </div>
      </div>
    );
  }
}
