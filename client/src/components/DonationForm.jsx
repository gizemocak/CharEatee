import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default class GroceryHome extends Component {
  render() {
    const { formData } = this.props;
    return (
      <div className="donation-form">
        <Form onSubmit={this.props.onSubmit}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Product</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              onChange={e => {
                this.props.handleChange(e, "product");
              }}
              value={formData.product}
            />
          </Form.Group>

          <div className="donation-quantity">
            <Form.Group className="donation-unit">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantity"
                onChange={e => {
                  this.props.handleChange(e, "quantity");
                }}
                value={formData.quantity}
              />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlSelect1"
              className="donation-unit"
            >
              <Form.Label>Unit</Form.Label>
              <Form.Control
                as="select"
                onChange={e => {
                  this.props.handleChange(e, "unit");
                }}
                value={formData.unit}
              >
                <option>lb</option>
                <option>piece</option>
              </Form.Control>
            </Form.Group>
          </div>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Date"
              onChange={e => {
                this.props.handleChange(e, "expiryDate");
              }}
              value={formData.expiryDate}
            />
          </Form.Group>
          <Link to={"/"}>
            <img src="/images/camera.png" width="50" height="50" />
          </Link>
          <Button variant="link" type="submit" className="donate-button">
            <img src="/images/add.png" width="60" height="60" />
          </Button>
        </Form>
      </div>
    );
  }
}
