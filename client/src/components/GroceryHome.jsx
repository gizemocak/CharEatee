import React, { Component } from "react";
import NavBar from "./NavBar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class GroceryHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camera: "true",
      list: []
    };

    // addAFoodItem = () => {};
  }
  render() {
    return (
      <>
        <NavBar camera={this.state.camera} />
        <div>Donation List</div>

        <div>
          Add food item
          <Button variant="link" type="submit">
            <img src="/images/add.png" width="36" height="36" />
          </Button>
        </div>
      </>
    );
  }
}
