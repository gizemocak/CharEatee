import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
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