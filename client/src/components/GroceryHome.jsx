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
      formData: {
        product: "",
        quantity: 0,
        unit: "",
        expiryDate: ""
      }
    };
  }

  onSubmit = e => {
    //
    this.setState(
      {
        items: [...this.state.items, this.state.formData]
      },
      () => {
        console.log("new state", this.state);
      }
    );
    e.preventDefault();
  };

  handleChange = (e, propertyName) => {
    console.log("e", e.target.value);
    console.log("property name", propertyName);
    const formData = { ...this.state.formData };
    formData[propertyName] = e.target.value;
    this.setState({ formData });
  };

  render() {
    return (
      <>
        <NavBar camera={this.state.camera} />
        <div>Donation List</div>
        <DonationForm
          items={this.state.items}
          formData={this.state.formData}
          onSubmit={this.onSubmit}
          handleChange={this.handleChange}
        />
      </>
    );
  }
}
