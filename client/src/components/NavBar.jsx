import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Style/NavBar.scss"


export default function Home() {
    return (
      <Navbar fixed="top" className="nav">
          <Link to="/"><span className="logo">CharEatee</span></Link>
          {/* <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link> */}
      </Navbar>
    );
}
