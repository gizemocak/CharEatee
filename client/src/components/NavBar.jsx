import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home(props) {
  console.log("props", props)
    return (
      <Navbar bg="light" variant="light" fixed="top">
          <img src="/images/watermelon.png" width="30" height="30" />
          CharEatee
        <Nav className="mr-auto">
          <Link to="/">Home</Link>

        </Nav>
      </Navbar>
    );
}
