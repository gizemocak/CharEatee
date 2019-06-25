import React, { Component } from "react";
import Navbar from "./NavBar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default class Home extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <h1>Project Home</h1>
        <h1>Login as</h1>
        <Link to={"/login"}>
          <Button variant="outline-success">Grocery Store</Button>
        </Link>
        <Link to={"/login"}>
          <Button variant="outline-success">Charity</Button>
        </Link>
        <Link to={"/signup"}>Don't have an account?Sign Up</Link>
        {/* Link to List.js */}
        {/* <Link to={'./list'}>
        <button variant="raised">
            My List
        </button>
      </Link> */}
        <Link to={"/charity/home/:id"}>
          <Button variant="outline-success">Charity Home Page</Button>
        </Link>
        <Link to={"/grocery/home/:id"}>
          <Button variant="outline-success">Grocery Home Page</Button>
        </Link>
      </div>
    );
  }
}
