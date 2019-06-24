import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from './NavBar';
import { Link } from "react-router-dom";


export default class SignUpForm extends Component {
  render() {
    return (
      <>
      <h1>Register your account</h1>
      <NavBar/>
      <Form>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Control as="select">
            <option>What type of user are you?</option>
            <option>Grocer/Restaurant</option>
            <option>Charity</option>
        </Form.Control>
      </Form.Group>

      <Form.Control type="text" placeholder="Your Business Name" />

      <br/>

    <Form.Group controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control placeholder="Ex: 1234 Main St" />
  </Form.Group>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Address 2</Form.Label>
    <Form.Control placeholder="Apartment, studio, or floor" />
  </Form.Group>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>City</Form.Label>
      <Form.Control />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Province</Form.Label>
      <Form.Control as="select">
        <option>Choose...</option>
        <option>Alberta</option>
        <option>British Columbia</option>
        <option>Manitoba</option>
        <option>Newfoundland and Labrador</option>
        <option>New Brunswick</option>
        <option>Nova Scotia</option>
        <option>Ontario</option>
        <option>Prince Edward Island</option>
        <option>Quebec</option>
        <option>Saskatchewan</option>
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Postal Code</Form.Label>
      <Form.Control placeholder="A1A B1B"/>
    </Form.Group>
  </Form.Row>

  <br/>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
    
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <br/>
    <Link to={"/login"}>Already had an account? Sign In</Link>
    </>
    );
  }
}