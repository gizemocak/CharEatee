import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class UpdateDonationForm extends Component {
  render() {
    const {formItem} = this.props;
    return(
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Product</Form.Label>
          <Form.Control as="textarea" 
          rows="2" 
          onChange={e => {
            this.props.handleUpdateFormChange(e.target.value, "product");
          }}
          value={formItem.product}/>
         </Form.Group>

         <Form.Group controlId="exampleForm.ControlInput1">
           <Form.Label>Quantity</Form.Label>
           <Form.Control type="number" 
           placeholder="Quantity" 
           onChange={e => {
            this.props.handleUpdateFormChange(e.target.value, "quantity");
          }}
          value={formItem.quantity}/>   
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Example select</Form.Label>
          <Form.Control as="select">
            <option>lbs</option>
            <option>pieces</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Control
              type="date"
              placeholder="Date"
              onChange={e => {
                this.props.handleUpdateFormChange(e.target.value, "expiryDate");
            }}
            value={formItem.expiryDate}
          />
        </Form.Group>
      </Form>
    )
  }
}