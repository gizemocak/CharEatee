import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default class GroceryHome extends Component {
  render() {
    return (
      <div className="donation-form">
        <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows="3" />
          </Form.Group>
        </Form>
        <div className="donation-quantity">
          <Form.Group className="donation-unit">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" placeholder="Quantity" />
          </Form.Group>
          <Form.Group
            controlId="exampleForm.ControlSelect1"
            className="donation-unit"
          >
            <Form.Label>Unit</Form.Label>
            <Form.Control as="select">
              <option>lb</option>
              <option>piece</option>
            </Form.Control>
          </Form.Group>
        </div>
        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" placeholder="Date" />
        </Form.Group>
        <Link to={"/"}>
          <img src="/images/camera.png" width="50" height="50" />
        </Link>
        <Button variant="link" type="submit" className="donate-button">
          <img src="/images/add.png" width="60" height="60" />
        </Button>
      </div>
    );
  }
}
