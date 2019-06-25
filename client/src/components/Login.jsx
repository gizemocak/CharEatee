import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavBar from './NavBar';
import axios from 'axios';


export default function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formData, updateFormData] = useState({
    email: "",
    password: ""
  });

  const formSubmit = (e) => {
    console.log("submit")
   e.preventDefault();
  //  console.log(formData)
   handleLogin()
  }

  const handleLogin = () => {
    console.log("form data", formData)
    // axios.post('http://localhost:8080/api/login', formData )
    //   .then(res => {
    //     console.log("response",res);
    //     console.log("response data",res.data);
    //   })

    fetch('http://localhost:8080/api/login', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(formData)
     }).then(res => {
          console.log("response",res);
          console.log("response data",res.data);
        })
  }

  const handleChange = (e, propertyName) => {
    const newFormData = { ...formData };
    newFormData[propertyName] = e.target.value;
    updateFormData(newFormData);
    // setEmail()
    // setPassword()
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
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </>
    );
}