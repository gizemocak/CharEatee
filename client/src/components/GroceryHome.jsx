import React, { Component } from "react";
import NavBar from "./NavBar";
import DonationForm from "./DonationForm";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class GroceryHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camera: "true",
      items: [],
      input: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      items: [...this.state.items, this.state.input],
      input: ""
    });
  };

  onChange = e => {
    this.setState({ input: e.target.value });
  };

  render() {
    return (
      <>
        <NavBar camera={this.state.camera} />
        <div>Donation List</div>
        {/* <div>
          <Form onSubmit={this.onSubmit}>
            <Form.Label>Add an item </Form.Label>
            <input
              type="text"
              placeholder="  item"
              onChange={this.onChange}
              value={this.state.input}
            />
          </Form>
          <Button variant="link" type="submit">
            <img src="/images/add.png" width="36" height="36" />
          </Button>
          <ul>
            {this.state.items.map(item => {
              return <li key={item}>{item}</li>;
            })}
          </ul>
        </div>
        <div>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Food Item</Form.Label>
            <Form.Control type="text" placeholder="Food Item" />
          </Form.Group>
          <Form.Group controlId="formGridState">
            <Form.Control as="select" />
            <option>piece</option>
            <option>lbs</option>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div> */}
        <DonationForm />
      </>
    );
  }
}
