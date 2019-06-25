import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

export default class Home extends Component {
  render() {
    return (
      <Navbar bg="light" variant="light" fixed="top">
        <Navbar.Brand href="/">
          <img src="/images/watermelon.png" width="30" height="30" />
          CharEatee
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#profile">Profile</Nav.Link>
        </Nav>
        {this.props.camera && (
          <Navbar.Brand href="/">
            <img src="/images/camera.png" width="30" height="30" />
          </Navbar.Brand>
        )}
      </Navbar>
    );
  }
}
