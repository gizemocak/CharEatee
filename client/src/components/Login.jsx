import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavBar from './NavBar';

export default function Login (props) {
  const [formData, updateFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoggedIn, setIsloggedIn] = useState({})

  const formSubmit = (e) => {
   e.preventDefault();
   handleLogin()
  }

  const handleLogin = () => {
    console.log("form data", formData)
    fetch('http://localhost:8080/api/login', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(formData)
     })
     .then(res => res.json())
     .then(res => {
       setIsloggedIn(res)
     })
  }

  const handleChange = (e, propertyName) => {
    const newFormData = { ...formData };
    newFormData[propertyName] = e.target.value;
    updateFormData(newFormData);
  }

  if(isLoggedIn.email){
    props.history.push("/")
    // return null
  }

    return (
      <>
      <h1>Login</h1>
      <NavBar/>
      <Form onSubmit={formSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        type="email"
        placeholder="Enter email" 
        value={formData.email}
        onChange={e => {
          handleChange(e, 'email')
        }}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
    
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Password" 
        value={formData.password}
        onChange={e => {
          handleChange(e, 'password')
        }}
        />
      </Form.Group>
      
      <Button variant="primary" type="submit" >
        Submit
      </Button>
    </Form>
    </>
    );
}