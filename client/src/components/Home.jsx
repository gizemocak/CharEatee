import React, { Component } from "react";
import Navbar from "./NavBar";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <h1>Project Home</h1>
        <h1>Login as</h1>
        <Link to={"/login"}>Grocery Store</Link>
        <hr/>
        <Link to={"/login"}>Charity</Link>
        <hr/>
        <Link to={"/signup"}>Don't have an account?Sign Up</Link>
        {/* Link to List.js */}
        {/* <Link to={'./list'}>
        <button variant="raised">
            My List
        </button>
      </Link> */}
      <hr/>
        <Link to={"/charity/home/:id"}>Charity Home Page</Link>
        <hr/>
        <Link to={"/login"}>Login</Link>
      </div>
    );
  }
}
